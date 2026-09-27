// ==========================================================================
// AGÊNCIA GRAVIOLA — Interatividade & Animações
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLogo = document.getElementById('navLogo');
    const heroMascot = document.getElementById('heroMascot');
    const footerLogo = document.getElementById('footerLogo');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const body = document.body;

    // Assets paths
    const LOGO_LIGHT = 'assets/logoGraviolaEscura.png'; // Dark fruit for light bg
    const LOGO_DARK = 'assets/AgenciaGraviolaLogo.png';   // White fruit for dark bg

    // --- 1. Theme Management ---
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
            if (navLogo) navLogo.src = LOGO_DARK;
            if (heroMascot) heroMascot.src = LOGO_DARK;
            if (footerLogo) footerLogo.src = LOGO_DARK;
            localStorage.setItem('graviola_theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
            if (navLogo) navLogo.src = LOGO_LIGHT;
            if (heroMascot) heroMascot.src = LOGO_LIGHT;
            if (footerLogo) footerLogo.src = LOGO_LIGHT;
            localStorage.setItem('graviola_theme', 'light');
        }
    }

    // Check stored theme or system preference (Default: Light Mode)
    const storedTheme = localStorage.getItem('graviola_theme');
    if (storedTheme === 'dark') {
        applyTheme(true);
    } else if (storedTheme === 'light') {
        applyTheme(false);
    } else {
        // Default clean light theme
        applyTheme(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            applyTheme(!isDark);
        });
    }

    // --- 2. Navbar Sticky Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Menu Toggle ---
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
                body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking any nav item
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                body.style.overflow = '';
            });
        });
    }

    // --- 4. Intersection Observer for Scroll Reveals ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Force hero items to reveal smoothly right away
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // --- 5. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetElement.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
