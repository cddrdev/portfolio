import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./Header.css";

export default function Header({ profile, navigation, labels, language, theme, onToggleLanguage, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  const closeMenu = () => {
    if (open) {
      flushSync(() => setOpen(false));
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64.01rem)");
    const onChange = (event) => event.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const classes = ["site-header", scrolled && "is-scrolled", open && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="container site-header__inner">
        <a
          className="site-header__brand"
          href="#inicio"
          aria-label={`${profile.initials} ${profile.name.firstLine} ${profile.name.secondLine}`}
          onClick={closeMenu}
        >
          <span className="site-header__monogram" aria-hidden="true">
            {profile.initials}
          </span>{' '}
          <span className="site-header__name">{profile.name.firstLine}</span>
        </a>
        <nav className="site-header__nav" aria-label={labels.navigation}>
          <button
            ref={toggleRef}
            className="site-header__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="site-header__bars" aria-hidden="true" />
          </button>
          <div className="site-header__menu" id="menu-principal">
            <ul className="site-header__links">
              {navigation.map(({ href, label }, index) => (
                <li key={href} style={{ "--i": index }}>
                  <a href={href} onClick={closeMenu}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="site-header__preferences">
          <button
            className="site-header__control site-header__theme"
            type="button"
            aria-label={labels.darkMode}
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? labels.enableLightMode : labels.enableDarkMode}
            data-theme={theme}
            onClick={onToggleTheme}
          >
            <svg className="site-header__moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M20.8 13.1A9 9 0 0 1 10.9 3.2a9 9 0 1 0 9.9 9.9Z" />
            </svg>
            <svg className="site-header__sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          </button>
          <button
            className="site-header__control site-header__language"
            type="button"
            aria-label={`ES EN: ${labels.switchLanguage}`}
            title={labels.switchLanguage}
            lang={language === 'es' ? 'en' : 'es'}
            data-language={language}
            onClick={onToggleLanguage}
          >
            <span className={language === 'es' ? 'is-active' : ''} aria-hidden="true">ES</span>{' '}
            <span className={language === 'en' ? 'is-active' : ''} aria-hidden="true">EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}
