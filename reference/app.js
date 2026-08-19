const optionDefinitions = {
  A: {
    title: 'AI hỏi trước',
    mode: 'ASK',
    intro: 'AI dùng một checkpoint ngắn để xác nhận chỗ hổng trước khi đề xuất bài ôn.',
    limit: 'Chỉ đối chiếu với nội dung có trong chương này; không tự kết luận từ hành vi đọc.',
    expect: 'Đọc giới hạn, bắt đầu checkpoint, chọn một cách hiểu và cân nhắc bài ôn được đề xuất.',
    watch: 'Tester có xem bằng chứng từ câu trả lời của chính họ và có dùng “Chọn lại” khi gợi ý chưa đúng không.',
    dont: 'Không nói lựa chọn nào sẽ dẫn tới khái niệm nào và không chỉ tester mở bài ôn.'
  },
  B: {
    title: 'AI chủ động gợi ý',
    mode: 'SUGGEST',
    intro: 'AI dùng tín hiệu đọc trong phiên để chủ động đưa ra một giả thuyết; bạn có thể bỏ qua hoặc tắt quan sát.',
    limit: 'Tín hiệu hành vi chỉ là phỏng đoán. AI không ghi âm, không đọc dữ liệu ngoài màn hình học.',
    expect: 'Tiếp tục phiên học, xem gợi ý tự xuất hiện và quyết định mở, sửa hoặc ẩn gợi ý.',
    watch: 'Tester có đọc tín hiệu và mức chắc chắn trước khi hành động; họ phản ứng thế nào với quyền tắt quan sát.',
    dont: 'Không giải thích vì sao 68% là chưa chắc và không nhắc tester bấm “Không đúng”.'
  },
  C: {
    title: 'Bạn dẫn dắt',
    mode: 'CO-CREATE',
    intro: 'Bạn khoanh vùng phần khó hiểu. AI hỏi thêm một câu rồi mới ánh xạ sang kiến thức nền.',
    limit: 'AI chỉ làm rõ trong concept map của khóa học và cần bạn xác nhận trước khi mở bài ôn.',
    expect: 'Chọn trực tiếp một phần công thức, trả lời câu làm rõ và xác nhận hoặc sửa kết luận.',
    watch: 'Tester bắt đầu từ phần nào, có hiểu các vùng chọn và có quay lại sửa phạm vi khi kết luận chưa đúng không.',
    dont: 'Không chỉ phần ký hiệu đạo hàm riêng và không diễn giải câu hỏi làm rõ hộ tester.'
  }
};

const refresherLibrary = {
  partial: {
    title: 'Đạo hàm riêng',
    reason: 'Ký hiệu ∂J / ∂θⱼ',
    summary: 'Với hàm có nhiều biến, đạo hàm riêng đo mức thay đổi theo một biến trong khi giữ các biến còn lại cố định.',
    example: 'Nếu f(x, y) = x² + y³ thì ∂f / ∂x = 2x, vì y được giữ cố định.',
    check: 'Trong ∂J / ∂θⱼ, đại lượng nào đang được thay đổi?',
    answer: 'Chỉ tham số θⱼ; các tham số còn lại được giữ cố định.'
  },
  rate: {
    title: 'Learning rate',
    reason: 'Hệ số α trong quy tắc cập nhật',
    summary: 'Learning rate quyết định kích thước mỗi bước cập nhật, không quyết định hướng của bước đi.',
    example: 'α quá lớn có thể vượt qua điểm thấp nhất; α quá nhỏ làm quá trình học rất chậm.',
    check: 'Nếu thuật toán dao động quanh điểm thấp nhất, nên kiểm tra gì trước?',
    answer: 'Kiểm tra và thường là giảm learning rate α.'
  },
  direction: {
    title: 'Hướng của gradient',
    reason: 'Dấu trừ trong quy tắc cập nhật',
    summary: 'Gradient chỉ hướng tăng nhanh nhất của hàm mất mát. Dấu trừ khiến tham số đi theo hướng giảm.',
    example: 'Nếu độ dốc dương, trừ một giá trị dương sẽ làm θ nhỏ đi và dịch xuống phía thấp hơn.',
    check: 'Vì sao công thức dùng dấu trừ?',
    answer: 'Để đi ngược gradient, về phía làm hàm mất mát giảm.'
  },
  loss: {
    title: 'Hàm mất mát J(θ)',
    reason: 'Đại lượng J(θ) trong công thức',
    summary: 'Hàm mất mát đo mức sai khác giữa dự đoán và giá trị thật. Gradient Descent tìm tham số làm J nhỏ hơn.',
    example: 'Với MSE, dự đoán càng xa giá trị thật thì J càng lớn.',
    check: 'Mục tiêu của Gradient Descent đối với J là gì?',
    answer: 'Tìm bộ tham số làm J đạt giá trị thấp nhất có thể.'
  }
};

const createInitialState = () => ({
  A: { stage: 0, selection: null, concept: 'partial', completed: false, terminal: null },
  B: { stage: 0, concept: 'partial', completed: false, terminal: null, observing: true, dismissed: false, corrected: false },
  C: { stage: 0, selection: null, clarification: null, concept: 'partial', completed: false, terminal: null }
});

let activeOption = 'A';
let state = createInitialState();
let currentSlide = 4;
let activeRefresher = null;
let lastFocusedElement = null;
let toastTimer = null;

const panelContent = document.getElementById('panel-content');
const panelTitle = document.getElementById('panel-title');
const modal = document.getElementById('refresher-modal');
const toast = document.getElementById('toast');

document.addEventListener('DOMContentLoaded', () => {
  const facilitatorMode = new URLSearchParams(window.location.search).get('facilitator') === '1';
  document.body.classList.toggle('facilitator-mode', facilitatorMode);

  document.querySelectorAll('.option-tab').forEach((button) => {
    button.addEventListener('click', () => switchOption(button.dataset.option));
  });
  document.getElementById('reset-all').addEventListener('click', resetAll);
  document.getElementById('reset-option').addEventListener('click', resetActiveOption);
  document.getElementById('previous-slide')?.addEventListener('click', () => navigateSlide(-1));
  document.getElementById('next-slide')?.addEventListener('click', () => navigateSlide(1));
  document.getElementById('continue-lesson')?.addEventListener('click', () => navigateSlide(1));
  document.getElementById('close-modal').addEventListener('click', closeRefresher);
  document.getElementById('back-to-decision').addEventListener('click', closeRefresher);
  document.getElementById('complete-refresher').addEventListener('click', completeRefresher);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeRefresher();
  });
  document.addEventListener('keydown', handleGlobalKeydown);
  render();
});

function switchOption(option) {
  if (!optionDefinitions[option]) return;
  activeOption = option;
  currentSlide = 4;
  document.getElementById('slide-count').textContent = 'Slide 04 / 12';
  render();
  document.getElementById('prototype').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function render() {
  const definition = optionDefinitions[activeOption];
  const optionState = state[activeOption];

  panelTitle.textContent = `Option ${activeOption} · ${definition.title}`;
  updateTabs();
  updateStageTrack(optionState.stage);
  updateStudyProgress();
  updateFacilitatorNotes();

  if (activeOption === 'A') renderOptionA(optionState, definition);
  if (activeOption === 'B') renderOptionB(optionState, definition);
  if (activeOption === 'C') renderOptionC(optionState, definition);
  bindPanelActions();
}

function renderIntro(option, optionState, definition) {
  const actionLabels = { A: 'Bắt đầu checkpoint', B: 'Tiếp tục phiên học', C: 'Chọn phần chưa hiểu' };
  const roleDescriptions = {
    A: 'AI sẽ hỏi trước khi đưa ra đề xuất.',
    B: 'AI có thể đưa ra gợi ý nhưng không tự mở bài ôn.',
    C: 'AI chỉ phân tích phần bạn chủ động chọn.'
  };

  panelContent.innerHTML = `
    <div class="panel-state intro-state">
      <span class="mode-badge">${definition.mode}</span>
      <h3>${definition.intro}</h3>
      <p class="role-line">${roleDescriptions[option]}</p>
      <div class="limit-box">
        <span aria-hidden="true">i</span>
        <div><strong>Khả năng & giới hạn</strong><p>${definition.limit}</p></div>
      </div>
      ${option === 'B' ? renderObservationControl(optionState.observing) : ''}
      <div class="panel-actions push-bottom">
        <button class="primary-button" type="button" data-action="start">${actionLabels[option]} <span aria-hidden="true">→</span></button>
        <button class="quiet-button" type="button" data-action="skip">Bỏ qua hỗ trợ</button>
      </div>
    </div>`;
}

function renderOptionA(optionState, definition) {
  if (optionState.terminal) {
    renderTerminalState(optionState);
    return;
  }
  if (optionState.stage === 0) {
    renderIntro('A', optionState, definition);
    return;
  }
  if (optionState.stage === 1) {
    panelContent.innerHTML = `
      <div class="panel-state">
        <span class="mode-badge">CHECKPOINT · 1 CÂU</span>
        <h3>Phần nào gần nhất với điều bạn đang chưa rõ?</h3>
        <p class="muted-copy">AI sẽ dùng câu trả lời này làm bằng chứng trực tiếp, thay vì đoán từ hành vi.</p>
        <div class="choice-list" role="group" aria-label="Chọn điều chưa rõ">
          ${choiceButton('partial', 'Ký hiệu ∂ / ∂θⱼ có ý nghĩa gì?', 'Tôi chưa hiểu vì sao chỉ xét một tham số.', optionState.selection)}
          ${choiceButton('rate', 'Hệ số α làm gì?', 'Tôi chưa rõ α thay đổi bước cập nhật ra sao.', optionState.selection)}
          ${choiceButton('direction', 'Vì sao công thức có dấu trừ?', 'Tôi chưa nối được độ dốc với hướng cập nhật.', optionState.selection)}
        </div>
        <div class="panel-actions push-bottom">
          <button class="primary-button" type="button" data-action="diagnose" ${optionState.selection ? '' : 'disabled'}>Xem chẩn đoán</button>
          <button class="secondary-button" type="button" data-action="back">Quay lại</button>
        </div>
      </div>`;
    return;
  }
  panelContent.innerHTML = renderDecision({
    mode: 'KẾT QUẢ CHECKPOINT',
    title: refresherLibrary[optionState.concept].title,
    confidence: 'Mức chắc chắn cao',
    confidenceClass: 'high',
    evidence: `Dựa trên lựa chọn của bạn: “${selectionLabelA(optionState.selection)}”.`,
    explanation: `AI đối chiếu câu trả lời với concept map của Chương 3 và đề xuất ôn “${refresherLibrary[optionState.concept].title}”.`,
    correctionLabel: 'Chọn lại câu trả lời'
  });
}

function renderOptionB(optionState, definition) {
  if (optionState.terminal) {
    renderTerminalState(optionState);
    return;
  }
  if (optionState.stage === 0) {
    renderIntro('B', optionState, definition);
    return;
  }
  if (optionState.stage === 1) {
    if (!optionState.observing) {
      panelContent.innerHTML = `
        <div class="panel-state empty-state">
          <span class="state-symbol" aria-hidden="true">○</span>
          <h3>Quan sát đã tắt</h3>
          <p>AI không dùng tín hiệu đọc và sẽ không chủ động đưa gợi ý trong phiên này.</p>
          <div class="panel-actions push-bottom">
            <button class="primary-button" type="button" data-action="enable-observation">Bật lại quan sát</button>
            <button class="secondary-button" type="button" data-action="continue-without">Tiếp tục không có AI</button>
          </div>
        </div>`;
      return;
    }
    panelContent.innerHTML = `
      <div class="panel-state">
        <div class="suggestion-heading">
          <span class="mode-badge amber">GỢI Ý CHỦ ĐỘNG</span>
          <span class="confidence-pill medium"><i></i> 68% chắc chắn</span>
        </div>
        <h3>Có thể bạn đang vướng ở đạo hàm riêng</h3>
        <p class="muted-copy">AI chưa mở hoặc thay đổi nội dung bài học.</p>
        <div class="evidence-card">
          <strong>Vì sao có gợi ý này?</strong>
          <ul><li>Dừng 52 giây tại công thức cập nhật.</li><li>Quay lại phần ký hiệu <b>∂ / ∂θⱼ</b> ba lần.</li></ul>
          <small>Dữ liệu mẫu chỉ trong phiên học này.</small>
        </div>
        ${renderObservationControl(optionState.observing)}
        <div class="panel-actions stacked push-bottom">
          <button class="primary-button" type="button" data-action="accept-suggestion">Xem đề xuất bài ôn</button>
          <div class="split-actions">
            <button class="secondary-button" type="button" data-action="correct-suggestion">Không đúng</button>
            <button class="quiet-button" type="button" data-action="dismiss-suggestion">Ẩn gợi ý</button>
          </div>
        </div>
      </div>`;
    return;
  }
  if (optionState.dismissed) {
    panelContent.innerHTML = `
      <div class="panel-state empty-state">
        <span class="state-symbol" aria-hidden="true">✓</span>
        <h3>Gợi ý đã được ẩn</h3>
        <p>Bạn vẫn ở đúng slide đang học. Việc ẩn chỉ áp dụng cho gợi ý này.</p>
        <div class="recovery-note"><strong>Quyền kiểm soát:</strong> Bạn có thể khôi phục gợi ý hoặc tiếp tục không có AI.</div>
        <div class="panel-actions push-bottom">
          <button class="secondary-button" type="button" data-action="restore-suggestion">Khôi phục gợi ý</button>
          <button class="primary-button" type="button" data-action="continue-without">Tiếp tục bài học</button>
        </div>
      </div>`;
    return;
  }
  if (optionState.corrected) {
    panelContent.innerHTML = `
      <div class="panel-state">
        <span class="mode-badge">SỬA GỢI Ý</span>
        <h3>Bạn thực sự đang vướng ở đâu?</h3>
        <p class="muted-copy">Phản hồi này chỉ sửa đề xuất trong phiên hiện tại.</p>
        <div class="choice-list compact" role="group" aria-label="Sửa khái niệm được gợi ý">
          ${choiceButton('rate', 'Learning rate α', 'Kích thước mỗi bước cập nhật.', optionState.concept)}
          ${choiceButton('direction', 'Hướng của gradient', 'Ý nghĩa dấu trừ trong công thức.', optionState.concept)}
          ${choiceButton('loss', 'Hàm mất mát J(θ)', 'Đại lượng thuật toán đang tối ưu.', optionState.concept)}
        </div>
        <div class="panel-actions push-bottom">
          <button class="primary-button" type="button" data-action="save-correction">Dùng lựa chọn này</button>
          <button class="secondary-button" type="button" data-action="restore-suggestion">Hủy</button>
        </div>
      </div>`;
    return;
  }
  panelContent.innerHTML = renderDecision({
    mode: 'ĐỀ XUẤT ĐỂ BẠN DUYỆT',
    title: refresherLibrary[optionState.concept].title,
    confidence: optionState.concept === 'partial' ? '68% chắc chắn' : 'Đã sửa theo bạn',
    confidenceClass: optionState.concept === 'partial' ? 'medium' : 'high',
    evidence: optionState.concept === 'partial'
      ? 'Dựa trên 52 giây dừng đọc và 3 lần quay lại ký hiệu ∂ / ∂θⱼ.'
      : `Dựa trên phản hồi trực tiếp của bạn: “${refresherLibrary[optionState.concept].title}”.`,
    explanation: 'Đây là gợi ý, không phải kết luận. Bài ôn chỉ mở khi bạn đồng ý.',
    correctionLabel: 'Gợi ý chưa đúng'
  });
}

function renderOptionC(optionState, definition) {
  if (optionState.terminal) {
    renderTerminalState(optionState);
    return;
  }
  if (optionState.stage === 0) {
    renderIntro('C', optionState, definition);
    return;
  }
  if (optionState.stage === 1) {
    panelContent.innerHTML = `
      <div class="panel-state">
        <span class="mode-badge green">BẠN CHỌN PHẠM VI</span>
        <h3>Chọn phần gần nhất với chỗ bạn bị mắc</h3>
        <p class="muted-copy">AI sẽ không phân tích phần còn lại của slide.</p>
        <div class="formula-picker" role="group" aria-label="Chọn một phần của công thức">
          <button type="button" data-select="direction" class="formula-pick ${optionState.selection === 'direction' ? 'is-selected' : ''}"><span>−</span><small>hướng cập nhật</small></button>
          <button type="button" data-select="rate" class="formula-pick ${optionState.selection === 'rate' ? 'is-selected' : ''}"><span>α</span><small>learning rate</small></button>
          <button type="button" data-select="partial" class="formula-pick ${optionState.selection === 'partial' ? 'is-selected' : ''}"><span>∂J / ∂θⱼ</span><small>đạo hàm riêng</small></button>
          <button type="button" data-select="loss" class="formula-pick ${optionState.selection === 'loss' ? 'is-selected' : ''}"><span>J(θ)</span><small>hàm mất mát</small></button>
        </div>
        ${optionState.selection ? renderClarification(optionState) : ''}
        <div class="panel-actions push-bottom">
          <button class="primary-button" type="button" data-action="map-concept" ${optionState.selection && optionState.clarification ? '' : 'disabled'}>Đối chiếu kiến thức nền</button>
          <button class="secondary-button" type="button" data-action="back">Quay lại</button>
        </div>
      </div>`;
    return;
  }
  panelContent.innerHTML = renderDecision({
    mode: 'AI TÓM TẮT · BẠN XÁC NHẬN',
    title: refresherLibrary[optionState.concept].title,
    confidence: 'Chờ bạn xác nhận',
    confidenceClass: 'medium',
    evidence: `Bạn chọn “${refresherLibrary[optionState.concept].reason}” và trả lời “${optionState.clarification}”.`,
    explanation: `Concept map nối phần bạn chọn với bài ôn “${refresherLibrary[optionState.concept].title}”. AI chưa tự mở nội dung.`,
    correctionLabel: 'Sửa phần đã chọn'
  });
}

function renderClarification(optionState) {
  const questions = {
    partial: ['Tôi chưa hiểu ký hiệu này', 'Tôi chưa hiểu “giữ biến khác cố định”'],
    rate: ['Tôi chưa biết α lớn/nhỏ ảnh hưởng gì', 'Tôi nhầm α quyết định hướng đi'],
    direction: ['Tôi chưa hiểu vì sao phải đi ngược độ dốc', 'Tôi chưa hiểu dấu của đạo hàm'],
    loss: ['Tôi chưa biết J đo điều gì', 'Tôi chưa biết vì sao cần làm J nhỏ đi']
  };
  return `
    <fieldset class="clarifier">
      <legend>Điều nào mô tả đúng hơn?</legend>
      ${questions[optionState.selection].map((label) => `
        <label><input type="radio" name="clarification" value="${label}" ${optionState.clarification === label ? 'checked' : ''}><span>${label}</span></label>
      `).join('')}
    </fieldset>`;
}

function renderDecision({ mode, title, confidence, confidenceClass, evidence, explanation, correctionLabel }) {
  return `
    <div class="panel-state decision-state">
      <span class="mode-badge green">${mode}</span>
      <div class="recommendation-icon" aria-hidden="true">∂</div>
      <p class="eyebrow">Kiến thức nền đề xuất</p>
      <h3>${title}</h3>
      <span class="confidence-pill ${confidenceClass}"><i></i> ${confidence}</span>
      <div class="evidence-card decision-evidence">
        <strong>Bằng chứng</strong><p>${evidence}</p><small>${explanation}</small>
      </div>
      <div class="preview-card"><span>2 phút · 1 ví dụ · 1 câu tự kiểm</span><strong>${title}</strong></div>
      <div class="panel-actions stacked push-bottom">
        <button class="primary-button" type="button" data-action="open-refresher">Xem trước bài ôn</button>
        <div class="split-actions">
          <button class="secondary-button" type="button" data-action="correct">${correctionLabel}</button>
          <button class="quiet-button" type="button" data-action="skip-result">Bỏ qua</button>
        </div>
      </div>
    </div>`;
}

function choiceButton(value, title, description, selected) {
  return `
    <button type="button" class="choice-card ${selected === value ? 'is-selected' : ''}" data-select="${value}" aria-pressed="${selected === value}">
      <span class="choice-radio" aria-hidden="true"></span>
      <span><strong>${title}</strong><small>${description}</small></span>
    </button>`;
}

function renderObservationControl(observing) {
  return `
    <div class="observation-control">
      <div><strong>Quan sát tín hiệu đọc</strong><small>Chỉ trong phiên này</small></div>
      <button class="toggle ${observing ? 'is-on' : ''}" type="button" role="switch" aria-checked="${observing}" data-action="toggle-observation"><span></span></button>
    </div>`;
}

function bindPanelActions() {
  panelContent.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => handleAction(button.dataset.action));
  });
  panelContent.querySelectorAll('[data-select]').forEach((button) => {
    button.addEventListener('click', () => handleSelection(button.dataset.select));
  });
  panelContent.querySelectorAll('input[name="clarification"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.C.clarification = input.value;
      render();
    });
  });
}

function handleAction(action) {
  const optionState = state[activeOption];
  if (action === 'start') {
    optionState.stage = 1;
    render();
    return;
  }
  if (action === 'back') {
    optionState.stage = 0;
    render();
    return;
  }
  if (action === 'skip') {
    optionState.stage = 2;
    optionState.completed = true;
    optionState.terminal = 'skipped';
    render();
    showToast(`Option ${activeOption}: đã bỏ qua hỗ trợ và tiếp tục bài học.`);
    return;
  }
  if (action === 'diagnose') {
    optionState.concept = optionState.selection;
    optionState.stage = 2;
    render();
    return;
  }
  if (action === 'accept-suggestion') {
    optionState.stage = 2;
    optionState.dismissed = false;
    optionState.corrected = false;
    render();
    return;
  }
  if (action === 'correct-suggestion' || (action === 'correct' && activeOption === 'B')) {
    optionState.stage = 2;
    optionState.corrected = true;
    optionState.dismissed = false;
    if (optionState.concept === 'partial') optionState.concept = 'rate';
    render();
    return;
  }
  if (action === 'dismiss-suggestion') {
    optionState.stage = 2;
    optionState.dismissed = true;
    optionState.completed = true;
    render();
    return;
  }
  if (action === 'restore-suggestion') {
    optionState.stage = 1;
    optionState.dismissed = false;
    optionState.corrected = false;
    optionState.completed = false;
    optionState.concept = 'partial';
    render();
    return;
  }
  if (action === 'save-correction') {
    optionState.corrected = false;
    optionState.stage = 2;
    render();
    return;
  }
  if (action === 'toggle-observation') {
    optionState.observing = !optionState.observing;
    render();
    showToast(optionState.observing ? 'Đã bật quan sát cho phiên này.' : 'Đã tắt quan sát. AI sẽ không dùng tín hiệu đọc.');
    return;
  }
  if (action === 'enable-observation') {
    optionState.observing = true;
    render();
    return;
  }
  if (action === 'continue-without') {
    optionState.completed = true;
    optionState.stage = 2;
    optionState.terminal = 'without-ai';
    render();
    return;
  }
  if (action === 'map-concept') {
    optionState.concept = optionState.selection;
    optionState.stage = 2;
    render();
    return;
  }
  if (action === 'correct') {
    optionState.stage = 1;
    if (activeOption === 'A') optionState.selection = null;
    if (activeOption === 'C') {
      optionState.selection = null;
      optionState.clarification = null;
    }
    render();
    return;
  }
  if (action === 'open-refresher') {
    openRefresher(optionState.concept);
    return;
  }
  if (action === 'skip-result') {
    optionState.completed = true;
    optionState.terminal = 'skipped-result';
    render();
    return;
  }
  if (action === 'restart-active') {
    resetActiveOption();
    return;
  }
  if (action === 'next-option') {
    switchOption(activeOption === 'A' ? 'B' : activeOption === 'B' ? 'C' : 'A');
  }
}

function handleSelection(value) {
  const optionState = state[activeOption];
  if (activeOption === 'C' && optionState.selection !== value) optionState.clarification = null;
  optionState.selection = value;
  if (activeOption === 'B') optionState.concept = value;
  render();
}

function renderTerminalState(optionState) {
  const isCompleted = optionState.terminal === 'completed';
  const skippedMessages = {
    skipped: 'Bạn đã bỏ qua hỗ trợ. Bài học không bị thay đổi.',
    'without-ai': 'Bạn tiếp tục bài học mà không dùng gợi ý AI.',
    'skipped-result': 'Đã bỏ qua bài ôn. Bạn vẫn ở đúng slide đang học.'
  };
  panelContent.innerHTML = `
    <div class="panel-state empty-state ${isCompleted ? 'completion-state' : ''}">
      <span class="state-symbol ${isCompleted ? 'filled' : ''}" aria-hidden="true">✓</span>
      ${isCompleted ? '<p class="eyebrow">Đã hoàn thành bài ôn</p>' : ''}
      <h3>${isCompleted ? refresherLibrary[optionState.concept].title : 'Đã quay lại luồng học'}</h3>
      <p>${isCompleted ? 'Bạn đã quay lại đúng Slide 04. Nội dung bài học và tiến độ được giữ nguyên.' : skippedMessages[optionState.terminal]}</p>
      <div class="recovery-note"><strong>${isCompleted ? 'Quyền kiểm soát' : 'Recovery'}:</strong> Bạn có thể làm lại option này hoặc thử một option khác.</div>
      <div class="panel-actions push-bottom">
        <button class="secondary-button" type="button" data-action="restart-active">Làm lại option này</button>
        <button class="primary-button" type="button" data-action="next-option">Thử option tiếp theo</button>
      </div>
    </div>`;
}

function openRefresher(concept) {
  const content = refresherLibrary[concept];
  activeRefresher = concept;
  lastFocusedElement = document.activeElement;
  document.getElementById('refresher-title').textContent = content.title;
  document.getElementById('refresher-body').innerHTML = `
    <div class="refresher-source"><span>Từ concept map Chương 3</span><strong>${content.reason}</strong></div>
    <p class="refresher-summary">${content.summary}</p>
    <div class="worked-example"><span>Ví dụ</span><p>${content.example}</p></div>
    <details class="self-check"><summary>${content.check}</summary><p>${content.answer}</p></details>`;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  document.getElementById('close-modal').focus();
}

function closeRefresher() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

function completeRefresher() {
  const optionState = state[activeOption];
  optionState.completed = true;
  optionState.terminal = 'completed';
  closeRefresher();
  render();
  showToast(`Đã hoàn thành Option ${activeOption} và quay lại Slide 04.`);
}

function resetActiveOption() {
  state[activeOption] = createInitialState()[activeOption];
  currentSlide = 4;
  document.getElementById('slide-count').textContent = 'Slide 04 / 12';
  closeRefresher();
  render();
  showToast(`Đã đưa Option ${activeOption} về bối cảnh ban đầu.`);
}

function resetAll() {
  state = createInitialState();
  activeOption = 'A';
  currentSlide = 4;
  document.getElementById('slide-count').textContent = 'Slide 04 / 12';
  closeRefresher();
  render();
  showToast('Đã đặt lại A, B, C về cùng bối cảnh ban đầu.');
}

function navigateSlide(direction) {
  currentSlide = Math.min(12, Math.max(1, currentSlide + direction));
  document.getElementById('slide-count').textContent = `${String(currentSlide).padStart(2, '0')} / 12`;
  if (currentSlide !== 4) showToast(`Đang xem Slide ${String(currentSlide).padStart(2, '0')}. Chọn Option hoặc đặt lại để về Slide 04.`);
}

function updateTabs() {
  document.querySelectorAll('.option-tab').forEach((button) => {
    const option = button.dataset.option;
    const active = option === activeOption;
    button.classList.toggle('is-active', active);
    button.classList.toggle('is-complete', state[option].completed);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateStageTrack(stage) {
  document.querySelectorAll('.stage-track li').forEach((item, index) => {
    item.classList.toggle('is-current', index === stage);
    item.classList.toggle('is-done', index < stage);
  });
}

function updateStudyProgress() {
  const completed = Object.entries(state).filter(([, optionState]) => optionState.completed).map(([option]) => option);
  const text = completed.length === 0
    ? 'Chưa hoàn thành option nào'
    : completed.length === 3
      ? 'Đã hoàn thành cả 3 option · sẵn sàng so sánh'
      : `Đã hoàn thành ${completed.length}/3 option`;
  document.getElementById('study-progress-text').textContent = text;
  document.querySelectorAll('[data-dot]').forEach((dot) => dot.classList.toggle('is-complete', state[dot.dataset.dot].completed));
}

function updateFacilitatorNotes() {
  const definition = optionDefinitions[activeOption];
  document.getElementById('facilitator-option').textContent = `OPTION ${activeOption}`;
  document.getElementById('annotation-expect').textContent = definition.expect;
  document.getElementById('annotation-watch').textContent = definition.watch;
  document.getElementById('annotation-dont').textContent = definition.dont;
}

function selectionLabelA(selection) {
  const labels = {
    partial: 'chưa hiểu vì sao chỉ xét một tham số',
    rate: 'chưa rõ α thay đổi bước cập nhật ra sao',
    direction: 'chưa nối được độ dốc với hướng cập nhật'
  };
  return labels[selection] || 'chưa có lựa chọn';
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape' && !modal.hidden) closeRefresher();
  if (event.key !== 'Tab' || modal.hidden) return;
  const focusable = [...modal.querySelectorAll('button, summary, [href], input, [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
