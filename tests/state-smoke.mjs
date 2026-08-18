import { readFileSync } from 'node:fs';
import vm from 'node:vm';

class ClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  contains(name) { return this.values.has(name); }
  toggle(name, force) {
    const shouldAdd = force === undefined ? !this.values.has(name) : force;
    if (shouldAdd) this.values.add(name);
    else this.values.delete(name);
    return shouldAdd;
  }
}

class ElementStub {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.classList = new ClassList();
    this.attributes = new Map();
    this.hidden = true;
    this.innerHTML = '';
    this.textContent = '';
  }
  addEventListener() {}
  querySelectorAll() { return []; }
  querySelector() { return null; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  focus() {}
  scrollIntoView() {}
}

const elements = new Map();
const getElement = (id) => {
  if (!elements.has(id)) elements.set(id, new ElementStub());
  return elements.get(id);
};
const optionTabs = ['A', 'B', 'C'].map((option) => new ElementStub({ option }));
const stageItems = [0, 1, 2].map((stage) => new ElementStub({ stage: String(stage) }));
const dots = ['A', 'B', 'C'].map((option) => new ElementStub({ dot: option }));

const documentStub = {
  body: new ElementStub(),
  activeElement: new ElementStub(),
  addEventListener() {},
  getElementById: getElement,
  querySelectorAll(selector) {
    if (selector === '.option-tab') return optionTabs;
    if (selector === '.stage-track li') return stageItems;
    if (selector === '[data-dot]') return dots;
    return [];
  }
};

const context = vm.createContext({
  console,
  document: documentStub,
  window: { location: { search: '' } },
  URLSearchParams,
  setTimeout: () => 1,
  clearTimeout: () => {},
  Event
});

vm.runInContext(readFileSync('app.js', 'utf8'), context, { filename: 'app.js' });

const run = (expression) => vm.runInContext(expression, context);
const assert = (condition, message) => {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
};

run('render()');
assert(getElement('panel-title').textContent.includes('Option A'), 'initial render is Option A');

run("handleAction('start')");
run("handleSelection('partial')");
run("handleAction('diagnose')");
assert(run('state.A.stage === 2 && state.A.concept === "partial"'), 'Option A reaches a decision');
run("handleAction('open-refresher')");
run('completeRefresher()');
assert(run('state.A.completed && state.A.terminal === "completed"'), 'Option A persists completion');

run("switchOption('B')");
run("handleAction('start')");
assert(getElement('panel-content').innerHTML.includes('68% chắc chắn'), 'Option B exposes uncertainty');
run("handleAction('correct-suggestion')");
run("handleSelection('direction')");
run("handleAction('save-correction')");
assert(run('state.B.concept === "direction" && state.B.corrected === false'), 'Option B accepts correction');
run("handleAction('open-refresher')");
run('completeRefresher()');

run("switchOption('C')");
run("handleAction('start')");
run("handleSelection('partial')");
run("state.C.clarification = 'Tôi chưa hiểu ký hiệu này'; render()");
run("handleAction('map-concept')");
assert(run('state.C.stage === 2 && state.C.concept === "partial"'), 'Option C reaches confirmation');
run("handleAction('correct')");
assert(run('state.C.stage === 1 && state.C.selection === null'), 'Option C recovers to user selection');

run("switchOption('A')");
assert(getElement('panel-content').innerHTML.includes('Đã hoàn thành bài ôn'), 'completion survives option switching');
run('resetAll()');
assert(run('activeOption === "A" && Object.values(state).every((item) => !item.completed && item.stage === 0)'), 'global reset restores common context');

run("switchOption('B')");
run("handleAction('toggle-observation')");
run("handleAction('start')");
assert(run('state.B.stage === 1 && state.B.observing === false'), 'Option B allows observation to be disabled');
assert(getElement('panel-content').innerHTML.includes('Quan sát đã tắt'), 'Option B explains the no-observation state');
run("handleAction('enable-observation')");
run("handleAction('dismiss-suggestion')");
assert(run('state.B.dismissed && state.B.completed'), 'dismissing the proactive suggestion is a valid decision');
run("handleAction('restore-suggestion')");
assert(run('!state.B.dismissed && !state.B.completed && state.B.stage === 1'), 'restoring the suggestion reopens the decision');

console.log(JSON.stringify({ result: 'PASS', checks: 14, runtime: 'DOM state harness' }, null, 2));
