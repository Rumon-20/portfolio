// ===== GSAP & Lenis Setup =====
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ===== Page Loader Animation =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    
    gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        delay: 2.2,
        ease: 'power2.inOut',
        onComplete: () => {
            loader.classList.add('loaded');
            initAnimations();
        }
    });
});

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor movement
function animateCursor() {
    // Cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;
    
    // Follower lags behind
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===== Magnetic Effect =====
const magneticElements = document.querySelectorAll('[data-magnetic]');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Magnetic effect for skill cards
const skillCards = document.querySelectorAll('[data-magnetic-skill]');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// ===== Animation Initialization =====
function initAnimations() {
    
    // Hero Title Word Animation
    gsap.to('.hero-title .word', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
    });
    
    // Hero Avatar Animation
    gsap.from('.hero-avatar', {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.3
    });
    
    // Hero Quote Animation
    gsap.from('.hero-quote', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });
    
    // Hero Buttons Animation
    gsap.from('.hero-actions .btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 1.2
    });
    
    // Scroll Indicator Animation
    gsap.from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
    });
    
    // Section Title Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        const words = title.querySelectorAll('.title-word');
        
        gsap.from(words, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out'
        });
    });
    
    // Card Animations with Parallax
    gsap.utils.toArray('.card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.15
        });
    });
    
    // Skill Cards Stagger Animation
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: {
            amount: 1,
            from: 'start',
            grid: 'auto'
        },
        ease: 'back.out(1.4)'
    });
    
    // Project Cards Animation
    gsap.utils.toArray('.project-card').forEach((project, index) => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 1.2,
            ease: 'power4.out',
            delay: index * 0.2
        });
    });
    
    // Image Parallax Effect
    gsap.utils.toArray('.image-card img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: -50,
            ease: 'none'
        });
    });
    
    // Contact Form Elements Animation
    gsap.from('.contact-form input, .contact-form textarea, .contact-form button', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Social Icons Animation
    gsap.from('.socials a', {
        scrollTrigger: {
            trigger: '.socials',
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        rotation: 360,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)'
    });
}

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Pill Navigation Highlight =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.pill-tab');
const pillHighlight = document.getElementById('pillHighlight');

function moveHighlightTo(tab) {
    if (!tab) return;
    const rect = tab.getBoundingClientRect();
    const navRect = tab.parentElement.getBoundingClientRect();
    pillHighlight.style.width = `${rect.width}px`;
    pillHighlight.style.height = `${rect.height}px`;
    pillHighlight.style.transform = `translateX(${rect.left - navRect.left}px)`;
}

function setActiveById(id) {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.pill-tab[href="#${id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        moveHighlightTo(activeLink);
    }
}

function updateActiveOnScroll() {
    let closest = null;
    let minDistance = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 80);
        if (distance < minDistance) {
            minDistance = distance;
            closest = section;
        }
    });

    if (closest) setActiveById(closest.id);
}

window.addEventListener('scroll', updateActiveOnScroll);
window.addEventListener('load', () => {
    setActiveById(sections[0].id);
});
window.addEventListener('resize', () => {
    const active = document.querySelector('.pill-tab.active');
    moveHighlightTo(active);
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
        
        setActiveById(id);
    });
});

// ===== Contact Form =====
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Animate button
        const submitBtn = form.querySelector('button[type="submit"]');
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        fetch("https://formsubmit.co/prachuryapachani@gmail.com", {
            method: "POST",
            body: new FormData(form),
        })
        .then(response => {
            if (response.ok) {
                formMessage.innerHTML = "<p style='color: #9d4edd; font-weight: 600;'>✓ Thanks! Your message was sent successfully.</p>";
                form.reset();
                
                // Animate success message
                gsap.from(formMessage.querySelector('p'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            } else {
                throw new Error("Form submission failed.");
            }
        })
        .catch(error => {
            formMessage.innerHTML = "<p style='color: #f72585; font-weight: 600;'>✗ Oops! Something went wrong. Please try again later.</p>";
            
            // Animate error message
            gsap.from(formMessage.querySelector('p'), {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });
    });
});

// ===== Parallax Elements with data-scroll =====
gsap.utils.toArray('[data-scroll]').forEach(element => {
    const speed = element.dataset.scrollSpeed || 0.5;
    
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        y: (i, target) => {
            const height = target.offsetHeight;
            return -height * speed;
        },
        ease: 'none'
    });
});

// ===== Button Hover Effects =====
document.querySelectorAll('.btn, .btn-outline').forEach(btn => {
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

// ===== Video Background Fade In =====
gsap.from('.video-background', {
    opacity: 0,
    duration: 2,
    ease: 'power2.inOut',
    delay: 0.5
});

// ===== Advanced Scroll Effects =====

// Fade in scroll indicator on hero
ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onLeave: () => {
        gsap.to('.scroll-indicator', {
            opacity: 0,
            duration: 0.3
        });
    },
    onEnterBack: () => {
        gsap.to('.scroll-indicator', {
            opacity: 0.7,
            duration: 0.3
        });
    }
});

// Navbar background on scroll
ScrollTrigger.create({
    trigger: 'body',
    start: 'top -50',
    end: 'bottom bottom',
    onEnter: () => {
        gsap.to('.pill-nav', {
            background: 'rgba(10, 0, 21, 0.8)',
            duration: 0.3
        });
    },
    onLeaveBack: () => {
        gsap.to('.pill-nav', {
            background: 'rgba(10, 0, 21, 0.6)',
            duration: 0.3
        });
    }
});

// Smooth reveal for elements as they enter viewport
const revealElements = gsap.utils.toArray('.reveal');
revealElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// ===== Disable animations on mobile if preferred =====
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (mediaQuery.matches) {
    // Disable all GSAP animations
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

console.log('%c🚀 Portfolio loaded with award-winning animations!', 'color: #9d4edd; font-size: 16px; font-weight: bold;');