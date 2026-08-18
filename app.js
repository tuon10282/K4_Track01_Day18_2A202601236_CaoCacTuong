// ==================== STATE MANAGEMENT ====================
let currentOption = 'a';
let quizAnswered = false;
let readingTime = 0;
let readingInterval = null;

// Annotation data for each option
const annotations = {
    a: {
        expect: [
            'Đọc slide về Partial Derivatives',
            'Trả lời câu hỏi Checkpoint 1',
            'Chọn đáp án sai để kích hoạt AI diagnostic'
        ],
        watch: [
            'Phản ứng khi thấy diagnostic card',
            'Có đọc Evidence và Confidence không?',
            'Chọn hành động nào? (Mở bài ôn / Dismiss / Re-diagnose)'
        ],
        doNot: [
            'Không giải thích AI hoạt động như thế nào',
            'Không gợi ý tester nên làm gì',
            'Chỉ quan sát tự nhiên'
        ]
    },
    b: {
        expect: [
            'Đọc slide bình thường, tự do cuộn',
            'Dừng lại tại phần công thức 3.2',
            'Quan sát toast card xuất hiện sau 8-10 giây'
        ],
        watch: [
            'Có nhận thấy toast card góc trên không?',
            'Đọc thông tin Evidence và Confidence Score chưa?',
            'Chọn mở bài ôn hay dismiss?'
        ],
        doNot: [
            'Không chỉ vào toast card',
            'Không nhắc "có gợi ý đấy"',
            'Để tester tự phát hiện'
        ]
    },
    c: {
        expect: [
            'Đọc slide, tìm nút "Em chưa hiểu đoạn này"',
            'Bấm nút và nhập mô tả vấn đề',
            'Tương tác với AI qua hội thoại Socratic'
        ],
        watch: [
            'Cách tester mô tả vấn đề như thế nào?',
            'Có tương tác với Concept Graph không?',
            'Có thấy AI giúp làm rõ vấn đề không?'
        ],
        doNot: [
            'Không gợi ý nên hỏi gì',
            'Không giải thích Socratic method',
            'Để tester tự khám phá'
        ]
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeOptionSwitcher();
    initializeResetButton();
    loadOption('a');
    updateAnnotationPanel();
});

// ==================== OPTION SWITCHING ====================
function initializeOptionSwitcher() {
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const option = btn.dataset.option;
            switchOption(option);
        });
    });
}

function switchOption(option) {
    currentOption = option;

    // Update active button
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.option === option);
    });

    // Load option content
    loadOption(option);

    // Update annotation panel
    updateAnnotationPanel();
}

function loadOption(option) {
    // Hide all AI interventions first
    hideAllInterventions();

    // Reset state
    quizAnswered = false;
    clearInterval(readingInterval);
    readingTime = 0;

    // Show specific UI for each option
    switch(option) {
        case 'a':
            loadOptionA();
            break;
        case 'b':
            loadOptionB();
            break;
        case 'c':
            loadOptionC();
            break;
    }
}

function hideAllInterventions() {
    document.getElementById('checkpointQuiz').style.display = 'none';
    document.getElementById('diagnosticCard').style.display = 'none';
    document.getElementById('proactiveToast').style.display = 'none';
    document.getElementById('dialoguePanel').style.display = 'none';
}

// ==================== OPTION A: REACTIVE QUIZ ====================
function loadOptionA() {
    // Show checkpoint quiz after short delay
    setTimeout(() => {
        document.getElementById('checkpointQuiz').style.display = 'block';
        document.getElementById('checkpointQuiz').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 1500);

    // Update AI status
    updateAIStatus('AI Diagnostic: Chờ checkpoint quiz');
}

function checkQuizAnswer() {
    const selectedAnswer = document.querySelector('input[name="q1"]:checked');

    if (!selectedAnswer) {
        alert('Vui lòng chọn một đáp án');
        return;
    }

    quizAnswered = true;

    // If wrong answer (a or c), show diagnostic card
    if (selectedAnswer.value === 'a' || selectedAnswer.value === 'c') {
        setTimeout(() => {
            document.getElementById('diagnosticCard').style.display = 'block';
            updateAIStatus('AI Diagnostic: Đã phát hiện gap');
        }, 800);
    } else {
        // Correct answer
        updateAIStatus('AI Diagnostic: Bạn đã trả lời đúng!');
        setTimeout(() => {
            alert('Chính xác! Khi tính đạo hàm riêng theo x, ta coi y là hằng số.');
        }, 500);
    }
}

// ==================== OPTION B: PROACTIVE OBSERVER ====================
function loadOptionB() {
    updateAIStatus('AI Observer: Đang theo dõi...');

    // Simulate reading time observation
    const criticalSection = document.getElementById('criticalSection');

    // Add hover/focus detection
    let hoverCount = 0;

    criticalSection.addEventListener('mouseenter', () => {
        hoverCount++;
        if (hoverCount === 1) {
            startReadingTimer();
        }
    });

    // Auto-trigger after 8 seconds for demo purposes
    setTimeout(() => {
        showProactiveToast();
    }, 8000);
}

function startReadingTimer() {
    readingInterval = setInterval(() => {
        readingTime++;

        // After 45 seconds of simulated reading, show toast
        if (readingTime >= 45) {
            showProactiveToast();
            clearInterval(readingInterval);
        }
    }, 1000);
}

function showProactiveToast() {
    document.getElementById('proactiveToast').style.display = 'block';
    updateAIStatus('AI Observer: Phát hiện khó khăn');
}

// ==================== OPTION C: COLLABORATIVE DIALOGUE ====================
function loadOptionC() {
    updateAIStatus('AI Tutor: Sẵn sàng hỗ trợ');

    // Add "Ask for help" button to the slide
    const slideContent = document.getElementById('slideContent');

    // Check if button already exists
    if (!document.getElementById('askHelpBtn')) {
        const helpButton = document.createElement('button');
        helpButton.id = 'askHelpBtn';
        helpButton.className = 'btn btn-secondary';
        helpButton.style.marginTop = 'var(--spacing-lg)';
        helpButton.innerHTML = '💬 Em chưa hiểu đoạn này';
        helpButton.onclick = openDialogue;

        slideContent.appendChild(helpButton);
    }
}

function openDialogue() {
    document.getElementById('dialoguePanel').style.display = 'flex';
    updateAIStatus('AI Tutor: Đang hỗ trợ');
}

function sendDialogueMessage() {
    const input = document.getElementById('dialogueInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to dialogue
    const messagesContainer = document.querySelector('.dialogue-messages');
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `<strong>Bạn:</strong> ${message}`;
    messagesContainer.appendChild(userMsg);

    // Clear input
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai-message';
        aiMsg.innerHTML = `<strong>AI Tutor:</strong> Tuyệt vời! Dựa vào câu hỏi của bạn, em nghĩ phần <strong>Quy tắc đạo hàm cơ bản</strong> sẽ giúp bạn hiểu rõ hơn. Bạn có muốn xem bài ôn tập 2 phút không?`;
        messagesContainer.appendChild(aiMsg);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1200);
}

function editDescription() {
    const input = document.getElementById('dialogueInput');
    input.value = '';
    input.focus();
    input.placeholder = 'Mô tả lại chỗ bạn chưa hiểu...';
}

// ==================== COMMON ACTIONS ====================
function dismissCard(cardId) {
    document.getElementById(cardId).style.display = 'none';
    updateAIStatus('AI: Đã đóng gợi ý');
}

function openRefresher() {
    alert('🎓 Mở bài ôn tập: "Đạo hàm riêng - Khái niệm cơ bản"\n\nTrong demo này, bài ôn tập sẽ mở trong cửa sổ mới.\nThời lượng: 2-3 phút\n\nNội dung:\n• Khái niệm hằng số vs biến số\n• Quy tắc đạo hàm riêng\n• 2 bài tập thực hành');

    // In production, would navigate to actual refresher content
    updateAIStatus('AI: Bài ôn tập đã mở');
}

function rediagnose() {
    const concepts = [
        'Đạo hàm cơ bản',
        'Hàm nhiều biến',
        'Quy tắc chuỗi',
        'Gradient'
    ];

    const selected = prompt('Chọn khái niệm bạn muốn ôn tập:\n\n' +
        concepts.map((c, i) => `${i + 1}. ${c}`).join('\n'));

    if (selected) {
        alert(`Đã chọn: ${concepts[parseInt(selected) - 1] || 'Đạo hàm riêng'}\n\nAI sẽ tìm bài ôn tập phù hợp...`);
        updateAIStatus('AI: Re-diagnosing...');
    }
}

function updateAIStatus(status) {
    const statusElement = document.getElementById('aiStatus');
    const statusText = statusElement.querySelector('span:last-child') || statusElement;
    statusText.textContent = status;
}

// ==================== RESET FUNCTIONALITY ====================
function initializeResetButton() {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', resetToCommonContext);
}

function resetToCommonContext() {
    // Hide all interventions
    hideAllInterventions();

    // Reset quiz
    const quizInputs = document.querySelectorAll('input[name="q1"]');
    quizInputs.forEach(input => input.checked = false);

    // Clear dialogue messages (keep initial ones)
    const messagesContainer = document.querySelector('.dialogue-messages');
    if (messagesContainer) {
        const initialMessages = messagesContainer.querySelectorAll('.message');
        if (initialMessages.length > 3) {
            // Remove added messages, keep first 3
            for (let i = 3; i < initialMessages.length; i++) {
                initialMessages[i].remove();
            }
        }
    }

    // Remove ask help button if exists
    const askHelpBtn = document.getElementById('askHelpBtn');
    if (askHelpBtn) {
        askHelpBtn.remove();
    }

    // Reset state
    quizAnswered = false;
    clearInterval(readingInterval);
    readingTime = 0;

    // Reload current option
    loadOption(currentOption);

    // Scroll to top
    document.querySelector('.slide-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Show notification
    showNotification('🔄 Reset về Common Context thành công');
}

function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-accent-cool);
        color: var(--color-bg-primary);
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ==================== ANNOTATION PANEL ====================
function updateAnnotationPanel() {
    const data = annotations[currentOption];

    // Update badge
    const badge = document.getElementById('currentOptionBadge');
    badge.textContent = `Option ${currentOption.toUpperCase()}`;

    // Update lists
    updateList('expectList', data.expect);
    updateList('watchList', data.watch);
    updateList('doNotList', data.doNot);
}

function updateList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Alt + 1/2/3 to switch options
    if (e.altKey) {
        switch(e.key) {
            case '1':
                switchOption('a');
                break;
            case '2':
                switchOption('b');
                break;
            case '3':
                switchOption('c');
                break;
            case 'r':
            case 'R':
                resetToCommonContext();
                break;
        }
    }

    // Escape to close all cards
    if (e.key === 'Escape') {
        hideAllInterventions();
    }
});

// ==================== SLIDE NAVIGATION (DEMO) ====================
document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        // Add active to clicked
        thumb.classList.add('active');

        showNotification(`📄 Chuyển sang Slide ${index + 1}`);
    });
});

// Thumbnail navigation buttons
document.querySelector('.thumb-prev')?.addEventListener('click', () => {
    showNotification('⬅️ Slide trước');
});

document.querySelector('.thumb-next')?.addEventListener('click', () => {
    showNotification('➡️ Slide tiếp theo');
});

// ==================== UTILITY FUNCTIONS ====================
function addCSSAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
addCSSAnimation();

// ==================== DEMO HELPERS ====================
// Log current state for debugging
window.getPrototypeState = function() {
    return {
        currentOption,
        quizAnswered,
        readingTime,
        annotations: annotations[currentOption]
    };
};

// Export functions for testing
window.prototypeAPI = {
    switchOption,
    resetToCommonContext,
    checkQuizAnswer,
    openRefresher,
    dismissCard,
    openDialogue,
    sendDialogueMessage
};

console.log('🎓 AI Tutor Prototype loaded');
console.log('💡 Keyboard shortcuts:');
console.log('   Alt + 1/2/3: Switch between options');
console.log('   Alt + R: Reset to common context');
console.log('   Escape: Close all cards');
console.log('   Type: window.getPrototypeState() to see current state');
