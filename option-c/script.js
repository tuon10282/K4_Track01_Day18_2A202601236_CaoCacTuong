/* ==========================================================================
   Option C — Collaborative: bisect mạch hiểu (UI only, không backend)
   Learner tự khoanh chỗ mình đứt mạch; AI chẻ đôi đúng đoạn đó rồi XIN XÁC NHẬN
   trước khi mở bài ôn. Mọi mạch + chẩn đoán là fixture trong file này.
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

/* ==================== FIXTURES: KHÁI NIỆM NỀN ==================== */
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

/* Khái niệm nền có trong từng deck — dùng cho nhánh fallback (learner tự chọn). */
const DECK_CONCEPTS = {
    'funding': ['valuation-challenge', 'valuation-method', 'pre-post-money', 'funding-rounds'],
    'business-plan': ['elevator-pitch', 'competitor-analysis', 'revenue-forecast'],
};

/* ==================== FIXTURES: MẠCH SUY LUẬN TỪNG TRANG ====================
   Cây 2 tầng. Bước có `children` = chỗ AI có thể chẻ đôi hỏi lại.
   Bước lá gắn `concept` = khái niệm nền mà bước đó dựa vào.
   Key = `${itemId}:${page}`. Trang không có key → nhánh fallback. */
const CHAINS = {
    'funding:12': {
        lead: 'Mạch của trang này gồm 4 bước. Bạn theo được tới đâu?',
        steps: [
            { id: 's1', text: 'Công ty được định giá 4 tỷ trước khi nhận tiền' },
            { id: 's2', text: 'Nhà đầu tư rót thêm 1 tỷ vào công ty' },
            {
                id: 's3', text: 'Nên nhà đầu tư nắm 20% công ty', concept: 'pre-post-money',
                children: [
                    { id: 's3a', text: 'Giá trị sau khi rót = 4 tỷ + 1 tỷ = 5 tỷ', concept: 'pre-post-money' },
                    { id: 's3b', text: '1 tỷ / 5 tỷ = 20% → tính theo giá trị SAU khi rót', concept: 'pre-post-money' },
                ],
            },
            { id: 's4', text: 'Cổ phần founder bị pha loãng qua mỗi vòng', concept: 'funding-rounds' },
        ],
    },
    'funding:15': {
        lead: 'Mạch của trang này gồm 4 bước. Bạn theo được tới đâu?',
        steps: [
            { id: 's1', text: 'Start-up gọi vốn theo nhiều vòng, không lấy hết tiền một lần' },
            { id: 's2', text: 'Mỗi vòng bán thêm một phần cổ phần để lấy tiền' },
            {
                id: 's3', text: 'Nên qua mỗi vòng, tỷ lệ của founder giảm dần', concept: 'funding-rounds',
                children: [
                    { id: 's3a', text: 'Vòng mới phát hành thêm cổ phần → tổng số cổ phần tăng', concept: 'funding-rounds' },
                    { id: 's3b', text: 'Số cổ phần cũ chia cho tổng lớn hơn → tỷ lệ nhỏ đi', concept: 'pre-post-money' },
                ],
            },
            { id: 's4', text: 'Nhưng giá trị tuyệt đối phần founder vẫn có thể tăng nếu công ty được định giá cao hơn', concept: 'pre-post-money' },
        ],
    },
    'business-plan:14': {
        lead: 'Mạch của trang này gồm 4 bước. Bạn theo được tới đâu?',
        steps: [
            { id: 's1', text: 'Khách hàng luôn có cách khác để giải quyết nhu cầu đó' },
            { id: 's2', text: 'Nên đối thủ gồm cả tiệm cùng ngành lẫn cách khách tự xoay xở' },
            {
                id: 's3', text: 'Vì vậy phải so sánh trên nhiều tiêu chí, không chỉ giá', concept: 'competitor-analysis',
                children: [
                    { id: 's3a', text: 'Mỗi tiêu chí (giá, chất lượng, địa điểm, dịch vụ) là một lý do khách chọn bên nào', concept: 'competitor-analysis' },
                    { id: 's3b', text: 'Chỉ hơn về giá thì dễ bị bắt chước → cần điểm hơn giữ được', concept: 'competitor-analysis' },
                ],
            },
            { id: 's4', text: 'Ghi vào business plan đúng một điểm mình hơn thật sự', concept: 'elevator-pitch' },
        ],
    },
    'business-plan:17': {
        lead: 'Mạch của trang này gồm 4 bước. Bạn theo được tới đâu?',
        steps: [
            { id: 's1', text: 'Doanh thu = số khách × giá trị mỗi đơn × tần suất mua' },
            { id: 's2', text: 'Chi phí tách làm cố định (không đổi theo số đơn) và biến đổi (theo từng đơn)' },
            {
                id: 's3', text: 'Nên bán 500 đơn/tháng mới hoà vốn', concept: 'revenue-forecast',
                children: [
                    { id: 's3a', text: 'Mỗi đơn để lại lãi gộp = giá bán − chi phí biến đổi của đơn đó', concept: 'revenue-forecast' },
                    { id: 's3b', text: 'Chi phí cố định / lãi gộp mỗi đơn = số đơn cần để hoà vốn', concept: 'revenue-forecast' },
                ],
            },
            { id: 's4', text: 'Vượt số đơn đó mới bắt đầu có lãi', concept: 'revenue-forecast' },
        ],
    },
};

/* Trang demo có mạch — dùng cho nút “Tới trang có mạch”. */
const DEMO_CHAIN_PAGE = 12;

/* FIXTURE-PLACEHOLDER */


/* ==================== STATE ==================== */
const state = {
    moduleIndex: 0,
    itemIndex: 0,
    page: 1,
    visited: new Set(),
    expanded: COURSE.map(() => true),
    /* step: idle | bisect | diagnosis | refresher | verify | fallback */
    assist: { step: 'idle', trail: [], stepId: null, conceptId: null },
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
    stageAiBtn: document.getElementById('stageAiBtn'),
    /* Layer C */
    assist: document.getElementById('assist'),
    assistKicker: document.getElementById('assistKicker'),
    assistTitle: document.getElementById('assistTitle'),
    assistBody: document.getElementById('assistBody'),
    assistFoot: document.getElementById('assistFoot'),
    assistCloseBtn: document.getElementById('assistCloseBtn'),
    stuckBtn: document.getElementById('stuckBtn'),
    gotoChainBtn: document.getElementById('gotoChainBtn'),
    resetBtn: document.getElementById('resetBtn'),
    annotationToggle: document.getElementById('annotationToggle'),
    annotation: document.getElementById('annotation'),
    stateLog: document.getElementById('stateLog'),
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

/* ==========================================================================
   OPTION C — ENGINE BISECT (thuần hàm, không model, không backend)
   ========================================================================== */
const chainKey = () => `${currentItem().id}:${state.page}`;
const chainHere = () => CHAINS[chainKey()] || null;

function findStep(steps, id) {
    for (const step of steps || []) {
        if (step.id === id) return step;
        const hit = findStep(step.children, id);
        if (hit) return hit;
    }
    return null;
}

/* Bước gốc learner đã đánh dấu → bước đang được chẻ đôi */
function splitStep() {
    const chain = chainHere();
    if (!chain || !state.assist.trail.length) return null;
    return findStep(chain.steps, state.assist.trail[state.assist.trail.length - 1]);
}

/* Số bước learner theo được trước chỗ đứt */
function rootIndexOf(stepId) {
    const chain = chainHere();
    if (!chain) return -1;
    return chain.steps.findIndex((s) => s.id === stepId || (s.children || []).some((c) => c.id === stepId));
}

function breakStep() {
    const chain = chainHere();
    return chain && state.assist.stepId ? findStep(chain.steps, state.assist.stepId) : null;
}

function clearMarks() {
    state.assist.trail = [];
    state.assist.stepId = null;
    state.assist.conceptId = null;
}

/* Learner bấm “Mình đứt từ đây”: có nhánh con → chẻ đôi hỏi lại; là lá → chốt chẩn đoán */
function markBreak(stepId) {
    const chain = chainHere();
    const step = chain ? findStep(chain.steps, stepId) : null;
    if (!step) return;

    if (step.children && step.children.length) {
        state.assist.trail.push(stepId);
        state.assist.stepId = null;
        state.assist.step = 'bisect';
    } else {
        state.assist.stepId = stepId;
        state.assist.conceptId = step.concept || null;
        state.assist.step = state.assist.conceptId ? 'diagnosis' : 'fallback';
    }
    renderAssist();
}

/* Panel chỉ mở khi learner chủ động — AI không bao giờ tự bật */
function openAssist() {
    if (state.assist.step === 'idle') {
        state.pageBeforeAssist = state.page;
        clearMarks();
        state.assist.step = chainHere() ? 'bisect' : 'fallback';
    }
    el.assist.hidden = false;
    renderAssist();
}

function closeAssist(returnToPage) {
    const back = state.pageBeforeAssist;
    state.assist.step = 'idle';
    clearMarks();
    state.pageBeforeAssist = null;
    el.assist.hidden = true;
    if (returnToPage && back) goToPage(back);
    renderAssist();
}

/* Đổi trang/deck khi panel đang mở: mạch cũ không còn đúng → dựng lại theo trang mới */
function syncAssist() {
    if (state.assist.step !== 'bisect' && state.assist.step !== 'fallback') return;
    clearMarks();
    state.assist.step = chainHere() ? 'bisect' : 'fallback';
}

function resetContext() {
    state.assist.step = 'idle';
    clearMarks();
    state.pageBeforeAssist = null;
    el.assist.hidden = true;
    state.moduleIndex = 0;
    state.itemIndex = 0;
    state.page = 1;
    state.visited = new Set([currentItem().id]);
    render();
}

/* ==================== RENDER: panel assist ==================== */
const STEP_META = {
    bisect: { kicker: 'Bạn khoanh chỗ đứt', title: 'Mạch suy luận của trang này' },
    diagnosis: { kicker: 'Mình đoán — bạn chốt', title: 'Có phải chỗ này không?' },
    refresher: { kicker: 'Bài ôn ngắn', title: 'Khái niệm nền' },
    verify: { kicker: 'Bạn tự kiểm tra', title: 'Đọc lại đúng bước vừa đứt' },
    fallback: { kicker: 'Giới hạn của mình', title: 'Bạn chọn giúp mình' },
};

function stepRow(step, mark, extraClass, canBreak, tag, inner) {
    return `
        <li class="step${extraClass || ''}">
            <div class="step-row">
                <span class="step-mark" aria-hidden="true">${mark}</span>
                <div class="step-main">
                    <p class="step-text">${escapeHtml(step.text)}</p>
                    ${tag || ''}
                    ${canBreak ? `<button class="step-break" data-assist="break" data-step="${step.id}">Mình đứt từ đây</button>` : ''}
                </div>
            </div>
            ${inner || ''}
        </li>`;
}

function viewBisect() {
    const chain = chainHere();
    if (!chain) return viewFallback();

    const split = splitStep();
    const splitIdx = split ? chain.steps.findIndex((s) => s.id === split.id) : -1;

    const rows = chain.steps.map((step, i) => {
        if (splitIdx < 0) return stepRow(step, String(i + 1), '', true, '', '');
        if (i < splitIdx) return stepRow(step, '✓', ' is-ok', false, '<span class="step-tag">✓ Bạn theo được</span>', '');
        if (i > splitIdx) return stepRow(step, String(i + 1), ' is-after', false, '', '');

        const kids = (step.children || [])
            .map((c, j) => stepRow(c, `${i + 1}${'ab'[j] || ''}`, '', true, '', ''))
            .join('');
        const inner = `
            <p class="split-note">Mình chẻ bước này làm 2. Đứt ở nửa nào?</p>
            <ol class="chain chain-sub">${kids}</ol>`;
        return stepRow(step, String(i + 1), ' is-split', false, '<span class="step-tag">Đang chẻ nhỏ</span>', inner);
    }).join('');

    return {
        body: `
            <p class="assist-note">Đọc từng bước bên dưới. Bước nào bạn chưa hiểu rõ thì bấm nút bên cạnh nó.</p>
            <p class="assist-lead">${escapeHtml(chain.lead)}</p>
            <ol class="chain">${rows}</ol>
            <div class="concept-list">
                <button class="concept-item" data-assist="all-ok">Mình theo được hết ${chain.steps.length} bước
                    <small>Chỗ mình mắc không nằm trong mạch này</small></button>
            </div>`,
        foot: '<button class="btn btn-ghost" data-assist="close">Đóng</button>',
    };
}

function viewDiagnosis() {
    const chain = chainHere();
    const step = breakStep();
    const concept = CONCEPTS[state.assist.conceptId];
    if (!chain || !step || !concept) return viewFallback();

    const rootIdx = rootIndexOf(step.id);
    const evidence = rootIdx > 0
        ? `Bạn theo được tới <b>bước ${rootIdx}</b>, đứt ở «<b>${escapeHtml(step.text)}</b>».`
        : `Bạn đứt ngay từ <b>bước 1</b>: «<b>${escapeHtml(step.text)}</b>».`;
    const trail = [...state.assist.trail, step.id]
        .map((id) => findStep(chain.steps, id))
        .filter(Boolean)
        .map((s) => escapeHtml(s.text))
        .join(' → ');

    return {
        body: `
            <p class="diag-evidence">${evidence}
                <span class="diag-trail">Đường bạn vừa khoanh: ${trail}</span></p>
            <div class="diag-gap">
                <p class="diag-gap-label">Khái niệm nền</p>
                <p class="diag-gap-name">${escapeHtml(concept.name)}</p>
            </div>
            <p class="diag-ask">Mình đoán bước đó đứt vì khái niệm này chưa chắc — bạn xác nhận thì mình mới mở bài ôn.</p>`,
        foot: `
            <button class="btn btn-primary" data-assist="confirm">Đúng, mở bài ôn (${escapeHtml(concept.duration)})</button>
            <button class="btn btn-secondary" data-assist="reject">Không phải — mình đứt ở chỗ khác</button>
            <button class="btn btn-ghost" data-assist="close">Đóng</button>`,
    };
}

function viewRefresher() {
    const concept = CONCEPTS[state.assist.conceptId];
    if (!concept) return viewFallback();

    return {
        body: `
            <span class="assist-meta">${escapeHtml(concept.duration)} · khái niệm nền</span>
            <h3>Cần nhớ</h3>
            <ul>${concept.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
            <h3>Ví dụ</h3>
            <p class="assist-example">${escapeHtml(concept.example)}</p>`,
        foot: `
            <button class="btn btn-primary" data-assist="to-verify">Xong — quay lại bước vừa đứt</button>
            <button class="btn btn-ghost" data-assist="close">Đóng</button>`,
    };
}

function viewVerify() {
    const step = breakStep();
    return {
        body: `
            <p class="assist-note">Mình <b>không tự đánh giá</b> bạn hiểu hay chưa — bạn tự chốt.</p>
            <p class="verify-quote">${escapeHtml(step ? step.text : 'Bước bạn vừa đánh dấu')}</p>
            <p class="diag-ask">Giờ theo được chưa?</p>`,
        foot: `
            <button class="btn btn-primary" data-assist="done">Theo được rồi — quay lại slide</button>
            <button class="btn btn-secondary" data-assist="other-concept">Vẫn chưa — chọn khái niệm nền khác</button>`,
    };
}

function viewFallback() {
    const ids = DECK_CONCEPTS[currentItem().id] || Object.keys(CONCEPTS);
    const hasChain = Boolean(chainHere());
    const reason = hasChain
        ? 'Vậy chỗ bạn mắc không nằm trong mạch mình dựng — mình <b>chưa biết</b> bạn thiếu khái niệm nào.'
        : `Mạch của trang ${state.page} mình <b>chưa dựng được</b>, nên không có gì để chẻ nhỏ.`;
    const items = ids.map((id) => `
        <button class="concept-item" data-assist="concept" data-concept="${id}">${escapeHtml(CONCEPTS[id].name)}
            <small>Bài ôn ${escapeHtml(CONCEPTS[id].duration)}</small></button>`).join('');

    return {
        body: `
            <p class="assist-note">${reason} Bạn chọn giúp một khái niệm nền của slide này để mình mở bài ôn — không chọn cũng không sao.</p>
            <div class="concept-list">${items}</div>`,
        foot: hasChain
            ? `<button class="btn btn-secondary" data-assist="reject">Xem lại mạch của trang</button>
               <button class="btn btn-ghost" data-assist="close">Đóng</button>`
            : '<button class="btn btn-ghost" data-assist="close">Đóng</button>',
    };
}

const ASSIST_VIEWS = {
    bisect: viewBisect,
    diagnosis: viewDiagnosis,
    refresher: viewRefresher,
    verify: viewVerify,
    fallback: viewFallback,
};

function renderAssist() {
    if (state.assist.step === 'idle') {
        el.assist.hidden = true;
        el.assistBody.innerHTML = '';
        el.assistFoot.innerHTML = '';
        renderStateLog();
        return;
    }

    el.assist.hidden = false;
    const meta = STEP_META[state.assist.step];
    const concept = CONCEPTS[state.assist.conceptId];
    el.assistKicker.textContent = meta.kicker;
    el.assistTitle.textContent = state.assist.step === 'refresher' && concept ? concept.name : meta.title;

    const view = ASSIST_VIEWS[state.assist.step]();
    el.assistBody.innerHTML = view.body;
    el.assistFoot.innerHTML = view.foot;
    el.assistBody.scrollTop = 0;
    renderStateLog();
}

function renderStateLog() {
    const a = state.assist;
    const trail = [...a.trail, a.stepId].filter(Boolean).join(' → ') || '—';
    el.stateLog.textContent =
        `trang ${state.page} · deck=${currentItem().id} · step=${a.step} · trail: ${trail} · gap=${a.conceptId || '—'}`;
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
function onAssistClick(event) {
    const btn = event.target.closest('[data-assist]');
    if (!btn) return;
    const action = btn.dataset.assist;

    if (action === 'break') { markBreak(btn.dataset.step); return; }
    if (action === 'concept') {
        state.assist.conceptId = btn.dataset.concept;
        state.assist.step = 'refresher';
    } else if (action === 'all-ok' || action === 'other-concept') {
        state.assist.conceptId = null;
        state.assist.step = 'fallback';
    } else if (action === 'confirm') {
        state.assist.step = 'refresher';
    } else if (action === 'reject') {
        clearMarks();
        state.assist.step = chainHere() ? 'bisect' : 'fallback';
    } else if (action === 'to-verify') {
        state.assist.step = 'verify';
    } else if (action === 'done') {
        closeAssist(true);
        return;
    } else if (action === 'close') {
        closeAssist(false);
        return;
    }
    renderAssist();
}

el.assistBody.addEventListener('click', onAssistClick);
el.assistFoot.addEventListener('click', onAssistClick);

el.stuckBtn.addEventListener('click', openAssist);
el.stageAiBtn.addEventListener('click', openAssist);
el.assistCloseBtn.addEventListener('click', () => closeAssist(false));

/* Nút demo cho facilitator */
el.gotoChainBtn.addEventListener('click', () => {
    selectItem(0, 0);
    goToPage(DEMO_CHAIN_PAGE);
});
el.resetBtn.addEventListener('click', resetContext);

el.annotationToggle.addEventListener('click', () => {
    const open = el.annotation.hidden;
    el.annotation.hidden = !open;
    el.annotationToggle.setAttribute('aria-expanded', String(open));
});


/* ==================== INIT ==================== */
const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

window.addEventListener('resize', () => setSidebar(!el.body.classList.contains('sidebar-collapsed')));

el.lessonTitle.textContent = LESSON_TITLE;
document.title = LESSON_TITLE;
state.visited.add(currentItem().id);
setSidebar(!isNarrow());
render();
