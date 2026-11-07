/**
 * NOT A ROBOT — Global Bilingual Engine (ES Default / EN) + Fading Orange Crayon Cursor
 * Synchronizes language state across the entire notarobot.es website:
 * - index.html
 * - pages/streaming.html
 * - pages/produccion.html
 * - pages/podcast.html
 * - pages/estudio.html
 * - pages/alquiler-estudios.html
 * - pages/nosotros.html
 * - pages/contacto.html
 * - pages/projects/*.html
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. FADING ORANGE CRAYON CURSOR (Exact q2 from notarobotstudios.es)
  // =========================================================================
  function initGlobalCrayonCursor() {
    if (document.getElementById('crayonCursorCanvas')) return;
    var canvas = document.createElement('canvas');
    canvas.id = 'crayonCursorCanvas';
    canvas.style.cssText = 'pointer-events:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;touch-action:none;';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var TRAIL_DURATION = 1000;
    var points = [];

    function calcWidth(speed) {
      if (speed <= 0.15) return 2.8;
      if (speed >= 5) return 0.4;
      return 2.8 - ((speed - 0.15) / (5 - 0.15)) * 2.4;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (ev) {
      points.push({ x: ev.clientX, y: ev.clientY, time: performance.now() });
    }, { passive: true });

    function render() {
      var now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points.filter(function (pt) { return now - pt.time < TRAIL_DURATION; });
      if (points.length > 1) {
        for (var i = 1; i < points.length; i++) {
          var p0 = points[i - 1];
          var p1 = points[i];
          var age = now - p1.time;
          var alpha = Math.max(0, 1 - age / TRAIL_DURATION);
          var dt = Math.max(1, p1.time - p0.time);
          var speed = Math.hypot(p1.x - p0.x, p1.y - p0.y) / dt;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = 'rgba(232, 70, 30, ' + alpha + ')';
          ctx.lineWidth = calcWidth(speed);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
      requestAnimationFrame(render);
    }

    resize();
    requestAnimationFrame(render);
  }

  // =========================================================================
  // 2. GLOBAL TRANSLATION DICTIONARY (All Pages of notarobot.es)
  // =========================================================================
  var SITE_I18N = {
    es: {
      // Navbar
      nav_home: 'Inicio',
      nav_streaming: 'Streaming',
      nav_produccion: 'Producción Audiovisual',
      nav_podcast: 'Podcast',
      nav_estudios: 'Nuestros Estudios',
      nav_alquiler: 'Alquiler de Estudios',
      nav_nosotros: 'Sobre Nosotros',
      nav_contacto: 'Contacto',
      btn_contactanos: 'Contáctanos',
      footer_rights: '© 2026 NOT A ROBOT. Todos los derechos reservados.',
      footer_studios_link: 'Estudio de alquiler en Barcelona · Estudio A (92 m²) y Estudio B (14 m²)',

      // Home (index.html)
      home_hero_title: 'Productora Audiovisual Internacional',
      home_hero_subtitle: 'Basada en Poblenou, Barcelona',

      // Streaming (streaming.html)
      streaming_intro: 'Diseñamos y producimos transmisiones en vivo con estándares televisivos y lógica digital. Realización multicámara, dirección técnica, operación de sonido, gráficos en vivo y distribución simultánea en diferentes plataformas.',
      streaming_h2: 'Nuestros Proyectos',

      // Producción Audiovisual (produccion.html)
      produccion_intro: 'Realizamos piezas audiovisuales de alta calidad para marcas, instituciones y eventos. Trabajamos desde la idea hasta la distribución, y entregamos contenido optimizado para redes, prensa y comunicación corporativa.',
      produccion_h2: 'Nuestros Trabajos',
      prod_worldcup_sub: 'Cobertura fotográfica oficial para TV Pública Argentina',

      // Podcast (podcast.html)
      podcast_how_h2: '¿Cómo trabajamos?',
      podcast_how_sub: 'Te acompañamos en todo el proceso, o en la etapa que tu decidas.',
      podcast_step1_t: 'Diseño estratégico',
      podcast_step1_d: 'Nos encargamos de pre producir el podcast para que comiences con bases sólidas. Te ayudamos a dar forma a tus ideas, ordenar el contenido, crear una identidad propia y estructurar el proyecto.',
      podcast_step2_t: 'Ejecución',
      podcast_step2_d: 'Comenzamos a crear mediante la coordinación, dirección y grabación de todo lo planificado en la etapa anterior.',
      podcast_step3_t: 'Postproducción',
      podcast_step3_d: 'Llevamos a cabo todo lo necesario para convertir el material en un episodio listo para publicar: edición, sonido, distribución y promoción.',
      podcast_list_h2: 'Podcasts que Producimos',
      podcast_list_sub: 'Algunos de los proyectos que hemos llevado a cabo.',
      pod_destierra_sub: 'Una serie documental original de NOT A ROBOT',
      pod_corchea_sub: 'El podcast de música más importante de la escena europea',
      pod_juana_sub: 'Conversación — Dirección técnica integral',
      pod_nota_sub: 'Un medio hecho por artistas',

      // Nuestros Estudios (estudio.html)
      estudios_intro: 'Nuestras instalaciones están diseñadas para la producción de contenido audiovisual, streaming, podcasts y sesiones en vivo. El espacio combina tecnología profesional con una estética editorial cuidada permitiendo desarrollar grabaciones audiovisuales con máxima calidad.',
      estudios_a_word: 'ESTUDIO',
      estudios_a_specs: 'Estudio de 92 m² &nbsp;|&nbsp; Ventana con vistas a la ciudad &nbsp;|&nbsp; Desde 70 €/h',
      estudios_a_desc: 'Nuestro estudio principal, perfecto para producciones de gran formato, podcasts con múltiples invitados y grabaciones de streaming.',
      estudios_a_link: 'Ver tarifas, sets y 12 fotos de Estudio A →',
      estudios_b_word: 'ESTUDIO',
      estudios_b_specs: 'Estudio de 14 m² &nbsp;|&nbsp; Cortinas adaptables &nbsp;|&nbsp; Desde 50 €/h',
      estudios_b_desc: 'Estudio íntimo ideal para entrevistas, podcasts de formato reducido y sesiones de grabación que requieren un ambiente más cercano.',
      estudios_b_link: 'Ver tarifas, sets y 10 fotos de Estudio B →',
      estudios_cta_text: 'Alquilá el <strong>Studio A (92 m²)</strong> o el <strong>Studio B (14 m²)</strong> por horas o por día — equipamiento de cine Sony 4K, sonido Shure SM7B, Rider Técnico de 42 equipos y packs flexibles para tu producción.',
      estudios_cta_btn1: 'Conocé nuestros estudios y tarifas →',
      estudios_cta_btn2: 'Reservar estudio',
      estudios_inst_h2: 'NUESTRAS INSTALACIONES',

      // Sobre Nosotros (nosotros.html)
      nosotros_p1: 'Somos un estudio creativo y productora audiovisual basada en Barcelona, hecha por personas que sienten, observan y se emocionan con una buena idea (o con una buena vista desde la ventana de nuestro estudio).',
      nosotros_p2: 'Nos especializamos en podcasts, streaming, contenidos digitales y experiencias audiovisuales para marcas, medios y proyectos culturales.',
      nosotros_team_h2: 'Nuestro Equipo',
      role_mauricio: 'Desarrollo & Negocio<br><span class="founder-badge">Founder</span>',
      role_melissa: 'Jefatura de Producción Técnica<br><span class="founder-badge">Founder</span>',
      role_gaspar: 'Dirección Técnica Audiovisual<br><span class="founder-badge">Founder</span>',
      role_tomas: 'Estrategia & Contenido<br><span class="founder-badge">Founder</span>',
      role_delfina: 'Producción Ejecutiva &<br>Project Management',
      role_juana: 'Dirección Creativa',
      role_martin: 'Producción & Operaciones',
      role_carlota: 'Realización Audiovisual',

      // Contacto (contacto.html)
      contacto_lbl_tel: 'Teléfono',
      contacto_lbl_mail: 'E-Mail',
      contacto_lbl_web: 'Web',
      contacto_lbl_social: 'Redes',
      contacto_lbl_addr: 'Dirección'
    },
    en: {
      // Navbar
      nav_home: 'Home',
      nav_streaming: 'Streaming',
      nav_produccion: 'Audiovisual Production',
      nav_podcast: 'Podcast',
      nav_estudios: 'Our Studios',
      nav_alquiler: 'Studio Rental',
      nav_nosotros: 'About Us',
      nav_contacto: 'Contact',
      btn_contactanos: 'Contact Us',
      footer_rights: '© 2026 NOT A ROBOT. All rights reserved.',
      footer_studios_link: 'Studio rental in Barcelona · Studio A (92 m²) & Studio B (14 m²)',

      // Home (index.html)
      home_hero_title: 'International Audiovisual Production Company',
      home_hero_subtitle: 'Based in Poblenou, Barcelona',

      // Streaming (streaming.html)
      streaming_intro: 'We design and produce live broadcasts with television standards and digital agility. Multicamera live production, technical direction, broadcast sound engineering, live graphics and simultaneous multi-platform distribution.',
      streaming_h2: 'Our Projects',

      // Producción Audiovisual (produccion.html)
      produccion_intro: 'We produce high-end audiovisual pieces for brands, institutions and events. We work from concept to distribution, delivering content optimised for social media, press and corporate communication.',
      produccion_h2: 'Our Work',
      prod_worldcup_sub: 'Official photographic coverage for TV Pública Argentina',

      // Podcast (podcast.html)
      podcast_how_h2: 'How we work',
      podcast_how_sub: 'We support you throughout the entire process, or at whichever stage you choose.',
      podcast_step1_t: 'Strategic design',
      podcast_step1_d: 'We handle the pre-production of your podcast so you start on solid ground. We help shape your ideas, structure the content, build a unique identity and plan the project.',
      podcast_step2_t: 'Execution',
      podcast_step2_d: 'We bring the project to life through full coordination, technical direction and multicamera recording of everything planned.',
      podcast_step3_t: 'Post-production',
      podcast_step3_d: 'We take care of everything needed to turn raw footage into a ready-to-publish episode: editing, sound mastering, distribution and promotion.',
      podcast_list_h2: 'Podcasts We Produce',
      podcast_list_sub: 'Some of the projects we have brought to life.',
      pod_destierra_sub: 'An original documentary series by NOT A ROBOT',
      pod_corchea_sub: 'The leading music podcast in the European scene',
      pod_juana_sub: 'Conversation — Full technical direction',
      pod_nota_sub: 'A media platform created by artists',

      // Nuestros Estudios (estudio.html)
      estudios_intro: 'Our facilities are designed for audiovisual content production, live streaming, podcasts and live sessions. The space combines broadcast technology with a refined editorial aesthetic to deliver recordings of the highest quality.',
      estudios_a_word: 'STUDIO',
      estudios_a_specs: '92 m² Studio &nbsp;|&nbsp; Panoramic city-view window &nbsp;|&nbsp; From 70 €/h',
      estudios_a_desc: 'Our main studio, ideal for large-format productions, multi-guest podcasts and live streaming broadcasts.',
      estudios_a_link: 'View Studio A rates, sets & 12 photos →',
      estudios_b_word: 'STUDIO',
      estudios_b_specs: '14 m² Studio &nbsp;|&nbsp; Adaptable curtains &nbsp;|&nbsp; From 50 €/h',
      estudios_b_desc: 'An intimate, versatile studio ideal for interviews, small-format podcasts and recording sessions that call for a closer atmosphere.',
      estudios_b_link: 'View Studio B rates, sets & 10 photos →',
      estudios_cta_text: 'Rent <strong>Studio A (92 m²)</strong> or <strong>Studio B (14 m²)</strong> by the hour or full day — Sony 4K cinema cameras, Shure SM7B sound, 42-item Technical Rider and flexible recording packages.',
      estudios_cta_btn1: 'Explore our studios & rates →',
      estudios_cta_btn2: 'Book a studio',
      estudios_inst_h2: 'OUR FACILITIES',

      // Sobre Nosotros (nosotros.html)
      nosotros_p1: 'We are a creative studio and audiovisual production company based in Barcelona, built by people who feel, observe and get excited about a great idea (or a great view from our studio window).',
      nosotros_p2: 'We specialise in podcasts, live streaming, digital content and audiovisual experiences for brands, media outlets and cultural projects.',
      nosotros_team_h2: 'Our Team',
      role_mauricio: 'Business & Development<br><span class="founder-badge">Founder</span>',
      role_melissa: 'Head of Technical Production<br><span class="founder-badge">Founder</span>',
      role_gaspar: 'Audiovisual Technical Director<br><span class="founder-badge">Founder</span>',
      role_tomas: 'Strategy & Content<br><span class="founder-badge">Founder</span>',
      role_delfina: 'Executive Production &<br>Project Management',
      role_juana: 'Creative Direction',
      role_martin: 'Production & Operations',
      role_carlota: 'Audiovisual Direction',

      // Contacto (contacto.html)
      contacto_lbl_tel: 'Phone',
      contacto_lbl_mail: 'E-Mail',
      contacto_lbl_web: 'Website',
      contacto_lbl_social: 'Social',
      contacto_lbl_addr: 'Address'
    }
  };

  var currentLang = 'es';

  function swapBanners(lang) {
    document.querySelectorAll('img.banner-svg').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      var base = src.split('?')[0];
      var query = src.indexOf('?') !== -1 ? '?' + src.split('?')[1] : '';
      if (lang === 'en') {
        if (base.indexOf('-en.svg') === -1 && base.indexOf('.svg') !== -1) {
          img.setAttribute('src', base.replace('.svg', '-en.svg') + query);
        }
      } else {
        if (base.indexOf('-en.svg') !== -1) {
          img.setAttribute('src', base.replace('-en.svg', '.svg') + query);
        }
      }
    });
  }

  function applyGlobalLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    try {
      localStorage.setItem('notarobot_lang', currentLang);
    } catch (e) {}

    document.documentElement.lang = currentLang;
    var dict = SITE_I18N[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update back buttons on project detail pages
    var backBtn = document.querySelector('.btn-back');
    if (backBtn) {
      var href = backBtn.getAttribute('href') || '';
      var svg = backBtn.querySelector('svg');
      var svgHtml = svg ? svg.outerHTML : '';
      if (href.indexOf('streaming') !== -1) {
        backBtn.innerHTML = svgHtml + (currentLang === 'en' ? ' Back to Streaming' : ' Volver a Streaming');
      } else if (href.indexOf('produccion') !== -1) {
        backBtn.innerHTML = svgHtml + (currentLang === 'en' ? ' Back to Audiovisual Production' : ' Volver a Producción');
      } else if (href.indexOf('podcast') !== -1) {
        backBtn.innerHTML = svgHtml + (currentLang === 'en' ? ' Back to Podcast' : ' Volver a Podcast');
      }
    }

    swapBanners(currentLang);

    // Update language switcher button text (shows target language: EN when in ES, ES when in EN)
    var nextLabel = currentLang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('.global-lang-label').forEach(function (lbl) {
      lbl.textContent = nextLabel;
    });
  }

  function injectLanguageButtonInNavbar() {
    // Skip on alquiler-estudios.html which already has #studioLangBtn
    if (document.getElementById('studioLangBtn')) return;
    var navbar = document.querySelector('.navbar');
    if (!navbar || document.getElementById('globalLangSwitchBtn')) return;

    // Inject button styles
    var style = document.createElement('style');
    style.textContent = [
      '.nav-actions-right { display: flex; align-items: center; gap: 0.75rem; }',
      '.global-lang-btn {',
      '  display: inline-flex; align-items: center; gap: 0.38rem;',
      '  border: 1px solid rgba(255,255,255,0.22); border-radius: 6px;',
      '  padding: 0.35rem 0.7rem; font-size: 0.82rem; font-weight: 600;',
      '  color: #f2f2f2; background: rgba(18,18,18,0.65); cursor: pointer;',
      '  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;',
      '}',
      '.global-lang-btn:hover { border-color: #e8461e; color: #e8461e; }',
      '.global-lang-btn svg { width: 15px; height: 15px; stroke: currentColor; }',
      '.nav-studio-pill { display: inline-flex; align-items: center; gap: 0.28rem; }',
      '.nav-studio-pill img { height: 0.95em; width: auto; display: inline-block; vertical-align: -0.08em; }',
      '@media (max-width: 960px) { .nav-actions-right { margin-left: auto; margin-right: 0.5rem; } }'
    ].join('\n');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'nav-actions-right';
    wrap.innerHTML =
      '<button type="button" id="globalLangSwitchBtn" class="global-lang-btn" aria-label="Cambiar idioma / Switch language">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>' +
        '<span class="global-lang-label">EN</span>' +
      '</button>';

    var navToggle = navbar.querySelector('.nav-toggle');
    if (navToggle) {
      navbar.insertBefore(wrap, navToggle);
    } else {
      navbar.appendChild(wrap);
    }

    var btn = document.getElementById('globalLangSwitchBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        applyGlobalLang(currentLang === 'es' ? 'en' : 'es');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initGlobalCrayonCursor();
    injectLanguageButtonInNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    var savedLang = 'es';
    try {
      savedLang = localStorage.getItem('notarobot_lang') || 'es';
    } catch (e) {}
    if (urlParams.get('lang') === 'en') savedLang = 'en';
    if (urlParams.get('lang') === 'es') savedLang = 'es';

    applyGlobalLang(savedLang);
  });
})();
