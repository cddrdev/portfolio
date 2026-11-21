import { analyticsConfigured, measurementId } from '../config.js';
const storageKey = 'portfolio-analytics-consent';
const retention = 180 * 24 * 60 * 60 * 1000;
export const analyticsAvailable = analyticsConfigured;
let started = false;
let enabled = false;
let enabledUntil = 0;
let fallbackConsent;

function validConsent(consent) {
  return consent && ['accepted', 'rejected'].includes(consent.value)
    && Number.isFinite(consent.expiresAt) && consent.expiresAt > Date.now();
}

export function getAnalyticsConsent(fromStorage = false) {
  if (fromStorage) fallbackConsent = undefined;
  try {
    const consent = fallbackConsent ?? JSON.parse(localStorage.getItem(storageKey));
    return validConsent(consent) ? consent : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  const domains = [null];
  const parts = location.hostname.split('.');
  for (let index = 0; index < parts.length - 1; index += 1) {
    domains.push(parts.slice(index).join('.'));
  }
  let cookies;
  try {
    cookies = document.cookie.split(';');
  } catch {
    return;
  }
  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_')) {
      domains.forEach((domain) => {
        try {
          document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
        } catch {}
      });
    }
  });
}

export function applyAnalyticsConsent(consent) {
  if (!analyticsAvailable) return;
  enabled = validConsent(consent) && consent.value === 'accepted';
  enabledUntil = enabled ? consent.expiresAt : 0;
  window[`ga-disable-${measurementId}`] = !enabled;
  if (!enabled) {
    clearAnalyticsCookies();
    return;
  }

  if (started) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  const settings = {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: 'none',
    cookie_flags: 'SameSite=Lax;Secure',
    cookie_expires: retention / 1000,
    cookie_update: false,
    page_title: 'Carlos de Diego Rodríguez · Portfolio',
    page_location: `${location.origin}${location.pathname}`,
    page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : '',
  };
  window.gtag('set', settings);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, settings);
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('event', 'page_view', {
    page_title: 'Carlos de Diego Rodríguez · Portfolio',
    page_location: `${location.origin}${location.pathname}`,
  });
  const script = document.createElement('script');
  script.id = 'portfolio-google-analytics';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}

export function saveAnalyticsConsent(choice) {
  const consent = { value: choice, expiresAt: Date.now() + retention };
  try {
    localStorage.setItem(storageKey, JSON.stringify(consent));
    fallbackConsent = undefined;
  } catch {
    fallbackConsent = consent;
  }
  applyAnalyticsConsent(consent);
  return consent;
}

export function trackPortfolioClick(event, identifier) {
  if (!analyticsAvailable || !enabled) return;
  if (Date.now() >= enabledUntil) {
    applyAnalyticsConsent(null);
    return;
  }
  if (event === 'project_click') window.gtag('event', event, { project_id: identifier });
  if (event === 'contact_click') window.gtag('event', event, { contact_method: identifier });
}
