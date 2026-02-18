/* ============================================
   PAGES.JS - JavaScript para páginas internas
   NOT A ROBOT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === SEGURIDAD: Anti-clickjacking (fallback JS) ===
  if (window.self !== window.top) {
    document.body.style.display = 'none';
    window.top.location = window.self.location;
  }

  // === SEGURIDAD: Protección de emails contra scraping ===
  document.querySelectorAll('[data-email-user]').forEach(el => {
    const user = el.getAttribute('data-email-user');
    const domain = el.getAttribute('data-email-domain');
    const email = user + '@' + domain;
    el.textContent = email.toUpperCase();
    el.href = 'mailto:' + email;
    el.removeAttribute('data-email-user');
    el.removeAttribute('data-email-domain');
  });

  // === Mobile Menu Toggle ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
  
  // === Header scroll effect ===
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
    } else {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
  });
  
  // === Animate elements on scroll ===
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.project-card, .studio-card, .team-member, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add animation class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
