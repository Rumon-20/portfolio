// ===== Initialize GSAP & ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10));

// ===== Navigation Active Link =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveLink, 10));

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Page Load Animations =====
window.addEventListener('load', () => {
    initAnimations();
});

function initAnimations() {
    
    // Hero Content Animation
    gsap.to('.hero-content', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    });
    
    // Hero Title Words Animation
    gsap.to('.hero-title .word', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Hero Text Animation
    gsap.from('.hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Hero CTA Animation
    gsap.from('.hero-cta .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.9
    });
    
    // Hero Image Animation
    gsap.to('.hero-image', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.4
    });
    
    gsap.from('.image-frame', {
        scale: 0.8,
        rotation: -5,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.5
    });
    
    // Section Headers Animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });
    
    // About Section Animation
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });
    
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.3
    });
    
    // Skills Animation - Staggered Reveal
    const skillItems = gsap.utils.toArray('.skill-item');
    
    skillItems.forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });
    
    // Projects Animation
    const projectCards = gsap.utils.toArray('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });
    
    // Contact Section Animation
    gsap.from('.contact-info > *', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
    });
    
    // Image Parallax Effect
    gsap.to('.about-image img', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -30,
        ease: 'none'
    });
}

// ===== Contact Form =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Button loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            fetch('https://formsubmit.co/prachuryapachani@gmail.com', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    formMessage.style.background = 'rgba(99, 102, 241, 0.1)';
                    formMessage.style.border = '1px solid var(--primary)';
                    formMessage.style.color = 'var(--primary)';
                    formMessage.innerHTML = '<p>✓ Message sent successfully! I\'ll get back to you soon.</p>';
                    form.reset();
                    
                    // Animate success message
                    gsap.from(formMessage, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                } else {
                    throw new Error('Failed to send');
                }
            })
            .catch(error => {
                formMessage.style.background = 'rgba(239, 68, 68, 0.1)';
                formMessage.style.border = '1px solid #ef4444';
                formMessage.style.color = '#ef4444';
                formMessage.innerHTML = '<p>✗ Oops! Something went wrong. Please try again.</p>';
                
                // Animate error message
                gsap.from(formMessage, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// ===== Footer Year =====
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===== Button Hover Effects =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===== Smooth Reveal for Cards =====
const cards = document.querySelectorAll('.skill-item, .project-card, .contact-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===== Optimize Performance =====
// Reduce animations on mobile
if (window.innerWidth < 768) {
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150
    });
}

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// ===== Console Message =====
console.log('%c✨ Portfolio Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cDesigned & Developed by Prachurya', 'color: #a1a1aa; font-size: 12px;');