/**
 * NOT A ROBOT — Unified Google Ads (AW-18483251414), GTM (GTM-KWW2HKVV), GA4 & Telemetry Engine
 * Engineered by Ranuk IT Solutions (https://ranuk.dev)
 */
(function () {
  'use strict';

  const ADS_ID = 'AW-18483251414';
  const GTM_ID = 'GTM-KWW2HKVV';
  const STORAGE_KEY_EVENTS = 'nar_telemetry_events_v1';
  const STORAGE_KEY_LEADS = 'nar_telemetry_leads_v1';
  const STORAGE_KEY_ATTRIBUTION = 'nar_attribution_v1';
  const STORAGE_KEY_CONFIG = 'nar_command_config_v1';

  // Ensure dataLayer and gtag exist
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  // Initialize Google Ads & Consent Mode v2 defaults (analytics & ad_storage granted for first-party measurement)
  gtag('js', new Date());
  gtag('config', ADS_ID, {
    allow_enhanced_conversions: true,
    send_page_view: true
  });

  // Dynamically inject Google Ads gtag.js script if not already present in DOM
  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${ADS_ID}"]`)) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(s);
  }

  // Capture UTM & GCLID attribution parameters
  function captureAttribution() {
    try {
      const params = new URLSearchParams(window.location.search);
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_ATTRIBUTION) || '{}');
      const updated = {
        utm_source: params.get('utm_source') || existing.utm_source || (document.referrer ? new URL(document.referrer).hostname : 'directo / orgánico'),
        utm_medium: params.get('utm_medium') || existing.utm_medium || (params.get('gclid') ? 'cpc' : 'organic'),
        utm_campaign: params.get('utm_campaign') || existing.utm_campaign || (params.get('gclid') ? 'Google Ads - Alquiler Estudios BCN' : 'SEO Local Poblenou'),
        utm_term: params.get('utm_term') || existing.utm_term || '',
        gclid: params.get('gclid') || existing.gclid || '',
        landing_page: existing.landing_page || window.location.pathname + window.location.hash,
        first_visit: existing.first_visit || new Date().toISOString(),
        last_visit: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY_ATTRIBUTION, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return {
        utm_source: 'directo / orgánico',
        utm_medium: 'organic',
        utm_campaign: 'SEO Local Poblenou',
        gclid: ''
      };
    }
  }

  const attribution = captureAttribution();

  function getConfig() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG) || '{}');
    } catch (e) {
      return {};
    }
  }

  // Record event into local telemetry for the Command Center Dashboard
  function recordTelemetryEvent(eventName, category, label, metadata) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY_EVENTS) || '[]');
      const evt = {
        id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        timestamp: new Date().toISOString(),
        event: eventName,
        category: category || 'engagement',
        label: label || '',
        path: window.location.pathname + window.location.hash,
        source: attribution.utm_source,
        medium: attribution.utm_medium,
        campaign: attribution.utm_campaign,
        gclid: attribution.gclid,
        meta: metadata || {}
      };
      list.unshift(evt);
      if (list.length > 300) list.length = 300;
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(list));

      // Increment real-time per-page counter
      const pageCounts = JSON.parse(localStorage.getItem('nar_live_page_hits_v1') || '{}');
      const cleanPath = window.location.pathname || '/index.html';
      if (eventName === 'page_view') {
        pageCounts[cleanPath] = (pageCounts[cleanPath] || 0) + 1;
        localStorage.setItem('nar_live_page_hits_v1', JSON.stringify(pageCounts));
      }

      // Broadcast in real-time to any open Admin Dashboard tab
      if (window.BroadcastChannel) {
        try {
          const bc = new BroadcastChannel('nar_live_telemetry_v1');
          bc.postMessage({ type: 'telemetry_event', event: evt, pageCounts: pageCounts });
          bc.close();
        } catch (bcErr) {}
      }
      return evt;
    } catch (e) {
      return null;
    }
  }

  // Record a structured Lead in local telemetry + dispatch optional Telegram alert
  function recordLead(leadData) {
    try {
      const leads = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
      const entry = Object.assign({
        id: 'lead_' + Date.now(),
        timestamp: new Date().toISOString(),
        status: 'Nuevo',
        source: attribution.gclid ? 'Google Ads (CPC)' : (attribution.utm_source || 'Orgánico / Web'),
        campaign: attribution.utm_campaign || 'Directo',
        gclid: attribution.gclid || ''
      }, leadData);
      leads.unshift(entry);
      if (leads.length > 150) leads.length = 150;
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));

      // Optional Telegram Instant Alert if configured in Command Center
      const cfg = getConfig();
      if (cfg.telegramBotToken && cfg.telegramChatId) {
        const text = [
          '🎬 *NUEVO LEAD — NOT A ROBOT STUDIOS*',
          `👤 *Nombre:* ${entry.name || '-'}`,
          `📧 *Email:* ${entry.email || '-'}`,
          `📱 *Teléfono:* ${entry.phone || '-'}`,
          `🏢 *Espacio:* ${entry.studio || '-'}`,
          `🎥 *Uso:* ${entry.usage || '-'}`,
          `📅 *Fecha:* ${entry.date || '-'}`,
          `📡 *Origen:* ${entry.source} (${entry.campaign})`,
          entry.message ? `💬 *Mensaje:* ${entry.message}` : ''
        ].filter(Boolean).join('\n');

        fetch(`https://api.telegram.org/bot${cfg.telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: cfg.telegramChatId,
            text: text,
            parse_mode: 'Markdown'
          })
        }).catch(() => {});
      }
      return entry;
    } catch (e) {
      return null;
    }
  }

  // Core Conversion Dispatcher (Google Ads + GA4 + GTM dataLayer + Command Center)
  function trackConversion(actionType, details) {
    const payload = Object.assign({
      send_to: ADS_ID,
      event_category: 'conversion',
      event_label: details && details.label ? details.label : actionType,
      value: details && details.value ? details.value : 1.0,
      currency: 'EUR',
       page_path: window.location.pathname + window.location.hash,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      gclid: attribution.gclid
    }, details || {});

    const cfg = getConfig();
    const labelMap = {
      'form_submit_studios': cfg.adsLabelForm || 'form_reserva_estudios',
      'form_submit_rider': cfg.adsLabelRider || 'form_cotizacion_rider',
      'form_submit_contact': cfg.adsLabelContact || 'form_contacto_general',
      'click_whatsapp': cfg.adsLabelWhatsapp || 'click_whatsapp_estudios',
      'click_phone': cfg.adsLabelPhone || 'click_llamada_estudios',
      'click_email': cfg.adsLabelEmail || 'click_email_estudios'
    };

    const conversionLabel = labelMap[actionType] || actionType;
    const sendToTarget = cfg.adsConversionLabel
      ? `${ADS_ID}/${cfg.adsConversionLabel}`
      : ADS_ID;

    // 1. Push explicit event to GTM dataLayer
    window.dataLayer.push({
      event: 'nar_conversion',
      conversion_type: actionType,
      conversion_label: conversionLabel,
      ads_id: ADS_ID,
      gtm_id: GTM_ID,
      value: payload.value,
      currency: 'EUR',
      studio: payload.studio || '',
      usage: payload.usage || '',
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      gclid: attribution.gclid
    });

    // 2. Fire Google Ads & GA4 gtag conversion
    try {
      gtag('event', 'conversion', {
        send_to: sendToTarget,
        value: payload.value,
        currency: 'EUR',
        event_callback: function () {}
      });
      gtag('event', actionType, payload);
      if (actionType.indexOf('form_submit') === 0) {
        gtag('event', 'generate_lead', {
          currency: 'EUR',
          value: payload.value || 150,
          lead_source: payload.studio || 'Alquiler Estudios'
        });
      }
    } catch (e) {}

    // 3. Record in local telemetry for Command Center
    recordTelemetryEvent(actionType, 'conversion', payload.event_label, payload);
  }

  // Track initial page view
  document.addEventListener('DOMContentLoaded', function () {
    recordTelemetryEvent('page_view', 'navigation', document.title, {
      url: window.location.href,
      referrer: document.referrer || 'direct'
    });

    // Global delegated listener for WhatsApp, Phone (tel:), and Email (mailto:) clicks
    document.body.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = (link.getAttribute('href') || '').trim();
      if (!href) return;

      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        trackConversion('click_whatsapp', {
          label: link.getAttribute('data-track-label') || 'WhatsApp Directo Estudios',
          value: 45.0,
          href: href
        });
      } else if (href.startsWith('tel:')) {
        trackConversion('click_phone', {
          label: link.getAttribute('data-track-label') || ('Llamada ' + href.replace('tel:', '')),
          value: 50.0,
          href: href
        });
      } else if (href.startsWith('mailto:')) {
        trackConversion('click_email', {
          label: link.getAttribute('data-track-label') || ('Email ' + href.replace('mailto:', '')),
          value: 35.0,
          href: href
        });
      }
    });

    // Global listener for standard contact forms (e.g., pages/contacto.html)
    const generalContactForm = document.querySelector('form[name="contacto"]:not([data-custom-tracked])');
    if (generalContactForm) {
      generalContactForm.addEventListener('submit', function () {
        const fd = new FormData(generalContactForm);
        const name = fd.get('nombre') || fd.get('name') || ' Visitante Web';
        const email = fd.get('email') || '';
        const msg = fd.get('mensaje') || '';
        recordLead({
          type: 'Contacto General',
          name: name,
          email: email,
          phone: fd.get('telefono') || '',
          studio: 'Consulta General Productora',
          usage: 'Producción / Consulta',
          date: new Date().toISOString().slice(0, 10),
          message: msg,
          value: 120
        });
        trackConversion('form_submit_contact', {
          label: 'Formulario Contacto General',
          value: 120.0,
          studio: 'General'
        });
      });
    }
  });

  // Expose public API
  window.NARTracking = {
    ADS_ID: ADS_ID,
    GTM_ID: GTM_ID,
    attribution: attribution,
    trackConversion: trackConversion,
    recordTelemetryEvent: recordTelemetryEvent,
    recordLead: recordLead,
    getEvents: function () {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY_EVENTS) || '[]'); } catch (e) { return []; }
    },
    getLeads: function () {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]'); } catch (e) { return []; }
    },
    getConfig: getConfig,
    saveConfig: function (newCfg) {
      const merged = Object.assign(getConfig(), newCfg || {});
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(merged));
      return merged;
    }
  };
})();
