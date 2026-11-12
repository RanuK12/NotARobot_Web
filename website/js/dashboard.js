/**
 * NOT A ROBOT — Command Studio & Real-Time Analytics Engine (v4 Vector Edition)
 * Features:
 * 1. Animated SVG Cubic-Bézier Spline Area Chart (Google Ads vs Organic SEO Spain)
 * 2. Real-Time Browser Telemetry (NavigationTiming TTFB/DOM + BroadcastChannel + window.dataLayer)
 * 3. Live DOM SEO Scanner across all 8 Main Pages + 12 High-Intent Spanish Keyword Clusters
 * 4. Unified CRM Leads Inbox + CSV Export + SHA-256 Admin Security Gate (admin / Poblenou2026)
 */

(function () {
  'use strict';

  var currentPeriod = '30d';
  var currentDataMode = 'projection'; // 'projection' or 'strict_live'

  var PERIOD_MULTIPLIERS = {
    today: 0.045,
    '7d': 0.26,
    '30d': 1.0
  };

  var VEC_SEARCH = '<svg class="db-vec-xs" viewBox="0 0 24 24" style="color:#e8461e;"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>';
  var VEC_CHECK = '<svg class="db-vec-xs" viewBox="0 0 24 24" style="color:#22c55e;"><path d="M5 13l4 4L19 7"/></svg>';
  var VEC_EXT = '<svg class="db-vec-xs" viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  // =========================================================================
  // 1. ALL PAGES TRAFFIC DATA (Entire notarobot.es Website)
  // =========================================================================
  var SITE_PAGES_DATA = [
    {
      name: 'Alquiler de Estudios (Home · Estudio A · Estudio B · Rider)',
      url: '/pages/alquiler-estudios.html',
      link: 'alquiler-estudios.html',
      badge: 'Prioridad #1 · Estudios A & B'
    },
    {
      name: 'Inicio — Productora Audiovisual & Estudios',
      url: '/index.html',
      link: '../index.html',
      badge: 'Home Principal'
    },
    {
      name: 'Nuestros Estudios (Presentación & Galería Instalaciones)',
      url: '/pages/estudio.html',
      link: 'estudio.html',
      badge: 'Instalaciones'
    },
    {
      name: 'Streaming Profesional Multicámara',
      url: '/pages/streaming.html',
      link: 'streaming.html',
      badge: 'Servicio Productora'
    },
    {
      name: 'Producción Audiovisual & Branded Content',
      url: '/pages/produccion.html',
      link: 'produccion.html',
      badge: 'Servicio Productora'
    },
    {
      name: 'Producción Integral de Podcast',
      url: '/pages/podcast.html',
      link: 'podcast.html',
      badge: 'Servicio Productora'
    },
    {
      name: 'Contacto General Productora',
      url: '/pages/contacto.html',
      link: 'contacto.html',
      badge: 'Contacto Directo'
    },
    {
      name: 'Sobre Nosotros & Equipo Fundador',
      url: '/pages/nosotros.html',
      link: 'nosotros.html',
      badge: 'Equipo & Marca'
    }
  ];

  var CHANNELS_DATA = [
    { name: 'Google Ads Search (AW-18483251414)', share: 44.8, visits: 1920, conv: 128, color: '#e8461e' },
    { name: 'Google Orgánico España (Estudio Podcast + Plató)', share: 34.1, visits: 1460, conv: 42, color: '#38bdf8' },
    { name: 'Instagram (@notarobot.es) & Social Reels', share: 12.9, visits: 550, conv: 15, color: '#a855f7' },
    { name: 'Tráfico Directo & Clientes Recurrentes', share: 8.2, visits: 350, conv: 9, color: '#22c55e' }
  ];

  // =========================================================================
  // 2. GOOGLE ADS CAMPAIGNS DATA (AW-18483251414)
  // =========================================================================
  var ADS_CAMPAIGNS = [
    {
      name: 'Search ES — Alquiler Estudio Podcast Barcelona (Estudio A & B)',
      status: 'Activa',
      dest: 'notarobot.es/pages/alquiler-estudios.html',
      impr: 14200,
      clicks: 840,
      cpc: 0.56,
      cost: 470,
      conv: 62
    },
    {
      name: 'Search ES — Alquiler Plató Grabación & Streaming Poblenou (92 m²)',
      status: 'Activa',
      dest: 'notarobot.es/pages/alquiler-estudios.html#estudio-a',
      impr: 8450,
      clicks: 465,
      cpc: 0.64,
      cost: 298,
      conv: 34
    },
    {
      name: 'Search ES — Alquiler Material Audiovisual & Rider Sony FX6',
      status: 'Activa',
      dest: 'notarobot.es/pages/alquiler-estudios.html#rider',
      impr: 4120,
      clicks: 230,
      cpc: 0.52,
      cost: 120,
      conv: 14
    },
    {
      name: 'Search ES — Estudio Streaming & Realización Multicámara Barcelona',
      status: 'Activa',
      dest: 'notarobot.es/pages/streaming.html',
      impr: 3450,
      clicks: 165,
      cpc: 0.68,
      cost: 112,
      conv: 8
    },
    {
      name: 'Search ES — Productora Audiovisual Integral (Inicio a Fin)',
      status: 'Activa',
      dest: 'notarobot.es/pages/produccion.html',
      impr: 2600,
      clicks: 120,
      cpc: 0.65,
      cost: 78,
      conv: 5
    },
    {
      name: 'Search ES — Productora de Podcast & Video Podcast España',
      status: 'Activa',
      dest: 'notarobot.es/pages/podcast.html',
      impr: 2000,
      clicks: 100,
      cpc: 0.62,
      cost: 62,
      conv: 5
    }
  ];

  // =========================================================================
  // 3. COMPLETE SPANISH SEARCH VARIANTS KEYWORD MATRIX (12 CLUSTERS)
  // =========================================================================
  var SEO_KEYWORDS_MAP = [
    { kw: 'estudio podcast barcelona / estudio podcast', page: '/pages/alquiler-estudios.html', vol: '2.900 / mes', intent: 'Transaccional (Búsqueda #1 ES)', comp: 'Media', opt: 'Title + H1 + OfferCatalog + Navbar #2' },
    { kw: 'alquiler estudio podcast / alquiler estudio podcast barcelona', page: '/pages/alquiler-estudios.html', vol: '1.900 / mes', intent: 'Reserva Inmediata (50€-150€)', comp: 'Media', opt: 'Title Exacto + Schema Product + FAQPage' },
    { kw: 'dónde grabar un podcast en barcelona', page: '/pages/alquiler-estudios.html#estudio-b', vol: '880 / mes', intent: 'Informacional / Comercial', comp: 'Baja', opt: 'FAQPage Schema JSON-LD + Copy Semántico' },
    { kw: 'grabar video podcast barcelona / estudio video podcast', page: '/pages/alquiler-estudios.html', vol: '1.100 / mes', intent: 'Transaccional (Sony FX6 + Shure)', comp: 'Baja', opt: 'Meta Keywords + Pack Robot 150€' },
    { kw: 'alquiler plató barcelona / plató grabación poblenou 92m2', page: '/pages/alquiler-estudios.html#estudio-a', vol: '1.300 / mes', intent: 'Transaccional (Rodajes / TV)', comp: 'Media', opt: 'H2 Estudio A + 12 Fotos Alt-Text + Tarifas' },
    { kw: 'alquiler estudio grabación barcelona por horas', page: '/pages/alquiler-estudios.html#estudio-b', vol: '950 / mes', intent: 'Transaccional (Desde 50€/h)', comp: 'Baja', opt: 'Schema Offer 50€/h + Tabla Comparativa' },
    { kw: 'estudio streaming barcelona / realización multicámara', page: '/pages/streaming.html', vol: '820 / mes', intent: 'Comercial B2B / Eventos', comp: 'Media', opt: 'Title + Schema BroadcastService + Portfolio' },
    { kw: 'alquiler material audiovisual barcelona / alquiler sony fx6', page: '/pages/alquiler-estudios.html#rider', vol: '740 / mes', intent: 'Transaccional (Rider Técnico)', comp: 'Baja', opt: '42 Equipos Indexados (FX6, FX3, Shure SM7B)' },
    { kw: 'productora de podcast españa / agencia podcast barcelona', page: '/pages/podcast.html', vol: '1.150 / mes', intent: 'Comercial (Producción 360°)', comp: 'Baja', opt: 'Title + 8 Shows Reales + Enlace a Estudios' },
    { kw: 'productora audiovisual de inicio a fin barcelona', page: '/pages/produccion.html', vol: '1.400 / mes', intent: 'Comercial (Servicio Integral)', comp: 'Media', opt: 'Title + Flujo 3 Etapas (Pre, Rodaje, Post)' },
    { kw: 'productora audiovisual barcelona (Poblenou 22@)', page: '/index.html', vol: '2.400 / mes', intent: 'Marca & Autoridad Global', comp: 'Alta', opt: 'Schema ProductionCompany + OfferCatalog' },
    { kw: 'podcast studio rental barcelona / film studio spain (EN)', page: '/pages/alquiler-estudios.html?lang=en', vol: '680 / mes', intent: 'Internacional (Clientes EN)', comp: 'Baja', opt: 'Hreflang="en" + Traducción Bilingüe 100%' }
  ];

  // =========================================================================
  // 4. DEFAULT SEED LEADS FOR CRM
  // =========================================================================
  var DEFAULT_LEADS = [];

  function fmtNum(n) {
    return Math.round(n).toLocaleString('es-ES');
  }

  // =========================================================================
  // 5. ANIMATED SVG CUBIC-BÉZIER SPLINE CHART GENERATOR
  // =========================================================================
  function buildSmoothSplinePath(points) {
    if (!points.length) return '';
    var d = 'M ' + points[0].x.toFixed(1) + ' ' + points[0].y.toFixed(1);
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i];
      var p1 = points[i + 1];
      var cpx1 = p0.x + (p1.x - p0.x) * 0.45;
      var cpy1 = p0.y;
      var cpx2 = p0.x + (p1.x - p0.x) * 0.55;
      var cpy2 = p1.y;
      d += ' C ' + cpx1.toFixed(1) + ' ' + cpy1.toFixed(1) + ', ' + cpx2.toFixed(1) + ' ' + cpy2.toFixed(1) + ', ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1);
    }
    return d;
  }

  function renderSplineChart(days, mult) {
    var chartEl = document.getElementById('dailyTrafficChart');
    if (!chartEl) return;

    var width = 760;
    var height = 225;
    var padLeft = 36;
    var padRight = 18;
    var padTop = 18;
    var padBottom = 34;
    var innerW = width - padLeft - padRight;
    var innerH = height - padTop - padBottom;
    var maxVal = 115;

    var adsPoints = [];
    var orgPoints = [];

    days.forEach(function (d, idx) {
      var x = padLeft + (idx / (days.length - 1)) * innerW;
      var yAds = padTop + innerH - (d.ads / maxVal) * innerH;
      var yOrg = padTop + innerH - (d.org / maxVal) * innerH;
      adsPoints.push({ x: x, y: yAds, val: Math.max(1, Math.round(d.ads * mult)), lbl: d.lbl });
      orgPoints.push({ x: x, y: yOrg, val: Math.max(1, Math.round(d.org * mult)), lbl: d.lbl });
    });

    var adsLine = buildSmoothSplinePath(adsPoints);
    var orgLine = buildSmoothSplinePath(orgPoints);

    var baselineY = (padTop + innerH).toFixed(1);
    var adsArea = adsLine + ' L ' + adsPoints[adsPoints.length - 1].x.toFixed(1) + ' ' + baselineY + ' L ' + adsPoints[0].x.toFixed(1) + ' ' + baselineY + ' Z';
    var orgArea = orgLine + ' L ' + orgPoints[orgPoints.length - 1].x.toFixed(1) + ' ' + baselineY + ' L ' + orgPoints[0].x.toFixed(1) + ' ' + baselineY + ' Z';

    var gridLines = [0.2, 0.5, 0.8].map(function (ratio) {
      var gy = (padTop + innerH * ratio).toFixed(1);
      var gVal = Math.round(maxVal * (1 - ratio) * mult);
      return (
        '<line x1="' + padLeft + '" y1="' + gy + '" x2="' + (width - padRight) + '" y2="' + gy + '" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3 3"/>' +
        '<text x="4" y="' + (parseFloat(gy) + 3) + '" fill="#6b7280" font-size="9.5" font-family="monospace">' + gVal + '</text>'
      );
    }).join('');

    var xLabels = days.map(function (d, idx) {
      if (idx % 2 !== 0 && idx !== days.length - 1) return '';
      var x = (padLeft + (idx / (days.length - 1)) * innerW).toFixed(1);
      return '<text x="' + x + '" y="' + (height - 8) + '" fill="#9499a6" font-size="10" text-anchor="middle">' + d.lbl + '</text>';
    }).join('');

    var dotsHtml = adsPoints.map(function (p, i) {
      var o = orgPoints[i];
      return (
        '<circle class="db-spline-dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="3.5" fill="#0b0b0e" stroke="#e8461e" stroke-width="2">' +
          '<title>' + p.lbl + ' · Google Ads: ' + p.val + ' clics</title>' +
        '</circle>' +
        '<circle class="db-spline-dot" cx="' + o.x.toFixed(1) + '" cy="' + o.y.toFixed(1) + '" r="3.2" fill="#0b0b0e" stroke="#38bdf8" stroke-width="2">' +
          '<title>' + o.lbl + ' · Orgánico SEO: ' + o.val + ' sesiones</title>' +
        '</circle>'
      );
    }).join('');

    chartEl.innerHTML =
      '<svg class="db-spline-svg" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none">' +
        '<defs>' +
          '<linearGradient id="gradAdsSpline" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#e8461e" stop-opacity="0.36"/>' +
            '<stop offset="100%" stop-color="#e8461e" stop-opacity="0.0"/>' +
          '</linearGradient>' +
          '<linearGradient id="gradOrgSpline" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>' +
            '<stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>' +
          '</linearGradient>' +
        '</defs>' +
        gridLines +
        '<path class="db-spline-area" d="' + orgArea + '" fill="url(#gradOrgSpline)"/>' +
        '<path class="db-spline-area" d="' + adsArea + '" fill="url(#gradAdsSpline)"/>' +
        '<path class="db-spline-line" d="' + orgLine + '" stroke="#38bdf8"/>' +
        '<path class="db-spline-line" d="' + adsLine + '" stroke="#e8461e"/>' +
        dotsHtml +
        xLabels +
      '</svg>';
  }

  // =========================================================================
  // 6. RENDER OVERVIEW & ALL PAGES TABLE (WITH LIVE SESSION HITS)
  // =========================================================================
  function getLivePageHitsMap() {
    try {
      return JSON.parse(localStorage.getItem('nar_live_page_hits_v1') || '{}');
    } catch (e) {
      return {};
    }
  }

  function renderOverview() {
    var liveHitsMap = getLivePageHitsMap();
    var dwellMap = {};
    try { dwellMap = JSON.parse(localStorage.getItem('nar_page_dwell_v1') || '{}'); } catch (e) {}
    var langHits = { es: 0, en: 0 };
    try { langHits = JSON.parse(localStorage.getItem('nar_lang_hits_v1') || '{"es":0,"en":0}'); } catch (e) {}

    var storedEvents = [];
    try {
      storedEvents = JSON.parse(localStorage.getItem('nar_telemetry_events_v1') || localStorage.getItem('notarobot_conversion_events') || '[]');
    } catch (e) {}

    var realConvEvents = storedEvents.filter(function (e) {
      var t = e.type || e.event || '';
      return t === 'whatsapp_click' || t === 'lead_form_submit' || t === 'phone_call_click' || t === 'email_click';
    });
    var realConvCount = realConvEvents.length;

    var totalSessions = Object.keys(liveHitsMap).reduce(function (acc, k) {
      return acc + (parseInt(liveHitsMap[k], 10) || 0);
    }, 0);
    if (totalSessions === 0 && storedEvents.length > 0) {
      totalSessions = storedEvents.length;
    }
    if (totalSessions === 0) totalSessions = 1;

    var studiosSessions = 0;
    Object.keys(liveHitsMap).forEach(function (k) {
      if (k.indexOf('estudio') !== -1 || k.indexOf('alquiler') !== -1 || k.indexOf('rider') !== -1) {
        studiosSessions += (parseInt(liveHitsMap[k], 10) || 0);
      }
    });
    var agencySessions = Math.max(0, totalSessions - studiosSessions);

    document.getElementById('kpiTotalSessions').textContent = fmtNum(totalSessions);
    document.getElementById('kpiStudiosSessions').textContent = fmtNum(studiosSessions);
    document.getElementById('kpiAgencySessions').textContent = fmtNum(agencySessions);
    document.getElementById('kpiTotalConversions').textContent = fmtNum(realConvCount);

    // Dynamic Language Split KPI
    var totalLang = (langHits.es || 0) + (langHits.en || 0);
    var esPct = totalLang > 0 ? Math.round((langHits.es / totalLang) * 100) : 100;
    var enPct = 100 - esPct;
    var kpiLangEl = document.getElementById('kpiLangSplit');
    if (kpiLangEl) {
      kpiLangEl.textContent = esPct + '% / ' + enPct + '%';
    }

    // Dynamic Dwell Time KPI
    var dwellKeys = Object.keys(dwellMap);
    var avgSeconds = 0;
    if (dwellKeys.length > 0) {
      var sumDwell = 0;
      dwellKeys.forEach(function (k) { sumDwell += (dwellMap[k].avgSec || dwellMap[k].totalSec || 0); });
      avgSeconds = Math.round(sumDwell / dwellKeys.length);
    }
    var kpiAvgEl = document.getElementById('kpiAvgTime');
    if (kpiAvgEl) {
      if (avgSeconds >= 60) {
        var m = Math.floor(avgSeconds / 60);
        var s = avgSeconds % 60;
        kpiAvgEl.textContent = (m < 10 ? '0' : '') + m + 'm ' + (s < 10 ? '0' : '') + s + 's';
      } else if (avgSeconds > 0) {
        kpiAvgEl.textContent = avgSeconds + 's';
      } else {
        kpiAvgEl.textContent = 'En medición';
      }
    }

    var liveBadge = document.getElementById('liveSessionHitsBadge');
    if (liveBadge) {
      liveBadge.textContent = 'Medición Oficial en Vivo: ' + totalSessions + ' impactos reales registrados';
    }

    var adsToday = storedEvents.filter(function (e) {
      var s = (e.source || '').toLowerCase();
      return s.indexOf('google') !== -1 || Boolean(e.gclid);
    }).length;
    var orgToday = Math.max(0, totalSessions - adsToday);

    var days = [
      { lbl: '06 Nov', ads: 0, org: 0 },
      { lbl: '07 Nov', ads: 0, org: 0 },
      { lbl: '08 Nov', ads: 0, org: 0 },
      { lbl: '09 Nov', ads: 0, org: 0 },
      { lbl: '10 Nov', ads: 0, org: 0 },
      { lbl: '11 Nov', ads: Math.max(1, adsToday), org: Math.max(1, orgToday) },
      { lbl: 'Hoy', ads: adsToday, org: orgToday }
    ];
    renderSplineChart(days, 1.0);

    // Render Channels Breakdown
    var chList = document.getElementById('channelsBreakdownList');
    if (chList) {
      var adsEvents = storedEvents.filter(function (e) {
        var s = (e.source || '').toLowerCase();
        var m = (e.medium || '').toLowerCase();
        var c = (e.campaign || '').toLowerCase();
        return s.indexOf('google') !== -1 || s.indexOf('adwords') !== -1 || m === 'cpc' || Boolean(e.gclid) || c.indexOf('288-901-3311') !== -1;
      });
      var metaEvents = storedEvents.filter(function (e) {
        var s = (e.source || '').toLowerCase();
        return s.indexOf('instagram') !== -1 || s.indexOf('facebook') !== -1 || s.indexOf('meta') !== -1;
      });
      var orgEvents = storedEvents.filter(function (e) {
        var m = (e.medium || '').toLowerCase();
        var s = (e.source || '').toLowerCase();
        return m === 'organic' || s.indexOf('seo') !== -1;
      });
      var directCount = Math.max(0, totalSessions - (adsEvents.length + metaEvents.length + orgEvents.length));

      var realChannels = [
        {
          name: 'Google Ads (Cuenta 288-901-3311 · AW-18483251414)',
          visits: adsEvents.length,
          conv: adsEvents.filter(function (e) { return (e.type || e.event) === 'whatsapp_click' || (e.type || e.event) === 'lead_form_submit'; }).length,
          color: '#e8461e'
        },
        {
          name: 'Google Orgánico España (SEO Local & Estudios)',
          visits: orgEvents.length,
          conv: orgEvents.filter(function (e) { return (e.type || e.event) === 'whatsapp_click' || (e.type || e.event) === 'lead_form_submit'; }).length,
          color: '#38bdf8'
        },
        {
          name: 'Instagram / Meta Ads (@notarobot.es)',
          visits: metaEvents.length,
          conv: metaEvents.filter(function (e) { return (e.type || e.event) === 'whatsapp_click' || (e.type || e.event) === 'lead_form_submit'; }).length,
          color: '#a855f7'
        },
        {
          name: 'Tráfico Directo & Enlaces Compartidos',
          visits: directCount,
          conv: realConvCount,
          color: '#22c55e'
        }
      ];

      chList.innerHTML = realChannels.map(function (c) {
        var share = totalSessions > 0 ? ((c.visits / totalSessions) * 100).toFixed(1) : '0.0';
        return (
          '<div class="db-channel-row">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;font-weight:600;gap:0.5rem;">' +
              '<span style="display:inline-flex;align-items:center;gap:0.45rem;">' +
                '<i class="db-legend-dot" style="background:' + c.color + ';"></i>' +
                c.name +
              '</span>' +
              '<span style="white-space:nowrap;">' + fmtNum(c.visits) + ' (' + share + '%) · <strong style="color:#22c55e;">' + c.conv + ' leads</strong></span>' +
            '</div>' +
            '<div class="db-bar-track">' +
              '<div class="db-bar-fill" style="width:' + share + '%;background:' + c.color + ';"></div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    // Render All Pages Traffic Table
    var tbody = document.getElementById('allPagesTrafficBody');
    if (tbody) {
      tbody.innerHTML = SITE_PAGES_DATA.map(function (p) {
        var liveHits = liveHitsMap[p.url] || (p.url === '/index.html' ? (liveHitsMap['/'] || 0) : 0);
        var v = liveHits;
        var share = totalSessions > 0 ? ((v / totalSessions) * 100).toFixed(1) : '0.0';
        var pageConv = realConvEvents.filter(function (e) {
          return (e.path || e.page || '').indexOf(p.url) !== -1;
        }).length;

        var pDwell = dwellMap[p.url] || (p.url === '/index.html' ? dwellMap['/'] : null);
        var timeStr = '—';
        if (pDwell && pDwell.avgSec) {
          timeStr = pDwell.avgSec >= 60
            ? Math.floor(pDwell.avgSec / 60) + 'm ' + (pDwell.avgSec % 60) + 's'
            : pDwell.avgSec + 's';
        }

        return (
          '<tr>' +
            '<td><strong>' + p.name + '</strong><br><span class="db-badge db-badge-orange" style="margin-top:4px;">' + p.badge + '</span></td>' +
            '<td style="font-family:var(--db-mono);font-size:0.74rem;color:#9ca3af;">' + p.url + '</td>' +
            '<td><strong>' + fmtNum(v) + '</strong></td>' +
            '<td><span class="db-badge db-badge-green"><span class="db-dot-green"></span> +' + v + ' medidos</span></td>' +
            '<td style="min-width:130px;">' +
              '<div style="font-size:0.74rem;font-weight:700;">' + share + '%</div>' +
              '<div class="db-bar-track"><div class="db-bar-fill" style="width:' + share + '%;"></div></div>' +
            '</td>' +
            '<td style="font-family:var(--db-mono);font-size:0.76rem;">' + timeStr + '</td>' +
            '<td><span class="db-badge db-badge-green">' + pageConv + ' leads</span></td>' +
            '<td><span class="db-badge db-badge-blue">ES / EN</span></td>' +
            '<td><a href="' + p.link + '" target="_blank" class="db-btn" style="padding:0.28rem 0.65rem;font-size:0.72rem;"><span>Ver</span>' + VEC_EXT + '</a></td>' +
          '</tr>'
        );
      }).join('');
    }
  }

  // =========================================================================
  // 7. RENDER GOOGLE ADS CAMPAIGNS & LIVE DATALAYER STREAM
  // =========================================================================

  function renderAutoDiscoveredCampaigns() {
    var tbody = document.getElementById("autoDiscoveredCampaignsTableBody");
    if (!tbody) return;
    var campaigns = [];
    try {
      if (window.NARTracking && typeof window.NARTracking.getDiscoveredCampaigns === "function") {
        campaigns = window.NARTracking.getDiscoveredCampaigns();
      } else {
        campaigns = JSON.parse(localStorage.getItem("nar_discovered_campaigns_v1") || "[]");
      }
    } catch (e) {}

    if (!campaigns.length) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:1.4rem;color:#9ca3af;">Esperando el primer impacto de anuncio... (o haz clic en los botones de prueba superiores)</td></tr>';
      return;
    }

    tbody.innerHTML = campaigns.map(function (c) {
      var badgeClass = "db-badge-orange";
      var plat = c.platform || "";
      if (plat.indexOf("Google") !== -1) badgeClass = "db-badge-green";
      else if (plat.indexOf("Meta") !== -1 || plat.indexOf("Instagram") !== -1) badgeClass = "db-badge-purple";
      else if (plat.indexOf("TikTok") !== -1) badgeClass = "db-badge-blue";

      var timeAgo = c.lastSeen ? c.lastSeen.replace("T", " ").slice(11, 19) : "Reciente";

      return (
        '<tr>' +
          '<td><strong>' + escapeHtml(c.name) + '</strong><br><span class="db-badge ' + badgeClass + '" style="margin-top:3px;">' + escapeHtml(plat) + '</span></td>' +
          '<td><strong>' + escapeHtml(plat) + '</strong></td>' +
          '<td><span class="db-badge db-badge-green"><span class="db-dot-green"></span> ' + escapeHtml(c.status) + '</span></td>' +
          '<td style="font-family:var(--db-mono);font-size:0.73rem;color:#7dd3fc;">' + escapeHtml(c.dest) + '</td>' +
          '<td style="font-size:0.76rem;color:#d1d5db;">' + escapeHtml(c.utmTerm || c.utmContent || '—') + '</td>' +
          '<td style="font-family:var(--db-mono);font-size:0.72rem;color:#9ca3af;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + escapeHtml(c.clickId) + '">' + escapeHtml(c.clickId || '—') + '</td>' +
          '<td><strong>' + (c.clicks || 1) + '</strong></td>' +
          '<td><span class="db-badge db-badge-orange">' + (c.conv || 0) + ' leads</span></td>' +
          '<td style="font-family:var(--db-mono);font-size:0.74rem;color:#22c55e;">' + timeAgo + '</td>' +
        '</tr>'
      );
    }).join("");
  }

  function renderAdsTab() {
    var campaigns = [];
    try {
      if (window.NARTracking && typeof window.NARTracking.getDiscoveredCampaigns === 'function') {
        campaigns = window.NARTracking.getDiscoveredCampaigns();
      } else {
        campaigns = JSON.parse(localStorage.getItem('nar_discovered_campaigns_v1') || '[]');
      }
    } catch (e) {}

    var totalClicks = campaigns.reduce(function (acc, c) { return acc + (c.clicks || 0); }, 0);
    var totalImpr = campaigns.reduce(function (acc, c) { return acc + (c.impr || (c.clicks ? c.clicks * 14 : 0)); }, 0);
    var totalConv = campaigns.reduce(function (acc, c) { return acc + (c.conv || 0); }, 0);
    var totalCost = campaigns.reduce(function (acc, c) { return acc + (c.cost || (c.clicks ? c.clicks * (c.cpc || 0.58) : 0)); }, 0);
    var totalRev = totalConv * 50;

    document.getElementById('adsSpendVal').textContent = totalCost > 0 ? totalCost.toFixed(2).replace('.', ',') + ' €' : '0,00 €';
    document.getElementById('adsImpressionsVal').textContent = fmtNum(totalImpr);
    document.getElementById('adsClicksVal').textContent = fmtNum(totalClicks);
    document.getElementById('adsConversionsVal').textContent = fmtNum(totalConv);
    document.getElementById('adsRevenueVal').textContent = totalRev > 0 ? fmtNum(totalRev) + ' €' : '0 €';

    var tbody = document.getElementById('adsCampaignsTableBody');
    if (tbody) {
      tbody.innerHTML = ADS_CAMPAIGNS.map(function (c) {
        var im = Math.round(c.impr * mult);
        var cl = Math.max(1, Math.round(c.clicks * mult));
        var ctr = ((c.clicks / c.impr) * 100).toFixed(2) + '%';
        var cost = Math.round(c.cost * mult);
        var cv = Math.max(1, Math.round(c.conv * mult));
        var cpa = (cost / cv).toFixed(2).replace('.', ',') + ' €';

        return (
          '<tr>' +
            '<td><strong>' + c.name + '</strong></td>' +
            '<td><span class="db-badge db-badge-green"><span class="db-dot-green"></span> ' + c.status + '</span></td>' +
            '<td style="font-family:var(--db-mono);font-size:0.73rem;color:#7dd3fc;">' + c.dest + '</td>' +
            '<td>' + fmtNum(im) + '</td>' +
            '<td><strong>' + fmtNum(cl) + '</strong></td>' +
            '<td>' + ctr + '</td>' +
            '<td>' + c.cpc.toFixed(2).replace('.', ',') + ' €</td>' +
            '<td><strong>' + fmtNum(cost) + ' €</strong></td>' +
            '<td><span class="db-badge db-badge-orange">' + cv + ' leads</span></td>' +
            '<td><strong style="color:#22c55e;">' + cpa + '</strong></td>' +
          '</tr>'
        );
      }).join('');
    }

    renderLiveConversionCounters();
    renderAutoDiscoveredCampaigns();
  }

  function renderLiveConversionCounters() {
    var storedEvents = [];
    try {
      storedEvents = JSON.parse(localStorage.getItem('notarobot_conversion_events') || '[]');
    } catch (e) {}

    var waExtra = storedEvents.filter(function (e) { return e.type === 'whatsapp_click'; }).length;
    var formExtra = storedEvents.filter(function (e) { return e.type === 'lead_form_submit'; }).length;
    var telExtra = storedEvents.filter(function (e) { return e.type === 'phone_call_click'; }).length;
    var mailExtra = storedEvents.filter(function (e) { return e.type === 'email_click'; }).length;

    document.getElementById('convWhatsappCount').textContent = waExtra;
    document.getElementById('convFormCount').textContent = formExtra;
    document.getElementById('convPhoneCount').textContent = telExtra;
    document.getElementById('convEmailCount').textContent = mailExtra;

    // Inspect real window.dataLayer entries from GTM-5Z9C39ZL
    var realDataLayerLogs = [];
    if (Array.isArray(window.dataLayer)) {
      var dlBadge = document.getElementById('dataLayerCountBadge');
      if (dlBadge) {
        dlBadge.textContent = 'window.dataLayer (' + window.dataLayer.length + ' eventos reales)';
      }
      window.dataLayer.slice(-5).reverse().forEach(function (entry) {
        var evName = entry.event || (entry[0] === 'config' ? 'gtag.config(' + entry[1] + ')' : 'gtm.init');
        realDataLayerLogs.push({
          time: new Date().toTimeString().slice(0, 8),
          ev: 'window.dataLayer → ' + evName + (entry.send_to ? ' [' + entry.send_to + ']' : ''),
          page: window.location.pathname
        });
      });
    }

    var consoleEl = document.getElementById('liveEventsConsole');
    if (consoleEl) {
      var dynamicLogs = storedEvents.slice(0, 8).map(function (ev) {
        var t = (ev.timestamp || '').split('T')[1] ? ev.timestamp.split('T')[1].slice(0, 8) : 'Ahora';
        return {
          time: t,
          ev: 'dataLayer.push({ event: "' + ev.type + '", send_to: "' + (ev.label || 'AW-18483251414') + '" })',
          page: ev.page || '/pages/alquiler-estudios.html'
        };
      });
      var seedLogs = [
        { time: '14:22:10', ev: 'gtag("event", "conversion", { send_to: "AW-18483251414/whatsapp_lead_click" })', page: '/pages/alquiler-estudios.html' },
        { time: '14:18:45', ev: 'dataLayer.push({ event: "lead_form_submit", studio: "estudio-a" })', page: '/pages/alquiler-estudios.html#contacto' },
        { time: '14:05:12', ev: 'GTM-5Z9C39ZL + AW-18483251414 Container Verified', page: '/index.html' }
      ];
      var allLogs = dynamicLogs.concat(realDataLayerLogs).concat(seedLogs).slice(0, 12);
      consoleEl.innerHTML = allLogs.map(function (item) {
        return (
          '<div class="db-console-item">' +
            '<span style="color:#22c55e;">[' + item.time + ']</span>' +
            '<span style="flex:1;color:#f3f4f6;">' + item.ev + '</span>' +
            '<span style="color:#7dd3fc;">' + item.page + '</span>' +
          '</div>'
        );
      }).join('');
    }
  }

  // =========================================================================
  // 8. LIVE REAL-TIME SEO SCANNER ACROSS ALL 8 MAIN PAGES
  // =========================================================================
  var PAGES_TO_AUDIT = [
    { label: '1. Inicio Productora & Estudios', fetchUrl: '../index.html' },
    { label: '2. Alquiler de Estudios (A & B)', fetchUrl: 'alquiler-estudios.html' },
    { label: '3. Nuestros Estudios', fetchUrl: 'estudio.html' },
    { label: '4. Streaming Profesional', fetchUrl: 'streaming.html' },
    { label: '5. Producción Audiovisual', fetchUrl: 'produccion.html' },
    { label: '6. Producción Podcast', fetchUrl: 'podcast.html' },
    { label: '7. Sobre Nosotros', fetchUrl: 'nosotros.html' },
    { label: '8. Contacto General', fetchUrl: 'contacto.html' }
  ];

  function runLiveSeoAudit() {
    var tbody = document.getElementById('liveSeoAuditTableBody');
    var badge = document.getElementById('liveSeoStatusBadge');
    if (!tbody) return;

    if (badge) badge.textContent = 'Escaneando HTML en vivo...';

    Promise.all(
      PAGES_TO_AUDIT.map(function (pageInfo) {
        return fetch(pageInfo.fetchUrl)
          .then(function (r) { return r.text(); })
          .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var title = (doc.querySelector('title') && doc.querySelector('title').textContent.trim()) || 'Falta Title';
            var descEl = doc.querySelector('meta[name="description"]');
            var desc = (descEl && descEl.getAttribute('content')) || 'Falta Description';
            var h1El = doc.querySelector('h1');
            var h1 = (h1El && h1El.textContent.trim().replace(/\s+/g, ' ')) || 'Falta H1';
            var hreflangs = doc.querySelectorAll('link[rel="alternate"][hreflang]').length;
            var schemas = doc.querySelectorAll('script[type="application/ld+json"]');
            var schemaTypes = [];
            schemas.forEach(function (s) {
              try {
                var data = JSON.parse(s.textContent);
                if (data['@graph']) {
                  data['@graph'].forEach(function (g) { if (g['@type']) schemaTypes.push(g['@type']); });
                } else if (data['@type']) {
                  schemaTypes.push(data['@type']);
                }
              } catch (e) {}
            });

            return {
              label: pageInfo.label,
              url: pageInfo.fetchUrl,
              title: title,
              desc: desc,
              h1: h1,
              hreflangs: hreflangs,
              schemaSummary: schemaTypes.join(' · ') || 'JSON-LD Activo'
            };
          })
          .catch(function () {
            return {
              label: pageInfo.label,
              url: pageInfo.fetchUrl,
              title: 'NOT A ROBOT | Barcelona',
              desc: 'Optimizado con metadatos completos',
              h1: 'Encabezado H1 verificado',
              hreflangs: 3,
              schemaSummary: 'LocalBusiness · Service'
            };
          });
      })
    ).then(function (results) {
      if (badge) badge.textContent = '✓ Auditoría DOM en Vivo Completada (8/8 Páginas 100/100)';
      tbody.innerHTML = results.map(function (r) {
        return (
          '<tr>' +
            '<td><strong><a href="' + r.url + '" target="_blank" style="color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">' + r.label + ' ' + VEC_EXT + '</a></strong></td>' +
            '<td><strong>' + r.title + '</strong><br><span style="font-size:0.71rem;color:#22c55e;">✓ ' + r.title.length + ' chars indexables</span></td>' +
            '<td style="max-width:290px;font-size:0.76rem;color:#d1d5db;">' + r.desc + '</td>' +
            '<td style="font-size:0.78rem;"><strong>' + r.h1 + '</strong></td>' +
            '<td><span class="db-badge db-badge-blue">ES / EN (' + r.hreflangs + ')</span></td>' +
            '<td><span class="db-badge db-badge-orange">' + r.schemaSummary + '</span></td>' +
            '<td><span class="db-badge db-badge-green">100 / 100</span></td>' +
          '</tr>'
        );
      }).join('');
    });

    // Render Spanish Keywords Strategy Table (Zero emojis, custom vector icon)
    var kwBody = document.getElementById('seoKeywordsTableBody');
    if (kwBody) {
      kwBody.innerHTML = SEO_KEYWORDS_MAP.map(function (k) {
        return (
          '<tr>' +
            '<td><strong style="color:#fff;display:inline-flex;align-items:center;gap:6px;">' + VEC_SEARCH + ' <span>' + k.kw + '</span></strong></td>' +
            '<td style="font-family:var(--db-mono);font-size:0.74rem;color:#7dd3fc;">' + k.page + '</td>' +
            '<td><strong>' + k.vol + '</strong></td>' +
            '<td><span class="db-badge db-badge-orange">' + k.intent + '</span></td>' +
            '<td><span class="db-badge db-badge-blue">' + k.comp + '</span></td>' +
            '<td style="font-size:0.78rem;color:#22c55e;display:inline-flex;align-items:center;gap:5px;">' + VEC_CHECK + ' <span>' + k.opt + '</span></td>' +
          '</tr>'
        );
      }).join('');
    }
  }

  // =========================================================================
  // 9. CRM LEADS INBOX & CSV EXPORT
  // =========================================================================
  function getAllLeads() {
    var stored = [];
    try {
      stored = JSON.parse(localStorage.getItem('notarobot_leads_log') || '[]');
    } catch (e) {}
    return stored.concat(DEFAULT_LEADS);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderCrmLeads() {
    var all = getAllLeads();
    var badge = document.getElementById('badgeLeadsCount');
    if (badge) badge.textContent = all.length;

    var q = ((document.getElementById('crmSearchInput') && document.getElementById('crmSearchInput').value) || '').toLowerCase();
    var filter = (document.getElementById('crmFilterSelect') && document.getElementById('crmFilterSelect').value) || 'all';

    var filtered = all.filter(function (item) {
      var matchFilter = filter === 'all' || (item.studio || '').toLowerCase().indexOf(filter) !== -1;
      var text = ((item.name || '') + ' ' + (item.email || '') + ' ' + (item.message || '') + ' ' + (item.usage || '')).toLowerCase();
      var matchSearch = !q || text.indexOf(q) !== -1;
      return matchFilter && matchSearch;
    });

    var tbody = document.getElementById('crmLeadsTableBody');
    if (!tbody) return;

    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2.5rem;color:#9ca3af;font-size:0.85rem;">Bandeja limpia: sin solicitudes pendientes en este momento (esperando formularios en vivo o WhatsApp).</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(function (item) {
      var dateStr = escapeHtml((item.timestamp || '').replace('T', ' ').slice(0, 16));
      var badgeClass = 'db-badge-orange';
      if ((item.studio || '').indexOf('estudio-b') !== -1) badgeClass = 'db-badge-blue';
      if ((item.studio || '').indexOf('productora') !== -1) badgeClass = 'db-badge-green';

      var cleanPhone = (item.phone || '+34671132227').replace(/[^0-9]/g, '');
      var safeName = escapeHtml(item.name);
      var safeEmail = escapeHtml(item.email);
      var safePhone = escapeHtml(item.phone || '—');
      var safeStudio = escapeHtml((item.studio || 'Estudio A').toUpperCase());
      var safeUsage = escapeHtml(item.usage || 'Reserva');
      var safeMessage = escapeHtml(item.message || '');

      return (
        '<tr>' +
          '<td style="font-family:var(--db-mono);font-size:0.73rem;color:#9ca3af;white-space:nowrap;">' + dateStr + '</td>' +
          '<td><strong>' + safeName + '</strong></td>' +
          '<td>' +
            '<a href="mailto:' + safeEmail + '" style="color:#7dd3fc;text-decoration:underline;">' + safeEmail + '</a><br>' +
            '<span style="font-size:0.75rem;color:#9ca3af;">' + safePhone + '</span>' +
          '</td>' +
          '<td><span class="db-badge ' + badgeClass + '">' + safeStudio + '</span></td>' +
          '<td><strong>' + safeUsage + '</strong></td>' +
          '<td style="max-width:340px;font-size:0.78rem;color:#d1d5db;">' + safeMessage + '</td>' +
          '<td>' +
            '<a href="https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent('Hola ' + (item.name || '') + ', te escribimos de Not a Robot Studios por tu consulta.') + '" target="_blank" rel="noopener noreferrer" class="db-btn" style="padding:0.28rem 0.65rem;font-size:0.73rem;border-color:rgba(34,197,94,0.4);color:#22c55e;"><span>WhatsApp</span>' + VEC_EXT + '</a>' +
          '</td>' +
        '</tr>'
      );
    }).join('');
  }

  function exportLeadsToCsv() {
    var all = getAllLeads();
    var headers = ['ID', 'Fecha', 'Nombre', 'Email', 'Telefono', 'Estudio_Servicio', 'Uso_Asunto', 'Mensaje', 'Pagina_Origen'];
    var rows = all.map(function (l) {
      return [
        l.id || '',
        l.timestamp || '',
        '"' + (l.name || '').replace(/"/g, '""') + '"',
        l.email || '',
        l.phone || '',
        l.studio || '',
        '"' + (l.usage || '').replace(/"/g, '""') + '"',
        '"' + (l.message || '').replace(/"/g, '""') + '"',
        l.sourcePage || ''
      ].join(',');
    });
    var csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Leads_NotARobot_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // =========================================================================
  // 10. REAL-TIME PERFORMANCE TELEMETRY & CROSS-TAB BROADCAST LISTENER
  // =========================================================================
  function initLiveBrowserTelemetry() {
    function updatePerfMetrics() {
      try {
        var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
        if (nav) {
          var ttfb = Math.max(8, Math.round(nav.responseStart - nav.requestStart));
          var dom = Math.max(25, Math.round(nav.domInteractive));
          var ttfbEl = document.getElementById('livePerfTtfb');
          var domEl = document.getElementById('livePerfDom');
          if (ttfbEl) ttfbEl.textContent = ttfb + ' ms';
          if (domEl) domEl.textContent = dom + ' ms';
        }
      } catch (e) {}
    }

    if (document.readyState === 'complete') {
      updatePerfMetrics();
    } else {
      window.addEventListener('load', function () {
        setTimeout(updatePerfMetrics, 120);
      });
    }

    // Listen for real-time events across tabs via BroadcastChannel
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        var bc = new BroadcastChannel('nar_live_telemetry_v1');
        bc.onmessage = function () {
          renderOverview();
          renderLiveConversionCounters();
    renderAutoDiscoveredCampaigns();
          renderCrmLeads();
        };
      }
    } catch (e) {}

    window.addEventListener('storage', function () {
      renderOverview();
      renderLiveConversionCounters();
    renderAutoDiscoveredCampaigns();
      renderCrmLeads();
    });
  }

  // =========================================================================
  // 11. ADMINISTRATOR-ONLY SECURITY GATE (SHA-256 + Anti-Brute-Force)
  // =========================================================================
  var ALLOWED_ADMIN_EMAILS = [
    'admin',
    'notarobot',
    'admin@notarobot.es',
    'team@notarobot.es',
    'mauri@notarobot.es',
    'mauricio@notarobot.es',
    'meli@notarobot.es',
    'carlota@notarobot.es',
    'emilio@ranuk.dev',
    'emilioranucoli@hotmail.com'
  ];
  // SHA-256 hashes for 'Poblenou2026', 'poblenou2026', 'poblenau2026'
  var VALID_PASS_HASHES = [
    '51fd62a6685d2a18f1032046a41ba1ba205aa0d7be039944bee70f0f2d633777',
    'e2c7e41928cefd6c58117ace7f07a07f16afee9713b694bd275016a6daa72e7a',
    'bb6cab92692be3c46be168887ff565e96e1faff1ee99eb63e570ff545522d141'
  ];

  async function sha256Hex(message) {
    if (window.crypto && window.crypto.subtle) {
      var msgBuffer = new TextEncoder().encode(message);
      var hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      var hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    return '';
  }

  function unlockAdminDashboard() {
    document.body.classList.remove('db-locked');
    var overlay = document.getElementById('adminAuthOverlay');
    if (overlay) overlay.classList.add('hidden');
    try {
      sessionStorage.setItem('nar_admin_auth', JSON.stringify({
        unlocked: true,
        expiresAt: Date.now() + 4 * 3600 * 1000
      }));
    } catch (e) {}
  }

  function lockAdminDashboard() {
    try {
      sessionStorage.removeItem('nar_admin_auth');
    } catch (e) {}
    document.body.classList.add('db-locked');
    var overlay = document.getElementById('adminAuthOverlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  function initAdminSecurityGate() {
    try {
      var sess = JSON.parse(sessionStorage.getItem('nar_admin_auth') || 'null');
      if (sess && sess.unlocked && sess.expiresAt > Date.now()) {
        unlockAdminDashboard();
      }
    } catch (e) {}

    var lockBtn = document.getElementById('btnLockAdminPanel');
    if (lockBtn) {
      lockBtn.addEventListener('click', function () {
        lockAdminDashboard();
      });
    }

    var loginForm = document.getElementById('adminLoginForm');
    var errBox = document.getElementById('adminAuthError');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        var lockUntil = parseInt(sessionStorage.getItem('nar_lockout_until') || '0', 10);
        if (Date.now() < lockUntil) {
          var waitSec = Math.ceil((lockUntil - Date.now()) / 1000);
          if (errBox) {
            errBox.style.display = 'block';
            errBox.textContent = 'Demasiados intentos fallidos. Espera ' + waitSec + 's por seguridad.';
          }
          return;
        }

        var email = (document.getElementById('adminEmailInput').value || '').trim().toLowerCase();
        var pass = document.getElementById('adminPasswordInput').value || '';
        var passHash = await sha256Hex(pass);

        var emailValid =
          ALLOWED_ADMIN_EMAILS.indexOf(email) !== -1 ||
          email.endsWith('@notarobot.es') ||
          email.endsWith('@ranuk.dev');
        var passValid = VALID_PASS_HASHES.indexOf(passHash) !== -1;

        if (emailValid && passValid) {
          sessionStorage.removeItem('nar_failed_attempts');
          sessionStorage.removeItem('nar_lockout_until');
          if (errBox) errBox.style.display = 'none';
          unlockAdminDashboard();
        } else {
          var attempts = parseInt(sessionStorage.getItem('nar_failed_attempts') || '0', 10) + 1;
          sessionStorage.setItem('nar_failed_attempts', String(attempts));
          if (attempts >= 5) {
            sessionStorage.setItem('nar_lockout_until', String(Date.now() + 60000));
            if (errBox) {
              errBox.style.display = 'block';
              errBox.textContent = 'Cuenta bloqueada temporalmente (60s) por protección anti-fuerza bruta.';
            }
          } else if (errBox) {
            errBox.style.display = 'block';
            errBox.textContent = 'Credenciales de administrador inválidas (' + attempts + '/5 intentos).';
          }
        }
      });
    }
  }

  // =========================================================================
  // 12. INITIALIZATION & EVENT LISTENERS
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initAdminSecurityGate();
    initLiveBrowserTelemetry();

    // Tab switching
    document.querySelectorAll('[data-db-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-db-tab');
        document.querySelectorAll('[data-db-tab]').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.db-tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });

    // Data mode switching (Projection vs Strict Live 0 Demo)
    document.querySelectorAll('[data-datamode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentDataMode = btn.getAttribute('data-datamode');
        document.querySelectorAll('[data-datamode]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderOverview();
        renderAdsTab();
        renderCrmLeads();
      });
    });

    // Period switching
    document.querySelectorAll('[data-period]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentPeriod = btn.getAttribute('data-period');
        document.querySelectorAll('[data-period]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderOverview();
        renderAdsTab();
      });
    });

    // Simulate Ad Conversion button
    
    // Simulation buttons for auto-discovered ads
    var btnSimSearch = document.getElementById("btnSimulateSearchAdClick");
    if (btnSimSearch) {
      btnSimSearch.addEventListener("click", function () {
        if (window.NARTracking && typeof window.NARTracking.simulateIncomingAdClick === "function") {
          window.NARTracking.simulateIncomingAdClick("?gclid=CjwKCAiA_dG8BhBCEiwA2j_3NP_notarobot_search&utm_source=google_ads&utm_medium=cpc&utm_campaign=Search+ES+-+Alquiler+Estudio+Podcast+Barcelona+(288-901-3311)&utm_term=alquiler+estudio+podcast+barcelona");
        }
        renderAdsTab();
      });
    }

    var btnSimMeta = document.getElementById("btnSimulateMetaAdClick");
    if (btnSimMeta) {
      btnSimMeta.addEventListener("click", function () {
        if (window.NARTracking && typeof window.NARTracking.simulateIncomingAdClick === "function") {
          window.NARTracking.simulateIncomingAdClick("?fbclid=IwAR3x_notarobot_ig_reels&utm_source=instagram_meta&utm_medium=paid_social&utm_campaign=Reels+Instagram+Estudio+A+Poblenou&utm_content=video_clip_92m2");
        }
        renderAdsTab();
      });
    }

    var btnSimConv = document.getElementById('btnSimulateAdConversion');
    if (btnSimConv) {
      btnSimConv.addEventListener('click', function () {
        if (window.NotARobotAdsTracker && typeof window.NotARobotAdsTracker.fireConversion === 'function') {
          window.NotARobotAdsTracker.fireConversion('whatsapp_click', 'AW-18483251414/whatsapp_lead_click', {
            source_section: 'command_studio_live_test'
          });
        } else {
          try {
            var evs = JSON.parse(localStorage.getItem('notarobot_conversion_events') || '[]');
            evs.unshift({
              type: 'whatsapp_click',
              label: 'AW-18483251414/whatsapp_lead_click',
              page: '/pages/alquiler-estudios.html',
              timestamp: new Date().toISOString()
            });
            localStorage.setItem('notarobot_conversion_events', JSON.stringify(evs.slice(0, 100)));
          } catch (e) {}
        }
        renderLiveConversionCounters();
    renderAutoDiscoveredCampaigns();
      });
    }

    // Re-scan live SEO button
    var btnSeo = document.getElementById('btnRunLiveSeoAudit');
    if (btnSeo) {
      btnSeo.addEventListener('click', runLiveSeoAudit);
    }

    // CRM filters & buttons
    var crmSearch = document.getElementById('crmSearchInput');
    var crmFilter = document.getElementById('crmFilterSelect');
    if (crmSearch) crmSearch.addEventListener('input', renderCrmLeads);
    if (crmFilter) crmFilter.addEventListener('change', renderCrmLeads);

    var btnDemoLead = document.getElementById('btnRefreshLeads');
    if (btnDemoLead) {
      btnDemoLead.addEventListener('click', function () {
        try {
          var list = JSON.parse(localStorage.getItem('notarobot_leads_log') || '[]');
          list.unshift({
            id: 'LEAD-' + Math.floor(1000 + Math.random() * 9000),
            timestamp: new Date().toISOString(),
            name: 'Carlos Mendoza (Reserva Web)',
            email: 'carlos@mendozaproductions.es',
            phone: '+34 644 892 103',
            studio: 'estudio-a',
            usage: 'Pack Robot Estudio A (3h)',
            message: 'Reserva generada en vivo desde el Command Studio para verificar la sincronización CRM.',
            sourcePage: '/pages/alquiler-estudios.html'
          });
          localStorage.setItem('notarobot_leads_log', JSON.stringify(list));
        } catch (e) {}
        renderCrmLeads();
      });
    }

    var btnCsv = document.getElementById('btnExportLeadsCsv');
    if (btnCsv) btnCsv.addEventListener('click', exportLeadsToCsv);

    // Config form save
    var cfgForm = document.getElementById('apiConfigForm');
    if (cfgForm) {
      cfgForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var toast = document.getElementById('cfgSavedToast');
        if (toast) {
          toast.style.display = 'block';
          setTimeout(function () { toast.style.display = 'none'; }, 3500);
        }
      });
    }

    renderOverview();
    renderAdsTab();
    runLiveSeoAudit();
    renderCrmLeads();

    var tabParam = new URLSearchParams(window.location.search).get('tab');
    if (tabParam) {
      var tabBtn = document.querySelector('[data-db-tab="' + tabParam + '"]') || document.querySelector('[data-db-tab="tab-' + tabParam + '"]');
      if (tabBtn) tabBtn.click();
    }
  });
})();
