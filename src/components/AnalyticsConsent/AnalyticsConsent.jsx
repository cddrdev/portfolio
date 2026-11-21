import { useEffect, useRef, useState } from 'react';
import { analyticsAvailable, applyAnalyticsConsent, getAnalyticsConsent, saveAnalyticsConsent } from '../../lib/analytics.js';
import './AnalyticsConsent.css';

export default function AnalyticsConsent({ labels, open, onClose }) {
  const [consent, setConsent] = useState(getAnalyticsConsent);
  const choice = consent?.value ?? null;
  const [details, setDetails] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    applyAnalyticsConsent(consent);
  }, [consent]);

  useEffect(() => {
    if (!consent) return undefined;
    let timer;
    const checkExpiry = () => {
      window.clearTimeout(timer);
      const remaining = consent.expiresAt - Date.now();
      if (remaining <= 0) {
        applyAnalyticsConsent(null);
        setConsent(null);
        return;
      }
      timer = window.setTimeout(checkExpiry, Math.min(remaining, 2 ** 31 - 1));
    };
    checkExpiry();
    window.addEventListener('focus', checkExpiry);
    document.addEventListener('visibilitychange', checkExpiry);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('focus', checkExpiry);
      document.removeEventListener('visibilitychange', checkExpiry);
    };
  }, [consent]);

  useEffect(() => {
    const syncConsent = (event) => {
      if (event.key === 'portfolio-analytics-consent' || event.key === null) {
        const next = getAnalyticsConsent(true);
        applyAnalyticsConsent(next);
        setConsent(next);
      }
    };
    window.addEventListener('storage', syncConsent);
    return () => window.removeEventListener('storage', syncConsent);
  }, []);

  useEffect(() => {
    if (open) titleRef.current?.focus({ preventScroll: true });
  }, [open]);

  if (!analyticsAvailable || (choice !== null && !open)) return null;

  const choose = (value) => {
    setConsent(saveAnalyticsConsent(value));
    setDetails(false);
    onClose();
    if (open) document.getElementById('analytics-settings')?.focus({ preventScroll: true });
  };

  const close = () => {
    setDetails(false);
    onClose();
    document.getElementById('analytics-settings')?.focus({ preventScroll: true });
  };

  return (
    <section className="analytics-consent" aria-labelledby="analytics-title" onKeyDown={(event) => {
      if (event.key === 'Escape' && open && choice !== null) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    }}>
      <div className="analytics-consent__content">
        <h2 id="analytics-title" ref={titleRef} tabIndex={-1}>{labels.title}</h2>
        <p>{labels.description}</p>
        <button className="analytics-consent__details" type="button" aria-expanded={details} aria-controls="analytics-details" onClick={() => setDetails((value) => !value)}>
          {labels.details}
        </button>
        <div id="analytics-details" hidden={!details}>
          <p>{labels.privacy}</p>
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">{labels.googlePrivacy}</a>
        </div>
      </div>
      <div className="analytics-consent__actions">
        {open && choice !== null && <button type="button" onClick={close}>{labels.close}</button>}
        <button type="button" onClick={() => choose('rejected')}>{labels.reject}</button>
        <button type="button" onClick={() => choose('accepted')}>{labels.accept}</button>
      </div>
    </section>
  );
}
