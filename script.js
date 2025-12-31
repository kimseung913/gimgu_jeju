// ===== Tab Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCardAnimations();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const daySections = document.querySelectorAll('.day-section');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = btn.dataset.day;

            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active section
            daySections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `day${day}`) {
                    section.classList.add('active');
                    // Re-trigger card animations
                    animateCards(section);
                }
            });

            // Haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
}

function initCardAnimations() {
    // Initial animation for first day
    const activeSection = document.querySelector('.day-section.active');
    if (activeSection) {
        animateCards(activeSection);
    }
}

function animateCards(section) {
    const cards = section.querySelectorAll('.schedule-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = `slideUp 0.5s ease ${index * 0.05}s backwards`;
    });
}

// ===== Swipe Gesture for Tab Navigation =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < swipeThreshold) return;

    const currentTab = document.querySelector('.tab-btn.active');
    const currentDay = parseInt(currentTab.dataset.day);

    let targetDay;
    if (diff > 0 && currentDay < 3) {
        // Swipe left - next day
        targetDay = currentDay + 1;
    } else if (diff < 0 && currentDay > 1) {
        // Swipe right - previous day
        targetDay = currentDay - 1;
    }

    if (targetDay) {
        const targetTab = document.querySelector(`.tab-btn[data-day="${targetDay}"]`);
        targetTab?.click();
    }
}

// ===== Service Worker Registration (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added later for offline support
        console.log('🌴 제주 여행 앱이 준비되었습니다!');
    });
}
