// Footer year
const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}

// Hamburger toggle
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}