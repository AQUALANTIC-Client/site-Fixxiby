const langSwitcher = document.getElementById('langSwitcher');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Language Logic
function setLanguage(lang) {
    // Remove inline style overrides if any exist (cleanup from previous logic)
    const allLangEls = document.querySelectorAll('[data-lang]');
    allLangEls.forEach(el => el.style.display = '');

    // Set Body Class
    body.classList.remove('lang-en', 'lang-ja');
    body.classList.add(`lang-${lang}`);
}
langSwitcher.addEventListener('change', (e) => setLanguage(e.target.value));

// Theme Logic
function toggleTheme() {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
themeToggle.addEventListener('click', toggleTheme);

// Initialize Language
setLanguage('en');

// Initialize Theme (Default Dark)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

// 3D Tilt Effect
const heroImageContainer = document.querySelector('.hero-image');
const heroImage = document.querySelector('.hero-image img');

if (heroImageContainer && heroImage) {
    heroImageContainer.addEventListener('mousemove', (e) => {
        const rect = heroImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt (limit to small amount like +/- 10deg)
        const rotateX = ((y - centerY) / centerY) * -5; // Invert Y for natural feel
        const rotateY = ((x - centerX) / centerX) * 5;

        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset on mouse leave
    heroImageContainer.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        heroImage.style.transition = 'transform 0.5s ease-out'; // Smooth reset
    });

    // Remove transition during movement to prevent lag, add back on leave
    heroImageContainer.addEventListener('mouseenter', () => {
        heroImage.style.transition = 'transform 0.1s ease-out';
    });
}
