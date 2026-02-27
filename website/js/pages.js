document.addEventListener('DOMContentLoaded', () => {

  // clickjacking fallback — si estamos dentro de un iframe nos sacamos
  if (window.self !== window.top) {
    document.body.style.display = 'none';
    window.top.location = window.self.location;
  }

  // emails: se construyen en JS para no exponerlos en el HTML estático
  document.querySelectorAll('[data-email-user]').forEach(el => {
    const user = el.getAttribute('data-email-user');
    const domain = el.getAttribute('data-email-domain');
    const email = user + '@' + domain;
    el.textContent = email.toUpperCase();
    el.href = 'mailto:' + email;
    el.removeAttribute('data-email-user');
    el.removeAttribute('data-email-domain');
  });

  // menú mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // header — sube la opacidad al bajar del scroll inicial
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    header.style.backgroundColor = currentScroll > 100
      ? 'rgba(0, 0, 0, 0.98)'
      : 'rgba(0, 0, 0, 0.95)';
    lastScroll = currentScroll;
  });

  // scroll reveal con IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.07 });

  // tarjetas de proyectos — stagger por columna (grid de 2)
  document.querySelectorAll('.projects-grid .project-card-link').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', ((i % 2) * 0.12) + 's');
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // tarjetas de estudios
  document.querySelectorAll('.studios-container .studio-card-v2').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 0.12) + 's');
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // bloques de intro de sección
  document.querySelectorAll('.section-intro').forEach(el => {
    el.classList.add('reveal-title');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.studios-statement-wrapper').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // pasos del proceso — stagger
  document.querySelectorAll('.process-step').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 0.12) + 's');
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.contact-info-card').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 0.1) + 's');
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // lightbox para el carrusel de instalaciones
  (function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-carousel-item');
    if (!galleryItems.length) return;

    // único por src — el carrusel está duplicado para el loop infinito
    const seen = new Set();
    const images = [];
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      if (img && !seen.has(img.src)) {
        seen.add(img.src);
        images.push(img.src);
      }
    });

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
