import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./Header.css";

export default function Header({ profile, navigation }) {
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
    const query = window.matchMedia("(min-width: 36.01rem)");
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
        <a className="site-header__brand" href="#inicio" onClick={closeMenu}>
          <span className="site-header__monogram" aria-hidden="true">
            {profile.initials}
          </span>
          <span>{profile.name.firstLine}</span>
        </a>
        <nav className="site-header__nav" aria-label="Navegación principal">
          <button
            ref={toggleRef}
            className="site-header__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
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
      </div>
    </header>
  );
}
