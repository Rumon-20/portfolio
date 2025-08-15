// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
},{ threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Pill highlight logic (works on click, scroll & resize)
// Active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.pill-tab');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.pill-tab[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(section => navObserver.observe(section));

// Observe sections to update active link while scrolling
const activeObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setActiveById(entry.target.id);
    }
  });
},{
  // make last section (contact) activate nicely near bottom
  root: null,
  threshold: 0.55,
  rootMargin: "-25% 0px -40% 0px"
});
sections.forEach(s => activeObserver.observe(s));

// Click -> set active immediately (before scroll finishes)
tabs.forEach(t=>{
  t.addEventListener('click', (e)=>{
    // let anchor work (smooth scroll via CSS), but update state now
    setActiveById(t.getAttribute('href').slice(1));
  });
});

// Position highlight on load & on resize (handles font/layout shifts)
window.addEventListener('load', () => moveHighlightTo(document.querySelector('.pill-tab.active')));
window.addEventListener('resize', () => moveHighlightTo(document.querySelector('.pill-tab.active')));

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      fetch("https://formsubmit.co/prachuryapachani@gmail.com", {
        method: "POST",
        body: new FormData(form),
      })
        .then(response => {
          if (response.ok) {
            formMessage.innerHTML = "<p style='color: green;'>Thanks! Your message was sent successfully.</p>";
            form.reset();
          } else {
            throw new Error("Form submission failed.");
          }
        })
        .catch(error => {
          formMessage.innerHTML = "<p style='color: red;'>Oops! Something went wrong. Please try again later.</p>";
        });
    });
  });