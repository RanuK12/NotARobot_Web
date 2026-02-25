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

  // === LIGHTBOX — Gallery photo viewer ===
  (function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-carousel-item');
    if (!galleryItems.length) return;

    // Collect unique image sources (skip duplicates from infinite loop)
    const seen = new Set();
    const images = [];
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      if (img && !seen.has(img.src)) {
        seen.add(img.src);
        images.push(img.src);
      }
    });

    // Create lightbox DOM
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Cerrar">&times;</button>
      <button class="lightbox-nav prev" aria-label="Anterior">&#8249;</button>
      <img src="" alt="Instalaciones NOT A ROBOT">
      <button class="lightbox-nav next" aria-label="Siguiente">&#8250;</button>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('img');
    const btnClose = overlay.querySelector('.lightbox-close');
    const btnPrev = overlay.querySelector('.lightbox-nav.prev');
    const btnNext = overlay.querySelector('.lightbox-nav.next');
    let currentIndex = 0;

    function openLightbox(src) {
      currentIndex = images.indexOf(src);
      if (currentIndex === -1) currentIndex = 0;
      lbImg.src = images[currentIndex];
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.src = images[currentIndex];
    }

    // Attach click to all gallery items
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) openLightbox(img.src);
      });
    });

    btnClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    btnPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    btnNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  })();
});
