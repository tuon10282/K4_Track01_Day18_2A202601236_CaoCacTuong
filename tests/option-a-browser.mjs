import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const cacheDir = resolve('.cache');
const profileDir = resolve('.cache', `option-a-cdp-${Date.now()}`);
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debugPort = Number(process.env.CHROME_DEBUG_PORT || 9443);
const appUrl = `file:///${root.replaceAll('\\', '/')}/option-a/index.html`;
mkdirSync(cacheDir, { recursive: true });
mkdirSync(profileDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--disable-dev-shm-usage',
  '--disable-crash-reporter',
  '--disable-breakpad',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profileDir}`,
  '--window-size=1600,1000',
  appUrl
], { stdio: 'ignore' });

const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));

async function getTarget() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
      const page = targets.find((target) => target.type === 'page');
      if (page) return page;
    } catch {
      // Chrome is still starting.
    }
    await delay(200);
  }
  throw new Error('Chrome DevTools endpoint did not become ready.');
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
  }

  async connect() {
    await new Promise((resolveConnect, reject) => {
      this.socket.addEventListener('open', resolveConnect, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const callback = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) callback.reject(new Error(message.error.message));
        else callback.resolve(message.result);
      } else if (message.method) {
        this.events.push(message);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolveSend, reject) => {
      this.pending.set(id, { resolve: resolveSend, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() { this.socket.close(); }
}

const assert = (condition, message) => {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
};

let cdp;
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  assert(condition, message);
};

async function evaluate(expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function click(selector) {
  const clicked = await evaluate(`(() => { const node = document.querySelector(${JSON.stringify(selector)}); if (!node) return false; node.click(); return true; })()`);
  assert(clicked, `missing clickable element ${selector}`);
  await delay(100);
}

async function screenshot(name) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  const output = resolve('.cache', name);
  writeFileSync(output, Buffer.from(result.data, 'base64'));
  return output;
}

try {
  const target = await getTarget();
  cdp = new CdpClient(target.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await delay(500);

  check(await evaluate('document.querySelector("#assist").hidden === true'), 'checkpoint is closed initially');
  check(await evaluate('document.querySelector("#pageInput").value === "1"'), 'viewer starts from page 1');
  check(await evaluate('document.querySelector("#slideFrame").src.includes("2.Funding.pdf")'), 'funding PDF is loaded');

  await click('#noticeOkBtn');
  await click('#demoPageBtn');
  check(await evaluate('document.querySelector("#pageInput").value === "12"'), 'demo control opens mapped page 12');

  await click('#checkpointBtn');
  check(await evaluate('document.querySelector("#assist").hidden === false'), 'learner explicitly opens checkpoint');
  check(await evaluate('document.querySelectorAll("[data-assist=choose]").length === 3'), 'checkpoint shows exactly three choices');

  await click('[data-concept="pre-post-money"]');
  check(await evaluate('document.querySelector("[data-concept=pre-post-money]").classList.contains("is-selected")'), 'selected self-report is visible');
  check(await evaluate('document.querySelector("[data-assist=diagnose]").disabled === false'), 'mapping action unlocks after an answer');
  await click('[data-assist="diagnose"]');
  check(await evaluate('document.querySelector("#assistTitle").textContent.includes("Gợi ý")'), 'result waits for learner review');
  check(await evaluate('document.querySelector(".result-evidence").textContent.includes("post-money")'), 'result quotes direct learner evidence');
  check(await evaluate('document.querySelector("#pageInput").value === "12"'), 'result preserves slide position');
  const desktopScreenshot = await screenshot('option-a-result-desktop.png');

  await click('[data-assist="correct"]');
  check(await evaluate('document.querySelector("[data-assist=diagnose]").disabled === true'), 'choose-again clears prior answer');
  await click('[data-concept="pre-post-money"]');
  await click('[data-assist="diagnose"]');
  await click('[data-assist="open"]');
  check(await evaluate('document.querySelector("#assistTitle").textContent.includes("Pre-money")'), 'refresher opens only after approval');
  check(await evaluate('document.querySelector("#assistBody").textContent.includes("Pre-money 4 tỷ")'), 'refresher matches finance content');
  await click('[data-assist="done"]');
  check(await evaluate('document.querySelector("#assistTitle").textContent.includes("hoàn tất")'), 'completion state is shown');
  check(await evaluate('document.querySelector("#pageInput").value === "12"'), 'completion still preserves page 12');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: appUrl });
  await delay(500);
  await click('#noticeOkBtn');
  await click('#checkpointBtn');
  check(await evaluate('document.documentElement.scrollWidth <= 390'), 'mobile layout has no horizontal overflow');
  check(await evaluate('getComputedStyle(document.querySelector("#assist")).position === "fixed"'), 'mobile checkpoint uses an overlay panel');
  const mobileScreenshot = await screenshot('option-a-mobile.png');

  const exceptions = cdp.events.filter((event) => event.method === 'Runtime.exceptionThrown');
  check(exceptions.length === 0, 'no runtime exceptions are raised');

  console.log(JSON.stringify({ result: 'PASS', checks, desktopScreenshot, mobileScreenshot }, null, 2));
} finally {
  cdp?.close();
  chrome.kill();
}
