import { readFileSync } from 'node:fs';

const workbook = readFileSync('index.html', 'utf8');
const workbookScript = readFileSync('codelab.js', 'utf8');
const workbookStyle = readFileSync('codelab.css', 'utf8');
const prototype = readFileSync('prototype.html', 'utf8');
const prototypeScript = readFileSync('app.js', 'utf8');

let checks = 0;
const assert = (condition, message) => {
  checks += 1;
  if (!condition) throw new Error(`Assertion failed: ${message}`);
};

const idsIn = (html) => new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
const literalIdsInScript = (script) => new Set([
  ...[...script.matchAll(/getElementById\('([^']+)'\)/g)].map((match) => match[1]),
  ...[...script.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1])
]);

const workbookIds = idsIn(workbook);
const prototypeIds = idsIn(prototype);
const workbookStages = [...workbook.matchAll(/class="lab-stage[^"]*" data-stage="([1-6])"/g)].map((match) => match[1]);

assert(workbookStages.join(',') === '1,2,3,4,5,6', 'workbook contains exactly six ordered stages');
assert(['Tập trung', 'Ghi chú', 'Hỗ trợ', 'Tiếng Việt', 'Quay lại', 'Tiếp'].every((label) => workbook.includes(label)), 'VLearn shell controls are present');
assert(['GATE 1', 'GATE 2', 'GATE 3', 'GATE 4', 'GATE 5'].every((gate) => workbook.includes(gate)), 'all five gates are represented');
assert(workbook.includes('prototype.html') && workbook.includes('prototype.html?facilitator=1'), 'tester and facilitator routes are linked');
assert((workbook.match(/data-feedback-panel=/g) || []).length === 4, 'three feedback notes and synthesis panel exist');
assert(!workbook.includes('__FEEDBACK_FORM_'), 'no unresolved template placeholders remain');
assert([...literalIdsInScript(workbookScript)].every((id) => workbookIds.has(id)), 'all workbook script IDs exist in index.html');
const optionalPrototypeIds = new Set(['previous-slide', 'next-slide', 'continue-lesson']);
assert([...literalIdsInScript(prototypeScript)].every((id) => prototypeIds.has(id) || optionalPrototypeIds.has(id)), 'all required prototype script IDs exist in prototype.html');
assert(workbookStyle.includes('repeat(3, minmax(0, 1fr))') || workbookStyle.includes('@media (max-width: 560px)'), 'workbook includes mobile layout rules');
assert(prototype.includes('id="panel-content"') && prototype.includes('data-option="A"') && prototype.includes('data-option="B"') && prototype.includes('data-option="C"'), 'tester prototype retains A/B/C interaction surface');
assert(workbookScript.includes('localStorage') && workbookScript.includes('updateGateFive'), 'notes, feedback persistence and Gate 5 evaluation are wired');

console.log(JSON.stringify({ result: 'PASS', checks, pages: ['index.html', 'prototype.html'] }, null, 2));
