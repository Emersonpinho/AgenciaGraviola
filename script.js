// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Auto-activate hero reveals on load
window.addEventListener('load', () => {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 * (index + 1));
    });
});

// Subtle parallax on floating elements (no rotation, just soft position)
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.floating-element');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    elements.forEach((el, i) => {
        const factor = (i + 1) * 4;
        const x = (e.clientX - cx) / factor;
        const y = (e.clientY - cy) / factor;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Theme Selection
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const navLogo = document.querySelector('.nav-logo-img');
const mascot = document.querySelector('.floating-mascot');

// Theme Toggle — padrão: claro. dark-mode = escuro.
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.className = 'fas fa-sun';
    if (navLogo) navLogo.src = 'assets/AgenciaGraviolaLogo.png';
    if (mascot) mascot.src = 'assets/AgenciaGraviolaLogo.png';
} else {
    // Garante logo preta no modo claro (padrão ou explícito)
    themeIcon.className = 'fas fa-moon';
    if (navLogo) navLogo.src = 'assets/logoPreta.png';
    if (mascot) mascot.src = 'assets/logoPreta.png';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        if (navLogo) navLogo.src = 'assets/AgenciaGraviolaLogo.png';
        if (mascot) mascot.src = 'assets/AgenciaGraviolaLogo.png';
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fas fa-moon';
        if (navLogo) navLogo.src = 'assets/logoPreta.png';
        if (mascot) mascot.src = 'assets/logoPreta.png';
    }
});

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
        body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        if (menuToggle) {
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
        body.style.overflow = '';
    });
});

// Smooth scroll animations for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
