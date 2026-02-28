/* ============================================================
   NAV — scroll state + mobile toggle
   ============================================================ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
const phrases = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Open Source Contributor',
  'Problem Solver',
];
const el = document.getElementById('typewriter');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let pause = false;

function type() {
  if (pause) return;
  const current = phrases[phraseIdx];

  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      pause = true;
      setTimeout(() => { pause = false; deleting = true; }, 2000);
    }
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

/* ============================================================
   INTERSECTION OBSERVER — fade-up animations
   ============================================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Apply to key elements after DOM is ready
const animTargets = [
  '.about__grid',
  '.skill-card',
  '.project-card',
  '.contact__grid',
  '.section__header',
  '.tech-bar',
];
animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
});

/* ============================================================
   CONTACT FORM — client-side demo
   ============================================================ */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate async send
  const btn = form.querySelector('[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
    showStatus('Message sent! I\'ll get back to you soon.', 'success');
  }, 1200);
});

function showStatus(msg, type) {
  status.textContent = msg;
  status.className = 'form-status ' + type;
  setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav__links a[href^="#"]');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navA.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--text)'
      : '';
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
