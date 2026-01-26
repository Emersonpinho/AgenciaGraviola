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

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / 10;
        const y = (e.clientY - rect.top) / 10;
        el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
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

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
    if (navLogo) navLogo.src = 'assets/logoPreta.png';
    if (mascot) mascot.src = 'assets/logoPreta.png';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fas fa-moon';
        if (navLogo) navLogo.src = 'assets/logoPreta.png';
        if (mascot) mascot.src = 'assets/logoPreta.png';
    } else {
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        if (navLogo) navLogo.src = 'assets/AgenciaGraviolaLogo.png';
        if (mascot) mascot.src = 'assets/AgenciaGraviolaLogo.png';
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
