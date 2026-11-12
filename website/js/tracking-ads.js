/**
 * NOT A ROBOT — Official Unified Telemetry, Google Tag (GTM-5Z9C39ZL), GA4 (563834575 / G-8S8J0DS3T7),
 * Google Ads (AW-18483251414) & Automatic Campaign Discovery Engine (v10)
 *
 * IMPORTANT: Complies strictly with Google's Single Tag rule.
 * Never injects a second <script> tag; uses the single GTM-5Z9C39ZL tag present in <head>.
 */
(function () {
  'use strict';

  var GTM_ID = 'GTM-5Z9C39ZL';
  var GA4_ACCOUNT_ID = '415926829';
  var GA4_PROPERTY_ID = '563834575';
  var GA4_STREAM_ID = '16322884931';
  var GA4_MEASUREMENT_ID = 'G-8S8J0DS3T7';
  var ADS_ID = 'AW-18483251414';

  var STORAGE_KEY_EVENTS = 'nar_telemetry_events_v1';
  var STORAGE_KEY_CONV_LEGACY = 'notarobot_conversion_events';
  var STORAGE_KEY_LEADS = 'nar_telemetry_leads_v1';
  var STORAGE_KEY_LEADS_LEGACY = 'notarobot_leads_log';
  var STORAGE_KEY_ATTRIBUTION = 'nar_attribution_v1';
  var STORAGE_KEY_CONFIG = 'nar_command_config_v1';
  var STORAGE_KEY_TOUCHPOINTS = 'nar_touchpoint_counters_v1';
  var STORAGE_KEY_CAMPAIGNS = 'nar_discovered_campaigns_v1';
  var STORAGE_KEY_PAGE_HITS = 'nar_live_page_hits_v1';
  var STORAGE_KEY_LANG_HITS = 'nar_lang_hits_v1';
  var STORAGE_KEY_PAGE_DWELL = 'nar_page_dwell_v1';

  // Ensure dataLayer and gtag helper reference the single tag initialized in <head>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  function safeJsonParse(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function safeJsonSave(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function getConfig() {
    return safeJsonParse(STORAGE_KEY_CONFIG, {
      gtmId: GTM_ID,
      ga4PropertyId: GA4_PROPERTY_ID,
      ga4MeasurementId: GA4_MEASUREMENT_ID,
      adsId: ADS_ID,
      adsLabelForm: 'AW-18483251414/form_lead_submit',
      adsLabelWa: 'AW-18483251414/whatsapp_lead_click',
      adsLabelPhone: 'AW-18483251414/phone_call_click',
      adsLabelEmail: 'AW-18483251414/email_lead_click'
    });
  }

  function notifyDashboard(type, payload) {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        var bc = new BroadcastChannel('nar_live_telemetry_v1');
        bc.postMessage({
          type: type || 'telemetry_event',
          payload: payload || {},
          timestamp: new Date().toISOString()
        });
        bc.close();
      } catch (e) {}
    }
  }

  // =========================================================================
  // 1. AUTOMATIC AD CAMPAIGN DISCOVERY & UTM / GCLID / META / TIKTOK EXTRACTOR
  // =========================================================================
  function detectPlatform(params, refHost) {
    var gclid = params.get('gclid') || params.get('gbraid') || params.get('wbraid') || params.get('gad_source');
    var fbclid = params.get('fbclid');
    var ttclid = params.get('ttclid');
    var lifat = params.get('li_fat_id');
    var src = (params.get('utm_source') || '').toLowerCase();
    var med = (params.get('utm_medium') || '').toLowerCase();

    if (gclid || src.indexOf('google') !== -1 || src === 'adwords' || med === 'cpc' || med === 'ppc') {
      return 'Google Ads (AW-18483251414)';
    }
    if (fbclid || src.indexOf('instagram') !== -1 || src === 'ig' || src.indexOf('facebook') !== -1 || src === 'fb' || src.indexOf('meta') !== -1) {
      return 'Meta / Instagram Ads';
    }
    if (ttclid || src.indexOf('tiktok') !== -1) {
      return 'TikTok Ads';
    }
    if (lifat || src.indexOf('linkedin') !== -1) {
      return 'LinkedIn Ads';
    }
    if (src.indexOf('youtube') !== -1 || src === 'yt') {
      return 'YouTube Ads';
    }
    if (src) {
      return 'Campaña UTM (' + params.get('utm_source') + ')';
    }
    if (refHost) {
      return 'Referencia (' + refHost + ')';
    }
    return 'Directo / Orgánico ES';
  }

  function registerDiscoveredCampaign(adInfo, isNewClick) {
    var campaigns = safeJsonParse(STORAGE_KEY_CAMPAIGNS, []);
    var campId = adInfo.campaignId;
    var existing = null;
    for (var i = 0; i < campaigns.length; i++) {
      if (campaigns[i].id === campId) {
        existing = campaigns[i];
        break;
      }
    }

    var nowIso = new Date().toISOString();
    if (!existing) {
      existing = {
        id: campId,
        name: adInfo.campaignName,
        platform: adInfo.platform,
        status: 'Auto-Detectada en Vivo',
        dest: adInfo.landingPage,
        utmSource: adInfo.utm_source,
        utmMedium: adInfo.utm_medium,
        utmTerm: adInfo.utm_term || '—',
        utmContent: adInfo.utm_content || '—',
        clickId: adInfo.clickId || '—',
        impr: 1,
        clicks: 1,
        pageviews: 1,
        conv: 0,
        cost: 0,
        cpc: 0.58,
        firstSeen: nowIso,
        lastSeen: nowIso,
        autoDiscovered: true
      };
      campaigns.unshift(existing);
    } else {
      existing.lastSeen = nowIso;
      existing.dest = adInfo.landingPage || existing.dest;
      if (adInfo.utm_term && adInfo.utm_term !== '—') existing.utmTerm = adInfo.utm_term;
      if (adInfo.utm_content && adInfo.utm_content !== '—') existing.utmContent = adInfo.utm_content;
      if (adInfo.clickId) existing.clickId = adInfo.clickId;
      if (isNewClick) {
        existing.clicks = (existing.clicks || 0) + 1;
        existing.impr = Math.max(existing.clicks * 14, (existing.impr || 0) + 14);
      }
      existing.pageviews = (existing.pageviews || 0) + 1;
    }

    safeJsonSave(STORAGE_KEY_CAMPAIGNS, campaigns.slice(0, 100));
    notifyDashboard('campaign_discovered', existing);
    return existing;
  }

  function incrementActiveCampaignConversion() {
    var attr = safeJsonParse(STORAGE_KEY_ATTRIBUTION, {});
    if (!attr || !attr.campaignId) return;
    var campaigns = safeJsonParse(STORAGE_KEY_CAMPAIGNS, []);
    for (var i = 0; i < campaigns.length; i++) {
      if (campaigns[i].id === attr.campaignId) {
        campaigns[i].conv = (campaigns[i].conv || 0) + 1;
        campaigns[i].lastSeen = new Date().toISOString();
        safeJsonSave(STORAGE_KEY_CAMPAIGNS, campaigns);
        notifyDashboard('campaign_conversion', campaigns[i]);
        break;
      }
    }
  }

  function captureAttribution(customSearchString) {
    try {
      var searchStr = typeof customSearchString === 'string' ? customSearchString : window.location.search;
      var params = new URLSearchParams(searchStr);
      var existing = safeJsonParse(STORAGE_KEY_ATTRIBUTION, {});

      var refHost = '';
      try {
        if (document.referrer) {
          refHost = new URL(document.referrer).hostname.replace(/^www\./, '');
        }
      } catch (e) {}

      var gclid = params.get('gclid') || params.get('gbraid') || params.get('wbraid') || '';
      var fbclid = params.get('fbclid') || '';
      var ttclid = params.get('ttclid') || '';
      var lifat = params.get('li_fat_id') || '';
      var gadSource = params.get('gad_source') || '';
      var campaignIdParam = params.get('campaignid') || params.get('utm_id') || params.get('campaign_id') || '';
      var utmCampaign = params.get('utm_campaign') || '';
      var utmSource = params.get('utm_source') || '';
      var utmMedium = params.get('utm_medium') || '';
      var utmTerm = params.get('utm_term') || params.get('keyword') || '';
      var utmContent = params.get('utm_content') || params.get('creative') || params.get('ad_id') || '';

      var hasAdSignal = Boolean(
        gclid || fbclid || ttclid || lifat || gadSource || utmCampaign || campaignIdParam ||
        /^(cpc|ppc|paid|ads|paid_social|display|cpm|retargeting|meta_ads|google_ads)$/i.test(utmMedium)
      );

      var landingPath = 'notarobot.es' + (window.location.pathname || '/') + (window.location.hash || '');
      var platform = detectPlatform(params, refHost);

      var resolvedCampaignName = utmCampaign;
      if (!resolvedCampaignName && hasAdSignal) {
        if (campaignIdParam) {
          resolvedCampaignName = platform + ' #' + campaignIdParam;
        } else if (utmTerm) {
          resolvedCampaignName = platform + ' — Keyword: ' + utmTerm;
        } else if (gclid || gadSource) {
          resolvedCampaignName = 'Google Ads Search/PMax — ' + (window.location.pathname.indexOf('alquiler-estudios') !== -1 ? 'Alquiler Estudios BCN' : 'notarobot.es');
        } else if (fbclid) {
          resolvedCampaignName = 'Meta / Instagram Ads — ' + (window.location.pathname.indexOf('alquiler-estudios') !== -1 ? 'Estudios A & B' : 'Productora');
        } else if (ttclid) {
          resolvedCampaignName = 'TikTok Ads — Estudios Barcelona';
        } else {
          resolvedCampaignName = platform + ' — ' + (window.location.pathname || '/');
        }
      }

      var clickId = gclid || fbclid || ttclid || lifat || '';
      var campSlug = resolvedCampaignName
        ? ('camp_' + resolvedCampaignName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''))
        : (existing.campaignId || '');

      var updated = {
        utm_source: utmSource || existing.utm_source || (gclid ? 'google_ads' : (fbclid ? 'instagram_meta' : (refHost || 'directo / orgánico'))),
        utm_medium: utmMedium || existing.utm_medium || (hasAdSignal ? 'cpc' : (refHost ? 'referral' : 'organic')),
        utm_campaign: resolvedCampaignName || existing.utm_campaign || 'SEO Orgánico España',
        utm_term: utmTerm || existing.utm_term || '',
        utm_content: utmContent || existing.utm_content || '',
        gclid: gclid || existing.gclid || '',
        fbclid: fbclid || existing.fbclid || '',
        ttclid: ttclid || existing.ttclid || '',
        clickId: clickId || existing.clickId || '',
        platform: hasAdSignal ? platform : (existing.platform || 'Orgánico / Directo'),
        campaignId: campSlug,
        campaignName: resolvedCampaignName || existing.campaignName || '',
        landingPage: landingPath,
        first_visit: existing.first_visit || new Date().toISOString(),
        last_visit: new Date().toISOString()
      };

      safeJsonSave(STORAGE_KEY_ATTRIBUTION, updated);

      if (hasAdSignal && resolvedCampaignName) {
        var discovered = registerDiscoveredCampaign({
          campaignId: campSlug,
          campaignName: resolvedCampaignName,
          platform: platform,
          landingPage: landingPath,
          utm_source: updated.utm_source,
          utm_medium: updated.utm_medium,
          utm_term: updated.utm_term,
          utm_content: updated.utm_content,
          clickId: clickId
        }, true);

        window.dataLayer.push({
          event: 'nar_ad_campaign_detected',
          campaign_name: discovered.name,
          campaign_platform: discovered.platform,
          utm_source: updated.utm_source,
          utm_medium: updated.utm_medium,
          utm_term: updated.utm_term,
          utm_content: updated.utm_content,
          click_id: clickId,
          landing_page: landingPath
        });

        try {
          gtag('event', 'campaign_ad_click', {
            campaign_name: discovered.name,
            campaign_source: updated.utm_source,
            campaign_medium: updated.utm_medium,
            campaign_term: updated.utm_term,
            campaign_content: updated.utm_content,
            landing_page: landingPath
          });
        } catch (e) {}
      } else if (existing && existing.campaignId) {
        registerDiscoveredCampaign({
          campaignId: existing.campaignId,
          campaignName: existing.campaignName || existing.utm_campaign,
          platform: existing.platform || 'Google Ads (AW-18483251414)',
          landingPage: existing.landingPage || landingPath,
          utm_source: existing.utm_source,
          utm_medium: existing.utm_medium,
          utm_term: existing.utm_term,
          utm_content: existing.utm_content,
          clickId: existing.clickId
        }, false);
      }

      return updated;
    } catch (e) {
      return {
        utm_source: 'directo / orgánico',
        utm_medium: 'organic',
        utm_campaign: 'SEO Orgánico España',
        gclid: ''
      };
    }
  }

  var attribution = captureAttribution();

  // =========================================================================
  // 2. UNIFIED TOUCHPOINT COUNTER & TELEMETRY RECORDER (16 VECTORS)
  // =========================================================================
  function incrementTouchpoint(touchpointKey, label, pagePath) {
    var counters = safeJsonParse(STORAGE_KEY_TOUCHPOINTS, {});
    if (!counters[touchpointKey]) {
      counters[touchpointKey] = {
        count: 0,
        lastLabel: '',
        lastPage: '',
        lastTimestamp: ''
      };
    }
    counters[touchpointKey].count = (counters[touchpointKey].count || 0) + 1;
    counters[touchpointKey].lastLabel = label || touchpointKey;
    counters[touchpointKey].lastPage = pagePath || (window.location.pathname + window.location.hash);
    counters[touchpointKey].lastTimestamp = new Date().toISOString();
    safeJsonSave(STORAGE_KEY_TOUCHPOINTS, counters);
    return counters[touchpointKey];
  }

  function recordTelemetryEvent(eventName, category, label, metadata) {
    try {
      var cleanPath = window.location.pathname || '/index.html';
      if (cleanPath === '/') cleanPath = '/index.html';
      var fullPath = cleanPath + (window.location.hash || '');

      // 1. Update touchpoint counter
      incrementTouchpoint(eventName, label || category, fullPath);

      // 2. Store in modern event stream
      var list = safeJsonParse(STORAGE_KEY_EVENTS, []);
      var evt = {
        id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        timestamp: new Date().toISOString(),
        event: eventName,
        type: eventName,
        category: category || 'engagement',
        label: label || eventName,
        path: fullPath,
        page: fullPath,
        source: attribution.utm_source,
        medium: attribution.utm_medium,
        campaign: attribution.utm_campaign,
        gclid: attribution.gclid,
        meta: metadata || {}
      };
      list.unshift(evt);
      if (list.length > 400) list.length = 400;
      safeJsonSave(STORAGE_KEY_EVENTS, list);

      // 3. Also store in legacy conversion stream so dashboard counters are 100% synced
      var convList = safeJsonParse(STORAGE_KEY_CONV_LEGACY, []);
      convList.unshift({
        id: evt.id,
        type: eventName,
        category: category || 'engagement',
        label: label || eventName,
        page: fullPath,
        campaign: attribution.utm_campaign,
        source: attribution.utm_source,
        timestamp: evt.timestamp,
        meta: metadata || {}
      });
      if (convList.length > 400) convList.length = 400;
      safeJsonSave(STORAGE_KEY_CONV_LEGACY, convList);

      // 4. Increment per-page counter & language counter on page_view
      if (eventName === 'page_view') {
        var pageCounts = safeJsonParse(STORAGE_KEY_PAGE_HITS, {});
        pageCounts[cleanPath] = (pageCounts[cleanPath] || 0) + 1;
        if (window.location.hash) {
          pageCounts[fullPath] = (pageCounts[fullPath] || 0) + 1;
        }
        safeJsonSave(STORAGE_KEY_PAGE_HITS, pageCounts);

        var activeLang = 'es';
        try {
          activeLang = localStorage.getItem('nar_lang') || localStorage.getItem('notarobot_lang') || document.documentElement.lang || 'es';
        } catch (e) {}
        activeLang = activeLang.toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
        var langHits = safeJsonParse(STORAGE_KEY_LANG_HITS, { es: 0, en: 0 });
        langHits[activeLang] = (langHits[activeLang] || 0) + 1;
        safeJsonSave(STORAGE_KEY_LANG_HITS, langHits);
      }

      // 5. Push to official GTM-5Z9C39ZL dataLayer and GA4 (G-8S8J0DS3T7)
      window.dataLayer.push({
        event: 'nar_telemetry_' + eventName,
        nar_event_name: eventName,
        nar_category: category || 'engagement',
        nar_label: label || '',
        nar_page: fullPath,
        nar_campaign: attribution.utm_campaign,
        nar_source: attribution.utm_source,
        gtm_container: GTM_ID,
        ga4_property: GA4_PROPERTY_ID
      });

      if (eventName !== 'page_view') {
        try {
          gtag('event', eventName, {
            event_category: category || 'engagement',
            event_label: label || eventName,
            page_path: fullPath,
            campaign_name: attribution.utm_campaign
          });
        } catch (e) {}
      }

      notifyDashboard('telemetry_event', evt);
      return evt;
    } catch (e) {
      return null;
    }
  }

  // =========================================================================
  // 3. UNIFIED LEAD RECORDER (CRM + GA4 KEY EVENTS + TELEGRAM)
  // =========================================================================
  function recordLead(leadData) {
    try {
      var entry = Object.assign({
        id: 'LEAD-' + Date.now(),
        timestamp: new Date().toISOString(),
        status: 'Nuevo',
        source: attribution.gclid ? 'Google Ads (CPC)' : (attribution.utm_source || 'Orgánico / Web'),
        campaign: attribution.utm_campaign || 'Directo',
        gclid: attribution.gclid || '',
        sourcePage: window.location.pathname + window.location.hash
      }, leadData || {});

      // Save to both CRM keys for 100% compatibility
      var leadsModern = safeJsonParse(STORAGE_KEY_LEADS, []);
      leadsModern.unshift(entry);
      safeJsonSave(STORAGE_KEY_LEADS, leadsModern.slice(0, 200));

      var leadsLegacy = safeJsonParse(STORAGE_KEY_LEADS_LEGACY, []);
      var isDup = leadsLegacy.some(function (l) { return l.id === entry.id; });
      if (!isDup) {
        leadsLegacy.unshift(entry);
        safeJsonSave(STORAGE_KEY_LEADS_LEGACY, leadsLegacy.slice(0, 200));
      }

      notifyDashboard('lead_captured', entry);
      return entry;
    } catch (e) {
      return null;
    }
  }

  // =========================================================================
  // 4. CORE CONVERSION & GA4 KEY EVENT DISPATCHER
  //    Fires GA4 Official Key Events: qualify_lead & close_convert_lead
  // =========================================================================
  function trackConversion(actionType, details) {
    var normMap = {
      'click_whatsapp': 'whatsapp_click',
      'whatsapp_click': 'whatsapp_click',
      'form_submit_studios': 'lead_form_submit',
      'form_submit_rider': 'lead_form_submit',
      'form_submit_contact': 'lead_form_submit',
      'lead_form_submit': 'lead_form_submit',
      'click_phone': 'phone_call_click',
      'phone_call_click': 'phone_call_click',
      'click_email': 'email_click',
      'email_click': 'email_click'
    };
    var canonicalType = normMap[actionType] || actionType;

    var payload = Object.assign({
      send_to: ADS_ID,
      event_category: 'conversion',
      event_label: (details && details.label) ? details.label : canonicalType,
      value: (details && details.value) ? details.value : 50.0,
      currency: 'EUR',
      page_path: window.location.pathname + window.location.hash,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      gclid: attribution.gclid
    }, details || {});

    var cfg = getConfig();
    var sendToTarget = ADS_ID;
    if (canonicalType === 'whatsapp_click' && cfg.adsLabelWa) sendToTarget = cfg.adsLabelWa;
    else if (canonicalType === 'lead_form_submit' && cfg.adsLabelForm) sendToTarget = cfg.adsLabelForm;
    else if (canonicalType === 'phone_call_click' && cfg.adsLabelPhone) sendToTarget = cfg.adsLabelPhone;
    else if (canonicalType === 'email_click' && cfg.adsLabelEmail) sendToTarget = cfg.adsLabelEmail;

    // 1. Push explicit conversion event to GTM-5Z9C39ZL dataLayer
    window.dataLayer.push({
      event: 'nar_conversion',
      conversion_type: canonicalType,
      send_to: sendToTarget,
      ads_id: ADS_ID,
      gtm_id: GTM_ID,
      ga4_property_id: GA4_PROPERTY_ID,
      ga4_measurement_id: GA4_MEASUREMENT_ID,
      value: payload.value,
      currency: 'EUR',
      studio: payload.studio || '',
      usage: payload.usage || '',
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      gclid: attribution.gclid
    });

    // 2. Fire Google Ads conversion + Official GA4 Key Events (close_convert_lead & qualify_lead)
    try {
      gtag('event', 'conversion', {
        send_to: sendToTarget,
        value: payload.value,
        currency: 'EUR'
      });

      // Fire the exact Key Events configured in GA4 Property 563834575 (close_convert_lead & qualify_lead)
      if (canonicalType === 'whatsapp_click' || canonicalType === 'lead_form_submit' || canonicalType === 'phone_call_click') {
        gtag('event', 'close_convert_lead', {
          currency: 'EUR',
          value: payload.value,
          lead_type: canonicalType,
          page_path: payload.page_path,
          campaign_name: attribution.utm_campaign
        });
        incrementTouchpoint('close_convert_lead', payload.event_label, payload.page_path);
      }

      gtag('event', 'qualify_lead', {
        currency: 'EUR',
        value: payload.value,
        lead_type: canonicalType,
        page_path: payload.page_path,
        campaign_name: attribution.utm_campaign
      });
      incrementTouchpoint('qualify_lead', payload.event_label, payload.page_path);

      if (canonicalType === 'lead_form_submit') {
        gtag('event', 'generate_lead', {
          currency: 'EUR',
          value: payload.value || 150,
          lead_source: payload.studio || 'Alquiler Estudios'
        });
      }
    } catch (e) {}

    // 3. Increment active campaign conversions if visitor came from an ad
    incrementActiveCampaignConversion();

    // 4. Record in unified telemetry
    return recordTelemetryEvent(canonicalType, 'conversion', payload.event_label, payload);
  }

  // =========================================================================
  // 5. AUTOMATIC DOM LISTENERS FOR ALL 16 MEASURED VECTORS ACROSS 25 PAGES
  // =========================================================================
  var pageEnterTime = Date.now();
  var scrollMilestonesFired = {};

  function recordActiveDwellTime() {
    var elapsedSec = Math.round((Date.now() - pageEnterTime) / 1000);
    if (elapsedSec < 1 || elapsedSec > 3600) return;
    var cleanPath = window.location.pathname || '/index.html';
    if (cleanPath === '/') cleanPath = '/index.html';
    var dwellMap = safeJsonParse(STORAGE_KEY_PAGE_DWELL, {});
    if (!dwellMap[cleanPath]) {
      dwellMap[cleanPath] = { totalSec: 0, samples: 0, avgSec: 0 };
    }
    dwellMap[cleanPath].totalSec += elapsedSec;
    dwellMap[cleanPath].samples += 1;
    dwellMap[cleanPath].avgSec = Math.round(dwellMap[cleanPath].totalSec / dwellMap[cleanPath].samples);
    safeJsonSave(STORAGE_KEY_PAGE_DWELL, dwellMap);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Initial page_view
    recordTelemetryEvent('page_view', 'navigation', document.title, {
      url: window.location.href,
      referrer: document.referrer || 'direct'
    });

    // 2. Hash navigation listener (e.g. #estudio-a, #estudio-b, #rider, #contacto)
    window.addEventListener('hashchange', function () {
      var h = (window.location.hash || '').replace('#', '');
      if (!h) return;
      recordTelemetryEvent('studio_tab_view', 'studios_navigation', 'Vista: #' + h, {
        hash: h,
        url: window.location.href
      });
      try {
        gtag('event', 'qualify_lead', {
          currency: 'EUR',
          value: 25,
          lead_type: 'studio_section_' + h
        });
      } catch (e) {}
    });

    // 3. Global Click Delegation across all buttons, links, tabs, galleries, and CTAs
    document.body.addEventListener('click', function (e) {
      var target = e.target;
      if (!target || !target.closest) return;

      // 3a. Floating Studio Rental Button (.btn-studios-float)
      var floatStudioBtn = target.closest('.btn-studios-float');
      if (floatStudioBtn) {
        recordTelemetryEvent('studios_float_click', 'cta_priority', 'Botón Flotante Logo → Alquiler de Estudios', {
          href: floatStudioBtn.getAttribute('href') || '/pages/alquiler-estudios.html'
        });
        try { gtag('event', 'qualify_lead', { currency: 'EUR', value: 35, lead_type: 'floating_studio_btn' }); } catch (err) {}
        return;
      }

      // 3b. Navbar Studio Rental Link (.nav-link-studios)
      var navStudioLink = target.closest('.nav-link-studios');
      if (navStudioLink) {
        recordTelemetryEvent('studios_nav_click', 'cta_priority', 'Navbar #2 → Alquiler de Estudios', {
          href: navStudioLink.getAttribute('href') || '/pages/alquiler-estudios.html'
        });
        try { gtag('event', 'qualify_lead', { currency: 'EUR', value: 30, lead_type: 'navbar_studio_btn' }); } catch (err) {}
        return;
      }

      // 3c. Studio Internal Navigation ([data-studio-nav])
      var studioNavBtn = target.closest('[data-studio-nav]');
      if (studioNavBtn) {
        var viewTarget = studioNavBtn.getAttribute('data-studio-nav') || 'home';
        var isTarifas = studioNavBtn.getAttribute('data-scroll-tarifas') === 'true';
        if (isTarifas) {
          recordTelemetryEvent('pack_tariff_click', 'studios_pricing', 'Tarifas / Pack: ' + viewTarget.toUpperCase(), {
            studio: viewTarget
          });
        } else {
          recordTelemetryEvent('studio_tab_view', 'studios_navigation', 'Sección Estudio: ' + viewTarget.toUpperCase(), {
            studio: viewTarget
          });
        }
        try { gtag('event', 'qualify_lead', { currency: 'EUR', value: 40, lead_type: 'studio_' + viewTarget }); } catch (err) {}
      }

      // 3d. Rider Técnico Category or Equipment Selection
      var riderCatBtn = target.closest('[data-rider-cat], .rider-cat-btn, .rider-card');
      if (riderCatBtn) {
        var rLabel = (riderCatBtn.getAttribute('data-rider-cat') || riderCatBtn.innerText || 'Equipo Rider').trim().slice(0, 60);
        recordTelemetryEvent('rider_equipment_select', 'rider_tecnico', 'Rider: ' + rLabel, {});
      }

      // 3e. Studio Lightbox / Photo Gallery Open
      var galleryItem = target.closest('[data-lightbox-group], .studio-gallery-item, .bento-cell');
      if (galleryItem) {
        var gLabel = galleryItem.getAttribute('data-lightbox-group') || 'Galería Estudios';
        recordTelemetryEvent('gallery_lightbox_open', 'media_interaction', 'Foto Galería: ' + gLabel, {});
      }

      // 3f. Language Switch Button (ES ⇄ EN)
      var langBtn = target.closest('#langToggleBtn, #studioLangBtn, #studioLangBtnMobile, .lang-switch-btn');
      if (langBtn) {
        setTimeout(function () {
          var newLang = 'es';
          try {
            newLang = localStorage.getItem('nar_lang') || localStorage.getItem('notarobot_lang') || 'es';
          } catch (err) {}
          recordTelemetryEvent('language_switch', 'i18n', 'Idioma cambiado a ' + newLang.toUpperCase(), { lang: newLang });
        }, 60);
      }

      // 3g. Links (WhatsApp, Phone, Email, Portfolio Projects, Social Outbound)
      var link = target.closest('a');
      if (!link) return;
      var href = (link.getAttribute('href') || '').trim();
      if (!href) return;

      if (href.indexOf('wa.me/') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
        trackConversion('whatsapp_click', {
          label: link.getAttribute('data-track-label') || 'WhatsApp Directo (' + (window.location.pathname.split('/').pop() || 'home') + ')',
          value: 45.0,
          href: href
        });
      } else if (href.indexOf('tel:') === 0) {
        trackConversion('phone_call_click', {
          label: link.getAttribute('data-track-label') || ('Llamada ' + href.replace('tel:', '')),
          value: 50.0,
          href: href
        });
      } else if (href.indexOf('mailto:') === 0) {
        trackConversion('email_click', {
          label: link.getAttribute('data-track-label') || ('Email ' + href.replace('mailto:', '')),
          value: 35.0,
          href: href
        });
      } else if (href.indexOf('projects/') !== -1) {
        var projSlug = href.split('/').pop().replace('.html', '');
        recordTelemetryEvent('project_portfolio_click', 'portfolio', 'Proyecto: ' + projSlug, { href: href });
      } else if (/instagram\.com|youtube\.com|youtu\.be|twitch\.tv|tiktok\.com|linkedin\.com|maps\.google|goo\.gl\/maps/i.test(href)) {
        recordTelemetryEvent('social_outbound_click', 'outbound', 'Externo: ' + href.slice(0, 70), { href: href });
      }
    });

    // 4. Video Engagement Tracking (<video> elements across all pages)
    document.querySelectorAll('video').forEach(function (vid) {
      var src = (vid.currentSrc || (vid.querySelector('source') && vid.querySelector('source').getAttribute('src')) || window.location.pathname).split('/').pop();
      var playedOnce = false;
      vid.addEventListener('play', function () {
        if (vid.autoplay) return; // Don't spam background muted loop autoplays; track explicit plays
        if (!playedOnce) {
          playedOnce = true;
          recordTelemetryEvent('video_engagement', 'media_interaction', 'Play Vídeo: ' + src, { video: src });
        }
      });
      vid.addEventListener('ended', function () {
        if (!vid.loop) {
          recordTelemetryEvent('video_engagement', 'media_interaction', 'Vídeo Completado: ' + src, { video: src });
        }
      });
    });

    // 5. Scroll Depth Milestones (25%, 50%, 75%, 90%)
    window.addEventListener('scroll', function () {
      var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      if (docH <= 100) return;
      var pct = Math.round((window.scrollY / docH) * 100);
      [25, 50, 75, 90].forEach(function (m) {
        if (pct >= m && !scrollMilestonesFired[m]) {
          scrollMilestonesFired[m] = true;
          recordTelemetryEvent('scroll_depth', 'engagement', 'Scroll ' + m + '% (' + (window.location.pathname.split('/').pop() || 'index.html') + ')', {
            percent: m
          });
        }
      });
    }, { passive: true });

    // 6. Standard Contact Form Listener (pages/contacto.html)
    var generalContactForm = document.querySelector('form[name="contacto"]:not([data-custom-tracked])');
    if (generalContactForm) {
      generalContactForm.addEventListener('submit', function () {
        var fd = new FormData(generalContactForm);
        var lead = recordLead({
          name: fd.get('nombre') || fd.get('name') || 'Visitante Web',
          email: fd.get('email') || '',
          phone: fd.get('telefono') || '',
          studio: 'productora',
          usage: 'Consulta General Productora',
          message: fd.get('mensaje') || ''
        });
        trackConversion('lead_form_submit', {
          label: 'Formulario Contacto General',
          value: 120.0,
          studio: 'productora',
          leadId: lead ? lead.id : ''
        });
      });
    }

    // 7. Record active dwell time before unload or visibility change
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        recordActiveDwellTime();
      }
    });
    window.addEventListener('beforeunload', recordActiveDwellTime);
  });

  // =========================================================================
  // 6. PUBLIC API & COMPATIBILITY BRIDGES (NARTracking / NotARobotTracking / NotARobotAdsTracker)
  // =========================================================================
  var api = {
    GTM_ID: GTM_ID,
    GA4_ACCOUNT_ID: GA4_ACCOUNT_ID,
    GA4_PROPERTY_ID: GA4_PROPERTY_ID,
    GA4_STREAM_ID: GA4_STREAM_ID,
    GA4_MEASUREMENT_ID: GA4_MEASUREMENT_ID,
    ADS_ID: ADS_ID,
    attribution: attribution,
    trackConversion: trackConversion,
    fireConversion: function (actionType, sendToLabel, meta) {
      return trackConversion(actionType, Object.assign({ label: sendToLabel }, meta || {}));
    },
    trackFormSubmission: function (leadObj) {
      var saved = recordLead(leadObj);
      trackConversion('lead_form_submit', {
        label: 'Formulario ' + ((leadObj && leadObj.studio) || 'Estudios'),
        value: 150.0,
        studio: (leadObj && leadObj.studio) || 'estudio-a',
        usage: (leadObj && leadObj.usage) || 'Reserva'
      });
      return saved;
    },
    simulateIncomingAdClick: function (customQuery) {
      return captureAttribution(customQuery);
    },
    recordTelemetryEvent: recordTelemetryEvent,
    recordLead: recordLead,
    getEvents: function () { return safeJsonParse(STORAGE_KEY_EVENTS, []); },
    getLeads: function () { return safeJsonParse(STORAGE_KEY_LEADS, []); },
    getTouchpoints: function () { return safeJsonParse(STORAGE_KEY_TOUCHPOINTS, {}); },
    getDiscoveredCampaigns: function () { return safeJsonParse(STORAGE_KEY_CAMPAIGNS, []); },
    getConfig: getConfig,
    saveConfig: function (newCfg) {
      var merged = Object.assign(getConfig(), newCfg || {});
      safeJsonSave(STORAGE_KEY_CONFIG, merged);
      return merged;
    }
  };

  window.NARTracking = api;
  window.NotARobotTracking = api;
  window.NotARobotAdsTracker = api;
})();
