// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Pill highlight logic (works on click, scroll & resize)
// Active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.pill-tab');
const pillHighlight = document.getElementById('pillHighlight');

// Move pill highlight under active link
function moveHighlightTo(tab) {
  if (!tab) return;
  const rect = tab.getBoundingClientRect();
  const navRect = tab.parentElement.getBoundingClientRect();
  pillHighlight.style.width = `${rect.width}px`;
  pillHighlight.style.height = `${rect.height}px`;
  pillHighlight.style.transform = `translateX(${rect.left - navRect.left}px)`;
}

// Set active tab
function setActiveById(id) {
  navLinks.forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.pill-tab[href="#${id}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    moveHighlightTo(activeLink);
  }
}

// Check which section is closest to top of viewport
function updateActiveOnScroll() {
  let closest = null;
  let minDistance = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - 80); // 80px offset for navbar height
    if (distance < minDistance) {
      minDistance = distance;
      closest = section;
    }
  });

  if (closest) setActiveById(closest.id);
}

window.addEventListener('scroll', updateActiveOnScroll);
window.addEventListener('load', () => {
  setActiveById(sections[0].id); // set Home initially
});
window.addEventListener('resize', () => {
  const active = document.querySelector('.pill-tab.active');
  moveHighlightTo(active);
});

// Click -> update immediately
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    setActiveById(id);
  });
});

// Position highlight on load & on resize (handles font/layout shifts)
window.addEventListener('load', () => moveHighlightTo(document.querySelector('.pill-tab.active')));
window.addEventListener('resize', () => moveHighlightTo(document.querySelector('.pill-tab.active')));
