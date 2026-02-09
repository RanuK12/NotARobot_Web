/* ============================================================
   NOT A ROBOT — JavaScript con Efectos Interactivos
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ================================
  // CUSTOM CURSOR
  // ================================
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Mouse move tracking
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
      // Cursor principal - movimiento directo
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      // Follower - movimiento con delay
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .studio-card, .project-item, .magnetic-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
      });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });
  }
  
  // ================================
  // MAGNETIC BUTTONS
  // ================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
  
  // ================================
  // NAVEGACIÓN CON SCROLL
  // ================================
  const nav = document.querySelector('.nav');
  
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // ================================
  // SMOOTH SCROLL
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ================================
  // INTERSECTION OBSERVER - ANIMACIONES
  // ================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observar elementos animables
  document.querySelectorAll('.section-number, .studio-card, .project-item, .about-content, .contact-content').forEach(el => {
    observer.observe(el);
  });
  
  // ================================
  // VIDEO CONTROL
  // ================================
  const videos = document.querySelectorAll('video');
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });
  
  videos.forEach(video => {
    videoObserver.observe(video);
  });
  
  // ================================
  // PARALLAX EFFECT ON BLUR BLOBS
  // ================================
  const blurBlobs = document.querySelectorAll('.blur-blob');
  
  if (blurBlobs.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      blurBlobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
  
  // ================================
  // HOVER LINE ANIMATION ON PROJECTS
  // ================================
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const hoverLine = item.querySelector('.hover-line');
    
    if (hoverLine) {
      item.addEventListener('mouseenter', () => {
        hoverLine.style.width = '100%';
      });
      
      item.addEventListener('mouseleave', () => {
        hoverLine.style.width = '0';
      });
    }
  });
  
});

