const TOTAL_STEPS = 6;
const STORAGE_PREFIX = 'vlearn-day18:';

let currentStep = 1;
let maxVisitedStep = 1;
let saveTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackForms();
  restorePersistentFields();
  updateSynthesisSources();
  bindStageNavigation();
  bindHeaderTools();
  bindFeedbackTabs();
  bindPersistence();
  updateNoteCount();
  updateGateFive();

  const hashStep = Number(window.location.hash.replace('#stage-', ''));
  showStage(hashStep >= 1 && hashStep <= TOTAL_STEPS ? hashStep : 1, false);
});

function feedbackForm(number) {
  return `
    <div class="form-heading">
      <div><span>PROTOTYPE FEEDBACK NOTE ${number}</span><h2>Một tester · Cả A/B/C</h2></div>
      <span class="draft-badge">Lưu tự động</span>
    </div>
    <label>Tester / relevant context<input data-persist="f${number}-context" placeholder="Mã tester và context gần nhất..."></label>
    <div class="field-grid two">
      <label>First action<textarea data-persist="f${number}-first" rows="3" placeholder="Tester đã làm gì đầu tiên?"></textarea></label>
      <label>Chỗ dừng, do dự hoặc hiểu sai<textarea data-persist="f${number}-breakdown" rows="3"></textarea></label>
      <label>Evidence được đọc hay bỏ qua<textarea data-persist="f${number}-evidence-read" rows="3"></textarea></label>
      <label>Cách tester lấy lại control<textarea data-persist="f${number}-control" rows="3"></textarea></label>
    </div>
    <div class="field-grid two">
      <label>Option được chọn<select data-persist="f${number}-option"><option value="">Chưa chọn</option><option value="A">Option A</option><option value="B">Option B</option><option value="C">Option C</option></select></label>
      <label>Lý do và trade-off<input data-persist="f${number}-tradeoff"></label>
    </div>
    <label>Evidence chống lại kỳ vọng của nhóm<textarea data-persist="f${number}-counter" rows="2"></textarea></label>
    <div class="field-grid two">
      <label>OBSERVED<textarea data-persist="f${number}-observed" rows="3" placeholder="Chỉ hành vi hoặc lời nói thực tế..."></textarea></label>
      <label>INTERPRETED<textarea data-persist="f${number}-interpreted" rows="3" placeholder="Nhóm nghĩ điều đó có thể có nghĩa gì..."></textarea></label>
      <label>DECIDED — NEXT CHANGE<textarea data-persist="f${number}-decided" rows="3"></textarea></label>
      <label>STILL UNPROVEN<textarea data-persist="f${number}-unproven" rows="3"></textarea></label>
    </div>`;
}

function renderFeedbackForms() {
  for (let number = 1; number <= 3; number += 1) {
    const panel = document.querySelector(`[data-feedback-panel="${number}"]`);
    if (panel) panel.innerHTML = feedbackForm(number);
  }
}

function bindStageNavigation() {
  document.querySelectorAll('[data-step]').forEach((button) => {
    button.addEventListener('click', () => showStage(Number(button.dataset.step)));
  });
  document.getElementById('previous-step').addEventListener('click', () => showStage(currentStep - 1));
  document.getElementById('next-step').addEventListener('click', () => showStage(currentStep + 1));
  document.getElementById('mobile-stage').addEventListener('change', (event) => showStage(Number(event.target.value)));
  window.addEventListener('hashchange', () => {
    const hashStep = Number(window.location.hash.replace('#stage-', ''));
    if (hashStep >= 1 && hashStep <= TOTAL_STEPS && hashStep !== currentStep) showStage(hashStep, false);
  });
}

function showStage(step, updateHash = true) {
  if (step < 1 || step > TOTAL_STEPS) return;
  currentStep = step;
  maxVisitedStep = Math.max(maxVisitedStep, step);

  document.querySelectorAll('.lab-stage').forEach((stage) => {
    const visible = Number(stage.dataset.stage) === step;
    stage.hidden = !visible;
    stage.classList.toggle('is-visible', visible);
  });
  document.querySelectorAll('.stage-link').forEach((button) => {
    const buttonStep = Number(button.dataset.step);
    button.classList.toggle('is-active', buttonStep === step);
    button.classList.toggle('is-complete', buttonStep < maxVisitedStep);
    if (buttonStep === step) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });

  document.getElementById('progress-label').textContent = `${step} / ${TOTAL_STEPS}`;
  document.getElementById('progress-fill').style.width = `${(step / TOTAL_STEPS) * 100}%`;
  document.getElementById('step-indicator').textContent = `Chặng ${step} / ${TOTAL_STEPS}`;
  document.getElementById('mobile-stage').value = String(step);
  document.getElementById('previous-step').disabled = step === 1;
  document.getElementById('next-step').disabled = step === TOTAL_STEPS;
  if (updateHash) history.pushState(null, '', `#stage-${step}`);
  document.getElementById('lab-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bindHeaderTools() {
  const focusButton = document.getElementById('focus-toggle');
  const notesDrawer = document.getElementById('notes-drawer');
  const supportDialog = document.getElementById('support-dialog');

  focusButton.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('focus-mode');
    focusButton.setAttribute('aria-pressed', String(enabled));
  });
  document.getElementById('notes-toggle').addEventListener('click', () => {
    notesDrawer.hidden = false;
    document.getElementById('personal-notes').focus();
  });
  document.getElementById('notes-close').addEventListener('click', () => { notesDrawer.hidden = true; });
  document.getElementById('support-open').addEventListener('click', () => supportDialog.showModal());
  document.getElementById('support-close').addEventListener('click', () => supportDialog.close());
  supportDialog.addEventListener('click', (event) => {
    if (event.target === supportDialog) supportDialog.close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !notesDrawer.hidden) notesDrawer.hidden = true;
  });
}

function bindFeedbackTabs() {
  document.querySelectorAll('[data-feedback-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.feedbackTab;
      document.querySelectorAll('[data-feedback-tab]').forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-feedback-panel]').forEach((panel) => {
        const visible = panel.dataset.feedbackPanel === target;
        panel.hidden = !visible;
        panel.classList.toggle('is-visible', visible);
      });
    });
  });
}

function bindPersistence() {
  document.querySelectorAll('[data-persist]').forEach((field) => {
    field.addEventListener('input', () => persistField(field));
    field.addEventListener('change', () => persistField(field));
  });
}

function persistField(field) {
  localStorage.setItem(`${STORAGE_PREFIX}${field.dataset.persist}`, field.value);
  if (field.id === 'personal-notes') updateNoteCount();
  updateSynthesisSources();
  updateGateFive();
  showSaveStatus();
}

function restorePersistentFields() {
  document.querySelectorAll('[data-persist]').forEach((field) => {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${field.dataset.persist}`);
    if (stored !== null) field.value = stored;
  });
  const notes = document.getElementById('personal-notes');
  const savedNotes = localStorage.getItem(`${STORAGE_PREFIX}personal-notes`);
  if (savedNotes !== null) notes.value = savedNotes;
}

function updateNoteCount() {
  const value = document.getElementById('personal-notes').value.trim();
  const count = value ? value.split(/\n+/).filter((line) => line.trim()).length : 0;
  document.getElementById('note-count').textContent = String(count);
}

function updateGateFive() {
  const requiredFeedbackFields = ['context', 'first', 'breakdown', 'evidence-read', 'control', 'option', 'tradeoff', 'counter', 'observed', 'interpreted', 'decided', 'unproven'];
  const feedbackComplete = [1, 2, 3].every((number) => requiredFeedbackFields.every((key) => fieldHasValue(`f${number}-${key}`)));
  const synthesisComplete = ['synthesis-pattern', 'synthesis-change', 'synthesis-evidence', 'synthesis-unproven'].every(fieldHasValue);
  const gate = document.getElementById('gate-5-status');
  if (!gate) return;

  const complete = feedbackComplete && synthesisComplete;
  gate.classList.toggle('gate-pending', !complete);
  gate.classList.toggle('gate-pass', complete);
  gate.querySelector(':scope > span').textContent = complete ? '✓' : '!';
  gate.querySelector('strong').textContent = complete ? 'GATE 5 — Đủ dữ liệu để synthesis' : 'GATE 5 — Learning, not praise';
  gate.querySelector('p').textContent = complete
    ? 'Có ba Feedback Notes, pattern/khác biệt, Next Change, evidence và Still Unproven.'
    : 'Cần đủ ba Feedback Notes, một pattern/khác biệt, một Next Change và một Still Unproven. “Ba tester thích B” chưa đủ.';
}

function updateSynthesisSources() {
  document.querySelectorAll('[data-synthesis-source]').forEach((target) => {
    const source = document.querySelector(`[data-persist="${target.dataset.synthesisSource}"]`);
    target.textContent = source && source.value.trim() ? source.value.trim() : '—';
  });
}

function fieldHasValue(key) {
  const field = document.querySelector(`[data-persist="${key}"]`);
  return Boolean(field && field.value.trim());
}

function showSaveStatus() {
  const status = document.getElementById('save-status');
  clearTimeout(saveTimer);
  status.hidden = false;
  saveTimer = setTimeout(() => { status.hidden = true; }, 1200);
}
