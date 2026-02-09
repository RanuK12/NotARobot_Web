/* ============================================
   NOT A ROBOT - JavaScript v2
   Para la nueva estructura de la web
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // NAVBAR
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Check on load
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu?.classList.toggle('active');
      document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Active link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  
  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = navbar?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // VIDEO HERO
  // ============================================
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    // Pause video when not visible (performance)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.25 });
    
    observer.observe(heroVideo);
  }
  
  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const animatedElements = document.querySelectorAll('.section-title, .about-text, .podcast-process li, .studio-card, .contact-item');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
  });
  
  // Add CSS for fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // ============================================
  // CONTACT MODAL (for future use)
  // ============================================
  const contactModal = document.getElementById('contactModal');
  const modalOverlay = contactModal?.querySelector('.modal-overlay');
  const modalClose = contactModal?.querySelector('.modal-close');
  
  function openModal() {
    if (contactModal) {
      contactModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeModal() {
    if (contactModal) {
      contactModal.hidden = true;
      document.body.style.overflow = '';
    }
  }
  
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactModal && !contactModal.hidden) {
      closeModal();
    }
  });
  
  // ============================================
  // TEAM BANNER ANIMATION (duplicate content for infinite scroll)
  // ============================================
  const teamBannerTrack = document.querySelector('.team-banner-track');
  if (teamBannerTrack) {
    // Clone the content for seamless loop
    const clone = teamBannerTrack.innerHTML;
    teamBannerTrack.innerHTML += clone;
  }
  
  console.log('NOT A ROBOT v2 - Website initialized');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function for performance
function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
