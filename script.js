// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for styling
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email) {
            alert('Prosim izpolni vsa obvezna polja (ime in email).');
            return;
        }
        
        // Show success message (in production, this would send to server)
        alert('Hvala za povpraševanje! Odgovorili bomo v najkrajšem možnem času.');
        contactForm.reset();
        
        // In production, you would send this data to your server:
        // fetch('/api/booking', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
    });
}

// Play button functionality for music section
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        alert('Prvi single "Dedova pot" bo na voljo kmalu! Sledi nam na Spotify in YouTube.');
    });
}

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.music-card, .show-item, .gallery-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Ticket buttons functionality
const ticketButtons = document.querySelectorAll('.btn-small');
ticketButtons.forEach(button => {
    if (button.textContent === 'Kupi') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Preusmerjeni boste na stran za nakup vstopnic. (Demo)');
        });
    }
});

// Social media links
const socialLinks = document.querySelectorAll('.social-icon, .platform');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.textContent;
        alert(`Preusmeritev na ${platform}... (Demo - dodaj prave linke)`);
    });
});

// Gallery image click (lightbox effect could be added here)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        // In production, this would open a lightbox
        console.log('Gallery image clicked - implement lightbox');
    });
});

// Performance: Lazy load images below the fold
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[name="email"]').value;
        // Placeholder - v produkciji pošlji na server ali email service (Mailchimp, etc.)
        alert('Hvala za naročilo! ' + email + ' je sedaj na naši mailing listi.');
        newsletterForm.reset();
        
        // GA4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'engagement',
                'event_label': 'newsletter'
            });
        }
    });
}

// Cookie Consent Banner - Wait for DOM to be ready
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    
    if (!cookieBanner) {
        console.log('Cookie banner not found');
        return;
    }
    
    console.log('Cookie banner initialized');
    
    // Safe localStorage wrapper (handles private mode)
    function safeStorage() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return {
                get: (key) => localStorage.getItem(key),
                set: (key, value) => localStorage.setItem(key, value)
            };
        } catch (e) {
            // Private mode - use memory fallback
            const memoryStorage = {};
            return {
                get: (key) => memoryStorage[key] || null,
                set: (key, value) => { memoryStorage[key] = value; }
            };
        }
    }
    
    const storage = safeStorage();
    
    // Check if user already made a choice
    const cookieConsent = storage.get('cookieConsent');
    
    if (cookieConsent === 'accepted' || cookieConsent === 'declined') {
        cookieBanner.style.display = 'none';
        
        // If accepted, enable GA4
        if (cookieConsent === 'accepted' && typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    
    function hideCookieBanner() {
        cookieBanner.style.display = 'none';
        cookieBanner.style.visibility = 'hidden';
        cookieBanner.style.opacity = '0';
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            storage.set('cookieConsent', 'accepted');
            hideCookieBanner();
            
            // Enable GA4 tracking
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
                gtag('event', 'cookie_consent', {
                    'event_category': 'engagement',
                    'event_label': 'accepted'
                });
            }
            return false;
        });
    }
    
    if (cookieDecline) {
        cookieDecline.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            storage.set('cookieConsent', 'declined');
            hideCookieBanner();
            
            // GA4 event for decline
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cookie_consent', {
                    'event_category': 'engagement',
                    'event_label': 'declined'
                });
            }
            return false;
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
} else {
    // DOM already loaded
    initCookieBanner();
}

// Console welcome message
console.log('%c🎸 The Drinkers - Comeback 2025', 'font-size: 24px; font-weight: bold; color: #c9a227;');
console.log('%cLegenda se vrača!', 'font-size: 16px; color: #666;');
