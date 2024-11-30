// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .member-card, .map-card, .tutorial-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    if (currentScrollY <= window.innerHeight) {
        const translateY = currentScrollY * 0.5;
        hero.style.transform = `translateY(${translateY}px)`;
        hero.style.opacity = 1 - (currentScrollY / window.innerHeight);
    }
    
    lastScrollY = currentScrollY;
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Add hover effect to cards
document.querySelectorAll('.member-card, .map-card, .tutorial-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
