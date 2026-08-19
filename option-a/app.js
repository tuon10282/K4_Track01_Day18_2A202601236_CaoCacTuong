/* ==========================================================================
   Option A - Reactive checkpoint
   AI does not observe reading behavior. It only maps a learner's explicit answer
   to a short refresher and waits for the learner to approve that mapping.
   ========================================================================== */

const LESSON_TITLE = 'Bài 2 · Start-Up Finance — Funding & Business Plan';
const DEMO_PAGE = 12;

const COURSE = [
    {
        name: 'Slides',
        items: [
            { id: 'funding', title: 'E-Commerce Start-Up — Funding', pages: 23, pdfUrl: '../resource/2.Funding.pdf' },
            { id: 'business-plan', title: 'Business Plan Pack — The Prince’s Trust', pages: 23, pdfUrl: '../resource/3.BusinessPlan.pdf' },
        ],
    },
];

const CONCEPTS = {
    'valuation-challenge': {
        name: 'Vì sao start-up khó định giá',
        duration: '2 phút',
        bullets: [
            'Chưa có lịch sử tài chính đủ dài để ngoại suy',
            'Doanh thu hoặc lợi nhuận còn nhỏ nên các hệ số quen dùng ít ý nghĩa',
            'Rủi ro thất bại cao và có ít công ty tương đương để so sánh',
        ],
        example: 'Một shop online mới hoạt động 8 tháng chưa thể dùng P/E như một doanh nghiệp niêm yết.',
    },
    'valuation-method': {
        name: 'Các phương pháp định giá start-up',
        duration: '3 phút',
        bullets: [
            'Cost-to-duplicate: chi phí để dựng lại một công ty tương tự từ đầu',
            'Market multiple: so với các thương vụ gần nhất trong cùng ngành',
            'Discounted cash flow: chiết khấu dòng tiền dự phóng, rất nhạy với giả định',
        ],
        example: 'Cùng một công ty, cost-to-duplicate thường cho kết quả thấp hơn market multiple.',
    },
    'pre-post-money': {
        name: 'Pre-money và post-money valuation',
        duration: '2 phút',
        bullets: [
            'Pre-money là giá trị công ty trước khi nhận tiền của vòng gọi vốn',
            'Post-money bằng pre-money cộng số tiền vừa gọi được',
            'Tỷ lệ cổ phần nhà đầu tư nhận bằng tiền đầu tư chia cho post-money',
        ],
        example: 'Pre-money 4 tỷ, gọi thêm 1 tỷ thì post-money là 5 tỷ; nhà đầu tư giữ 20%.',
    },
    'funding-rounds': {
        name: 'Các vòng gọi vốn từ Seed đến Series A/B/C',
        duration: '3 phút',
        bullets: [
            'Seed: tiền để chứng minh có người cần sản phẩm',
            'Series A: đã có tín hiệu thị trường, cần tiền để mở rộng mô hình',
            'Series B/C: tăng tốc quy mô hoặc mở thị trường mới',
        ],
        example: 'Mỗi vòng đổi một phần cổ phần lấy tiền nên tỷ lệ sở hữu của founder giảm dần.',
    },
    'elevator-pitch': {
        name: 'Elevator pitch',
        duration: '2 phút',
        bullets: [
            'Nói rõ bán gì, cho ai và vì sao họ chọn bạn trong khoảng 30 giây',
            'Viết sau cùng, khi các phần còn lại của business plan đã rõ',
            'Hạn chế thuật ngữ để người ngoài ngành vẫn hiểu ngay',
        ],
        example: 'Tôi bán bánh mì chay giao tận nơi cho dân văn phòng quận 1; đặt trước 10 phút là có.',
    },
    'competitor-analysis': {
        name: 'Phân tích đối thủ',
        duration: '2 phút',
        bullets: [
            'Liệt kê đối thủ trực tiếp và cả cách khách hàng đang tự giải quyết vấn đề',
            'So sánh trên giá, chất lượng, địa điểm và dịch vụ',
            'Chỉ ra một lợi thế thật sự có thể duy trì',
        ],
        example: 'Đối thủ của tiệm giặt ủi còn bao gồm chiếc máy giặt ở nhà khách hàng.',
    },
    'revenue-forecast': {
        name: 'Dự phóng doanh thu và điểm hòa vốn',
        duration: '3 phút',
        bullets: [
            'Doanh thu bằng số khách nhân giá trị mỗi đơn nhân tần suất mua',
            'Tách chi phí cố định và chi phí biến đổi trước khi tính hòa vốn',
            'Điểm hòa vốn bằng chi phí cố định chia lợi nhuận gộp mỗi đơn',
        ],
        example: 'Chi phí cố định 20 triệu mỗi tháng, lãi gộp 40 nghìn mỗi đơn thì cần 500 đơn để hòa vốn.',
    },
};

const SELF_REPORTS = {
    'valuation-challenge': {
        title: 'Vì sao start-up chưa có lợi nhuận vẫn được định giá?',
        detail: 'Tôi chưa hiểu vì sao một công ty chưa có lợi nhuận vẫn có thể được định giá.',
    },
    'valuation-method': {
        title: 'Con số định giá được tính bằng cách nào?',
        detail: 'Tôi chưa phân biệt được cost-to-duplicate, market multiple và discounted cash flow.',
    },
    'pre-post-money': {
        title: 'Pre-money, post-money và tỷ lệ cổ phần liên hệ ra sao?',
        detail: 'Tôi chưa hiểu vì sao lấy tiền đầu tư chia cho post-money để ra tỷ lệ cổ phần.',
    },
    'funding-rounds': {
        title: 'Mỗi vòng gọi vốn dùng để làm gì?',
        detail: 'Tôi chưa phân biệt mục tiêu của Seed, Series A và các vòng sau.',
    },
    'elevator-pitch': {
        title: 'Một elevator pitch cần nói những gì?',
        detail: 'Tôi chưa biết cách rút business plan thành một lời giới thiệu khoảng 30 giây.',
    },
    'competitor-analysis': {
        title: 'Ai thật sự được xem là đối thủ?',
        detail: 'Tôi chưa rõ nên so sánh đối thủ trực tiếp hay cả giải pháp thay thế.',
    },
    'revenue-forecast': {
        title: 'Dự phóng doanh thu và hòa vốn bắt đầu từ đâu?',
        detail: 'Tôi chưa nối được số khách, giá trị đơn hàng và chi phí để tính điểm hòa vốn.',
    },
};

const PAGE_MAP = {
    funding: {
        5: 'valuation-challenge',
        8: 'valuation-method',
        12: 'pre-post-money',
        15: 'funding-rounds',
    },
    'business-plan': {
        6: 'elevator-pitch',
        14: 'competitor-analysis',
        17: 'revenue-forecast',
    },
};

const DECK_CONCEPTS = {
    funding: ['valuation-challenge', 'valuation-method', 'pre-post-money', 'funding-rounds'],
    'business-plan': ['elevator-pitch', 'competitor-analysis', 'revenue-forecast'],
};

const state = {
    moduleIndex: 0,
    itemIndex: 0,
    page: 1,
    visited: new Set(),
    expanded: COURSE.map(() => true),
    assist: { step: 'idle', selection: null },
    pageBeforeAssist: null,
    supportDisabled: false,
};

const el = {
    body: document.body,
    lessonTitle: document.getElementById('lessonTitle'),
    outline: document.getElementById('outline'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
    sidebarReopenBtn: document.getElementById('sidebarReopenBtn'),
    progressLabel: document.getElementById('progressLabel'),
    progressBar: document.getElementById('progressBar'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pageInput: document.getElementById('pageInput'),
    pageTotal: document.getElementById('pageTotal'),
    slideFrame: document.getElementById('slideFrame'),
    stageEmpty: document.getElementById('stageEmpty'),
    stageCaption: document.getElementById('stageCaption'),
    backBtn: document.getElementById('backBtn'),
    chatbotBtn: document.getElementById('chatbotBtn'),
    checkpointBtn: document.getElementById('checkpointBtn'),
    stageAiBtn: document.getElementById('stageAiBtn'),
    demoPageBtn: document.getElementById('demoPageBtn'),
    resetBtn: document.getElementById('resetBtn'),
    notice: document.getElementById('notice'),
    noticeOkBtn: document.getElementById('noticeOkBtn'),
    noticeSkipBtn: document.getElementById('noticeSkipBtn'),
    assist: document.getElementById('assist'),
    assistKicker: document.getElementById('assistKicker'),
    assistTitle: document.getElementById('assistTitle'),
    assistBody: document.getElementById('assistBody'),
    assistFoot: document.getElementById('assistFoot'),
    assistCloseBtn: document.getElementById('assistCloseBtn'),
    annotationToggle: document.getElementById('annotationToggle'),
    annotation: document.getElementById('annotation'),
    stateLog: document.getElementById('stateLog'),
};

const ICON_CHEVRON = '<svg class="module-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ICON_STATE = {
    current: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M7.4 6.2l4 2.8-4 2.8V6.2Z" fill="currentColor"/></svg>',
    visited: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M5.6 9.2l2.2 2.2 4.6-4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    idle: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/></svg>',
};

const currentItem = () => COURSE[state.moduleIndex].items[state.itemIndex];
const totalItems = () => COURSE.reduce((sum, module) => sum + module.items.length, 0);
const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (character) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]
    ));
}

function renderSidebar() {
    el.outline.innerHTML = COURSE.map((module, moduleIndex) => {
        const open = state.expanded[moduleIndex];
        const items = module.items.map((item, itemIndex) => {
            const current = moduleIndex === state.moduleIndex && itemIndex === state.itemIndex;
            const visited = state.visited.has(item.id);
            const icon = current ? ICON_STATE.current : (visited ? ICON_STATE.visited : ICON_STATE.idle);
            return `
                <button class="item-btn${visited ? ' is-visited' : ''}" data-module="${moduleIndex}" data-item="${itemIndex}" ${current ? 'aria-current="true"' : ''}>
                    <span class="item-state">${icon}</span>
                    <span class="item-text">
                        <span class="item-title">${escapeHtml(item.title)}</span>
                        <span class="item-sub">Slide · ${item.pages} trang</span>
                    </span>
                </button>`;
        }).join('');

        return `
            <div class="module">
                <button class="module-btn" data-toggle-module="${moduleIndex}" aria-expanded="${open}">
                    <span class="module-text">
                        <span class="module-kicker">Module ${moduleIndex + 1}</span>
                        <span class="module-name">${escapeHtml(module.name)}</span>
                    </span>
                    ${ICON_CHEVRON}
                </button>
                <div class="module-items"${open ? '' : ' hidden'}>
                    <p class="module-caption">${escapeHtml(module.name)}</p>
                    ${items}
                </div>
            </div>`;
    }).join('');
}

function loadSlideFrame(src) {
    if (el.slideFrame.dataset.src === src) return;
    const frame = el.slideFrame.cloneNode(false);
    frame.dataset.src = src;
    frame.hidden = false;
    frame.setAttribute('src', src);
    el.slideFrame.replaceWith(frame);
    el.slideFrame = frame;
}

function clearSlideFrame() {
    delete el.slideFrame.dataset.src;
    el.slideFrame.removeAttribute('src');
    el.slideFrame.hidden = true;
}

function renderSlide() {
    const item = currentItem();
    el.pageTotal.textContent = item.pages;
    el.pageInput.value = state.page;
    el.prevBtn.disabled = state.page <= 1;
    el.nextBtn.disabled = state.page >= item.pages;
    el.stageCaption.textContent = `${item.title} — trang ${state.page}/${item.pages}`;

    if (item.pdfUrl) {
        loadSlideFrame(`${item.pdfUrl}#page=${state.page}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`);
        el.stageEmpty.hidden = true;
    } else {
        clearSlideFrame();
        el.stageEmpty.hidden = false;
    }
}

function renderProgress() {
    const done = state.visited.size;
    const total = totalItems();
    const percent = total ? Math.round((done / total) * 100) : 0;
    el.progressLabel.textContent = `${done}/${total} bài`;
    el.progressBar.setAttribute('aria-valuenow', percent);
    document.documentElement.style.setProperty('--progress', `${percent}%`);
}

function getCheckpointChoices() {
    const item = currentItem();
    const mapped = PAGE_MAP[item.id] && PAGE_MAP[item.id][state.page];
    const ids = DECK_CONCEPTS[item.id] || Object.keys(CONCEPTS);
    return mapped ? [mapped, ...ids.filter((id) => id !== mapped)].slice(0, 3) : ids.slice(0, 3);
}

function renderAssistProgress() {
    const order = ['question', 'result', 'refresher'];
    let activeIndex = order.indexOf(state.assist.step);
    if (state.assist.step === 'done') activeIndex = 2;
    if (state.assist.step === 'skipped') activeIndex = 1;

    document.querySelectorAll('.assist-progress li').forEach((node, index) => {
        node.classList.toggle('is-current', index === activeIndex);
        node.classList.toggle('is-done', activeIndex > index);
    });
}

function renderQuestion() {
    const choices = getCheckpointChoices();
    const mapped = PAGE_MAP[currentItem().id] && PAGE_MAP[currentItem().id][state.page];
    el.assistKicker.textContent = 'Bạn tự báo cáo';
    el.assistTitle.textContent = 'Checkpoint · 1 câu';
    el.assistBody.innerHTML = `
        <p class="assist-note"><strong>AI không quan sát cách bạn đọc.</strong> Kết quả bên dưới chỉ dựa trên lựa chọn bạn gửi ở bước này.</p>
        <p class="checkpoint-prompt"><strong>Ở đoạn vừa đọc, điều nào gần nhất với chỗ bạn chưa rõ?</strong></p>
        <p class="checkpoint-context">${mapped ? `Gợi ý theo nội dung trang ${state.page}.` : 'Chọn mô tả gần nhất; bạn có thể chọn lại trước khi mở bài ôn.'}</p>
        <div class="checkpoint-choices">
            ${choices.map((conceptId) => {
                const report = SELF_REPORTS[conceptId];
                const selected = state.assist.selection === conceptId;
                return `
                    <button class="checkpoint-choice${selected ? ' is-selected' : ''}" data-assist="choose" data-concept="${conceptId}" aria-pressed="${selected}">
                        <span class="choice-mark" aria-hidden="true">✓</span>
                        <span>
                            <span class="choice-title">${escapeHtml(report.title)}</span>
                            <span class="choice-detail">${escapeHtml(report.detail)}</span>
                        </span>
                    </button>`;
            }).join('')}
        </div>`;
    el.assistFoot.innerHTML = `
        <button class="btn btn-primary" data-assist="diagnose" ${state.assist.selection ? '' : 'disabled'}>Xem gợi ý phù hợp</button>
        <button class="btn btn-ghost" data-assist="skip">Bỏ qua checkpoint</button>`;
}

function renderResult() {
    const report = SELF_REPORTS[state.assist.selection];
    const concept = CONCEPTS[state.assist.selection];
    el.assistKicker.textContent = 'Bạn duyệt kết quả';
    el.assistTitle.textContent = 'Gợi ý từ câu trả lời';
    el.assistBody.innerHTML = `
        <p class="assist-note"><strong>Giới hạn bằng chứng:</strong> AI chỉ map câu bạn vừa chọn sang concept tương ứng; không dùng thời gian đọc, số lần quay lại hay hành vi ngoài câu trả lời.</p>
        <blockquote class="result-evidence">
            <small>Bằng chứng trực tiếp từ bạn</small>
            “${escapeHtml(report.detail)}”
        </blockquote>
        <div class="result-gap">
            <p class="result-gap-label">Concept có thể cần ôn</p>
            <p class="result-gap-name">${escapeHtml(concept.name)}</p>
            <p class="confidence-high"><strong>Bằng chứng trực tiếp</strong> · chờ bạn xác nhận trước khi mở</p>
        </div>
        <p class="control-note">Nếu mapping chưa đúng, chọn lại hoặc bỏ qua. Slide hiện tại chưa bị thay đổi.</p>`;
    el.assistFoot.innerHTML = `
        <button class="btn btn-primary" data-assist="open">Đúng, mở bài ôn</button>
        <button class="btn btn-secondary" data-assist="correct">Chọn lại câu trả lời</button>
        <button class="btn btn-ghost" data-assist="skip">Không đúng, bỏ qua</button>`;
}

function renderRefresher() {
    const concept = CONCEPTS[state.assist.selection];
    el.assistKicker.textContent = 'Bài ôn theo yêu cầu';
    el.assistTitle.textContent = concept.name;
    el.assistBody.innerHTML = `
        <span class="assist-meta">${escapeHtml(concept.duration)}</span>
        <p class="assist-note">Bài ôn được mở sau khi bạn xác nhận. Trang slide vẫn giữ ở ${state.page}/${currentItem().pages}.</p>
        <h3>Ý chính</h3>
        <ul>${concept.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>
        <h3>Ví dụ</h3>
        <div class="assist-example">${escapeHtml(concept.example)}</div>`;
    el.assistFoot.innerHTML = `
        <button class="btn btn-primary" data-assist="done">Đã hiểu, quay lại slide</button>
        <button class="btn btn-ghost" data-assist="correct">Chọn lại chủ đề</button>`;
}

function renderTerminal(skipped) {
    el.assistKicker.textContent = skipped ? 'Bạn giữ quyền kiểm soát' : 'Hoàn tất';
    el.assistTitle.textContent = skipped ? 'Đã bỏ qua checkpoint' : 'Đã hoàn tất bài ôn';
    el.assistBody.innerHTML = `
        <div class="terminal-icon" aria-hidden="true">${skipped ? '—' : '✓'}</div>
        <p><strong>${skipped ? 'Không có bài ôn nào được tự động mở.' : 'Tiến trình bài học đã được giữ nguyên.'}</strong></p>
        <p class="control-note">${skipped ? 'Bạn có thể bắt đầu lại checkpoint bất cứ lúc nào.' : `Bạn có thể tiếp tục từ trang ${state.page} hoặc mở lại checkpoint khi cần.`}</p>`;
    el.assistFoot.innerHTML = `
        <button class="btn btn-primary" data-assist="${skipped ? 'restart' : 'close'}">${skipped ? 'Bắt đầu lại' : 'Quay lại slide'}</button>
        ${skipped ? '<button class="btn btn-ghost" data-assist="close">Đóng</button>' : '<button class="btn btn-ghost" data-assist="restart">Checkpoint khác</button>'}`;
}

function renderSupportStatus() {
    const status = document.querySelector('.ask-status');
    if (status) {
        const textNode = Array.from(status.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = state.supportDisabled ? ' AI đang tắt' : ' AI chờ bạn';
    }
    el.checkpointBtn.textContent = state.supportDisabled ? 'Bật lại checkpoint' : 'Bắt đầu checkpoint';
}

function renderAssist() {
    if (state.assist.step === 'idle') {
        el.assist.hidden = true;
        el.body.classList.remove('assist-open');
        renderStateLog();
        return;
    }

    el.assist.hidden = false;
    el.body.classList.add('assist-open');
    if (state.assist.step === 'question') renderQuestion();
    if (state.assist.step === 'result') renderResult();
    if (state.assist.step === 'refresher') renderRefresher();
    if (state.assist.step === 'done') renderTerminal(false);
    if (state.assist.step === 'skipped') renderTerminal(true);
    renderAssistProgress();
    renderStateLog();
}

function renderStateLog() {
    if (!el.stateLog) return;
    el.stateLog.textContent = [
        `deck=${currentItem().id}`,
        `page=${state.page}`,
        `step=${state.assist.step}`,
        `answer=${state.assist.selection || 'none'}`,
        'behaviorSignals=none',
        `support=${state.supportDisabled ? 'off' : 'available'}`,
    ].join(' · ');
}

function render() {
    renderSidebar();
    renderSlide();
    renderProgress();
    renderSupportStatus();
    renderAssist();
}

function startCheckpoint() {
    state.supportDisabled = false;
    state.pageBeforeAssist = state.page;
    state.assist = { step: 'question', selection: null };
    el.notice.hidden = true;
    renderSupportStatus();
    renderAssist();
    if (window.matchMedia('(max-width: 900px)').matches) setSidebar(false);
}

function closeAssist() {
    state.assist = { step: 'idle', selection: null };
    renderAssist();
}

function resetAssistForContextChange() {
    if (state.assist.step === 'idle') return;
    state.pageBeforeAssist = state.page;
    state.assist = { step: 'question', selection: null };
}

function selectItem(moduleIndex, itemIndex) {
    state.moduleIndex = moduleIndex;
    state.itemIndex = itemIndex;
    state.page = 1;
    state.visited.add(currentItem().id);
    resetAssistForContextChange();
    render();
    if (window.matchMedia('(max-width: 900px)').matches) setSidebar(false);
}

function goToPage(page) {
    const nextPage = clamp(Number(page) || 1, 1, currentItem().pages);
    if (nextPage === state.page) {
        el.pageInput.value = state.page;
        return;
    }
    state.page = nextPage;
    resetAssistForContextChange();
    renderSlide();
    renderAssist();
}

function toggleModule(moduleIndex) {
    state.expanded[moduleIndex] = !state.expanded[moduleIndex];
    renderSidebar();
}

function setSidebar(open) {
    el.body.classList.toggle('sidebar-collapsed', !open);
    el.sidebarReopenBtn.hidden = open;
    el.sidebarBackdrop.hidden = !open || !window.matchMedia('(max-width: 900px)').matches;
    el.sidebar.setAttribute('aria-hidden', String(!open));
}

function resetOption() {
    state.moduleIndex = 0;
    state.itemIndex = 0;
    state.page = 1;
    state.visited = new Set([currentItem().id]);
    state.expanded = COURSE.map(() => true);
    state.assist = { step: 'idle', selection: null };
    state.pageBeforeAssist = null;
    state.supportDisabled = false;
    el.notice.hidden = false;
    render();
}

function handleAssistAction(event) {
    const button = event.target.closest('[data-assist]');
    if (!button) return;
    const action = button.dataset.assist;

    if (action === 'choose') {
        state.assist.selection = button.dataset.concept;
        renderAssist();
    }
    if (action === 'diagnose' && state.assist.selection) {
        state.assist.step = 'result';
        renderAssist();
    }
    if (action === 'correct') {
        state.assist = { step: 'question', selection: null };
        renderAssist();
    }
    if (action === 'open') {
        state.assist.step = 'refresher';
        renderAssist();
    }
    if (action === 'done') {
        state.assist.step = 'done';
        renderAssist();
    }
    if (action === 'skip') {
        state.assist.step = 'skipped';
        renderAssist();
    }
    if (action === 'restart') startCheckpoint();
    if (action === 'close') closeAssist();
}

el.outline.addEventListener('click', (event) => {
    const moduleButton = event.target.closest('[data-toggle-module]');
    if (moduleButton) {
        toggleModule(Number(moduleButton.dataset.toggleModule));
        return;
    }
    const itemButton = event.target.closest('.item-btn');
    if (itemButton) selectItem(Number(itemButton.dataset.module), Number(itemButton.dataset.item));
});

el.prevBtn.addEventListener('click', () => goToPage(state.page - 1));
el.nextBtn.addEventListener('click', () => goToPage(state.page + 1));
el.pageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        goToPage(el.pageInput.value);
        el.pageInput.blur();
    }
});
el.pageInput.addEventListener('blur', () => goToPage(el.pageInput.value));

el.sidebarCloseBtn.addEventListener('click', () => setSidebar(false));
el.sidebarReopenBtn.addEventListener('click', () => setSidebar(true));
el.sidebarBackdrop.addEventListener('click', () => setSidebar(false));
el.checkpointBtn.addEventListener('click', startCheckpoint);
el.stageAiBtn.addEventListener('click', startCheckpoint);
el.chatbotBtn.addEventListener('click', startCheckpoint);
el.assistCloseBtn.addEventListener('click', closeAssist);
el.assist.addEventListener('click', handleAssistAction);

el.demoPageBtn.addEventListener('click', () => {
    state.moduleIndex = 0;
    state.itemIndex = 0;
    state.page = DEMO_PAGE;
    state.visited.add(currentItem().id);
    state.assist = { step: 'idle', selection: null };
    render();
});

el.resetBtn.addEventListener('click', resetOption);
el.noticeOkBtn.addEventListener('click', () => { el.notice.hidden = true; });
el.noticeSkipBtn.addEventListener('click', () => {
    state.supportDisabled = true;
    el.notice.hidden = true;
    closeAssist();
    renderSupportStatus();
    renderStateLog();
});

el.annotationToggle.addEventListener('click', () => {
    const opening = el.annotation.hidden;
    el.annotation.hidden = !opening;
    el.annotationToggle.setAttribute('aria-expanded', String(opening));
});

el.backBtn.addEventListener('click', () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '../reference/index.html';
});

document.addEventListener('keydown', (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (event.key === 'Escape' && state.assist.step !== 'idle') {
        closeAssist();
        return;
    }
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (event.key === 'ArrowLeft') goToPage(state.page - 1);
    if (event.key === 'ArrowRight') goToPage(state.page + 1);
});

const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;
window.addEventListener('resize', () => setSidebar(!el.body.classList.contains('sidebar-collapsed')));

el.lessonTitle.textContent = LESSON_TITLE;
document.title = `${LESSON_TITLE} · Option A`;
state.visited.add(currentItem().id);
setSidebar(!isNarrow());
render();
