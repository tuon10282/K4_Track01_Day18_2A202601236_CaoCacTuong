/* ==========================================================================
   Base interface — slide viewer
   Dữ liệu mẫu: sửa COURSE bên dưới. Mỗi item có pdfUrl (null = chưa gắn PDF).
   ========================================================================== */

const LESSON_TITLE = 'Bài 4 · Day 17 — Product Discovery: Finding and Validating Pain Points';

const COURSE = [
    {
        name: 'Slides',
        items: [
            { id: 'slide-bai-giang', title: 'Slide bài giảng', pages: 28, pdfUrl: null },
            { id: 'bad-good-interviews', title: 'bad-good-interviews-vi', pages: 12, pdfUrl: null },
            { id: 'the-mom-test', title: 'The Mom Test', pages: 9, pdfUrl: null },
        ],
    },
    {
        name: 'Track 1 - Day 17 — Finding and Validating Pain Points',
        items: [
            { id: 'worksheet', title: 'Worksheet — Pain Point Canvas', pages: 4, pdfUrl: null },
            { id: 'checklist', title: 'Checklist phỏng vấn', pages: 3, pdfUrl: null },
        ],
    },
];

/* ==================== STATE ==================== */
const state = {
    moduleIndex: 0,
    itemIndex: 0,
    page: 1,
    visited: new Set(),
    expanded: COURSE.map(() => true),
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
}

/* ==================== ACTIONS ==================== */
function selectItem(moduleIndex, itemIndex) {
    state.moduleIndex = moduleIndex;
    state.itemIndex = itemIndex;
    state.page = 1;
    state.visited.add(currentItem().id);
    render();
    if (window.matchMedia('(max-width: 900px)').matches) setSidebar(false);
}

function goToPage(page) {
    state.page = clamp(Number(page) || 1, 1, currentItem().pages);
    renderSlide();
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
});

/* ==================== INIT ==================== */
const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

window.addEventListener('resize', () => setSidebar(!el.body.classList.contains('sidebar-collapsed')));

el.lessonTitle.textContent = LESSON_TITLE;
document.title = LESSON_TITLE;
state.visited.add(currentItem().id);
setSidebar(!isNarrow());
render();
