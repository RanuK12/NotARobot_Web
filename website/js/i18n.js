/**
 * NOT A ROBOT — Global Bilingual Engine (ES Default / EN) + Fading Orange Crayon Cursor
 * Covers 100% of the website:
 * - index.html (including Hero Studio Rental Spotlight)
 * - pages/streaming.html
 * - pages/produccion.html
 * - pages/podcast.html
 * - pages/estudio.html
 * - pages/alquiler-estudios.html
 * - pages/nosotros.html
 * - pages/contacto.html
 * - All 15 pages/projects/*.html portfolio detail pages
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. FADING ORANGE CRAYON CURSOR (Exact q2 from notarobotstudios.es)
  // =========================================================================
  function initGlobalCrayonCursor() {
    if (document.getElementById('crayonCursorCanvas')) return;
    // Skip on touch-only mobile devices to save battery/GPU
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

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
  // 2. GLOBAL TRANSLATION DICTIONARY (All 23 Pages of notarobot.es)
  // =========================================================================
  var SITE_I18N = {
    es: {
      // Unified Navbar
      nav_home: 'Inicio',
      nav_streaming: 'Streaming',
      nav_produccion: 'Producción Audiovisual',
      nav_podcast: 'Podcast',
      nav_estudios: 'Nuestros Estudios',
      nav_alquiler: '<span class="nav-studios-dot"></span>Alquiler de Estudios',
      nav_nosotros: 'Sobre Nosotros',
      nav_contacto: 'Contacto',
      btn_contactanos: 'Contáctanos',
      footer_rights: '© 2026 NOT A ROBOT. Todos los derechos reservados.',
      footer_studios_link: 'Estudio de alquiler en Barcelona · Estudio A (92 m²) y Estudio B (14 m²)',

      // Home (index.html) + Subtle Studio Rental Spotlight
      home_hero_title: 'Productora Audiovisual Internacional',
      home_hero_subtitle: 'Basada en Poblenou, Barcelona',
      home_spotlight_badge: 'ALQUILER DE ESTUDIOS',
      home_spotlight_text: 'Platós de grabación y streaming en Poblenou:',
      home_spotlight_word: 'Estudio',
      home_spotlight_cta: 'Ver estudios y tarifas →',

      // Streaming (streaming.html)
      streaming_intro: 'Diseñamos y producimos transmisiones en vivo con estándares televisivos y lógica digital. Realización multicámara, dirección técnica, operación de sonido, gráficos en vivo y distribución simultánea en diferentes plataformas.',
      streaming_h2: 'Nuestros Proyectos',
      str_bcn3d_sub: 'Producción y realización técnica de streaming en vivo',
      str_biza_sub: 'Episodio especial en directo · Realización multicámara',
      str_ibai_sub: 'Transmisión especial en directo · Producción técnica integral',
      str_salta_sub: 'Show musical en vivo · Realización multicámara y mezcla',
      str_afa_sub: 'FIFA World Cup Qatar 2022 · Estudio oficial en directo',
      str_ndn_sub: 'Transmisión en directo desde locación exterior en Mallorca',

      // Producción Audiovisual (produccion.html)
      produccion_intro: 'Realizamos piezas audiovisuales de alta calidad para marcas, instituciones y eventos. Trabajamos desde la idea hasta la distribución, y entregamos contenido optimizado para redes, prensa y comunicación corporativa.',
      produccion_h2: 'Nuestros Trabajos',
      prod_aurora_corpo_sub: 'Cobertura audiovisual integral de innovación en el norte de Europa',
      prod_aurora_day_sub: 'Jornada abierta al público · Cobertura multicámara y redes',
      prod_favaloro_sub: '100 Años — Gala en el Teatro Colón',
      prod_sbc_sub: 'Cobertura integral del evento líder de iGaming en Europa',
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
      estudios_b_link: 'Ver tarifas, sets y 8 fotos de Estudio B →',
      estudios_cta_text: 'Alquila el <strong>Estudio A (92 m²)</strong> o el <strong>Estudio B (14 m²)</strong> por horas o por jornada — equipamiento de cine Sony 4K, sonido Shure SM7B, Rider Técnico completo y packs flexibles para tu producción.',
      estudios_cta_btn1: 'Conoce nuestros estudios y tarifas →',
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
      contacto_lbl_addr: 'Dirección',

      // Project Detail Pages Common (pages/projects/*.html)
      cat_streaming: 'Streaming',
      cat_produccion: 'Producción Audiovisual',
      cat_podcast: 'Podcast',
      back_streaming: 'Volver a Streaming',
      back_produccion: 'Volver a Producción Audiovisual',
      back_podcast: 'Volver a Podcast',
      proj_cta_studio: '¿Quieres producir o grabar un proyecto como este en Barcelona?',
      proj_cta_btn_studio: 'Ver Alquiler de Estudios A y B →',
      proj_cta_btn_contact: 'Consultar por producción integral',

      // All 15 Project Descriptions (ES)
      proj_afa_desc: 'Diseño, montaje y operación del estudio de TV de la AFA durante el Mundial de Qatar 2022. Producción de contenido diario en directo para la Selección Argentina.',
      proj_aurora_corpo_desc: 'Cobertura audiovisual integral en uno de los encuentros más relevantes de innovación y cultura contemporánea en el norte de Europa: registro multicámara + entrevistas estratégicas + cápsulas ejecutivas + contenido optimizado para redes y prensa + edición dinámica para posicionamiento inmediato.',
      proj_aurora_day_desc: 'Registro audiovisual del Aurora Day — jornada abierta al público. Cobertura multicámara, entrevistas y contenido para redes y comunicación interna.',
      proj_bcn3d_desc: 'Producción y desarrollo técnico integral de streaming para BCN3D. Planificación operativa, montaje de estudio, dirección técnica, coordinación de señales, sonido y puesta en escena.',
      proj_biza_desc: 'Streaming del episodio especial con Bizarrap en Paren La Mano. Producción técnica integral del directo: multicámara, mezcla en vivo, gráficos y señal de salida.',
      proj_corchea_desc: 'El podcast de música más importante de la escena europea. Dirección técnica integral: grabación, edición, postproducción y distribución.',
      proj_destierra_desc: 'Una serie documental original de NOT A ROBOT. Dirección creativa, producción integral y postproducción. Historias reales, contadas con la honestidad que merecen.',
      proj_favaloro_desc: 'Producción audiovisual integral del evento de gala por los 100 años de la Fundación Favaloro en el Teatro Colón. Cobertura multicámara, dirección de cámaras en vivo y entrega de piezas para prensa y redes.',
      proj_worldcup_desc: 'Cobertura fotográfica oficial para TV Pública Argentina durante el Mundial de Qatar 2022. Desarrollo técnico y operativo del estudio oficial de AFA. Creación de una plataforma de contenidos en tiempo real durante el evento deportivo más importante del planeta.',
      proj_ibai_desc: 'Desarrollo técnico integral para la participación de Ibai en Paren La Mano. Planificación operativa, montaje de estudio, dirección técnica, coordinación de señales, sonido y puesta en escena.',
      proj_juana_desc: 'Desarrollo técnico integral para la conversación. Planificación operativa, montaje de estudio, dirección técnica, coordinación de señales, sonido y puesta en escena.',
      proj_ndn_desc: 'Producción técnica y transmisión en directo de Nadie Dice Nada desde Mallorca. Operación completa del streaming en locación externa.',
      proj_nota_desc: 'Un medio hecho por artistas. Producción técnica integral del podcast: grabación multicámara, edición y postproducción.',
      proj_salta_desc: 'Transmisión en directo del show de Salta La Banca. Producción técnica integral: esquema multicámara, mezcla en vivo, señal de salida y coordinación del streaming.',
      proj_sbc_desc: 'Producción audiovisual integral para SBC Summit Barcelona, uno de los eventos más importantes de la industria del iGaming en Europa. Entrevistas, cobertura del evento y contenido para redes.'
    },

    en: {
      // Unified Navbar
      nav_home: 'Home',
      nav_streaming: 'Streaming',
      nav_produccion: 'Audiovisual Production',
      nav_podcast: 'Podcast',
      nav_estudios: 'Our Studios',
      nav_alquiler: '<span class="nav-studios-dot"></span>Studio Rental',
      nav_nosotros: 'About Us',
      nav_contacto: 'Contact',
      btn_contactanos: 'Contact Us',
      footer_rights: '© 2026 NOT A ROBOT. All rights reserved.',
      footer_studios_link: 'Studio rental in Barcelona · Studio A (92 m²) & Studio B (14 m²)',

      // Home (index.html) + Subtle Studio Rental Spotlight
      home_hero_title: 'International Audiovisual Production Company',
      home_hero_subtitle: 'Based in Poblenou, Barcelona',
      home_spotlight_badge: 'STUDIO RENTAL',
      home_spotlight_text: 'Recording & live streaming studios in Poblenou:',
      home_spotlight_word: 'Studio',
      home_spotlight_cta: 'Explore studios & rates →',

      // Streaming (streaming.html)
      streaming_intro: 'We design and produce live broadcasts with television standards and digital agility. Multicamera live production, technical direction, broadcast sound engineering, live graphics and simultaneous multi-platform distribution.',
      streaming_h2: 'Our Projects',
      str_bcn3d_sub: 'Full technical production and live streaming broadcast',
      str_biza_sub: 'Special live episode · Multicamera broadcast production',
      str_ibai_sub: 'Special live broadcast · End-to-end technical production',
      str_salta_sub: 'Live music show · Multicamera switching and live sound mix',
      str_afa_sub: 'FIFA World Cup Qatar 2022 · Official daily live studio',
      str_ndn_sub: 'Live outdoor broadcast and technical operation from Mallorca',

      // Producción Audiovisual (produccion.html)
      produccion_intro: 'We produce high-end audiovisual pieces for brands, institutions and events. We work from concept to distribution, delivering content optimised for social media, press and corporate communication.',
      produccion_h2: 'Our Work',
      prod_aurora_corpo_sub: 'Full audiovisual coverage at Northern Europe’s leading innovation summit',
      prod_aurora_day_sub: 'Open public day · Multicamera coverage and social media content',
      prod_favaloro_sub: '100 Years — Gala at Teatro Colón',
      prod_sbc_sub: 'End-to-end event coverage at Europe’s premier iGaming summit',
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
      estudios_b_link: 'View Studio B rates, sets & 8 photos →',
      estudios_cta_text: 'Rent <strong>Studio A (92 m²)</strong> or <strong>Studio B (14 m²)</strong> by the hour or full day — Sony 4K cinema cameras, Shure SM7B sound, full Technical Rider and flexible recording packages.',
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
      contacto_lbl_addr: 'Address',

      // Project Detail Pages Common (pages/projects/*.html)
      cat_streaming: 'Streaming',
      cat_produccion: 'Audiovisual Production',
      cat_podcast: 'Podcast',
      back_streaming: 'Back to Streaming',
      back_produccion: 'Back to Audiovisual Production',
      back_podcast: 'Back to Podcast',
      proj_cta_studio: 'Want to produce or record a project like this in Barcelona?',
      proj_cta_btn_studio: 'Explore Studio A & B Rental →',
      proj_cta_btn_contact: 'Inquire about full production',

      // All 15 Project Descriptions (EN)
      proj_afa_desc: 'Design, studio build and live broadcast operation of the official AFA TV studio during the FIFA World Cup Qatar 2022. Daily live content production for the Argentine National Team.',
      proj_aurora_corpo_desc: 'Comprehensive audiovisual coverage at one of Northern Europe’s most prominent innovation and contemporary culture summits: multicamera recording, strategic interviews, executive capsules, social & press content and fast-turnaround dynamic editing.',
      proj_aurora_day_desc: 'Full audiovisual coverage of Aurora Day — open public innovation event. Multicamera live recording, interviews and tailored content for social media and internal communications.',
      proj_bcn3d_desc: 'End-to-end technical production and live streaming development for BCN3D. Operational planning, studio set build, technical direction, signal coordination, broadcast sound and staging.',
      proj_biza_desc: 'Live streaming of the special episode featuring Bizarrap on Paren La Mano. Full technical broadcast production: multicamera switching, live audio mixing, on-screen graphics and master feed output.',
      proj_corchea_desc: 'The leading music podcast in the European scene. Full technical direction: multicamera studio recording, editing, audio & video post-production and multi-platform distribution.',
      proj_destierra_desc: 'An original documentary series by NOT A ROBOT. Creative direction, end-to-end production and post-production. Real stories, told with the honesty they deserve.',
      proj_favaloro_desc: 'Full audiovisual production for the 100th Anniversary Gala of the Favaloro Foundation at the iconic Teatro Colón. Multicamera coverage, live camera direction and fast delivery of press and social media assets.',
      proj_worldcup_desc: 'Official photographic coverage for TV Pública Argentina during the FIFA World Cup Qatar 2022. Technical and operational development of the official AFA broadcast studio, creating a real-time content platform during the world’s biggest sporting event.',
      proj_ibai_desc: 'Comprehensive technical development for Ibai’s special appearance on Paren La Mano. Operational planning, studio setup, technical direction, signal routing, broadcast sound and staging.',
      proj_juana_desc: 'End-to-end technical direction for the conversation. Operational planning, studio set design, technical direction, multicamera signal coordination, sound engineering and staging.',
      proj_ndn_desc: 'Technical production and live outdoor broadcast of Nadie Dice Nada from Mallorca. Complete remote location streaming operation and multicamera engineering.',
      proj_nota_desc: 'A media platform created by artists. Full technical podcast production: multicamera recording, editing, color grading and audio post-production.',
      proj_salta_desc: 'Live broadcast of the Salta La Banca concert. Full technical production: multicamera setup, live audio mixing, broadcast feed output and streaming coordination.',
      proj_sbc_desc: 'Comprehensive audiovisual production for SBC Summit Barcelona, one of Europe’s premier iGaming industry events. Executive interviews, full event coverage and social media content.'
    }
  };

  // Map project filenames to their description & category translation keys
  var PROJECT_PAGE_MAP = {
    'afa-estudio.html': { desc: 'proj_afa_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'aurora-corpo.html': { desc: 'proj_aurora_corpo_desc', cat: 'cat_produccion', back: 'back_produccion' },
    'aurora-day.html': { desc: 'proj_aurora_day_desc', cat: 'cat_produccion', back: 'back_produccion' },
    'bcn3d.html': { desc: 'proj_bcn3d_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'bizarrap-paren-la-mano.html': { desc: 'proj_biza_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'club-corchea.html': { desc: 'proj_corchea_desc', cat: 'cat_podcast', back: 'back_podcast' },
    'destierra.html': { desc: 'proj_destierra_desc', cat: 'cat_podcast', back: 'back_podcast' },
    'favaloro.html': { desc: 'proj_favaloro_desc', cat: 'cat_produccion', back: 'back_produccion' },
    'fifa-worldcup.html': { desc: 'proj_worldcup_desc', cat: 'cat_produccion', back: 'back_produccion' },
    'ibai-paren-la-mano.html': { desc: 'proj_ibai_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'juana-barba.html': { desc: 'proj_juana_desc', cat: 'cat_podcast', back: 'back_podcast' },
    'ndn-mallorca.html': { desc: 'proj_ndn_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'nota-medio.html': { desc: 'proj_nota_desc', cat: 'cat_podcast', back: 'back_podcast' },
    'salta-la-banca.html': { desc: 'proj_salta_desc', cat: 'cat_streaming', back: 'back_streaming' },
    'sbc-barcelona.html': { desc: 'proj_sbc_desc', cat: 'cat_produccion', back: 'back_produccion' }
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
    if (document.getElementById('studioLangBtn')) return;
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

    // Auto-translate project detail pages by filename as well
    var pathParts = window.location.pathname.split('/');
    var fileName = pathParts[pathParts.length - 1] || 'index.html';
    var projMeta = PROJECT_PAGE_MAP[fileName];
    if (projMeta) {
      var descEl = document.querySelector('.project-description');
      if (descEl && dict[projMeta.desc]) {
        descEl.innerHTML = dict[projMeta.desc];
      }
      var catEl = document.querySelector('.project-category');
      if (catEl && dict[projMeta.cat]) {
        catEl.textContent = dict[projMeta.cat];
      }
      var backBtn = document.querySelector('.btn-back');
      if (backBtn && dict[projMeta.back]) {
        var svg = backBtn.querySelector('svg');
        var svgHtml = svg ? svg.outerHTML : '';
        backBtn.innerHTML = svgHtml + ' ' + dict[projMeta.back];
      }
    }

    // Ensure footer copyright is always translated
    var footCopy = document.querySelector('.footer-copyright');
    if (footCopy && dict.footer_rights) {
      footCopy.innerHTML = dict.footer_rights;
    }

    swapBanners(currentLang);

    // Update language switcher button text (shows target language: EN when in ES, ES when in EN)
    var nextLabel = currentLang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('.global-lang-label').forEach(function (lbl) {
      lbl.textContent = nextLabel;
    });
  }

  function injectNavbarAndStyles() {
    // Skip on alquiler-estudios.html which has its own dedicated header
    if (document.getElementById('studioLangBtn')) return;
    var navbar = document.querySelector('.navbar');
    if (!navbar || document.getElementById('globalLangSwitchBtn')) return;

    var style = document.createElement('style');
    style.textContent = [
      '.nav-actions-right { display: flex; align-items: center; gap: 0.65rem; }',
      '.global-lang-btn {',
      '  display: inline-flex; align-items: center; gap: 0.38rem;',
      '  border: 1px solid rgba(255,255,255,0.22); border-radius: 6px;',
      '  padding: 0.36rem 0.72rem; font-size: 0.82rem; font-weight: 700;',
      '  color: #f2f2f2; background: rgba(18,18,18,0.75); cursor: pointer;',
      '  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;',
      '}',
      '.global-lang-btn:hover { border-color: #e8461e; color: #e8461e; }',
      '.global-lang-btn svg { width: 15px; height: 15px; stroke: currentColor; }',
      /* Subtle editorial highlight for Alquiler de Estudios in the navbar */
      '.nav-link-studios {',
      '  display: inline-flex !important; align-items: center; gap: 0.42rem;',
      '  padding: 0.38rem 0.85rem; border-radius: 999px;',
      '  border: 1px solid rgba(232, 70, 30, 0.45);',
      '  background: rgba(232, 70, 30, 0.10);',
      '  color: #ffffff !important; font-weight: 600;',
      '  transition: all 0.25s ease;',
      '}',
      '.nav-link-studios:hover {',
      '  border-color: rgba(232, 70, 30, 0.85);',
      '  background: rgba(232, 70, 30, 0.22);',
      '  box-shadow: 0 0 18px rgba(232, 70, 30, 0.22);',
      '  transform: translateY(-1px);',
      '}',
      '.nav-link-studios::after { display: none !important; }',
      '.nav-studios-dot {',
      '  width: 6px; height: 6px; border-radius: 50%;',
      '  background-color: #e8461e;',
      '  box-shadow: 0 0 8px #e8461e;',
      '  display: inline-block; flex-shrink: 0;',
      '}',
      /* Home Hero Subtle Studio Rental Spotlight */
      '.hero-studios-spotlight {',
      '  margin-top: 1.35rem;',
      '  display: inline-flex; flex-wrap: wrap; align-items: center; gap: 0.65rem 0.9rem;',
      '  padding: 0.65rem 1.1rem;',
      '  border-radius: 12px;',
      '  background: rgba(12, 12, 12, 0.72);',
      '  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);',
      '  border: 1px solid rgba(232, 70, 30, 0.38);',
      '  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);',
      '  text-decoration: none; color: #fff;',
      '  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;',
      '}',
      '.hero-studios-spotlight:hover {',
      '  border-color: rgba(232, 70, 30, 0.85);',
      '  background: rgba(18, 18, 18, 0.88);',
      '  transform: translateY(-2px);',
      '}',
      '.hero-spotlight-badge {',
      '  display: inline-flex; align-items: center; gap: 0.38rem;',
      '  font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;',
      '  color: #e8461e; background: rgba(232, 70, 30, 0.14);',
      '  padding: 0.22rem 0.55rem; border-radius: 6px; border: 1px solid rgba(232, 70, 30, 0.3);',
      '}',
      '.hero-spotlight-studios {',
      '  display: inline-flex; align-items: center; gap: 0.65rem;',
      '  font-size: 0.88rem; color: rgba(255,255,255,0.9); font-weight: 500;',
      '}',
      '.hero-spotlight-studio-item {',
      '  display: inline-flex; align-items: center; gap: 0.2rem; font-weight: 700; color: #fff;',
      '}',
      '.hero-spotlight-studio-item img { height: 1.05em; width: auto; display: inline-block; vertical-align: -0.1em; }',
      '.hero-spotlight-cta {',
      '  font-size: 0.84rem; font-weight: 700; color: #e8461e; white-space: nowrap;',
      '}',
      '@media (max-width: 960px) {',
      '  .nav-actions-right { margin-left: auto; margin-right: 0.35rem; }',
      '}',
      '@media (max-width: 768px) {',
      '  .projects-grid { grid-template-columns: 1fr !important; }',
      '  .hero-studios-spotlight { padding: 0.6rem 0.85rem; gap: 0.45rem 0.65rem; max-width: 100%; }',
      '  .hero-spotlight-studios { font-size: 0.8rem; flex-wrap: wrap; }',
      '}'
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

  // =========================================================================
  // PRIVATE STAGING ENVIRONMENT GATE & PERFORMANCE HUD (*.netlify.app ONLY)
  // =========================================================================
  var STAGING_VALID_HASHES = [
    // SHA-256("poblenau2026")
    'bb6cab92692be3c46be168887ff565e96e1faff1ee99eb63e570ff545522d141',
    // SHA-256("poblenou2026")
    'e2c7e41928cefd6c58117ace7f07a07f16afee9713b694bd275016a6daa72e7a',
    // SHA-256("NotARobot2026!")
    'f655b98c1de47d7088d2b0d5b1f594a0287caee020f5996665fc0d323d8a5604',
    // SHA-256("NAR-VIP-2026")
    '66969386c3676aa1bb442878231c49066c9e67a135056d85082a27648fdeb800'
  ];

  async function sha256HexStaging(str) {
    if (window.crypto && window.crypto.subtle) {
      var buf = new TextEncoder().encode(str);
      var hashBuf = await window.crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(hashBuf)).map(function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    }
    return '';
  }

  function getRootPrefix() {
    var path = window.location.pathname || '';
    if (path.indexOf('/pages/projects/') !== -1) return '../../';
    if (path.indexOf('/pages/') !== -1) return '../';
    return '';
  }

  function renderStagingHud() {
    if (document.getElementById('narStagingHud')) return;
    var prefix = getRootPrefix();
    var hudStyle = document.createElement('style');
    hudStyle.textContent = [
      'div[data-netlify-deploy-id], iframe[src*="netlify"] { display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; opacity: 0 !important; pointer-events: none !important; }',
      '#narStagingHud {',
      '  position: fixed; top: 82px; right: 16px; z-index: 999990;',
      '  background: rgba(12, 12, 14, 0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);',
      '  border: 1px solid rgba(232, 70, 30, 0.55); border-radius: 10px;',
      '  padding: 8px 12px; color: #f2f2f2; font-family: Aileron, sans-serif; font-size: 11px;',
      '  box-shadow: 0 10px 28px rgba(0,0,0,0.65); max-width: calc(100vw - 32px);',
      '  transition: all 0.2s ease;',
      '}',
      '#narStagingHud.minimized { padding: 6px 10px; border-radius: 999px; }',
      '#narStagingHud.minimized .nar-hud-body { display: none; }',
      '.nar-hud-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }',
      '.nar-hud-badge { display: inline-flex; align-items: center; gap: 6px; font-weight: 800; color: #e8461e; letter-spacing: 0.06em; text-transform: uppercase; }',
      '.nar-hud-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }',
      '.nar-hud-metrics { color: #a1a1aa; font-family: monospace; font-size: 10.5px; }',
      '.nar-hud-metrics strong { color: #fff; }',
      '.nar-hud-toggle { background: none; border: none; color: #a1a1aa; cursor: pointer; font-size: 12px; padding: 0 3px; font-weight: 700; }',
      '.nar-hud-toggle:hover { color: #fff; }',
      '.nar-hud-body { margin-top: 7px; padding-top: 7px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }',
      '.nar-hud-link {',
      '  color: #e4e4e7; text-decoration: none; background: rgba(255,255,255,0.07);',
      '  padding: 3px 8px; border-radius: 5px; font-weight: 600; font-size: 10.5px;',
      '  border: 1px solid rgba(255,255,255,0.1); transition: all 0.15s ease;',
      '}',
      '.nar-hud-link:hover { border-color: #e8461e; color: #fff; background: rgba(232,70,30,0.2); }',
      '.nar-hud-lock {',
      '  color: #fca5a5; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3);',
      '  padding: 3px 8px; border-radius: 5px; font-weight: 700; font-size: 10.5px; cursor: pointer;',
      '}',
      '.nar-hud-lock:hover { background: rgba(239,68,68,0.25); color: #fff; }'
    ].join('\n');
    document.head.appendChild(hudStyle);

    var hud = document.createElement('div');
    hud.id = 'narStagingHud';
    var isMin = sessionStorage.getItem('nar_hud_min') === '1';
    if (isMin) hud.className = 'minimized';

    hud.innerHTML =
      '<div class="nar-hud-top">' +
        '<span class="nar-hud-badge"><span class="nar-hud-dot"></span>STAGING PRIVADO</span>' +
        '<span class="nar-hud-metrics" id="narHudPerfMetrics">⚡ Midiendo...</span>' +
        '<button type="button" class="nar-hud-toggle" id="narHudMinBtn" title="Minimizar/Expandir panel Staging">' + (isMin ? '+' : '—') + '</button>' +
      '</div>' +
      '<div class="nar-hud-body">' +
        '<a class="nar-hud-link" href="' + prefix + 'index.html">Home</a>' +
        '<a class="nar-hud-link" href="' + prefix + 'pages/alquiler-estudios.html">Estudios 1:1</a>' +
        '<a class="nar-hud-link" href="' + prefix + 'pages/podcast.html">Podcast</a>' +
        '<a class="nar-hud-link" href="' + prefix + 'pages/streaming.html">Streaming</a>' +
        '<a class="nar-hud-link" href="' + prefix + 'pages/dashboard.html">Dashboard Admin</a>' +
        '<button type="button" class="nar-hud-lock" id="narHudLockBtn">🔒 Bloquear</button>' +
      '</div>';

    document.body.appendChild(hud);

    document.getElementById('narHudMinBtn').addEventListener('click', function () {
      var minimized = hud.classList.toggle('minimized');
      sessionStorage.setItem('nar_hud_min', minimized ? '1' : '0');
      this.textContent = minimized ? '+' : '—';
    });

    document.getElementById('narHudLockBtn').addEventListener('click', function () {
      try {
        localStorage.removeItem('nar_staging_auth_v1');
        sessionStorage.removeItem('nar_admin_auth');
      } catch (e) {}
      var url = new URL(window.location.href);
      url.searchParams.delete('staging_key');
      url.searchParams.delete('admin_key');
      window.location.href = url.toString();
    });

    function updatePerfMetrics() {
      var el = document.getElementById('narHudPerfMetrics');
      if (!el || !window.performance) return;
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (nav) {
        var ttfb = Math.max(1, Math.round(nav.responseStart - nav.requestStart));
        var domMs = Math.max(ttfb, Math.round(nav.domContentLoadedEventEnd));
        el.innerHTML = '⚡ TTFB: <strong>' + ttfb + 'ms</strong> · DOM: <strong>' + domMs + 'ms</strong>';
      }
    }
    setTimeout(updatePerfMetrics, 250);
    window.addEventListener('load', function () { setTimeout(updatePerfMetrics, 100); });
  }

  function showStagingLockOverlay() {
    if (document.getElementById('narStagingGateOverlay')) return;
    document.body.style.overflow = 'hidden';

    var style = document.createElement('style');
    style.textContent = [
      '#narStagingGateOverlay {',
      '  position: fixed; inset: 0; z-index: 2147483646;',
      '  background: radial-gradient(circle at 50% 20%, rgba(232,70,30,0.16), rgba(8,8,10,0.98) 65%);',
      '  backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);',
      '  display: flex; align-items: center; justify-content: center; padding: 1.5rem;',
      '  font-family: Aileron, sans-serif; color: #fff;',
      '}',
      '.nar-stg-card {',
      '  width: 100%; max-width: 430px; background: #121215;',
      '  border: 1px solid rgba(232,70,30,0.45); border-radius: 16px;',
      '  padding: 2.1rem 1.9rem; box-shadow: 0 24px 60px rgba(0,0,0,0.85); text-align: center;',
      '}',
      '.nar-stg-pill {',
      '  display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px;',
      '  border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.08em;',
      '  text-transform: uppercase; color: #e8461e; background: rgba(232,70,30,0.12);',
      '  border: 1px solid rgba(232,70,30,0.35); margin-bottom: 1rem;',
      '}',
      '.nar-stg-title { font-size: 1.35rem; font-weight: 800; margin: 0 0 0.45rem; color: #fff; }',
      '.nar-stg-sub { font-size: 0.85rem; color: #a1a1aa; line-height: 1.5; margin-bottom: 1.4rem; }',
      '.nar-stg-field { text-align: left; margin-bottom: 0.95rem; }',
      '.nar-stg-field label { display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #d4d4d8; margin-bottom: 0.35rem; }',
      '.nar-stg-field input {',
      '  width: 100%; box-sizing: border-box; padding: 0.7rem 0.85rem; border-radius: 8px;',
      '  border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.04);',
      '  color: #fff; font-size: 0.9rem; outline: none;',
      '}',
      '.nar-stg-field input:focus { border-color: #e8461e; }',
      '.nar-stg-btn {',
      '  width: 100%; padding: 0.78rem 1rem; border-radius: 8px; border: none;',
      '  background: #e8461e; color: #fff; font-weight: 800; font-size: 0.9rem;',
      '  cursor: pointer; margin-top: 0.35rem; transition: background 0.2s ease;',
      '}',
      '.nar-stg-btn:hover { background: #ff572e; }',
      '.nar-stg-err {',
      '  display: none; margin-top: 0.85rem; padding: 0.55rem 0.75rem; border-radius: 6px;',
      '  background: rgba(239,68,68,0.14); border: 1px solid rgba(239,68,68,0.35);',
      '  color: #fca5a5; font-size: 0.8rem;',
      '}',
      '.nar-stg-foot { margin-top: 1.2rem; font-size: 0.73rem; color: #71717a; }'
    ].join('\n');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'narStagingGateOverlay';
    overlay.innerHTML =
      '<div class="nar-stg-card">' +
        '<div class="nar-stg-pill">🔒 STAGING PRIVADO · NETLIFY EDGE</div>' +
        '<h2 class="nar-stg-title">NOT A ROBOT · Pre-Producción</h2>' +
        '<p class="nar-stg-sub">Entorno privado de validación y pruebas de rendimiento exclusivo para Administradores de <strong>NOT A ROBOT</strong> y <strong>Ranuk Development</strong>.</p>' +
        '<form id="narStagingAuthForm">' +
          '<div class="nar-stg-field">' +
            '<label for="narStgEmail">Usuario / Email Autorizado</label>' +
            '<input type="text" id="narStgEmail" placeholder="admin" required autocomplete="username">' +
          '</div>' +
          '<div class="nar-stg-field">' +
            '<label for="narStgPass">Contraseña</label>' +
            '<input type="password" id="narStgPass" placeholder="••••••••••••" required autocomplete="current-password">' +
          '</div>' +
          '<button type="submit" class="nar-stg-btn">Desbloquear Entorno de Pruebas →</button>' +
          '<div class="nar-stg-err" id="narStgErrBox">Credenciales inválidas. Usa el usuario admin y la contraseña autorizada.</div>' +
        '</form>' +
        '<div class="nar-stg-foot">Aislado de Google (noindex) · No afecta a notarobot.es en producción</div>' +
      '</div>';

    document.body.appendChild(overlay);

    var form = document.getElementById('narStagingAuthForm');
    var err = document.getElementById('narStgErrBox');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = (document.getElementById('narStgEmail').value || '').trim().toLowerCase();
      var pass = (document.getElementById('narStgPass').value || '').trim();
      var hash = await sha256HexStaging(pass);

      var validDomain = email === 'admin' || email === 'notarobot' || email.endsWith('@notarobot.es') || email.endsWith('@ranuk.dev') || email === 'emilioranucoli@hotmail.com';
      var validHash = STAGING_VALID_HASHES.indexOf(hash) !== -1;

      if (validDomain && validHash) {
        try {
          localStorage.setItem('nar_staging_auth_v1', 'NAR_STAGING_OK');
        } catch (ex) {}
        document.body.style.overflow = '';
        overlay.remove();
        renderStagingHud();
      } else {
        err.style.display = 'block';
      }
    });
  }

  function initStagingEnvironment() {
    var host = window.location.hostname || '';
    var search = window.location.search || '';
    var params = new URLSearchParams(search);

    var isStagingHost =
      host.indexOf('.netlify.app') !== -1 ||
      params.get('force_staging') === '1';

    if (!isStagingHost) return;

    // Suppress Netlify Collaborative Deploy Preview bar iframe artifact
    var cdpStyle = document.createElement('style');
    cdpStyle.textContent = 'div[data-netlify-deploy-id], iframe[src*="netlify"] { display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; pointer-events: none !important; }';
    document.head.appendChild(cdpStyle);
    document.querySelectorAll('div[data-netlify-deploy-id]').forEach(function (el) { el.remove(); });

    // Reinforce noindex on staging host
    if (!document.querySelector('meta[name="robots"][content*="noindex"]')) {
      var m = document.createElement('meta');
      m.name = 'robots';
      m.content = 'noindex, nofollow, noarchive';
      document.head.appendChild(m);
    }

    // Check Magic VIP URL key (?staging_key=NAR-VIP-2026) for website preview only (does NOT unlock Dashboard)
    var stgKey = params.get('staging_key');
    if (stgKey === 'NAR-VIP-2026' || stgKey === 'poblenau2026' || stgKey === 'NotARobot2026!') {
      try {
        localStorage.setItem('nar_staging_auth_v1', 'NAR_STAGING_OK');
      } catch (e) {}
    }

    var isUnlocked = false;
    try {
      isUnlocked = localStorage.getItem('nar_staging_auth_v1') === 'NAR_STAGING_OK';
    } catch (e) {}

    if (isUnlocked) {
      renderStagingHud();
    } else {
      showStagingLockOverlay();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initStagingEnvironment();
    initGlobalCrayonCursor();
    injectNavbarAndStyles();

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
