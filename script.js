// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#1a252f';
    } else {
        navbar.style.background = '#2c3e50';
    }
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.use-case-card, .feature-card, .spec-card, .pricing-card');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Legal Warning Acceptance (optional enhancement)
const hasAcceptedWarning = localStorage.getItem('spynger-legal-warning');

if (!hasAcceptedWarning) {
    const warningBanner = document.querySelector('.legal-warning');
    if (warningBanner) {
        // Add accept button functionality if needed
        warningBanner.style.cursor = 'pointer';
        warningBanner.addEventListener('click', function() {
            localStorage.setItem('spynger-legal-warning', 'accepted');
            this.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            this.innerHTML = '✓ <strong>Ostrzeżenie prawne zostało zaakceptowane</strong>';
            setTimeout(() => {
                this.style.display = 'none';
            }, 3000);
        });
    }
}

// Mobile Menu Toggle (for future enhancement)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar .container');

    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                display: block;
            `;

            navbar.insertBefore(menuToggle, nav);

            menuToggle.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }
};

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#3498db';
        }
    });
});

// Add scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: all 0.3s;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'scale(1.1)';
    scrollButton.style.background = '#764ba2';
});

scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'scale(1)';
    scrollButton.style.background = '#667eea';
});

// Console warning for developers
console.log('%c⚠️ OSTRZEŻENIE PRAWNE', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cNielegalne użycie Spynger może skutkować poważnymi konsekwencjami prawnymi w Polsce.', 'color: orange; font-size: 14px;');
console.log('%cUpewnij się, że używasz tego oprogramowania zgodnie z prawem.', 'color: orange; font-size: 14px;');