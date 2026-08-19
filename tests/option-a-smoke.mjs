import { readFileSync } from 'node:fs';

const html = readFileSync('option-a/index.html', 'utf8');
const css = readFileSync('option-a/style.css', 'utf8');
const script = readFileSync('option-a/app.js', 'utf8');

let checks = 0;
const assert = (condition, message) => {
  checks += 1;
  if (!condition) throw new Error(`Assertion failed: ${message}`);
};

const htmlIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
const scriptIds = new Set([...script.matchAll(/getElementById\('([^']+)'\)/g)].map((match) => match[1]));

assert(
  html.includes('href="../base-interface/style.css"') &&
  html.includes('href="style.css"') &&
  html.includes('src="app.js"'),
  'Option A extends base-interface and keeps dedicated local files'
);
assert(
  ['class="header"', 'class="sidebar"', 'class="viewer"', 'id="slideFrame"'].every((token) => html.includes(token)),
  'base-interface layout contract is preserved'
);
assert(
  html.includes('AI không quan sát cách bạn đọc') &&
  script.includes('behaviorSignals=none') &&
  !script.includes('setInterval('),
  'Option A does not infer from passive reading behavior'
);
assert(
  script.includes("step: 'question'") &&
  script.includes("state.assist.step = 'result'") &&
  script.includes("state.assist.step = 'refresher'"),
  'question, approval, and refresher states are wired'
);
assert(
  script.includes('Bạn tự báo cáo') &&
  script.includes('Chờ bạn xác nhận') &&
  script.includes('Chọn lại câu trả lời') &&
  script.includes('Không đúng, bỏ qua'),
  'evidence and recovery controls are explicit'
);
assert(
  script.includes('../resource/2.Funding.pdf') &&
  script.includes('../resource/3.BusinessPlan.pdf') &&
  script.includes('const DEMO_PAGE = 12'),
  'Option A uses the same finance resources and demo context as B/C'
);
assert(
  script.includes("return mapped ? [mapped, ...ids.filter((id) => id !== mapped)].slice(0, 3) : ids.slice(0, 3)") &&
  html.includes('Checkpoint · 1 câu'),
  'checkpoint presents one question with three scoped answers'
);
assert([...scriptIds].every((id) => htmlIds.has(id)), 'all JavaScript element IDs exist in HTML');
assert(css.includes('.assist') && css.includes('@media (max-width: 900px)'), 'assist panel has responsive behavior');
assert(
  css.includes('.evidence-trail') &&
  css.includes('.lesson-points') &&
  script.includes("result: 'Chờ bạn duyệt'"),
  'creative evidence trail, lesson points, and dynamic status are wired'
);
assert(!html.includes('68%') && !script.includes('dwellMs:'), 'Option B observer mechanism is excluded');

new Function(script);
assert(true, 'Option A JavaScript parses');

console.log(JSON.stringify({
  result: 'PASS',
  checks,
  artifact: 'option-a/index.html'
}, null, 2));
