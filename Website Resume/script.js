document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initContactForm();
});

function initNavigation() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }, { passive: true });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

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
    document.getElementById('nav-toggle').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('active');
    document.body.classList.remove('menu-open');
}

function initScrollEffects() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < document.querySelector('.hero').offsetHeight) {
                heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }, { passive: true });
    }
}

function initAnimations() {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .flight-stat, .certification-card, .about-content > *, .contact-content > *');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate-visible'), index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    animateElements.forEach(el => { el.classList.add('animate-on-scroll'); observer.observe(el); });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;
        });
    }
}

const style = document.createElement('style');
style.textContent = `.animate-on-scroll{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}.animate-on-scroll.animate-visible{opacity:1;transform:translateY(0)}body.menu-open{overflow:hidden}.nav-toggle.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.nav-toggle.active span:nth-child(2){opacity:0}.nav-toggle.active span:nth-child(3){transform:rotate(-45deg) translate(7px,-6px)}`;
document.head.appendChild(style);
