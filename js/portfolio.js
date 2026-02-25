// ===== Portfolio JS - Muhammad Zohair Adil Khan =====

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // --- Active nav on scroll ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  // --- Intersection Observer for fade animations ---
  const fadeEls = document.querySelectorAll('.section-header, .timeline-card, .skill-card, .project-card, .honor-card, .edu-card, .about-content, .about-avatar-wrap, .contact-info, .contact-resume');
  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // --- Proficiency bar animation ---
  const profBars = document.querySelectorAll('.prof-fill');
  const profObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        profObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  profBars.forEach(bar => profObserver.observe(bar));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Staggered animation for cards ---
  const cardGroups = [
    { selector: '.skill-card', delay: 100 },
    { selector: '.project-card', delay: 120 },
    { selector: '.honor-card', delay: 100 },
    { selector: '.timeline-item', delay: 150 },
  ];

  cardGroups.forEach(({ selector, delay }) => {
    const cards = document.querySelectorAll(selector);
    const groupObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * delay);
          groupObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    cards.forEach(c => { c.classList.add('fade-up'); groupObserver.observe(c); });
  });

  // --- Typing effect for hero title ---
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent-blue)';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroTitle.textContent += text[i++];
        setTimeout(type, 60);
      } else {
        setTimeout(() => { heroTitle.style.borderRight = 'none'; }, 800);
      }
    };
    setTimeout(type, 600);
  }

  console.log('Portfolio loaded - Muhammad Zohair Adil Khan');
});
