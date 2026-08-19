/* ==========================================================================
   Option B — Proactive Observer (UI only, không backend)
   Tín hiệu đọc được GIẢ LẬP: thời gian ở cùng một trang + số lần quay lại trang.
   ========================================================================== */

const LESSON_TITLE = 'Bài 2 · Start-Up Finance — Funding & Business Plan';

const COURSE = [
    {
        name: 'Slides',
        items: [
            { id: 'funding', title: 'E-Commerce Start-Up — Funding', pages: 23, pdfUrl: '../resource/2.Funding.pdf' },
            { id: 'business-plan', title: 'Business Plan Pack — The Prince’s Trust', pages: 23, pdfUrl: '../resource/3.BusinessPlan.pdf' },
        ],
    },
];

/* ==================== FIXTURES CHẨN ĐOÁN (giả lập) ==================== */
const CONCEPTS = {
    'valuation-challenge': {
        name: 'Vì sao start-up khó định giá',
        duration: '2 phút',
        bullets: [
            'Chưa có lịch sử tài chính đủ dài để ngoại suy',
            'Doanh thu/lợi nhuận còn nhỏ hoặc âm nên các hệ số quen dùng vô nghĩa',
            'Rủi ro thất bại cao và ít công ty tương đương để so sánh',
        ],
        example: 'Ví dụ: một shop online mới 8 tháng, doanh thu chưa ổn định — không thể định giá bằng P/E như doanh nghiệp niêm yết.',
    },
    'valuation-method': {
        name: 'Các phương pháp định giá start-up',
        duration: '3 phút',
        bullets: [
            'Cost-to-duplicate: tốn bao nhiêu để dựng lại công ty tương tự từ đầu',
            'Market multiple: so với thương vụ gần nhất trong cùng ngành',
            'Discounted cash flow: chiết khấu dòng tiền dự phóng, rất nhạy với giả định',
        ],
        example: 'Cùng một công ty, cost-to-duplicate cho con số thấp nhất, market multiple thường cho con số cao nhất.',
    },
    'pre-post-money': {
        name: 'Pre-money vs. post-money valuation',
        duration: '2 phút',
        bullets: [
            'Pre-money: giá trị công ty trước khi nhận tiền của vòng này',
            'Post-money = pre-money + số tiền vừa gọi được',
            '% cổ phần nhà đầu tư nhận = số tiền đầu tư / post-money',
        ],
        example: 'Pre-money 4 tỷ, gọi thêm 1 tỷ → post-money 5 tỷ, nhà đầu tư giữ 20%.',
    },
    'funding-rounds': {
        name: 'Các vòng gọi vốn (Seed → Series A/B/C)',
        duration: '3 phút',
        bullets: [
            'Seed: tiền để chứng minh có người cần sản phẩm',
            'Series A: đã có tín hiệu thị trường, tiền để mở rộng mô hình',
            'Series B/C: tăng tốc quy mô, mở thị trường mới',
        ],
        example: 'Mỗi vòng đổi một phần cổ phần lấy tiền, nên founder bị pha loãng dần qua từng vòng.',
    },
    'elevator-pitch': {
        name: 'Elevator pitch (quick pitch)',
        duration: '2 phút',
        bullets: [
            'Nói được: bán gì — cho ai — vì sao họ chọn bạn, trong khoảng 30 giây',
            'Viết sau cùng, khi các phần còn lại của business plan đã rõ',
            'Không dùng thuật ngữ, người ngoài ngành phải hiểu ngay',
        ],
        example: '"Tôi bán bánh mì chay giao tận nơi cho dân văn phòng quận 1, đặt trước 10 phút là có."',
    },
    'competitor-analysis': {
        name: 'Phân tích đối thủ',
        duration: '2 phút',
        bullets: [
            'Liệt kê đối thủ trực tiếp và cả cách khách hàng đang tự xoay xở',
            'So sánh trên giá, chất lượng, địa điểm, dịch vụ — không chỉ giá',
            'Chỉ ra một điểm bạn hơn thật sự và giữ được',
        ],
        example: 'Đối thủ của tiệm giặt ủi không chỉ là tiệm bên cạnh, mà còn là chiếc máy giặt ở nhà khách.',
    },
    'revenue-forecast': {
        name: 'Dự phóng doanh thu & điểm hoà vốn',
        duration: '3 phút',
        bullets: [
            'Doanh thu = số khách × giá trị mỗi đơn × tần suất mua',
            'Tách chi phí cố định và chi phí biến đổi trước khi tính hoà vốn',
            'Điểm hoà vốn = chi phí cố định / lợi nhuận gộp mỗi đơn',
        ],
        example: 'Chi phí cố định 20 triệu/tháng, lãi gộp 40k/đơn → cần 500 đơn/tháng mới hoà vốn.',
    },
};

/* Slide + trang → khái niệm khả nghi. Trang không có trong bảng thì AI không gợi ý gì. */
const SUSPECT_MAP = {
    'funding': {
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

const SIGNAL = {
    dwellMs: 8000,       // ở cùng một trang bao lâu thì coi là đang vướng
    revisitHits: 2,      // quay lại trang đó bao nhiêu lần thì coi là đọc lại
    tickMs: 1000,
    snoozeMs: 10 * 60 * 1000,
    minConfidence: 50,   // dưới ngưỡng này thì KHÔNG hiện card
};

/* ==================== STATE ==================== */
const state = {
    moduleIndex: 0,
    itemIndex: 0,
    page: 1,
    visited: new Set(),
    expanded: COURSE.map(() => true),

    // layer Option B
    tracking: true,
    snoozeUntil: 0,
    dwellMs: 0,
    visits: {},              // 'itemId:page' -> số lần vào trang
    hint: null,              // { conceptId, confidence, dwellMs, revisits, mode }
    dismissed: new Set(),    // 'itemId:page' đã bị bỏ qua
    refresherConcept: null,
    pageBeforeRefresher: null,
    rejected: false,         // user đã bấm "Không đúng" ít nhất 1 lần
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

    notice: document.getElementById('notice'),
    noticeOkBtn: document.getElementById('noticeOkBtn'),
    observerChip: document.getElementById('observerChip'),
    observerText: document.getElementById('observerText'),
    observerMenu: document.getElementById('observerMenu'),
    hint: document.getElementById('hint'),
    resetBtn: document.getElementById('resetBtn'),
    refresher: document.getElementById('refresher'),
    refresherTitle: document.getElementById('refresherTitle'),
    refresherBody: document.getElementById('refresherBody'),
    refresherCloseBtn: document.getElementById('refresherCloseBtn'),
    refresherBackBtn: document.getElementById('refresherBackBtn'),
    annotation: document.getElementById('annotation'),
    annotationToggle: document.getElementById('annotationToggle'),
    signalLog: document.getElementById('signalLog'),
};

/* ==================== HELPERS ==================== */
const ICON_CHEVRON = '<svg class="module-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ICON_STATE = {
    current: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M7.4 6.2l4 2.8-4 2.8V6.2Z" fill="currentColor"/></svg>',
    visited: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M5.6 9.2l2.2 2.2 4.6-4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    idle: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.4"/></svg>',
};

const currentItem = () => COURSE[state.moduleIndex].items[state.itemIndex];
const totalItems = () => COURSE.reduce((sum, m) => sum + m.items.length, 0);
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const pageKey = () => `${currentItem().id}:${state.page}`;
const isSnoozed = () => Date.now() < state.snoozeUntil;
const isObserving = () => state.tracking && !isSnoozed();

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

/* ==================== RENDER: left panel ==================== */
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

/* ==================== RENDER: right panel ==================== */
/* Viewer PDF của browser chỉ đọc #page lúc load: đổi fragment trên iframe đang sống thì
   nó KHÔNG nhảy trang. Nên mỗi lần đổi trang phải thay hẳn node iframe để nạp lại. */
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
    renderObserver();
    renderHint();
}

/* ==================== ACTIONS (base) ==================== */
function selectItem(moduleIndex, itemIndex) {
    state.moduleIndex = moduleIndex;
    state.itemIndex = itemIndex;
    state.page = 1;
    state.visited.add(currentItem().id);
    onPageEnter();
    render();
    if (isNarrow()) setSidebar(false);
}

function goToPage(page) {
    const next = clamp(Number(page) || 1, 1, currentItem().pages);
    if (next === state.page) { el.pageInput.value = state.page; return; }
    state.page = next;
    onPageEnter();
    render();
}

function toggleModule(moduleIndex) {
    state.expanded[moduleIndex] = !state.expanded[moduleIndex];
    renderSidebar();
}

function setSidebar(open) {
    el.body.classList.toggle('sidebar-collapsed', !open);
    el.sidebarReopenBtn.hidden = open;
    el.sidebarBackdrop.hidden = !open || !isNarrow();
    el.sidebar.setAttribute('aria-hidden', String(!open));
}

/* ==================== ENGINE: tín hiệu đọc (giả lập) ==================== */
function onPageEnter() {
    state.dwellMs = 0;
    state.hint = null;
    const key = pageKey();
    state.visits[key] = (state.visits[key] || 0) + 1;
}

function revisitsHere() {
    return state.visits[pageKey()] || 1;
}

/* Độ tin cậy suy ra từ dwell + số lần đọc lại. Thuần tính toán, không có model nào cả. */
function confidenceOf(dwellMs, revisits) {
    const raw = 46 + (dwellMs / 1000) * 1.1 + (revisits - 1) * 11;
    return Math.round(clamp(raw, 45, 92));
}

function suspectMapHere() {
    return SUSPECT_MAP[currentItem().id] || {};
}

function suspectConcept() {
    const mapped = suspectMapHere()[state.page];
    if (mapped) return mapped;
    // Fallback: pick first concept from current slide
    const deckConcepts = Object.values(suspectMapHere());
    return deckConcepts.length ? deckConcepts[0] : null;
}

function tick() {
    if (isObserving()) state.dwellMs += SIGNAL.tickMs;
    if (state.snoozeUntil && !isSnoozed()) state.snoozeUntil = 0;
    evaluateSignal();
    renderObserver();
    renderSignalLog();
}

function evaluateSignal() {
    if (!isObserving() || state.hint || state.refresherConcept) return;
    if (state.dismissed.has(pageKey())) return;

    const conceptId = suspectConcept();
    if (!conceptId) return;

    const revisits = revisitsHere();
    const enough = state.dwellMs >= SIGNAL.dwellMs || revisits >= SIGNAL.revisitHits;
    if (!enough) return;

    const confidence = confidenceOf(state.dwellMs, revisits);
    if (confidence < SIGNAL.minConfidence) return;   // tự tin thấp thì im, không hiện card

    showHint(conceptId, confidence, revisits);
}

function showHint(conceptId, confidence, revisits) {
    state.hint = { conceptId, confidence, revisits, dwellMs: state.dwellMs, mode: 'suggest' };
    renderHint();
}

/* ==================== RENDER: toast gợi ý ==================== */
function renderHint() {
    const hint = state.hint;
    if (!hint) {
        el.hint.hidden = true;
        el.hint.innerHTML = '';
        return;
    }

    const concept = CONCEPTS[hint.conceptId];

    const head = `
        <div class="hint-head">
            <span aria-hidden="true">💡</span>
            <strong>Có lẽ bạn đang vướng phần này</strong>
            <button class="icon-btn sm" data-hint="dismiss" aria-label="Bỏ qua">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 4.5l9 9m0-9-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
        </div>`;

    el.hint.innerHTML = hint.mode === 'alternatives'
        ? head + renderHintAlternatives(hint)
        : head + `
            <p class="hint-body"><strong>${escapeHtml(concept.name)}</strong></p>
            <div class="hint-actions">
                <button class="btn btn-sm btn-primary" data-hint="open">Ôn lại (${escapeHtml(concept.duration)})</button>
                <button class="btn btn-sm btn-ghost" data-hint="reject">Không đúng</button>
            </div>`;

    el.hint.hidden = false;
}

function renderHintAlternatives(hint) {
    /* Ưu tiên các khái niệm cùng slide đang đọc, thiếu thì lấy thêm từ các slide khác. Tối đa 3. */
    const sameDeck = Object.values(suspectMapHere());
    const ids = [...new Set([...sameDeck, ...Object.keys(CONCEPTS)])]
        .filter((id) => id !== hint.conceptId)
        .slice(0, 3);

    const others = ids
        .map((id) => `<button class="alt-item" data-concept="${id}">${escapeHtml(CONCEPTS[id].name)}</button>`)
        .join('');

    return `
        <p class="hint-body">Vậy bạn đang vướng phần nào?</p>
        <div class="hint-alt-list">${others}</div>`;
}

/* ==================== RENDER: chip observer + log ==================== */
function renderObserver() {
    el.body.classList.toggle('tracking-off', !state.tracking);
    el.body.classList.toggle('tracking-snoozed', state.tracking && isSnoozed());

    if (!state.tracking) {
        el.observerText.textContent = 'Đã tắt';
    } else if (isSnoozed()) {
        const left = Math.max(0, state.snoozeUntil - Date.now());
        const mm = String(Math.floor(left / 60000)).padStart(2, '0');
        const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, '0');
        el.observerText.textContent = `Tạm ngừng ${mm}:${ss}`;
    } else {
        el.observerText.textContent = 'Hỗ trợ';
    }
}

function renderSignalLog() {
    const conceptId = suspectConcept();
    const revisits = revisitsHere();
    const confidence = confidenceOf(state.dwellMs, revisits);
    const status = !state.tracking ? 'tracking OFF'
        : isSnoozed() ? 'snoozed'
        : !conceptId ? 'trang này không có khái niệm mapping'
        : state.dismissed.has(pageKey()) ? 'đã xử lý ở trang này (bỏ qua / đã mở bài ôn)'
        : state.hint ? 'đang hiện card'
        : confidence < SIGNAL.minConfidence ? `confidence ${confidence}% < ${SIGNAL.minConfidence}% → chưa hiện card`
        : 'đủ điều kiện, chờ tick';

    el.signalLog.textContent =
        `trang ${state.page} · dwell ${Math.round(state.dwellMs / 1000)}s · revisit ${revisits} · confidence ${confidence}% → ${status}`;
}

/* ==================== ACTIONS: card / refresher / privacy ==================== */
function dismissHint() {
    state.dismissed.add(pageKey());
    state.hint = null;
    renderHint();
    renderSignalLog();
}

function rejectHint() {
    if (!state.hint) return;
    state.rejected = true;
    state.hint.mode = 'alternatives';
    renderHint();
}

function openRefresher(conceptId) {
    const concept = CONCEPTS[conceptId];
    if (!concept) return;

    state.refresherConcept = conceptId;
    state.pageBeforeRefresher = state.page;
    state.hint = null;
    renderHint();

    el.refresherTitle.textContent = concept.name;
    el.refresherBody.innerHTML = `
        <span class="refresher-meta">≈ ${escapeHtml(concept.duration)}</span>
        <h3>Cần nắm</h3>
        <ul>${concept.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
        <h3>Ví dụ</h3>
        <p class="refresher-example">${escapeHtml(concept.example)}</p>
        <h3>Sau bài ôn</h3>
        <p>Slide vẫn giữ nguyên ở trang ${state.pageBeforeRefresher} — đóng panel là quay lại đúng chỗ đang đọc.</p>`;
    el.refresher.hidden = false;
    el.refresherBackBtn.focus();
}

function closeRefresher(returnToPage) {
    state.refresherConcept = null;
    el.refresher.hidden = true;
    if (returnToPage && state.pageBeforeRefresher) {
        state.dismissed.add(`${currentItem().id}:${state.pageBeforeRefresher}`);
        goToPage(state.pageBeforeRefresher);
    }
    state.pageBeforeRefresher = null;
}

function setPrivacy(action) {
    if (action === 'snooze') {
        state.snoozeUntil = Date.now() + SIGNAL.snoozeMs;
        state.tracking = true;
    } else if (action === 'off') {
        state.tracking = false;
        state.snoozeUntil = 0;
    } else if (action === 'on') {
        state.tracking = true;
        state.snoozeUntil = 0;
        state.dwellMs = 0;
    }
    state.hint = null;
    closeObserverMenu();
    renderHint();
    renderObserver();
    renderSignalLog();
}

function closeObserverMenu() {
    el.observerMenu.hidden = true;
    el.observerChip.setAttribute('aria-expanded', 'false');
}

function resetContext() {
    state.page = 1;
    state.dwellMs = 0;
    state.visits = {};
    state.dismissed = new Set();
    state.hint = null;
    state.rejected = false;
    state.tracking = true;
    state.snoozeUntil = 0;
    closeRefresher(false);
    closeObserverMenu();
    el.notice.hidden = false;
    onPageEnter();
    render();
    renderSignalLog();
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
    if (event.key === 'Escape') { closeObserverMenu(); if (state.hint) dismissHint(); }
});

/* Toast: mở bài ôn / không đúng / bỏ qua / chọn khái niệm khác */
el.hint.addEventListener('click', (event) => {
    const action = event.target.closest('[data-hint]');
    if (action) {
        if (action.dataset.hint === 'open') openRefresher(state.hint && state.hint.conceptId);
        if (action.dataset.hint === 'reject') rejectHint();
        if (action.dataset.hint === 'dismiss') dismissHint();
        return;
    }
    const alt = event.target.closest('[data-concept]');
    if (alt) openRefresher(alt.dataset.concept);
});

/* Privacy: chip menu, banner, link trong toast */
document.addEventListener('click', (event) => {
    const privacyBtn = event.target.closest('[data-privacy]');
    if (privacyBtn) {
        setPrivacy(privacyBtn.dataset.privacy);
        return;
    }
    if (!event.target.closest('#observer')) closeObserverMenu();
});

el.observerChip.addEventListener('click', () => {
    const open = el.observerMenu.hidden;
    el.observerMenu.hidden = !open;
    el.observerChip.setAttribute('aria-expanded', String(open));
});

el.noticeOkBtn.addEventListener('click', () => { el.notice.hidden = true; });

el.refresherCloseBtn.addEventListener('click', () => closeRefresher(false));
el.refresherBackBtn.addEventListener('click', () => closeRefresher(true));

el.annotationToggle.addEventListener('click', () => {
    const open = el.annotation.hidden;
    el.annotation.hidden = !open;
    el.annotationToggle.setAttribute('aria-expanded', String(open));
});

/* Demo controls cho facilitator */
el.resetBtn.addEventListener('click', resetContext);

/* ==================== INIT ==================== */
const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

window.addEventListener('resize', () => setSidebar(!el.body.classList.contains('sidebar-collapsed')));

el.lessonTitle.textContent = LESSON_TITLE;
document.title = 'Option B — Proactive Observer';
state.visited.add(currentItem().id);
setSidebar(!isNarrow());
onPageEnter();
render();
renderSignalLog();
setInterval(tick, SIGNAL.tickMs);
