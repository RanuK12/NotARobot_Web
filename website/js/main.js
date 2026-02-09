/* ========================================
   NOT A ROBOT - Main JavaScript
   Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 1. NAVIGATION SCROLL EFFECT
  // ========================================
  const nav = document.querySelector('.nav');
  
  function handleNavScroll() {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Initial check

  // ========================================
  // 2. MOBILE MENU TOGGLE
  // ========================================
  const navButton = document.querySelector('.nav_button');
  const navMenu = document.querySelector('.nav_menu');
  let menuOpen = false;

  if (navButton) {
    navButton.addEventListener('click', function() {
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        navButton.classList.add('active');
        navMenu.style.display = 'flex';
        // Add animation
        gsap.fromTo(navMenu, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      } else {
        navButton.classList.remove('active');
        gsap.to(navMenu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            if (window.innerWidth <= 991) {
              navMenu.style.display = 'none';
            }
          }
        });
      }
    });
  }

  // ========================================
  // 3. GSAP ANIMATIONS
  // ========================================
  
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Hero Animation
  gsap.from('.hero_main-wrapper', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
  });

  gsap.from('.hero-footer', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1,
    ease: 'power3.out'
  });

  // Intro Section Parallax
  gsap.to('.shape-follow', {
    y: -100,
    scrollTrigger: {
      trigger: '.home_intro',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Services List Animation
  const serviceItems = document.querySelectorAll('.service-list_item');
  serviceItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.1
    });
  });

  // Work Cards Animation
  const workCards = document.querySelectorAll('.work-card-container');
  workCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.15
    });
  });

  // Testimonial Parallax
  gsap.to('.parallax-img', {
    y: -80,
    scrollTrigger: {
      trigger: '.testimonial',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Headings Animation
  const headings = document.querySelectorAll('.headling-large');
  headings.forEach(heading => {
    gsap.from(heading, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ========================================
  // NEW: MANIFESTO SECTION ANIMATIONS
  // ========================================
  const manifestoItems = document.querySelectorAll('.manifesto-item');
  manifestoItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: item.closest('.no-somos') ? -30 : 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.1
    });
  });

  // ========================================
  // NEW: PILLARS SECTION ANIMATIONS
  // ========================================
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.2
    });
  });

  // ========================================
  // NEW: STUDIO GALLERY CAROUSEL
  // ========================================
  const galleryTrack = document.querySelector('.gallery-track');
  if (galleryTrack) {
    // Clone items for infinite scroll
    const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      const clone = item.cloneNode(true);
      galleryTrack.appendChild(clone);
    });

    // Pause on hover
    galleryTrack.addEventListener('mouseenter', () => {
      galleryTrack.style.animationPlayState = 'paused';
    });
    
    galleryTrack.addEventListener('mouseleave', () => {
      galleryTrack.style.animationPlayState = 'running';
    });
  }

  // ========================================
  // NEW: PODCAST SECTION ANIMATIONS
  // ========================================
  const podcastContent = document.querySelector('.podcast-content');
  if (podcastContent) {
    gsap.from('.podcast-text', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      scrollTrigger: {
        trigger: podcastContent,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.podcast-visual', {
      opacity: 0,
      x: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: podcastContent,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      delay: 0.2
    });
  }

  // ========================================
  // NEW: NOTA SECTION ANIMATIONS
  // ========================================
  const notaSection = document.querySelector('.nota-section');
  if (notaSection) {
    gsap.from('.nota-header', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: notaSection,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.nota-description', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: notaSection,
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      delay: 0.3
    });

    gsap.from('.nota-links', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      scrollTrigger: {
        trigger: notaSection,
        start: 'top 65%',
        toggleActions: 'play none none none'
      },
      delay: 0.5
    });
  }

  // ========================================
  // NEW: FINAL CTA ANIMATIONS
  // ========================================
  const finalCta = document.querySelector('.final-cta-section');
  if (finalCta) {
    gsap.from('.final-cta-title', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: finalCta,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    const ctaButtons = document.querySelectorAll('.final-cta-button');
    ctaButtons.forEach((btn, index) => {
      gsap.from(btn, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: finalCta,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        delay: 0.3 + (index * 0.15)
      });
    });
  }

  // ========================================
  // 4. VIDEO BACKGROUND HANDLING
  // ========================================
  const videos = document.querySelectorAll('.w-background-video video');
  
  videos.forEach(video => {
    // Ensure videos are muted (required for autoplay)
    video.muted = true;
    
    // Play videos when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay failed, possibly due to browser policies
            console.log('Autoplay prevented');
          });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
  });

  // ========================================
  // 5. MARQUEE ANIMATION (Pause on hover)
  // ========================================
  const marquee = document.querySelector('.marquee');
  const marqueeInner = document.querySelector('.marquee_inner');
  
  if (marquee && marqueeInner) {
    marquee.addEventListener('mouseenter', () => {
      marqueeInner.style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
      marqueeInner.style.animationPlayState = 'running';
    });
  }

  // ========================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // 7. CURSOR FOLLOWER (Optional - for premium feel)
  // ========================================
  /*
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
  });

  // Enlarge cursor on hover
  const hoverElements = document.querySelectorAll('a, button, .tarjeta-de-trabajo');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  */

  // ========================================
  // 8. LAZY LOADING IMAGES
  // ========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ========================================
  // 9. SERVICE LIST HOVER EFFECTS
  // ========================================
  const serviceListItems = document.querySelectorAll('.service-list_item');
  
  serviceListItems.forEach(item => {
    const imgLeft = item.querySelector('.service-list_img-wrap.left');
    const imgRight = item.querySelector('.service-list_img-wrap.right');
    
    item.addEventListener('mouseenter', () => {
      gsap.to([imgLeft, imgRight], {
        opacity: 1,
        duration: 0.3,
        stagger: 0.1
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to([imgLeft, imgRight], {
        opacity: 0,
        duration: 0.3
      });
    });
  });

  // ========================================
  // 10. FORM VALIDATION (If contact form exists)
  // ========================================
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector('textarea');
      
      if (email && !email.value.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (message && message.value.length < 10) {
        alert('Please enter a message with at least 10 characters');
        return;
      }
      
      // Submit logic here (e.g., fetch to API)
      console.log('Form submitted');
    });
  }

  // ========================================
  // 11. PRELOADER (Optional)
  // ========================================
  /*
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          preloader.style.display = 'none';
        }
      });
    }
  });
  */

  console.log('NOT A ROBOT - Website initialized 🤖');
});

// ========================================
// 12. UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait = 20) {
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

// Throttle function for scroll events
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
