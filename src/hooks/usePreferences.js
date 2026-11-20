import { useEffect, useState } from 'react';

function readPreference(key, allowedValues) {
  try {
    const value = localStorage.getItem(key);
    return allowedValues.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

export function usePreferences() {
  const [language, setLanguage] = useState(
    () => readPreference('portfolio-language', ['es', 'en']) ?? 'es',
  );
  const [themePreference, setThemePreference] = useState(
    () => readPreference('portfolio-theme', ['light', 'dark']),
  );
  const [systemTheme, setSystemTheme] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );
  const theme = themePreference ?? systemTheme;

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setSystemTheme(event.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', theme === 'dark' ? '#101b15' : '#f8f8f3',
    );
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemePreference(next);
    savePreference('portfolio-theme', next);
  };

  const toggleLanguage = () => {
    const next = language === 'es' ? 'en' : 'es';
    setLanguage(next);
    savePreference('portfolio-language', next);
  };

  return { language, theme, toggleLanguage, toggleTheme };
}
