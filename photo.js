const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const transitionOverlay = document.querySelector('.transition-overlay');
const dots = document.querySelectorAll('.dot');
const progressFill = document.querySelector('.progress-fill');
const previewItems = document.querySelectorAll('.preview-item');
const indicatorSlider = document.querySelector('.indicator-slider');

const backgroundImages = [
    'img1.jpg',
    'main1.jpg',
    'main2.jpg',
    'main3.jpg',
    'main4.jpg',
    'main5.jpg',
    'VID_20250727_042129_268.jpg'
];

let currentBackgroundIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    changeBackground();
    setupMobileMenu();
    setupSmoothScrolling();
    preloadImages();
});

function changeBackground() {
    hero.className = `hero background-1`;
    updatePageIndicator(0);
    startProgressBar();
    
    setInterval(() => {
        triggerTransition();
        setTimeout(() => {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
            const newClass = `hero background-${currentBackgroundIndex + 1}`;
            hero.className = newClass;
            updatePageIndicator(currentBackgroundIndex);
        }, 800);
    }, 4000);
}

function triggerTransition() {
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 1500);
    }
}

function updatePageIndicator(index) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    previewItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    if (indicatorSlider) {
        const percentage = (index / (backgroundImages.length - 1)) * 100;
        indicatorSlider.style.left = `${percentage}%`;
    }
    
    startProgressBar();
}

function startProgressBar() {
    if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.style.animation = 'none';
        setTimeout(() => {
            progressFill.style.animation = 'progressFill 4s linear forwards';
        }, 100);
    }
}

function setupMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            const isHashLink = href.startsWith('#');
            if (!isHashLink) {
                return;
            }
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function preloadImages() {
    backgroundImages.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentBackgroundIndex = index;
        const newClass = `hero background-${index + 1}`;
        hero.className = newClass;
        updatePageIndicator(index);
    });
});

previewItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        triggerTransition();
        setTimeout(() => {
            currentBackgroundIndex = index;
            const newClass = `hero background-${index + 1}`;
            hero.className = newClass;
            updatePageIndicator(index);
        }, 400);
    });
});

navLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.animationDelay = '0s';
    });
});
