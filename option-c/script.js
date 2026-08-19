/* ==========================================================================
   Option C — Collaborative diagnosis
   Flow: FAB → pick concept → clarify question → confirm → refresher
   ========================================================================== */

const LESSON_TITLE = 'Bài 2 · Start-Up Finance — Funding & Business Plan';

const COURSE = [
    {
        name: 'Slides',
        items: [
            { id: 'funding', title: 'E-Commerce Start-Up — Funding', pages: 23, pdfUrl: '../resource/2.Funding.pdf' },
            { id: 'business-plan', title: 'Business Plan Pack', pages: 23, pdfUrl: '../resource/3.BusinessPlan.pdf' },
        ],
    },
];

/* ==================== SECTION SUMMARY ==================== */
const SECTIONS = {
    'funding': {
        label: 'Funding',
        color: '#1d4ed8',
        summary: [
            'Định giá start-up: vì sao khó, 3 phương pháp chính',
            'Pre-money vs Post-money: công thức tính % cổ phần',
            'Các vòng gọi vốn: Seed → Series A → B/C, pha loãng',
        ],
    },
    'business-plan': {
        label: 'Business Plan',
        color: '#16a34a',
        summary: [
            'Elevator pitch: tóm tắt 30 giây, viết sau cùng',
            'Phân tích đối thủ: trực tiếp + cách khách tự xoay xở',
            'Dự phóng doanh thu & điểm hoà vốn: công thức cơ bản',
        ],
    },
};

/* ==================== FIXTURES ==================== */
const CONCEPTS = {
    'valuation-challenge': {
        name: 'Định giá start-up',
        duration: '2 phút',
        section: 'funding',
        question: 'Bạn chưa rõ vì sao các phương pháp định giá thông thường không áp dụng được cho start-up?',
        bullets: [
            'Start-up chưa có lịch sử tài chính đủ dài để ngoại suy',
            'Doanh thu/lợi nhuận còn nhỏ hoặc âm, các hệ số P/E vô nghĩa',
            'Rủi ro thất bại cao, ít công ty tương đương để so sánh',
        ],
        example: 'Một shop online mới 8 tháng, doanh thu chưa ổn định — không thể định giá bằng P/E như doanh nghiệp niêm yết.',
    },
    'valuation-method': {
        name: 'Phương pháp định giá',
        duration: '3 phút',
        section: 'funding',
        question: 'Bạn chưa rõ phương pháp nào phù hợp nhất hay cách áp dụng chúng vào thực tế?',
        bullets: [
            'Cost-to-duplicate: tốn bao nhiêu để dựng lại công ty tương tự từ đầu',
            'Market multiple: so với thương vụ gần nhất trong cùng ngành',
            'Discounted cash flow (DCF): chiết khấu dòng tiền dự phóng, rất nhạy với giả định',
        ],
        example: 'Cùng một công ty, cost-to-duplicate cho con số thấp nhất, market multiple thường cho con số cao nhất.',
    },
    'pre-post-money': {
        name: 'Pre-money vs. Post-money',
        duration: '2 phút',
        section: 'funding',
        question: 'Bạn không phân biệt được pre-money và post-money, hay cách tính % cổ phần?',
        bullets: [
            'Pre-money: giá trị công ty TRƯỚC khi nhận tiền vòng này',
            'Post-money = Pre-money + số tiền vừa gọi được',
            '% cổ phần nhà đầu tư = Số tiền đầu tư / Post-money',
        ],
        example: 'Pre-money 4 tỷ, gọi thêm 1 tỷ → Post-money 5 tỷ, nhà đầu tư giữ 20%.',
    },
    'funding-rounds': {
        name: 'Các vòng gọi vốn',
        duration: '3 phút',
        section: 'funding',
        question: 'Bạn chưa hiểu sự khác biệt giữa các vòng, hay tại sao founder bị pha loãng?',
        bullets: [
            'Seed: tiền để chứng minh có người cần sản phẩm (MVP)',
            'Series A: đã có tín hiệu thị trường, tiền để mở rộng mô hình',
            'Series B/C: tăng tốc quy mô, mở thị trường mới',
        ],
        example: 'Mỗi vòng đổi một phần cổ phần lấy tiền → founder bị pha loãng dần qua từng vòng.',
    },
    'elevator-pitch': {
        name: 'Elevator pitch',
        duration: '2 phút',
        section: 'business-plan',
        question: 'Bạn chưa biết cách tóm tắt ý tưởng trong 30 giây, hay tại sao phải viết pitch sau cùng?',
        bullets: [
            'Nói được: Bán gì — Cho ai — Vì sao họ chọn bạn, trong 30 giây',
            'Viết SAU CÙNG, khi các phần business plan đã rõ',
            'Không dùng thuật ngữ — người ngoài ngành phải hiểu ngay',
        ],
        example: '"Tôi bán bánh mì chay giao tận nơi cho dân văn phòng quận 1, đặt trước 10 phút là có."',
    },
    'competitor-analysis': {
        name: 'Phân tích đối thủ',
        duration: '2 phút',
        section: 'business-plan',
        question: 'Bạn chưa biết cách xác định đối thủ hay cách so sánh hiệu quả?',
        bullets: [
            'Liệt kê đối thủ trực tiếp VÀ cả cách khách hàng đang tự xoay xở',
            'So sánh trên: giá, chất lượng, địa điểm, dịch vụ — không chỉ giá',
            'Chỉ ra MỘT điểm bạn hơn thật sự và giữ được',
        ],
        example: 'Đối thủ của tiệm giặt ủi không chỉ là tiệm bên cạnh, mà còn là chiếc máy giặt ở nhà khách.',
    },
    'revenue-forecast': {
        name: 'Dự phóng doanh thu & hoà vốn',
        duration: '3 phút',
        section: 'business-plan',
        question: 'Bạn chưa hiểu cách tính doanh thu hay cách tìm điểm hoà vốn?',
        bullets: [
            'Doanh thu = Số khách × Giá trị mỗi đơn × Tần suất mua',
            'Tách chi phí CỐ ĐỊNH (không đổi) và BIẾN ĐỔI (theo đơn) trước khi tính',
            'Điểm hoà vốn = Chi phí cố định / Lãi gộp mỗi đơn',
        ],
        example: 'Chi phí cố định 20 triệu/tháng, lãi gộp 40k/đơn → cần 500 đơn/tháng mới hoà vốn.',
    },
};

/* ==================== STATE ==================== */
const state = {
    moduleIndex: 0,
    itemIndex: 0,
    page: 1,
    visited: new Set(),
    expanded: COURSE.map(() => true),
    /* step: idle | select | clarify | confirm | refresher | done */
    assist: { step: 'idle', conceptId: null },
    pageBeforeAssist: null,
};

/* ==================== DOM ==================== */
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
    /* Layer C */
    fabBtn: document.getElementById('fabBtn'),
    assist: document.getElementById('assist'),
    assistKicker: document.getElementById('assistKicker'),
    assistTitle: document.getElementById('assistTitle'),
    assistBody: document.getElementById('assistBody'),
    assistCloseBtn: document.getElementById('assistCloseBtn'),
    summaryBtn: document.getElementById('summaryBtn'),
    summaryBanner: document.getElementById('summaryBanner'),
    summaryTitle: document.getElementById('summaryTitle'),
    summaryBody: document.getElementById('summaryBody'),
    summaryCloseBtn: document.getElementById('summaryCloseBtn'),
    annotationToggle: document.getElementById('annotationToggle'),
    annotation: document.getElementById('annotation'),
    stateLog: document.getElementById('stateLog'),
    chatbotBtn: document.getElementById('chatbotBtn'),
};

/* ==================== HELPERS ==================== */
const ICON_CHEVRON = '<svg class="module-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ICON_STATE = {
    current: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M7.4 6.2l4 2.8-4 2.8V6.2Z" fill="currentColor"/></svg>',
    visited: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M5.6 9.2l2.2 2.2 4.6-4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    idle: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/></svg>',
};

const ICON_ARROW = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const currentItem = () => COURSE[state.moduleIndex].items[state.itemIndex];
const totalItems = () => COURSE.reduce((sum, m) => sum + m.items.length, 0);
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

/* ==================== RENDER: sidebar ==================== */
function renderSidebar() {
    el.outline.innerHTML = COURSE.map((module, m) => {
        const open = state.expanded[m];
        const items = module.items.map((item, i) => {
            const isCurrent = m === state.moduleIndex && i === state.itemIndex;
            const isVisited = state.visited.has(item.id);
            const icon = isCurrent ? ICON_STATE.current : (isVisited ? ICON_STATE.visited : ICON_STATE.idle);
            return `
                <button class="item-btn${isVisited ? ' is-visited' : ''}" data-module="${m}" data-item="${i}"
                        ${isCurrent ? 'aria-current="true"' : ''}>
                    <span class="item-state">${icon}</span>
                    <span class="item-text">
                        <span class="item-title">${escapeHtml(item.title)}</span>
                        <span class="item-sub">Slide · ${item.pages} trang</span>
                    </span>
                </button>`;
        }).join('');

        return `
            <div class="module">
                <button class="module-btn" data-toggle-module="${m}" aria-expanded="${open}">
                    <span class="module-text">
                        <span class="module-kicker">Module ${m + 1}</span>
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

/* ==================== RENDER: slide ==================== */
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

function render() {
    renderSidebar();
    renderSlide();
    renderProgress();
    renderAssist();
}

/* ==================== ACTIONS ==================== */
function selectItem(moduleIndex, itemIndex) {
    state.moduleIndex = moduleIndex;
    state.itemIndex = itemIndex;
    state.page = 1;
    state.visited.add(currentItem().id);
    syncAssist();
    render();
    if (window.matchMedia('(max-width: 900px)').matches) setSidebar(false);
}

function goToPage(page) {
    state.page = clamp(Number(page) || 1, 1, currentItem().pages);
    renderSlide();
    syncAssist();
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

/* ==================== SUMMARY ==================== */
function getCurrentDeckId() {
    return currentItem().id;
}

function showSummary() {
    const deckId = getCurrentDeckId();
    const section = SECTIONS[deckId];
    if (!section) return;

    el.summaryTitle.textContent = `Tóm tắt — ${section.label}`;
    el.summaryBody.innerHTML = `
        <div class="summary-section">
            <p class="summary-section-title">${escapeHtml(section.label)}</p>
            <div class="summary-items">
                ${section.summary.map((s) => `
                    <div class="summary-chip">
                        <span class="summary-chip-dot" style="background:${section.color}"></span>
                        ${escapeHtml(s)}
                    </div>
                `).join('')}
            </div>
        </div>`;

    el.summaryBanner.hidden = false;
}

function hideSummary() {
    el.summaryBanner.hidden = true;
}

/* ==========================================================================
   OPTION C — ENGINE: Chọn concept → Hỏi làm rõ → Xác nhận
   ========================================================================== */
function deckConceptsHere() {
    const deckId = getCurrentDeckId();
    return Object.keys(CONCEPTS).filter((id) => CONCEPTS[id].section === deckId);
}

function syncAssist() {
    if (state.assist.step !== 'select' && state.assist.step !== 'clarify') return;
    state.assist.conceptId = null;
    state.assist.step = 'select';
}

function resetContext() {
    state.assist.step = 'idle';
    state.assist.conceptId = null;
    state.pageBeforeAssist = null;
    el.assist.hidden = true;
    el.body.classList.remove('assist-open');
    state.moduleIndex = 0;
    state.itemIndex = 0;
    state.page = 1;
    state.visited = new Set([currentItem().id]);
    render();
}

function openAssist() {
    if (state.assist.step === 'idle') {
        state.pageBeforeAssist = state.page;
        state.assist.step = 'select';
        state.assist.conceptId = null;
    }
    el.assist.hidden = false;
    el.body.classList.add('assist-open');
    renderAssist();
}

function closeAssist(returnToPage) {
    const back = state.pageBeforeAssist;
    state.assist.step = 'idle';
    state.assist.conceptId = null;
    state.pageBeforeAssist = null;
    el.assist.hidden = true;
    el.body.classList.remove('assist-open');
    if (returnToPage && back) goToPage(back);
    renderAssist();
}

/* ==================== RENDER: views ==================== */
const STEP_META = {
    select: { kicker: 'Chọn phần chưa hiểu', title: 'Bạn vướng khái niệm nào?' },
    clarify: { kicker: 'Làm rõ thêm', title: 'Câu hỏi nhanh' },
    confirm: { kicker: 'Xác nhận', title: 'Có phải chỗ này không?' },
    refresher: { kicker: 'Ôn lại', title: 'Khái niệm nền' },
    done: { kicker: 'Hoàn tất', title: 'Quay lại slide' },
};

function viewSelect() {
    const ids = deckConceptsHere();
    const deckId = getCurrentDeckId();
    const section = SECTIONS[deckId];

    const items = ids.map((id) => `
        <button class="concept-btn" data-assist="pick" data-concept="${id}">
            <span class="concept-btn-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
            </span>
            <span class="concept-btn-text">
                <span class="concept-btn-name">${escapeHtml(CONCEPTS[id].name)}</span>
                <span class="concept-btn-dur">${escapeHtml(CONCEPTS[id].duration)}</span>
            </span>
            <span class="concept-btn-arrow">${ICON_ARROW}</span>
        </button>`).join('');

    return {
        body: `
            <p class="assist-note">Chọn khái niệm bạn chưa hiểu. Mình sẽ hỏi thêm một câu để xác nhận.</p>
            <div class="section-group">
                <p class="section-label">
                    <span class="section-dot" style="background:${section ? section.color : 'var(--accent)'}"></span>
                    ${section ? escapeHtml(section.label) : 'Tất cả'}
                </p>
                ${items}
            </div>`,
        foot: '<button class="btn btn-ghost" data-assist="close">Đóng</button>',
    };
}

function viewClarify() {
    const concept = CONCEPTS[state.assist.conceptId];
    if (!concept) return viewSelect();

    return {
        body: `
            <p class="assist-lead">${escapeHtml(concept.name)}</p>
            <div class="clarify-box">
                <p class="clarify-q">${escapeHtml(concept.question)}</p>
            </div>`,
        foot: `
            <button class="btn btn-primary" data-assist="confirm">Xác nhận, mở bài ôn</button>
            <button class="btn btn-secondary" data-assist="back-select">Chọn khái niệm khác</button>
            <button class="btn btn-ghost" data-assist="close">Đóng</button>`,
    };
}

function viewConfirm() {
    const concept = CONCEPTS[state.assist.conceptId];
    if (!concept) return viewSelect();

    return {
        body: `
            <div class="diag-gap">
                <p class="diag-gap-label">Mình sẽ mở bài ôn</p>
                <p class="diag-gap-name">${escapeHtml(concept.name)}</p>
            </div>
            <p class="diag-ask">Sẵn sàng chưa?</p>`,
        foot: `
            <button class="btn btn-primary" data-assist="open-refresher">Mở bài ôn (${escapeHtml(concept.duration)})</button>
            <button class="btn btn-secondary" data-assist="back-select">Chọn lại</button>
            <button class="btn btn-ghost" data-assist="close">Đóng</button>`,
    };
}

function viewRefresher() {
    const concept = CONCEPTS[state.assist.conceptId];
    if (!concept) return viewSelect();

    return {
        body: `
            <div class="refresher-view">
                <div class="refresher-header">
                    <span class="refresher-badge">${escapeHtml(concept.duration)}</span>
                </div>
                <h3 class="refresher-name">${escapeHtml(concept.name)}</h3>

                <p class="refresher-section-title">Cần nhớ</p>
                <ul class="refresher-list">
                    ${concept.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
                </ul>

                <p class="refresher-section-title">Ví dụ</p>
                <div class="refresher-example"><b>Ví dụ:</b> ${escapeHtml(concept.example)}</div>
            </div>`,
        foot: `
            <button class="btn btn-primary" data-assist="to-done">Xong</button>
            <button class="btn btn-ghost" data-assist="close">Đóng</button>`,
    };
}

function viewDone() {
    return {
        body: `
            <p class="assist-note">Bạn đã ôn xong. Quay lại slide để tiếp tục học nhé.</p>`,
        foot: `
            <button class="btn btn-primary" data-assist="close-restore">Quay lại slide</button>`,
    };
}

const ASSIST_VIEWS = {
    select: viewSelect,
    clarify: viewClarify,
    confirm: viewConfirm,
    refresher: viewRefresher,
    done: viewDone,
};

function renderAssist() {
    if (state.assist.step === 'idle') {
        el.assist.hidden = true;
        el.assistBody.innerHTML = '';
        renderStateLog();
        return;
    }

    el.assist.hidden = false;
    const meta = STEP_META[state.assist.step] || STEP_META.select;
    const concept = CONCEPTS[state.assist.conceptId];
    el.assistKicker.textContent = meta.kicker;
    el.assistTitle.textContent = concept && state.assist.step !== 'select' ? concept.name : meta.title;

    const viewFn = ASSIST_VIEWS[state.assist.step] || viewSelect;
    const view = viewFn();
    el.assistBody.innerHTML = view.body;
    el.assistFoot.innerHTML = view.foot || '';
    el.assistBody.scrollTop = 0;
    renderStateLog();
}

function renderStateLog() {
    const a = state.assist;
    el.stateLog.textContent =
        `trang ${state.page} · deck=${getCurrentDeckId()} · step=${a.step} · concept=${a.conceptId || '—'}`;
}

/* ==================== EVENTS ==================== */
el.outline.addEventListener('click', (event) => {
    const moduleBtn = event.target.closest('[data-toggle-module]');
    if (moduleBtn) {
        toggleModule(Number(moduleBtn.dataset.toggleModule));
        return;
    }
    const itemBtn = event.target.closest('.item-btn');
    if (itemBtn) selectItem(Number(itemBtn.dataset.module), Number(itemBtn.dataset.item));
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

document.addEventListener('keydown', (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (event.key === 'ArrowLeft') goToPage(state.page - 1);
    if (event.key === 'ArrowRight') goToPage(state.page + 1);
    if (event.key === 'Escape' && state.assist.step !== 'idle') closeAssist(false);
});

/* ==================== EVENTS — LAYER C ==================== */
el.fabBtn.addEventListener('click', () => {
    if (state.assist.step !== 'idle') {
        closeAssist(false);
    } else {
        openAssist();
    }
});

function onAssistClick(event) {
    const btn = event.target.closest('[data-assist]');
    if (!btn) return;
    const action = btn.dataset.assist;

    if (action === 'pick') {
        state.assist.conceptId = btn.dataset.concept;
        state.assist.step = 'clarify';
    } else if (action === 'confirm') {
        state.assist.step = 'confirm';
    } else if (action === 'back-select') {
        state.assist.conceptId = null;
        state.assist.step = 'select';
    } else if (action === 'open-refresher') {
        state.assist.step = 'refresher';
    } else if (action === 'to-done') {
        state.assist.step = 'done';
    } else if (action === 'close') {
        closeAssist(false);
        return;
    } else if (action === 'close-restore') {
        closeAssist(true);
        return;
    }
    renderAssist();
}

el.assistBody.addEventListener('click', onAssistClick);

el.assistCloseBtn.addEventListener('click', () => closeAssist(false));

/* Summary */
el.summaryBtn.addEventListener('click', () => {
    if (el.summaryBanner.hidden) {
        showSummary();
    } else {
        hideSummary();
    }
});
el.summaryCloseBtn.addEventListener('click', hideSummary);

/* Chatbot button — feature có sẵn */
el.chatbotBtn.addEventListener('click', () => {
    /* Placeholder: chatbot interface is a pre-existing feature */
});

/* Annotation */
el.annotationToggle.addEventListener('click', () => {
    const open = el.annotation.hidden;
    el.annotation.hidden = !open;
    el.annotationToggle.setAttribute('aria-expanded', String(open));
});

/* ==================== INIT ==================== */
const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

window.addEventListener('resize', () => setSidebar(!el.body.classList.contains('sidebar-collapsed')));

el.lessonTitle.textContent = LESSON_TITLE;
document.title = 'Option C — Collaborative';
state.visited.add(currentItem().id);
setSidebar(!isNarrow());
render();
