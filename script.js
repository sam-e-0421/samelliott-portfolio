// ============================================
// SAM ELLIOTT - PERSONAL WEBSITE
// Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initContactForm();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    // Add scrolled class to nav when scrolling
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

function closeMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    
    toggle.classList.remove('active');
    menu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrollY < heroHeight) {
                const translateY = scrollY * 0.3;
                heroBackground.style.transform = `translateY(${translateY}px)`;
            }
        }, { passive: true });
    }
}

// ============================================
// ANIMATIONS (Intersection Observer)
// ============================================
function initAnimations() {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.timeline-item, .project-card, .flight-stat, .certification-card, .about-content > *, .contact-content > *'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within its parent
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Show loading state on submit (Formspree handles the actual submission)
        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }
}

// ============================================
// CSS FOR SCROLL ANIMATIONS (injected dynamically)
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// UTILITY: Throttle function for performance
// ============================================
function throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}
