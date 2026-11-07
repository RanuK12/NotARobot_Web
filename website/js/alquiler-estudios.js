/**
 * NOT A ROBOT STUDIOS — Exact Behavioral & Visual Engine (Calcada from notarobotstudios.es)
 * Includes:
 * 1. Fading Orange Crayon Cursor (q2 component from notarobotstudios.es)
 * 2. 5 Views Router (Home, Estudio A, Estudio B, Rider Técnico, Contacto)
 * 3. 12-photo Studio A Gallery + 10-photo Studio B Gallery + Lightbox
 * 4. Clean Rider Técnico Tables (No shopping cart) + Quote Form + Contact Form
 * 5. Global ES / EN Bilingual Engine (Spanish Default, synced across notarobot.es)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. FADING ORANGE CRAYON CURSOR (Exact q2 from notarobotstudios.es)
  // =========================================================================
  function initCrayonCursor() {
    var canvas = document.getElementById('crayonCursorCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var TRAIL_DURATION = 1000; // zu = 1e3
    var points = [];
    var rafId = 0;

    function calcWidth(speed) {
      // Exact V2(e) from 1_home_es.js: e<=.15?2.8:e>=5?.4:2.8-(e-.15)/(5-.15)*2.4
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

    function onMouseMove(ev) {
      points.push({
        x: ev.clientX,
        y: ev.clientY,
        time: performance.now()
      });
    }

    function render() {
      var now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points.filter(function (pt) {
        return now - pt.time < TRAIL_DURATION;
      });

      if (points.length > 1) {
        for (var i = 1; i < points.length; i++) {
          var p0 = points[i - 1];
          var p1 = points[i];
          var age = now - p1.time;
          var alpha = Math.max(0, 1 - age / TRAIL_DURATION);
          var dt = Math.max(1, p1.time - p0.time);
          var speed = Math.hypot(p1.x - p0.x, p1.y - p0.y) / dt;
          var lw = calcWidth(speed);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = 'rgba(232, 70, 30, ' + alpha + ')';
          ctx.lineWidth = lw;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
      rafId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);
  }

  // =========================================================================
  // 2. EXACT PHOTO ARRAYS FOR ESTUDIO A (12) & ESTUDIO B (10)
  // =========================================================================
  var STUDIO_A_PHOTOS = [
    {
      src: '../images/studios/estudio-a-vista-barcelona.jpg',
      altEs: 'Vistas panorámicas de Barcelona y la Sagrada Família desde el Estudio A',
      altEn: 'Panoramic views of Barcelona and the Sagrada Família from Studio A'
    },
    {
      src: '../images/studios/estudio-a-0.png',
      altEs: 'Vista general del set principal del Estudio A en Poblenou, Barcelona',
      altEn: 'Wide view of the main set at Studio A in Poblenou, Barcelona'
    },
    {
      src: '../images/studios/estudio-a-omar-1.png',
      altEs: 'Invitado grabando podcast con micrófono Shure en el Estudio A de Barcelona',
      altEn: 'Guest recording a podcast with a Shure microphone at Studio A in Barcelona'
    },
    {
      src: '../images/studios/estudio-a-omar-2.png',
      altEs: 'Mesa de podcast con tres invitados y vistas a Barcelona en el Estudio A',
      altEn: 'Podcast table with three guests and views of Barcelona from Studio A'
    },
    {
      src: '../images/studios/estudio-a-1-BnGlj3VB.jpg',
      altEs: 'Set de podcast multicámara en el Estudio A de Not a Robot Studios en Barcelona',
      altEn: 'Multicamera podcast set at Not a Robot Studios’ Studio A in Barcelona'
    },
    {
      src: '../images/studios/estudio-a-2-BHXeQZ6y.png',
      altEs: 'Espacio de entrevistas profesional en el Estudio A de Barcelona',
      altEn: 'Professional interview area at Studio A in Barcelona'
    },
    {
      src: '../images/studios/estudio-a-3-YN-ZT5dC.png',
      altEs: 'Evento en vivo con público en el Estudio A de Poblenou',
      altEn: 'Live event with an audience at el Studio A de Poblenou'
    },
    {
      src: '../images/studios/estudio-a-4-8nPgNDSN.png',
      altEs: 'Mesa de grabación con micrófono profesional en el Estudio A',
      altEn: 'Recording table with a professional microphone at Studio A'
    },
    {
      src: '../images/studios/estudio-a-6-Bt7Y52Mn.png',
      altEs: 'Configuración de producción en el Estudio A de Not a Robot Studios',
      altEn: 'Production setup at el Studio A de Not a Robot Studios'
    },
    {
      src: '../images/studios/estudio-a-7.png',
      altEs: 'Sesión musical en directo con banda en el Estudio A de Barcelona',
      altEn: 'Live music session with a band at el Studio A de Barcelona'
    },
    {
      src: '../images/studios/estudio-a-8-new.png',
      altEs: 'Set de entrevistas multicámara con iluminación Nanlite en el Estudio A',
      altEn: 'Multicamera interview set with Nanlite lighting at Studio A'
    },
    {
      src: '../images/studios/estudio-a-9.png',
      altEs: 'Vista panorámica del Estudio A con croma verde y set de podcast',
      altEn: 'Panoramic view of Studio A with green screen and podcast set'
    }
  ];

  var STUDIO_B_PHOTOS = [
    {
      src: '../images/studios/estudio-b-1.png',
      altEs: 'Set de podcast con dos sillones claros y cortina dorada en el Estudio B de Barcelona',
      altEn: 'Podcast set with two light armchairs and gold curtains at Studio B in Barcelona'
    },
    {
      src: '../images/studios/estudio-b-2.png',
      altEs: 'Entrevista de podcast con dos invitados y fondo de madera en el Estudio B de Barcelona',
      altEn: 'Podcast interview with two guests and a timber backdrop at Studio B in Barcelona'
    },
    {
      src: '../images/studios/estudio-b-5.png',
      altEs: 'Grabación de podcast en sillón individual en el Estudio B',
      altEn: 'Podcast recording in an individual armchair at Studio B'
    },
    {
      src: '../images/studios/estudio-b-3.png',
      altEs: 'Invitado hablando ante micrófono Shure con plantas de fondo en el Estudio B de Poblenou',
      altEn: 'Guest speaking into a Shure microphone with plants in the background at el Studio B de Poblenou'
    },
    {
      src: '../images/studios/estudio-b-4.png',
      altEs: 'Control de iluminación RGB con monitor 4K en el Estudio B de Barcelona',
      altEn: 'RGB lighting control with 4K monitor at Studio B in Barcelona'
    },
    {
      src: '../images/studios/estudio-b-9.png',
      altEs: 'Set de podcast con cortina roja e iluminación cinematográfica en el Estudio B',
      altEn: 'Podcast set with red curtains and cinematic lighting at Studio B'
    },
    {
      src: '../images/studios/estudio-b-13.png',
      altEs: 'Set de podcast con sillones marrones y fondo azul en el Estudio B de Barcelona',
      altEn: 'Podcast set with brown armchairs and a blue backdrop at Studio B in Barcelona'
    },
    {
      src: '../images/studios/estudio-b-14.png',
      altEs: 'Set de entrevistas con sillones claros en el Estudio B',
      altEn: 'Interview set with light armchairs at Studio B'
    }
  ];

  // =========================================================================
  // 3. EXACT RIDER TÉCNICO DATA (q5 / s$ from notarobotstudios.es)
  // =========================================================================
  var RIDER_CATEGORIES = [
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
      titleEs: 'Cámaras y ópticas',
      titleEn: 'Cameras and lenses',
      itemsEs: [
        'Cámara Sony FX6',
        'Cámara Sony FX3',
        'Cámara Sony A7SIII',
        'Cámara Sony FX30',
        'Cámara Sony A7RV',
        'Óptica Sony 35mm f/2.8',
        'Óptica Sony 50mm f/1.4',
        'Óptica Sigma 10-18mm f/2.8',
        'Óptica Sony GM USM II 12-24mm f/2.8',
        'Óptica Sony GM USM II 24-70mm f/2.8',
        'Óptica Sigma 24-105mm f/2.8',
        'Óptica Sony GM USM 70-200mm f/2.8',
        'Óptica Sony GM USM II 70-200mm f/2.8',
        'Óptica Sigma 70-200mm f/2.8',
        'Ronin DJI RS4 PRO'
      ],
      itemsEn: [
        'Camera Sony FX6',
        'Camera Sony FX3',
        'Camera Sony A7SIII',
        'Camera Sony FX30',
        'Camera Sony A7RV',
        'Óptica Sony 35mm f/2.8',
        'Óptica Sony 50mm f/1.4',
        'Óptica Sigma 10-18mm f/2.8',
        'Óptica Sony GM USM II 12-24mm f/2.8',
        'Óptica Sony GM USM II 24-70mm f/2.8',
        'Óptica Sigma 24-105mm f/2.8',
        'Óptica Sony GM USM 70-200mm f/2.8',
        'Óptica Sony GM USM II 70-200mm f/2.8',
        'Óptica Sigma 70-200mm f/2.8',
        'Ronin DJI RS4 PRO'
      ]
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>',
      titleEs: 'Sonido',
      titleEn: 'Sound',
      itemsEs: [
        'Mic Shure SM7B',
        'Mic SM58',
        'Mic Rode NT1-A',
        'Mic Shure PGA48',
        'Zoom H6',
        'Zoom L8',
        'Behringer X32 Producer',
        'Placa Universal Audio Volt 2',
        'Placa Behringer Uphoria EM2',
        'Cables XLR 1,5M',
        'Cables XLR 7,5M',
        'Cables XLR 15,25M',
        'Pie de mic',
        'Altavoces Alto TS408',
        'Mackie HM-4',
        'Auriculares Shure SRH440A',
        'Alargue de Auriculares 3m'
      ],
      itemsEn: [
        'Mic Shure SM7B',
        'Mic SM58',
        'Mic Rode NT1-A',
        'Mic Shure PGA48',
        'Zoom H6',
        'Zoom L8',
        'Behringer X32 Producer',
        'Placa Universal Audio Volt 2',
        'Placa Behringer Uphoria EM2',
        'Cables XLR 1,5M',
        'Cables XLR 7,5M',
        'Cables XLR 15,25M',
        'Pie de mic',
        'Altavoces Alto TS408',
        'Mackie HM-4',
        'Auriculares Shure SRH440A',
        'Alargue de Auriculares 3m'
      ]
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
      titleEs: 'Realización',
      titleEn: 'Live production',
      itemsEs: [
        'Ordenador ASUS Pro WS W790E-SAGE — Intel Xeon W5 — GeForce RTX 5080',
        'Blackmagic DeckLink 4k SDI & HDMI',
        'Hollyland Mars 4K',
        'StreamDeck XL',
        'Sistema Vmix'
      ],
      itemsEn: [
        'Ordenador ASUS Pro WS W790E-SAGE — Intel Xeon W5 — GeForce RTX 5080',
        'Blackmagic DeckLink 4k SDI & HDMI',
        'Hollyland Mars 4K',
        'StreamDeck XL',
        'Sistema Vmix'
      ]
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      titleEs: 'Soportes',
      titleEn: 'Soportes',
      itemsEs: [
        'Kit Ceferino acero negro base fija Avenger A2033FBKIT',
        'Trípode Jirafa 41 aluminio negro Avenger A4041B',
        'Trípode iluminación Compact mini aluminio negro Manfrotto',
        'Extensión portafondos 2m Manfrotto LLLB1143',
        'Portaporex Avenger F1504'
      ],
      itemsEn: [
        'Kit Ceferino acero negro base fija Avenger A2033FBKIT',
        'Avenger A4041B black aluminium boom stand',
        'Manfrotto Compact Mini black aluminium light stand',
        'Manfrotto LLLB1143 2 m background support extension',
        'Portaporex Avenger F1504'
      ]
    }
  ];

  // =========================================================================
  // 4. BILINGUAL DICTIONARY (ES Default / EN Exact from notarobotstudios.es)
  // =========================================================================
  var TRANSLATIONS = {
    es: {
      top_main_home: 'Inicio Productora',
      top_main_prod: 'Producción',
      top_main_studios: 'Nuestros Estudios',
      top_main_about: 'Sobre Nosotros',
      top_discover: 'Descubre nuestra productora audiovisual',
      word_studio: 'Estudio',
      nav_rider: 'Rider Técnico',
      nav_contact: 'Contacto',
      home_h1: 'Estudio de alquiler en Barcelona para podcast, streaming y producción audiovisual',
      home_sub: 'Estudio profesional en Poblenou con equipamiento de cine, sonido broadcast y packs flexibles.',
      home_cta_book: 'Haz tu reserva',
      home_studios_h2: 'Nuestros estudios de alquiler en Barcelona',
      home_studio_a_desc: 'Un estudio de 92 m², preparado para emisiones en vivo y grabaciones profesionales.',
      home_studio_b_desc: 'Un estudio versátil de 14 m², ideal para grabaciones íntimas, podcasts, webinars y entrevistas.',
      home_btn_rates: 'Ver tarifas',
      home_services_h2: 'Servicios a tu medida',
      home_services_sub: 'Soluciones flexibles para creadores, marcas y agencias. Nos adaptamos a tu proyecto.',
      srv_1_t: 'Producción integral',
      srv_1_d: 'Nos ocupamos de todo el proceso: rodaje, edición, postproducción y masterización en el formato que necesites.',
      srv_2_t: 'Escenografía a medida',
      srv_2_d: 'Diseñamos el set, la iluminación y la atmósfera para que cada grabación refleje la identidad de tu marca.',
      srv_3_t: 'Edición express',
      srv_3_d: 'Te llevas el material en el mismo día y, si lo necesitas, editamos tu contenido en menos de 24 horas.',
      srv_4_t: 'Tarifas para grabaciones recurrentes',
      srv_4_d: 'Si grabas de forma semanal, quincenal o mensual, te ofrecemos tarifas especiales por volumen. Más constancia, menor coste por sesión.',
      home_equip_h2: 'Equipamiento Audiovisual Profesional',
      eq_cat_1: 'Cámaras',
      eq_lenses: '• Ópticas Sony GM y Sigma',
      eq_cat_2: 'Sonido',
      eq_cat_3: 'Iluminación',
      eq_nanlite: '• Nanlite Forza 60B, 300B y 500B',
      eq_softbox: '• Softboxes, lanterns y proyectores Nanlite',
      eq_cat_4: 'Realización',
      eq_bm: '• Sistema Blackmagic ATEM y Decklink SDI y HDMI',
      eq_vmix: '• Sistema VMIX',
      eq_mon: '• Monitores 4K',
      eq_tp: '• Teleprompter y StreamDeck',
      home_btn_rider: 'Ver Rider Técnico',
      home_loc_h2: 'Alquiler de estudio en Poblenou, Barcelona',
      home_loc_p: 'Nuestro estudio audiovisual profesional está ubicado en <strong>Llacuna 11, Piso 5, 08005 Barcelona</strong>, en pleno corazón de <strong>Poblenou</strong> — uno de los barrios más dinámicos y mejor conectados de la ciudad.',
      home_seo_h2: 'Tu estudio audiovisual profesional en Poblenou, Barcelona',
      home_seo_p1: '<strong>Not a Robot Studios</strong> es un estudio de alquiler en Barcelona situado en pleno Poblenou, el distrito de innovación de la ciudad. Nuestro espacio combina tecnología audiovisual de última generación con un diseño pensado para producciones de alto nivel: podcast, streaming en directo, grabación multicámara, entrevistas y contenido corporativo.',
      home_seo_p2: 'Tanto si eres creador de contenido, productora, agencia o marca, en nuestro estudio de podcast en alquiler en Barcelona encontrarás todo lo necesario para llevar tu proyecto al siguiente nivel. Equipamiento de cine profesional, iluminación de cine, sonido broadcast y un equipo técnico disponible para acompañarte.',
      home_seo_p3: 'Con packs de grabación flexibles y alquiler de material audiovisual, nos adaptamos a cualquier formato: desde una sesión de podcast de 2 horas hasta una producción audiovisual completa de varios días.',
      home_seo_p4: 'En Not a Robot Studios ofrecemos un <strong>estudio de podcast profesional en Barcelona</strong> preparado para la <strong>grabación de video podcast</strong> con calidad broadcast. Contamos con realización multicámara 4K, sonido con micrófonos Shure SM7B, iluminación ambiental y escenografía lista para grabar desde el primer minuto.',
      home_seo_p5: 'Nuestro <strong>estudio de streaming en Barcelona</strong> es ideal para entrevistas, formatos editoriales, debates, contenido para marcas y programas en directo. Ofrecemos <strong>podcast multicámara profesional</strong> con configuración personalizada y asistencia técnica opcional.',
      sa_lead: 'Nuestro espacio principal de 92 m² en Poble Nou con una ventana de más de 5 metros de ancho con vistas a todo Barcelona, está diseñado y equipado para llevar a cabo grabaciones de primer nivel. Es un espacio completamente acustizado y preparado para producciones profesionales.',
      sa_rates_h2: 'Tarifas del Estudio',
      rate_row_1: 'Estudio sin técnica',
      rate_row_2: 'Estudio + Puesta de iluminación básica',
      rate_divider: 'Podcast y entrevistas',
      rate_row_4: 'Pack Robot + Técnico + Edición Multicam',
      rate_note_1: '* Precios sin IVA. Consúltanos para adaptar el pack a tus necesidades.',
      rate_note_2: '* Pack Robot incluye: Hasta 3 cámaras, 2 micrófonos y puesta de iluminación completa.',
      sa_feat_h2: 'Características del Estudio',
      sa_f1: '• <strong>Superficie:</strong> 92 m² diáfanos y modulables.',
      sa_f2: '• <strong>Iluminación:</strong> Parrilla de luces en techo, pinzas y accesorios.',
      sa_f3: '• <strong>Sonido:</strong> Micrófonos profesionales y aislamiento acústico profesional.',
      sa_f4: '• <strong>Cámaras:</strong> Contamos con 10 cámaras de la gama profesional de Sony.',
      sa_f5: '• <strong>Energía:</strong> Tomas trifásicas y monofásicas distribuidas.',
      sa_mod_p: 'Su tamaño, su adaptabilidad y sus elementos modulares permiten armar escenografías complejas a medida con una infinidad de posibles configuraciones.',
      sa_perf_prefix: 'El Estudio',
      sa_perf_suffix: 'es perfecto para',
      sa_p3: '• Producciones multicámara',
      sa_p4: '• Sesiones de streaming profesional',
      sa_p5: '• Sesiones musicales',
      sa_conf_h2: 'Configuraciones posibles',
      sa_c1: '• Set de entrevista de 2 a 8 cámaras.',
      sa_c2: '• Mesas de debate hasta 6 u 8 participantes',
      sa_c3: '• Set de streaming en directo con realización en tiempo real',
      sa_tech_h2: 'Configuración técnica',
      sa_t1: '• <strong>Cámaras disponibles:</strong> Sony FX6, FX3, FX30',
      sa_t2: '• <strong>Iluminación:</strong> Aputure Nova, Nanlite Forza, Nanlite Pavotube, Nanlite Pavobulb.',
      sa_t3: '• <strong>Modificadores de luz:</strong> Softboxes redondos y rectangulares, lantern, lente proyectora, grids para todas las configuraciones.',
      sa_t4: '• <strong>Sonido:</strong> Behringer X32 Producer, Rodecaster Pro, Zoom Livetrack L8, Shure SM7B, Sennheiser MKH 416, Rode NTG5.',
      sa_t5: '• <strong>Realización:</strong> Sistema VMIX con Blackmagic Decklink de 12 canales 4K y Blackmagic ATEM',
      btn_book_wa: 'Reservar por WhatsApp',
      btn_call: 'Llamar',
      sb_lead: 'Espacio versátil de 14 m² en Poblenou, ideal para podcast y grabaciones de formato reducido.',
      sb_rates_h2: 'Tarifas del',
      sb_feat_h2: 'Características del',
      sb_f1: '• <strong>Superficie:</strong> 14 m² con tratamiento acústico.',
      sb_f2: '• <strong>Iluminación:</strong> Sistema de iluminación RGB Nanlite y Aputure',
      sb_f3: '• <strong>Sonido:</strong> Micrófonos profesionales y aislamiento acústico profesional.',
      sb_f4: '• <strong>Cámaras:</strong> Contamos con 10 cámaras de la gama profesional de Sony.',
      sb_f5: '• <strong>Energía:</strong> Tomas trifásicas y monofásicas distribuidas.',
      sb_perf_prefix: 'El',
      sb_perf_suffix: 'es perfecto para:',
      sb_p3: '• Producciones multicámara',
      sb_p4: '• Contenido para redes sociales',
      sb_p5: '• Grabación de audio',
      sb_p6: '• Masterclass y Webinars',
      sb_c1: '• Set de podcast hasta 4 personas',
      sb_c2: '• Entrevista hasta 5 cámaras',
      sb_c3: '• Espacio de grabación para contenido digital',
      rider_h1: 'Rider Técnico',
      rider_lead: 'Listado de equipamiento audiovisual profesional disponible en nuestros estudios. Consulta nuestra disponibilidad y pregúntanos por equipos que no veas en la lista.',
      rider_ok_h2: '¡Solicitud enviada!',
      rider_ok_p: 'Muchas gracias por ponerte en contacto con nosotros. Te enviaremos el presupuesto a la mayor brevedad posible.',
      rider_ok_btn: 'Hacer otra solicitud',
      rider_form_h2: 'Solicitar presupuesto',
      rider_form_sub: 'Completa tus datos y te enviaremos un presupuesto personalizado.',
      lbl_name: 'Nombre y apellido *',
      lbl_phone: 'Teléfono',
      lbl_days: 'Cantidad de días',
      lbl_loc: 'Ubicación',
      loc_a: 'Estudio A',
      loc_b: 'Estudio B',
      loc_out: 'Fuera del Estudio',
      lbl_desc: 'Descripción',
      rider_submit_btn: 'Solicitar presupuesto',
      contact_h1: 'Contacta con nuestro estudio en Barcelona',
      contact_lead: 'Escríbenos por WhatsApp, llámanos, mándanos un email o usa el formulario. Estaremos encantados de ayudarte con tu proyecto.',
      c_addr_h: 'Dirección',
      c_phone_h: 'Teléfono / WhatsApp',
      c_hours_h: 'Horario',
      c_h1: 'Lunes – Viernes: 9:00 – 21:00',
      c_h2: 'Sábado: 10:00 – 18:00',
      c_h3: 'Domingo: Cerrado',
      c_ok_h2: '¡Mensaje enviado!',
      c_ok_p: 'Muchas gracias por ponerte en contacto con nosotros. Te responderemos a la mayor brevedad posible.',
      c_ok_btn: 'Enviar otro mensaje',
      c_form_h2: 'Envíanos un mensaje',
      c_form_sub: 'Cuéntanos sobre tu proyecto y te responderemos lo antes posible.',
      lbl_subject: 'Asunto',
      lbl_message: 'Mensaje *',
      c_submit_btn: 'Enviar mensaje',
      footer_desc: 'Estudio audiovisual profesional de alquiler en Poblenou, Barcelona. Podcast, streaming y producción audiovisual.',
      footer_agency: 'Productora audiovisual',
      footer_col_studios: 'Estudios',
      footer_col_loc: 'Ubicación',
      footer_loc_desc: 'Barrio de Poblenou, Barcelona. Fácil acceso en metro (L4 Llacuna / Poblenou) y parking cercano.',
      footer_rights: 'Todos los derechos reservados.'
    },
    en: {
      top_main_home: 'Production Home',
      top_main_prod: 'Production',
      top_main_studios: 'Our Studios',
      top_main_about: 'About Us',
      top_discover: 'Discover our audiovisual production company',
      word_studio: 'Studio',
      nav_rider: 'Technical Rider',
      nav_contact: 'Contact',
      home_h1: 'Studio rental in Barcelona for podcasts, streaming and audiovisual production',
      home_sub: 'Professional studio in Poblenou with cinema equipment, broadcast sound and flexible packages.',
      home_cta_book: 'Book now',
      home_studios_h2: 'Our rental studios in Barcelona',
      home_studio_a_desc: 'A 92 m² studio, equipped for live streaming and professional recording.',
      home_studio_b_desc: 'A versatile 14 m² studio, ideal for intimate recordings, podcasts, webinars and interviews.',
      home_btn_rates: 'View rates',
      home_services_h2: 'Tailored services',
      home_services_sub: 'Flexible solutions for creators, brands and agencies. We adapt to your project.',
      srv_1_t: 'Full production',
      srv_1_d: 'We handle the entire process: filming, editing, post-production and mastering in your required format.',
      srv_2_t: 'Custom set design',
      srv_2_d: 'We design the set, lighting and atmosphere so every recording reflects your brand identity.',
      srv_3_t: 'Express editing',
      srv_3_d: 'We deliver your footage the same day and, if needed, edit your content in under 24 hours.',
      srv_4_t: 'Rates for recurring recordings',
      srv_4_d: 'If you record weekly, fortnightly or monthly, we offer special volume-based rates. More consistency, lower cost per session.',
      home_equip_h2: 'Professional Audiovisual Equipment',
      eq_cat_1: 'Cameras',
      eq_lenses: '• Sony GM and Sigma lenses',
      eq_cat_2: 'Sound',
      eq_cat_3: 'Lighting',
      eq_nanlite: '• Nanlite Forza 60B, 300B and 500B',
      eq_softbox: '• Softboxes, lanterns and Nanlite projectors',
      eq_cat_4: 'Live production',
      eq_bm: '• Blackmagic ATEM and Decklink SDI/HDMI systems',
      eq_vmix: '• VMIX system',
      eq_mon: '• 4K monitors',
      eq_tp: '• Teleprompter and StreamDeck',
      home_btn_rider: 'View Technical Rider',
      home_loc_h2: 'Studio rental in Poblenou, Barcelona',
      home_loc_p: 'Our professional audiovisual studio is located at <strong>Llacuna 11, Piso 5, 08005 Barcelona</strong>, in the heart of <strong>Poblenou</strong> — one of the city’s most vibrant and well-connected areas.',
      home_seo_h2: 'Your professional audiovisual studio in Poblenou, Barcelona',
      home_seo_p1: '<strong>Not a Robot Studios</strong> is a rental studio in Barcelona, located in the heart of Poblenou, the city’s innovation district. Our space combines cutting-edge audiovisual technology with a design created for high-end productions: podcast, live streaming, multicamera recording, interviews and corporate content.',
      home_seo_p2: 'Whether you are a content creator, production company, agency or brand, at our podcast rental studio in Barcelona you will find everything needed to take your project to the next level. Professional cinema equipment, cinematic lighting, sound broadcast and a technical team to support you when needed.',
      home_seo_p3: 'With flexible recording packages and equipment rental options, we adapt to every project — from a two-hour podcast session to a complete multi-day audiovisual production.',
      home_seo_p4: 'At Not a Robot Studios, we offer a <strong>professional podcast studio in Barcelona</strong> equipped for <strong>video podcast recording</strong> of broadcast quality. 4K multicamera recording, Shure SM7B microphone audio, ambient lighting and a set ready to record from the moment you arrive.',
      home_seo_p5: 'Our <strong>streaming studio in Barcelona</strong> is ideal for interviews, editorial formats, debates, corporate content and live programmes. We offer <strong>professional multicamera podcast</strong> with a custom setup and technical support when needed.',
      sa_lead: 'Our main 92 m² space in Poblenou features a window over five metres wide with views across Barcelona. It is designed and equipped for first-class recording, with complete acoustic treatment for professional productions.',
      sa_rates_h2: 'Studio rates',
      rate_row_1: 'Studio only',
      rate_row_2: 'Studio + basic lighting setup',
      rate_divider: 'Podcasts and interviews',
      rate_row_4: 'Pack Robot + Technician + Editing Multicam',
      rate_note_1: '* Prices exclude VAT. Ask us to adapt the package to your needs.',
      rate_note_2: '* Pack Robot includes: Up to 3 cameras, 2 microphones and a complete lighting setup.',
      sa_feat_h2: 'Studio features',
      sa_f1: '• <strong>Floor area:</strong> 92 m² open-plan and modular.',
      sa_f2: '• <strong>Lighting:</strong> Ceiling lighting grid, clamps and accessories.',
      sa_f3: '• <strong>Sound:</strong> Professional microphones and professional soundproofing.',
      sa_f4: '• <strong>Cameras:</strong> Ten professional Sony cameras are available.',
      sa_f5: '• <strong>Power:</strong> Distributed three-phase and single-phase power outlets.',
      sa_mod_p: 'Its size, adaptability and modular elements allow complex bespoke sets with countless configurations.',
      sa_perf_prefix: 'Studio',
      sa_perf_suffix: 'is perfect for',
      sa_p3: '• Productions multicamera',
      sa_p4: '• Professional streaming sessions',
      sa_p5: '• Live music sessions',
      sa_conf_h2: 'Possible configurations',
      sa_c1: '• Interview set from 2 to 8 cameras.',
      sa_c2: '• Panel discussions with up to 6 or 8 participants',
      sa_c3: '• Live streaming set with real-time production',
      sa_tech_h2: 'Technical setup',
      sa_t1: '• <strong>Available cameras:</strong> Sony FX6, FX3, FX30',
      sa_t2: '• <strong>Lighting:</strong> Aputure Nova, Nanlite Forza, Nanlite Pavotube, Nanlite Pavobulb.',
      sa_t3: '• <strong>Light modifiers:</strong> Round and rectangular softboxes, lantern, projection attachment and honeycomb grids for every setup.',
      sa_t4: '• <strong>Sound:</strong> Behringer X32 Producer, Rodecaster Pro, Zoom Livetrack L8, Shure SM7B, Sennheiser MKH 416, Rode NTG5.',
      sa_t5: '• <strong>Live production:</strong> VMIX system with 12-input 4K Blackmagic Decklink and Blackmagic ATEM.',
      btn_book_wa: 'Book via WhatsApp',
      btn_call: 'Call',
      sb_lead: 'A versatile 14 m² space in Poblenou, ideal for podcasts and small-format recordings.',
      sb_rates_h2: 'Rates for',
      sb_feat_h2: 'Features of',
      sb_f1: '• <strong>Floor area:</strong> 14 m² with acoustic treatment.',
      sb_f2: '• <strong>Lighting:</strong> Nanlite and Aputure RGB lighting system',
      sb_f3: '• <strong>Sound:</strong> Professional microphones and professional soundproofing.',
      sb_f4: '• <strong>Cameras:</strong> Ten professional Sony cameras are available.',
      sb_f5: '• <strong>Power:</strong> Distributed three-phase and single-phase power outlets.',
      sb_perf_prefix: '',
      sb_perf_suffix: 'is perfect for:',
      sb_p3: '• Multicamera productions',
      sb_p4: '• Social media content',
      sb_p5: '• Audio recording',
      sb_p6: '• Masterclasses and webinars',
      sb_c1: '• Podcast set for up to 4 people',
      sb_c2: '• Interviews with up to 5 cameras',
      sb_c3: '• Recording space for digital content',
      rider_h1: 'Technical Rider',
      rider_lead: 'Professional audiovisual equipment available in our studios. Check availability and ask us about any equipment not shown on the list.',
      rider_ok_h2: 'Request sent!',
      rider_ok_p: 'Thank you for contacting us. We will send your quote as soon as possible.',
      rider_ok_btn: 'Create another request',
      rider_form_h2: 'Request a quote',
      rider_form_sub: 'Complete your details and we will send you a personalised quote.',
      lbl_name: 'Full name *',
      lbl_phone: 'Phone',
      lbl_days: 'Number of days',
      lbl_loc: 'Location',
      loc_a: 'Studio A',
      loc_b: 'Studio B',
      loc_out: 'Off-site',
      lbl_desc: 'Description',
      rider_submit_btn: 'Request a quote',
      contact_h1: 'Contact our studio in Barcelona',
      contact_lead: 'Message us on WhatsApp, call, email or use the form. We will be happy to help with your project.',
      c_addr_h: 'Address',
      c_phone_h: 'Phone / WhatsApp',
      c_hours_h: 'Opening hours',
      c_h1: 'Monday – Friday: 9:00 – 21:00',
      c_h2: 'Saturday: 10:00 – 18:00',
      c_h3: 'Sunday: Closed',
      c_ok_h2: 'Message sent!',
      c_ok_p: 'Thank you for contacting us. We will get back to you as soon as possible.',
      c_ok_btn: 'Send another message',
      c_form_h2: 'Send us a message',
      c_form_sub: 'Tell us about your project and we will reply as soon as possible.',
      lbl_subject: 'Subject',
      lbl_message: 'Message *',
      c_submit_btn: 'Send message',
      footer_desc: 'Professional audiovisual rental studio in Poblenou, Barcelona. Podcasts, streaming and audiovisual production.',
      footer_agency: 'Audiovisual production company',
      footer_col_studios: 'Studios',
      footer_col_loc: 'Location',
      footer_loc_desc: 'Poblenou district, Barcelona. Easy access by metro (L4 Llacuna / Poblenou) and nearby parking.',
      footer_rights: 'All rights reserved.'
    }
  };

  var currentLang = 'es';
  var currentView = 'home';
  var activeLightboxList = [];
  var activeLightboxIdx = 0;

  // =========================================================================
  // 5. GALLERY & RIDER RENDERING
  // =========================================================================
  function renderGalleries() {
    var gridA = document.getElementById('galleryGridA');
    var gridB = document.getElementById('galleryGridB');

    if (gridA) {
      gridA.innerHTML = STUDIO_A_PHOTOS.map(function (item, idx) {
        var alt = currentLang === 'en' ? item.altEn : item.altEs;
        return (
          '<div class="cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]" data-lb-studio="a" data-lb-idx="' + idx + '">' +
            '<img src="' + item.src + '" alt="' + alt + '" class="aspect-video w-full object-cover" loading="lazy">' +
          '</div>'
        );
      }).join('');
    }

    if (gridB) {
      gridB.innerHTML = STUDIO_B_PHOTOS.map(function (item, idx) {
        var alt = currentLang === 'en' ? item.altEn : item.altEs;
        return (
          '<div class="cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]" data-lb-studio="b" data-lb-idx="' + idx + '">' +
            '<img src="' + item.src + '" alt="' + alt + '" class="aspect-video w-full object-cover" loading="lazy">' +
          '</div>'
        );
      }).join('');
    }

    document.querySelectorAll('[data-lb-studio]').forEach(function (card) {
      card.addEventListener('click', function () {
        var studio = card.getAttribute('data-lb-studio');
        var idx = parseInt(card.getAttribute('data-lb-idx'), 10);
        openLightbox(studio === 'a' ? STUDIO_A_PHOTOS : STUDIO_B_PHOTOS, idx);
      });
    });
  }

  function renderRiderTables() {
    var container = document.getElementById('riderTablesContainer');
    if (!container) return;

    container.innerHTML = RIDER_CATEGORIES.map(function (cat) {
      var title = currentLang === 'en' ? cat.titleEn : cat.titleEs;
      var items = currentLang === 'en' ? cat.itemsEn : cat.itemsEs;
      var rowsHtml = items.map(function (item, idx) {
        var borderClass = idx === items.length - 1 ? 'border-b-0' : 'border-b';
        return (
          '<tr class="' + borderClass + ' border-border transition-colors hover:bg-muted/50">' +
            '<td class="p-4 text-muted-foreground">' + item + '</td>' +
          '</tr>'
        );
      }).join('');

      return (
        '<div>' +
          '<div class="mb-4 flex items-center gap-3">' +
            cat.iconSvg +
            '<h2 class="text-2xl font-bold text-foreground">' + title + '</h2>' +
          '</div>' +
          '<div class="overflow-hidden rounded-lg border border-border">' +
            '<table class="w-full caption-bottom text-sm">' +
              '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  // =========================================================================
  // 6. LIGHTBOX MODAL
  // =========================================================================
  function openLightbox(list, idx) {
    activeLightboxList = list;
    activeLightboxIdx = idx;
    var modal = document.getElementById('studioLightbox');
    var img = document.getElementById('lbImage');
    if (!modal || !img) return;
    var item = activeLightboxList[activeLightboxIdx];
    img.src = item.src;
    img.alt = currentLang === 'en' ? item.altEn : item.altEs;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeLightbox() {
    var modal = document.getElementById('studioLightbox');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function stepLightbox(dir) {
    if (!activeLightboxList.length) return;
    activeLightboxIdx = (activeLightboxIdx + dir + activeLightboxList.length) % activeLightboxList.length;
    var img = document.getElementById('lbImage');
    var item = activeLightboxList[activeLightboxIdx];
    if (img && item) {
      img.src = item.src;
      img.alt = currentLang === 'en' ? item.altEn : item.altEs;
    }
  }

  // =========================================================================
  // 7. VIEW ROUTER (Home / Estudio A / Estudio B / Rider Técnico / Contacto)
  // =========================================================================
  function switchView(viewName, scrollToTarifas) {
    var validViews = ['home', 'estudio-a', 'estudio-b', 'rider', 'contacto'];
    if (validViews.indexOf(viewName) === -1) viewName = 'home';
    currentView = viewName;

    validViews.forEach(function (v) {
      var el = document.getElementById('view-' + v);
      if (el) {
        if (v === viewName) {
          el.classList.add('active-view');
        } else {
          el.classList.remove('active-view');
        }
      }
    });

    // Update active state in nav links
    document.querySelectorAll('.studio-nav-item').forEach(function (link) {
      var target = link.getAttribute('data-studio-nav');
      if (target === viewName) {
        link.classList.remove('text-muted-foreground');
        link.classList.add('text-primary');
      } else {
        link.classList.remove('text-primary');
        link.classList.add('text-muted-foreground');
      }
    });

    // Close mobile menu if open
    var mobileNav = document.getElementById('mobileMenuNav');
    var openIcon = document.getElementById('mobileMenuOpenIcon');
    var closeIcon = document.getElementById('mobileMenuCloseIcon');
    if (mobileNav && !mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }

    if (scrollToTarifas) {
      var tarifasEl = document.getElementById(viewName + '-tarifas');
      if (tarifasEl) {
        setTimeout(function () {
          tarifasEl.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // 8. LANGUAGE ENGINE (ES Default / EN, Synced with Global notarobot_lang)
  // =========================================================================
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    try {
      localStorage.setItem('notarobot_lang', currentLang);
    } catch (e) {}

    document.documentElement.lang = currentLang;

    var dict = TRANSLATIONS[currentLang];
    document.querySelectorAll('[data-s-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-s-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    var nextLabel = currentLang === 'es' ? 'EN' : 'ES';
    var lbl1 = document.getElementById('studioLangLabel');
    var lbl2 = document.getElementById('studioLangLabelMobile');
    if (lbl1) lbl1.textContent = nextLabel;
    if (lbl2) lbl2.textContent = nextLabel;

    var descInput = document.getElementById('r-description');
    if (descInput) {
      descInput.placeholder = currentLang === 'en' ? 'Tell us more about your project.' : 'Cuéntanos más sobre tu proyecto.';
    }

    renderGalleries();
    renderRiderTables();
  }

  // =========================================================================
  // 9. DYNAMIC SHOWCASE CARDS ON HOME (Smooth Photo Cycling)
  // =========================================================================
  function initDynamicHomeCards() {
    var imgA = document.getElementById('dynamicCardImgA');
    var imgB = document.getElementById('dynamicCardImgB');
    if (!imgA || !imgB) return;

    var poolA = ['../images/studios/estudio-a-home--1oXALvu.png'].concat(
      STUDIO_A_PHOTOS.slice(0, 6).map(function (p) { return p.src; })
    );
    var poolB = ['../images/studios/estudio-b-C-fCnkmm.png'].concat(
      STUDIO_B_PHOTOS.slice(0, 6).map(function (p) { return p.src; })
    );
    var idxA = 0;
    var idxB = 0;

    setInterval(function () {
      if (currentView !== 'home') return;
      idxA = (idxA + 1) % poolA.length;
      idxB = (idxB + 1) % poolB.length;
      imgA.style.opacity = '0.35';
      imgB.style.opacity = '0.35';
      setTimeout(function () {
        imgA.src = poolA[idxA];
        imgB.src = poolB[idxB];
        imgA.style.opacity = '1';
        imgB.style.opacity = '1';
      }, 240);
    }, 3500);
  }

  // =========================================================================
  // 10. FORMS & CONVERSION TRACKING (Netlify Forms + Local CRM + Google Ads)
  // =========================================================================
  function saveLeadToLocalCrm(leadData) {
    try {
      var list = JSON.parse(localStorage.getItem('notarobot_leads_log') || '[]');
      list.unshift(leadData);
      localStorage.setItem('notarobot_leads_log', JSON.stringify(list.slice(0, 200)));
    } catch (e) {}
  }

  function initForms() {
    // Location radio highlight in Rider form
    var locRadios = document.querySelectorAll('#riderLocationRadios input[type="radio"]');
    locRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        document.querySelectorAll('#riderLocationRadios .rider-loc-label').forEach(function (lbl) {
          lbl.classList.remove('border-primary', 'bg-primary/10');
          lbl.classList.add('border-border');
        });
        var parentLbl = radio.closest('.rider-loc-label');
        if (parentLbl) {
          parentLbl.classList.remove('border-border');
          parentLbl.classList.add('border-primary', 'bg-primary/10');
        }
      });
    });

    // Rider Quote Form
    var riderForm = document.getElementById('riderQuoteForm');
    if (riderForm) {
      riderForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var fd = new FormData(riderForm);
        var lead = {
          id: 'LEAD-' + Date.now(),
          timestamp: new Date().toISOString(),
          name: fd.get('fullName') || '',
          email: fd.get('email') || '',
          phone: fd.get('phone') || '',
          studio: fd.get('location') || 'estudio-a',
          usage: 'Rider Técnico (' + (fd.get('days') || '1') + 'd)',
          message: fd.get('description') || '',
          sourcePage: '/pages/alquiler-estudios.html#rider'
        };
        saveLeadToLocalCrm(lead);

        if (window.NotARobotTracking && typeof window.NotARobotTracking.trackFormSubmission === 'function') {
          window.NotARobotTracking.trackFormSubmission(lead);
        }

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(fd).toString()
        }).catch(function () {});

        document.getElementById('riderQuoteFormWrap').classList.add('hidden');
        document.getElementById('riderQuoteSuccess').classList.remove('hidden');
      });
    }

    var riderReset = document.getElementById('riderResetBtn');
    if (riderReset) {
      riderReset.addEventListener('click', function () {
        if (riderForm) riderForm.reset();
        document.getElementById('riderQuoteSuccess').classList.add('hidden');
        document.getElementById('riderQuoteFormWrap').classList.remove('hidden');
      });
    }

    // Contact Form
    var contactForm = document.getElementById('studiosContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var fd = new FormData(contactForm);
        var lead = {
          id: 'LEAD-' + Date.now(),
          timestamp: new Date().toISOString(),
          name: fd.get('name') || '',
          email: fd.get('email') || '',
          phone: fd.get('phone') || '',
          studio: 'Contacto Estudios',
          usage: fd.get('subject') || 'Consulta general',
          message: fd.get('message') || '',
          sourcePage: '/pages/alquiler-estudios.html#contacto'
        };
        saveLeadToLocalCrm(lead);

        if (window.NotARobotTracking && typeof window.NotARobotTracking.trackFormSubmission === 'function') {
          window.NotARobotTracking.trackFormSubmission(lead);
        }

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(fd).toString()
        }).catch(function () {});

        document.getElementById('contactFormWrap').classList.add('hidden');
        document.getElementById('contactFormSuccess').classList.remove('hidden');
      });
    }

    var contactReset = document.getElementById('contactResetBtn');
    if (contactReset) {
      contactReset.addEventListener('click', function () {
        if (contactForm) contactForm.reset();
        document.getElementById('contactFormSuccess').classList.add('hidden');
        document.getElementById('contactFormWrap').classList.remove('hidden');
      });
    }
  }

  // =========================================================================
  // 11. INITIALIZATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initCrayonCursor();

    // Determine initial language (Default: 'es', check URL ?lang=en or localStorage)
    var urlParams = new URLSearchParams(window.location.search);
    var savedLang = 'es';
    try {
      savedLang = localStorage.getItem('notarobot_lang') || 'es';
    } catch (e) {}
    if (urlParams.get('lang') === 'en') savedLang = 'en';
    if (urlParams.get('lang') === 'es') savedLang = 'es';

    applyLanguage(savedLang);

    // Language toggle buttons
    var langBtn = document.getElementById('studioLangBtn');
    var langBtnMobile = document.getElementById('studioLangBtnMobile');
    function toggleLang() {
      applyLanguage(currentLang === 'es' ? 'en' : 'es');
    }
    if (langBtn) langBtn.addEventListener('click', toggleLang);
    if (langBtnMobile) langBtnMobile.addEventListener('click', toggleLang);

    // Navigation click handlers
    document.querySelectorAll('[data-studio-nav]').forEach(function (el) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        var target = el.getAttribute('data-studio-nav');
        var scrollTarifas = el.getAttribute('data-scroll-tarifas') === 'true';
        history.replaceState(null, '', '#' + (scrollTarifas ? target + '-tarifas' : target));
        switchView(target, scrollTarifas);
      });
    });

    // Check initial URL hash or ?view= param
    var hash = (window.location.hash || '').replace('#', '');
    var viewParam = urlParams.get('view');
    if (viewParam && ['home', 'estudio-a', 'estudio-b', 'rider', 'contacto'].indexOf(viewParam) !== -1) {
      switchView(viewParam, false);
    } else if (hash === 'estudio-a-tarifas') {
      switchView('estudio-a', true);
    } else if (hash === 'estudio-b-tarifas') {
      switchView('estudio-b', true);
    } else if (hash === 'reservar') {
      switchView('contacto', false);
    } else if (['home', 'estudio-a', 'estudio-b', 'rider', 'contacto'].indexOf(hash) !== -1) {
      switchView(hash, false);
    }

    // Mobile menu toggle
    var mobileBtn = document.getElementById('mobileMenuBtn');
    var mobileNav = document.getElementById('mobileMenuNav');
    var openIcon = document.getElementById('mobileMenuOpenIcon');
    var closeIcon = document.getElementById('mobileMenuCloseIcon');
    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', function () {
        var isHidden = mobileNav.classList.toggle('hidden');
        if (openIcon) openIcon.classList.toggle('hidden', !isHidden);
        if (closeIcon) closeIcon.classList.toggle('hidden', isHidden);
      });
    }

    // Lightbox events
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    var lbModal = document.getElementById('studioLightbox');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function (e) { e.stopPropagation(); stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', function (e) { e.stopPropagation(); stepLightbox(1); });
    if (lbModal) lbModal.addEventListener('click', function (e) { if (e.target === lbModal) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lbModal || lbModal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });

    initDynamicHomeCards();
    initForms();
  });
})();
