       // Footer year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Hamburger toggle
        const navToggle = document.querySelector('.nav-toggle');
        const primaryNav = document.getElementById('primary-nav');

        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when a navigation link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });