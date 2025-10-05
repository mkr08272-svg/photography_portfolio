// DOM Elements
const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const transitionOverlay = document.querySelector('.transition-overlay');
const dots = document.querySelectorAll('.dot');
const progressFill = document.querySelector('.progress-fill');
const previewItems = document.querySelectorAll('.preview-item');
const indicatorSlider = document.querySelector('.indicator-slider');

// Background images array - using your specified images
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

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Start background changing
    changeBackground();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
    
    // Preload background images
    preloadImages();
});

// Function to change background images
function changeBackground() {
    // Set initial background
    hero.className = `hero background-1`;
    updatePageIndicator(0);
    startProgressBar();
    console.log('Initial background set to:', hero.className);
    
    setInterval(() => {
        // Trigger transition effect
        triggerTransition();
        
        setTimeout(() => {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
            const newClass = `hero background-${currentBackgroundIndex + 1}`;
            hero.className = newClass;
            updatePageIndicator(currentBackgroundIndex);
            console.log('Background changed to:', newClass, 'Image:', backgroundImages[currentBackgroundIndex]);
        }, 800); // Delay background change for transition effect
        
    }, 4000); // Change every 4 seconds for better testing
}

// Function to trigger transition effect
function triggerTransition() {
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 1500);
    }
}

// Function to update page indicator
function updatePageIndicator(index) {
    // Update dots if they exist
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Update preview items
    previewItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    // Update indicator slider position
    if (indicatorSlider) {
        const percentage = (index / (backgroundImages.length - 1)) * 100;
        indicatorSlider.style.left = `${percentage}%`;
    }
    
    startProgressBar();
}

// Function to start progress bar animation
function startProgressBar() {
    if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.style.animation = 'none';
        setTimeout(() => {
            progressFill.style.animation = 'progressFill 4s linear forwards';
        }, 100);
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            const isHashLink = href.startsWith('#');
            if (!isHashLink) {
                return; // allow normal navigation to other pages
            }
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Preload background images for smoother transitions
function preloadImages() {
    backgroundImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
            console.log(`Image ${index + 1} loaded successfully:`, src);
        };
        img.onerror = () => {
            console.error(`Failed to load image ${index + 1}:`, src);
        };
        img.src = src;
    });
}

// Add click functionality to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentBackgroundIndex = index;
        const newClass = `hero background-${index + 1}`;
        hero.className = newClass;
        updatePageIndicator(index);
        console.log('Manual background change to:', newClass, 'Image:', backgroundImages[index]);
    });
});

// Add click functionality to preview items
previewItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Trigger transition effect
        triggerTransition();
        
        setTimeout(() => {
            currentBackgroundIndex = index;
            const newClass = `hero background-${index + 1}`;
            hero.className = newClass;
            updatePageIndicator(index);
            console.log('Preview click - background change to:', newClass, 'Image:', backgroundImages[index]);
        }, 400); // Delay for transition effect
    });
});

// Add some interactive effects to nav links
navLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.animationDelay = '0s';
    });
});
