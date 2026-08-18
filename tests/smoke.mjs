import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const appUrl = process.env.APP_URL || 'http://127.0.0.1:4173/prototype.html';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debugPort = Number(process.env.CHROME_DEBUG_PORT || 9224);
const outputDir = join(tmpdir(), 'focuslab-e2e');
const profileDir = join(tmpdir(), `focuslab-chrome-${Date.now()}`);
mkdirSync(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profileDir}`,
  '--window-size=1440,1100',
  appUrl
], { stdio: 'ignore' });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
      const page = targets.find((target) => target.type === 'page');
      if (page) return page;
    } catch {
      // Chrome has not opened the debugging endpoint yet.
    }
    await delay(250);
  }
  throw new Error('Chrome DevTools endpoint did not become ready.');
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
    this.events = [];
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      } else if (message.method) {
        this.events.push(message);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

const target = await getTarget();
const cdp = new CdpClient(target.webSocketDebuggerUrl);

async function evaluate(expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitFor(expression, message) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(expression)) return;
    await delay(100);
  }
  throw new Error(`Timed out: ${message}`);
}

async function click(selector) {
  const clicked = await evaluate(`(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; element.click(); return true; })()`);
  assert(clicked, `missing clickable element ${selector}`);
  await delay(60);
}

async function screenshot(name) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  const path = join(outputDir, name);
  writeFileSync(path, Buffer.from(result.data, 'base64'));
  return path;
}

let desktopScreenshot;
let mobileScreenshot;

try {
  await cdp.connect();
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await waitFor('document.readyState === "complete"', 'initial page load');

  assert(await evaluate('document.querySelector("#task-title").textContent.includes("Gradient Descent")'), 'common outcome context is visible');
  assert(await evaluate('getComputedStyle(document.querySelector("#facilitator-notes")).display === "none"'), 'facilitator notes are hidden from testers');
  desktopScreenshot = await screenshot('desktop-initial.png');

  await click('[data-action="start"]');
  await click('[data-select="partial"]');
  await click('[data-action="diagnose"]');
  assert(await evaluate('document.querySelector("#panel-content").textContent.includes("Đạo hàm riêng")'), 'Option A renders a decision');
  await click('[data-action="open-refresher"]');
  assert(await evaluate('document.querySelector("#refresher-modal").hidden === false'), 'refresher modal opens');
  await click('#complete-refresher');
  assert(await evaluate('document.querySelector("[data-option=\\"A\\"]").classList.contains("is-complete")'), 'Option A completes');

  await click('[data-option="B"]');
  assert(await evaluate('document.querySelector("#task-title").textContent.includes("Gradient Descent")'), 'Option B keeps common context');
  await click('[data-action="start"]');
  assert(await evaluate('document.querySelector("#panel-content").textContent.includes("68% chắc chắn")'), 'Option B exposes uncertainty');
  await click('[data-action="correct-suggestion"]');
  await click('[data-select="direction"]');
  await click('[data-action="save-correction"]');
  assert(await evaluate('document.querySelector("#panel-content").textContent.includes("Hướng của gradient")'), 'Option B accepts a correction');
  await click('[data-action="open-refresher"]');
  await click('#complete-refresher');

  await click('[data-option="C"]');
  await click('[data-action="start"]');
  await click('[data-select="partial"]');
  await evaluate('document.querySelector("input[name=clarification]").click()');
  await delay(60);
  await click('[data-action="map-concept"]');
  assert(await evaluate('document.querySelector("#panel-content").textContent.includes("Chờ bạn xác nhận")'), 'Option C asks the user to confirm');
  await click('[data-action="correct"]');
  assert(await evaluate('document.querySelector("#panel-content").textContent.includes("Chọn phần gần nhất")'), 'Option C can recover to selection');

  await click('#reset-all');
  assert(await evaluate('[...document.querySelectorAll(".option-tab")].every((item) => !item.classList.contains("is-complete"))'), 'global reset clears completion');
  assert(await evaluate('document.querySelector("#panel-title").textContent.includes("Option A")'), 'global reset returns to Option A');

  await cdp.send('Page.navigate', { url: `${appUrl}?facilitator=1` });
  await waitFor('document.readyState === "complete" && document.body.classList.contains("facilitator-mode")', 'facilitator page load');
  assert(await evaluate('getComputedStyle(document.querySelector("#facilitator-notes")).display !== "none"'), 'facilitator notes show only in facilitator mode');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: appUrl });
  await waitFor('document.readyState === "complete"', 'mobile page load');
  assert(await evaluate('document.documentElement.scrollWidth <= 390'), 'mobile layout has no horizontal overflow');
  mobileScreenshot = await screenshot('mobile-initial.png');

  const exceptions = cdp.events.filter((event) => event.method === 'Runtime.exceptionThrown');
  assert(exceptions.length === 0, `runtime exceptions found: ${exceptions.length}`);

  console.log(JSON.stringify({
    result: 'PASS',
    checks: 14,
    desktopScreenshot,
    mobileScreenshot,
    runtimeExceptions: exceptions.length
  }, null, 2));
} finally {
  cdp.close();
  chrome.kill();
}
