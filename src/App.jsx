import { useEffect, useState } from 'react';
import { analyticsConfigured } from './config.js';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import Experience from './components/Experience/Experience.jsx';
import Skills from './components/Skills/Skills.jsx';
import Education from './components/Education/Education.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import portfolios from './data/portfolio.js';
import { usePreferences } from './hooks/usePreferences.js';
import './App.css';
import './motion.css';

export default function App() {
  const [analytics, setAnalytics] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme } = usePreferences();
  const { profile, navigation, projects, experience, skills, education, languages, contact, links, ui, metadata } =
    portfolios[language];

  useEffect(() => {
    if (!analyticsConfigured) return undefined;
    let active = true;
    Promise.all([
      import('./components/AnalyticsConsent/AnalyticsConsent.jsx'),
      import('./lib/analytics.js'),
    ]).then(([{ default: Consent }, { trackPortfolioClick }]) => {
      if (active) setAnalytics({ Consent, trackPortfolioClick });
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  const Consent = analytics?.Consent;

  useEffect(() => {
    document.title = metadata.title;
    const descriptions = {
      'meta[name="description"]': metadata.description,
      'meta[property="og:title"]': metadata.title,
      'meta[property="og:description"]': metadata.socialDescription,
      'meta[property="og:locale"]': metadata.locale,
      'meta[name="twitter:title"]': metadata.title,
      'meta[name="twitter:description"]': metadata.twitterDescription,
    };
    Object.entries(descriptions).forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute('content', content);
    });
  }, [metadata]);

  return (
    <div className="portfolio" id="inicio" onClick={(event) => {
      const link = event.target.closest('a[data-analytics-event]');
      if (link) analytics?.trackPortfolioClick(link.dataset.analyticsEvent, link.dataset.analyticsId);
    }}>
      <a className="skip-link" href="#contenido">
        {ui.skipLink}
      </a>
      <Header
        profile={profile}
        navigation={navigation}
        labels={ui.header}
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
      />
      <main id="contenido" tabIndex={-1}>
        <Hero
          profile={profile}
          labels={ui.hero}
          github={links.find(({ label }) => label === 'GitHub')}
        />
        <Projects projects={projects} title={ui.sections.projects} technologiesLabel={ui.sections.skills} />
        <Experience experience={experience} title={ui.sections.experience} />
        <Skills skills={skills} title={ui.sections.skills} />
        <Education
          education={education}
          languages={languages}
          title={ui.sections.education}
          languagesTitle={ui.sections.languages}
        />
        <Contact contact={contact} title={ui.sections.contact} />
      </main>
      <Footer
        name={profile.name}
        links={links}
        labels={ui.footer}
        privacyLabel={analytics ? ui.analytics.settings : null}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />
      {Consent && <Consent labels={ui.analytics} open={privacyOpen} onClose={() => setPrivacyOpen(false)} />}
    </div>
  );
}
