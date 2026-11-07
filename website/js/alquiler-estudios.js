/**
 * NOT A ROBOT STUDIOS — Interactive Studio Rental, Pricing Selector, Lightbox,
 * 42-Item Technical Rider Cart, ES/EN Switcher & Conversion Form Handler
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Exact 42-Item Technical Rider Inventory from notarobotstudios.es
  const RIDER_ITEMS = [
    // Cámaras y ópticas (15 items)
    { id: 'cam-1', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Cámara Sony FX30 Cinema Line 4K', stock: 2 },
    { id: 'cam-2', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Cámara Sony A7IV Full Frame 4K', stock: 1 },
    { id: 'cam-3', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Cámara Sony ZV-E10 4K', stock: 2 },
    { id: 'cam-4', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Objetivo Sony FE 50mm f/1.8', stock: 1 },
    { id: 'cam-5', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Objetivo Tamron 28-75mm f/2.8 Di III VXD G2', stock: 1 },
    { id: 'cam-6', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Objetivo Tamron 17-70mm f/2.8 Di III-A VC RXD', stock: 2 },
    { id: 'cam-7', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Objetivo Sony E PZ 16-50mm F3.5-5.6 OSS', stock: 2 },
    { id: 'cam-8', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Objetivo Sony E 55-210mm F4.5-6.3 OSS', stock: 1 },
    { id: 'cam-9', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Baterías Sony NP-FZ100', stock: 9 },
    { id: 'cam-10', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Baterías Sony NP-FW50', stock: 4 },
    { id: 'cam-11', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Cargador doble baterías NP-FZ100', stock: 2 },
    { id: 'cam-12', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Dummy Battery NP-FZ100 a corriente continua', stock: 3 },
    { id: 'cam-13', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Dummy Battery NP-FW50 a USB', stock: 2 },
    { id: 'cam-14', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Tarjeta SD Kingston Canvas React Plus 128GB V90', stock: 5 },
    { id: 'cam-15', cat: 'camaras', catLabel: 'Cámaras y ópticas', name: 'Filtro Black Mist 1/4 K&F Concept (67mm)', stock: 3 },

    // Sonido (17 items)
    { id: 'snd-1', cat: 'sonido', catLabel: 'Sonido', name: 'Consola Rodecaster Pro II', stock: 1 },
    { id: 'snd-2', cat: 'sonido', catLabel: 'Sonido', name: 'Grabadora multipista Zoom H6', stock: 1 },
    { id: 'snd-3', cat: 'sonido', catLabel: 'Sonido', name: 'Micrófono dinámico Shure SM7B', stock: 4 },
    { id: 'snd-4', cat: 'sonido', catLabel: 'Sonido', name: 'Micrófono dinámico Rode Procaster', stock: 4 },
    { id: 'snd-5', cat: 'sonido', catLabel: 'Sonido', name: 'Micrófono dinámico Rode PodMic', stock: 4 },
    { id: 'snd-6', cat: 'sonido', catLabel: 'Sonido', name: 'Sistema inalámbrico Sennheiser Profile Wireless (2 TX + 1 RX)', stock: 2 },
    { id: 'snd-7', cat: 'sonido', catLabel: 'Sonido', name: 'Sistema inalámbrico Rode Wireless GO II (2 TX + 1 RX)', stock: 1 },
    { id: 'snd-8', cat: 'sonido', catLabel: 'Sonido', name: 'Micrófono de cañón direccional Rode NTG4+', stock: 1 },
    { id: 'snd-9', cat: 'sonido', catLabel: 'Sonido', name: 'Pértiga profesional Rode Boompole', stock: 1 },
    { id: 'snd-10', cat: 'sonido', catLabel: 'Sonido', name: 'Auriculares de estudio Audio-Technica ATH-M20x', stock: 4 },
    { id: 'snd-11', cat: 'sonido', catLabel: 'Sonido', name: 'Auriculares de referencia Sony MDR-7506', stock: 1 },
    { id: 'snd-12', cat: 'sonido', catLabel: 'Sonido', name: 'Amplificador de auriculares 4 canales Behringer HA400', stock: 1 },
    { id: 'snd-13', cat: 'sonido', catLabel: 'Sonido', name: 'Previo de micrófono Cloudlifter CL-1', stock: 2 },
    { id: 'snd-14', cat: 'sonido', catLabel: 'Sonido', name: 'Previo de micrófono Triton Audio FetHead', stock: 2 },
    { id: 'snd-15', cat: 'sonido', catLabel: 'Sonido', name: 'Brazo articulado de estudio Rode PSA1+', stock: 4 },
    { id: 'snd-16', cat: 'sonido', catLabel: 'Sonido', name: 'Pie de micrófono bajo de sobremesa', stock: 4 },
    { id: 'snd-17', cat: 'sonido', catLabel: 'Sonido', name: 'Cables XLR balanceados profesionales', stock: 12 },

    // Realización (5 items)
    { id: 'rea-1', cat: 'realizacion', catLabel: 'Realización', name: 'Mezclador Blackmagic ATEM Mini Extreme ISO', stock: 1 },
    { id: 'rea-2', cat: 'realizacion', catLabel: 'Realización', name: 'Monitor portátil 15.6" Full HD HDMI', stock: 1 },
    { id: 'rea-3', cat: 'realizacion', catLabel: 'Realización', name: 'Monitor de campo Feelworld F6 Plus 5.5" 4K', stock: 1 },
    { id: 'rea-4', cat: 'realizacion', catLabel: 'Realización', name: 'Capturadora de vídeo Elgato Cam Link 4K', stock: 1 },
    { id: 'rea-5', cat: 'realizacion', catLabel: 'Realización', name: 'Cables HDMI fibra óptica alta velocidad (10m / 15m)', stock: 6 },

    // Soportes e Iluminación (5 items)
    { id: 'sop-1', cat: 'soportes', catLabel: 'Soportes e Iluminación', name: 'Trípode de vídeo fluido SmallRig AD-01 Heavy Duty', stock: 3 },
    { id: 'sop-2', cat: 'soportes', catLabel: 'Soportes e Iluminación', name: 'Trípode de vídeo profesional Neewer TP75', stock: 2 },
    { id: 'sop-3', cat: 'soportes', catLabel: 'Soportes e Iluminación', name: 'Trípode compacto Manfrotto Element MII', stock: 1 },
    { id: 'sop-4', cat: 'soportes', catLabel: 'Soportes e Iluminación', name: 'Sistema portafondos completo de estudio', stock: 1 },
    { id: 'sop-5', cat: 'soportes', catLabel: 'Soportes e Iluminación', name: 'Pies de foco de estudio / C-Stands con brazo', stock: 8 }
  ];

  const riderState = {}; // { itemId: qty }
  let activeRiderCat = 'all';

  const riderContainer = document.getElementById('rider-catalog-container');
  const riderCartList = document.getElementById('rider-cart-list');
  const riderCartCount = document.getElementById('rider-cart-count');
  const riderNavBadge = document.getElementById('rider-nav-badge');
  const riderTransferBtn = document.getElementById('rider-transfer-btn');
  const riderClearBtn = document.getElementById('rider-clear-btn');
  const riderTextarea = document.getElementById('rider_seleccionado');

  function renderRiderCatalog() {
    if (!riderContainer) return;
    const categories = [
      { key: 'camaras', title: 'Cámaras y ópticas (15 equipos)' },
      { key: 'sonido', title: 'Sonido y microfonía (17 equipos)' },
      { key: 'realizacion', title: 'Realización y monitoreo (5 equipos)' },
      { key: 'soportes', title: 'Soportes y grip de plató (5 equipos)' }
    ];

    let html = '';
    categories.forEach(function (catObj) {
      if (activeRiderCat !== 'all' && activeRiderCat !== catObj.key) return;
      const items = RIDER_ITEMS.filter(function (it) { return it.cat === catObj.key; });
      html += `<div class="rider-category-block" data-cat="${catObj.key}">`;
      html += `<h3 class="rider-category-title"><span>${catObj.title}</span></h3>`;
      html += `<div class="rider-items-grid">`;
      items.forEach(function (item) {
        const qty = riderState[item.id] || 0;
        const selectedClass = qty > 0 ? 'selected' : '';
        html += `
          <div class="rider-item-card ${selectedClass}" data-item-id="${item.id}">
            <div>
              <div class="rider-item-name">${item.name}</div>
              <div class="rider-item-stock">Disponibles: ${item.stock} ud${item.stock > 1 ? 's' : ''}.</div>
            </div>
            <div class="rider-qty-controls">
              <button type="button" class="rider-qty-btn" data-rider-action="dec" data-id="${item.id}" ${qty <= 0 ? 'disabled' : ''} aria-label="Restar ${item.name}">−</button>
              <span class="rider-qty-val">${qty}</span>
              <button type="button" class="rider-qty-btn" data-rider-action="inc" data-id="${item.id}" ${qty >= item.stock ? 'disabled' : ''} aria-label="Sumar ${item.name}">+</button>
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    });

    riderContainer.innerHTML = html;
  }

  function updateRiderCart() {
    const selectedEntries = [];
    let totalUnits = 0;

    RIDER_ITEMS.forEach(function (item) {
      const q = riderState[item.id] || 0;
      if (q > 0) {
        selectedEntries.push({ item: item, qty: q });
        totalUnits += q;
      }
    });

    if (riderCartCount) riderCartCount.textContent = totalUnits;
    if (riderNavBadge) {
      riderNavBadge.textContent = totalUnits > 0 ? totalUnits : '42';
    }

    if (riderCartList) {
      if (selectedEntries.length === 0) {
        riderCartList.innerHTML = '<li class="rider-cart-empty">Selecciona equipos con los botones + / − para armar tu rider a medida.</li>';
      } else {
        riderCartList.innerHTML = selectedEntries.map(function (entry) {
          return `<li><span><strong>${entry.qty}x</strong> ${entry.item.name}</span><button type="button" class="rider-qty-btn" data-rider-action="remove" data-id="${entry.item.id}" title="Quitar">&times;</button></li>`;
        }).join('');
      }
    }

    if (riderTextarea) {
      riderTextarea.value = selectedEntries.map(function (e) {
        return `${e.qty}x ${e.item.name}`;
      }).join(', ');
    }
  }

  if (riderContainer) {
    renderRiderCatalog();
    updateRiderCart();

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-rider-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-rider-action');
      const id = btn.getAttribute('data-id');
      const item = RIDER_ITEMS.find(function (x) { return x.id === id; });
      if (!item) return;

      const current = riderState[id] || 0;
      if (action === 'inc' && current < item.stock) {
        riderState[id] = current + 1;
      } else if (action === 'dec' && current > 0) {
        riderState[id] = current - 1;
      } else if (action === 'remove') {
        delete riderState[id];
      }
      renderRiderCatalog();
      updateRiderCart();
    });
  }

  // Category filter buttons for Rider
  document.querySelectorAll('[data-rider-cat]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-rider-cat]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeRiderCat = btn.getAttribute('data-rider-cat') || 'all';
      renderRiderCatalog();
    });
  });

  if (riderClearBtn) {
    riderClearBtn.addEventListener('click', function () {
      Object.keys(riderState).forEach(function (k) { delete riderState[k]; });
      renderRiderCatalog();
      updateRiderCart();
    });
  }

  if (riderTransferBtn) {
    riderTransferBtn.addEventListener('click', function () {
      const studioSelect = document.getElementById('estudio');
      const usoSelect = document.getElementById('tipo_uso');
      if (studioSelect && !studioSelect.value) {
        studioSelect.value = 'Alquiler Rider Técnico / Material';
      }
      if (usoSelect && !usoSelect.value) {
        usoSelect.value = 'Alquiler de equipamiento';
      }
      const target = document.getElementById('reservar');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 2. Interactive Pricing Cells & Studio Pre-selection Buttons
  document.querySelectorAll('[data-select-studio]').forEach(function (el) {
    el.addEventListener('click', function () {
      const studio = el.getAttribute('data-select-studio');
      const pack = el.getAttribute('data-select-pack');
      const hours = el.getAttribute('data-select-hours');
      const price = el.getAttribute('data-select-price');

      const studioSelect = document.getElementById('estudio');
      const packSelect = document.getElementById('pack_duracion');
      const msgField = document.getElementById('mensaje');

      if (studioSelect && studio) {
        studioSelect.value = studio;
      }
      if (packSelect && pack) {
        packSelect.value = pack;
      }
      if (msgField && hours && price) {
        const note = `Interesado en: ${studio} — ${pack} (${hours}: ${price}).`;
        if (!msgField.value.includes(note)) {
          msgField.value = (msgField.value ? msgField.value + '\n' : '') + note;
        }
      }

      if (window.NARTracking) {
        window.NARTracking.recordTelemetryEvent('select_rate', 'pricing', `${studio} - ${pack || 'General'} (${hours || ''})`, {
          studio: studio,
          pack: pack,
          hours: hours,
          price: price
        });
      }

      const bookingSection = document.getElementById('reservar');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Fullscreen Lightbox for Studio A (12 photos) & Studio B (10 photos)
  const lbModal = document.getElementById('studio-lightbox');
  const lbImg = document.getElementById('studio-lb-img');
  const lbCaption = document.getElementById('studio-lb-caption');
  const lbPrev = document.getElementById('studio-lb-prev');
  const lbNext = document.getElementById('studio-lb-next');
  const lbClose = document.getElementById('studio-lb-close');

  let activeGallery = [];
  let activeIndex = 0;

  function openGalleryLightbox(items, index) {
    if (!lbModal || !lbImg) return;
    activeGallery = items;
    activeIndex = index;
    updateLightboxSlide();
    lbModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxSlide() {
    if (!activeGallery.length) return;
    const item = activeGallery[activeIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    if (lbCaption) {
      lbCaption.textContent = `${activeIndex + 1} / ${activeGallery.length} — ${item.alt}`;
    }
  }

  function closeGalleryLightbox() {
    if (!lbModal) return;
    lbModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery-group]').forEach(function (grid) {
    const imgs = Array.from(grid.querySelectorAll('.studio-gallery-item img'));
    const galleryData = imgs.map(function (img) {
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
    });

    grid.querySelectorAll('.studio-gallery-item').forEach(function (card, idx) {
      card.addEventListener('click', function () {
        openGalleryLightbox(galleryData, idx);
      });
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeGalleryLightbox);
  if (lbPrev) {
    lbPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
      updateLightboxSlide();
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', function (e) {
      e.stopPropagation();
      activeIndex = (activeIndex + 1) % activeGallery.length;
      updateLightboxSlide();
    });
  }
  if (lbModal) {
    lbModal.addEventListener('click', function (e) {
      if (e.target === lbModal) closeGalleryLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!lbModal || !lbModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeGalleryLightbox();
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });

  // 4. Sticky Sub-Navbar Scroll Spy & URL Deep-Linking
  const subnavLinks = document.querySelectorAll('.studios-tab-btn[href^="#"]');
  const observedSections = ['overview', 'estudio-a', 'estudio-b', 'rider-tecnico', 'reservar', 'ubicacion-poblenou']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (observedSections.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          subnavLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 });

    observedSections.forEach(function (sec) { spyObserver.observe(sec); });
  }

  // Deep-link handling for clean URLs (/estudio-a, /estudio-b, /alquiler-material) or ?studio=
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('vista') || params.get('studio');
  if (path.endsWith('/estudio-a') || viewParam === 'estudio-a') {
    const el = document.getElementById('estudio-a');
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth' }); }, 150);
  } else if (path.endsWith('/estudio-b') || viewParam === 'estudio-b') {
    const el = document.getElementById('estudio-b');
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth' }); }, 150);
  } else if (path.endsWith('/alquiler-material') || viewParam === 'rider') {
    const el = document.getElementById('rider-tecnico');
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth' }); }, 150);
  }

  // 5. ES / EN Language Switcher (like notarobotstudios.es /en route)
  const langBtns = document.querySelectorAll('[data-set-lang]');
  function setLanguage(lang) {
    langBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });
    document.querySelectorAll('[data-i18n-es][data-i18n-en]').forEach(function (el) {
      const val = el.getAttribute(lang === 'en' ? 'data-i18n-en' : 'data-i18n-es');
      if (val) el.textContent = val;
    });
    document.documentElement.lang = lang;
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.getAttribute('data-set-lang') || 'es');
    });
  });

  if (params.get('lang') === 'en' || path.startsWith('/en')) {
    setLanguage('en');
  }

  // 6. Unified Reservation & Quote Form Handler (Netlify Forms + Google Ads Conversion + Command Center)
  const bookingForm = document.getElementById('form-reserva-estudios');
  const feedbackBox = document.getElementById('booking-form-feedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const leadObj = {
        type: 'Reserva Estudio / Rider',
        name: formData.get('nombre') || '',
        email: formData.get('email') || '',
        phone: formData.get('telefono') || '',
        date: formData.get('fecha_tentativa') || '',
        studio: formData.get('estudio') || 'Estudio A (92 m²)',
        usage: formData.get('tipo_uso') || 'Podcast / Videopodcast',
        pack: formData.get('pack_duracion') || '',
        rider: formData.get('rider_seleccionado') || '',
        message: formData.get('mensaje') || '',
        value: (formData.get('estudio') || '').includes('Estudio A') ? 250 : 150
      };

      // 1. Record Lead & Fire Google Ads + GA4 Conversion
      if (window.NARTracking) {
        window.NARTracking.recordLead(leadObj);
        window.NARTracking.trackConversion('form_submit_studios', {
          label: `Reserva ${leadObj.studio} - ${leadObj.usage}`,
          value: leadObj.value,
          studio: leadObj.studio,
          usage: leadObj.usage
        });
      }

      // 2. Submit to Netlify Forms via AJAX (works seamlessly on Netlify; resolves gracefully on localhost)
      const urlEncoded = new URLSearchParams(formData).toString();
      fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlEncoded
      }).catch(function () {});

      // 3. Build instant WhatsApp confirmation link pre-filled with the user's reservation
      const waMsg = [
        `Hola Not A Robot! Acabo de enviar una solicitud en notarobot.es:`,
        `• Nombre: ${leadObj.name}`,
        `• Espacio: ${leadObj.studio}`,
        `• Uso: ${leadObj.usage}`,
        leadObj.pack ? `• Pack/Duración: ${leadObj.pack}` : '',
        leadObj.date ? `• Fecha tentativa: ${leadObj.date}` : '',
        leadObj.rider ? `• Rider: ${leadObj.rider}` : '',
        leadObj.message ? `• Notas: ${leadObj.message}` : ''
      ].filter(Boolean).join('\n');

      const waUrl = `https://wa.me/34671132227?text=${encodeURIComponent(waMsg)}`;

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="background: rgba(34, 197, 94, 0.14); border: 1px solid #22c55e; border-radius: 10px; padding: 1.35rem; margin-top: 1.25rem; color: #f4f4f5;">
            <h4 style="margin: 0 0 0.5rem; color: #4ade80; font-size: 1.1rem;">✓ ¡Solicitud registrada con éxito!</h4>
            <p style="margin: 0 0 1rem; font-size: 0.92rem; color: #d4d4d8;">
              Nuestro equipo de Poblenou ha recibido los datos de tu proyecto para <strong>${leadObj.studio}</strong> y te responderá a la brevedad. Si necesitas confirmar disponibilidad inmediata para hoy o esta semana, puedes enviarnos tu resumen directo por WhatsApp:
            </p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-studio-primary" data-track-label="WhatsApp Post-Formulario" style="background: #25D366; box-shadow: none; font-size: 0.9rem; padding: 0.7rem 1.25rem;">
              Confirmar ahora por WhatsApp →
            </a>
          </div>
        `;
      }

      bookingForm.reset();
    });
  }
});
