import GitHubIcon from '../Gh/GitHubIcon.jsx';
import './Footer.css';

export default function Footer({ name, links, labels, privacyLabel, onOpenPrivacy }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{name.firstLine} {name.secondLine}</p>
        {links.length > 0 && (
          <nav aria-label={labels.profiles}>
            <ul className="site-footer__links">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a className="site-footer__link" href={href}>
                    {label === 'GitHub' && <GitHubIcon className="site-footer__icon" size={16} />}
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {privacyLabel && (
          <button id="analytics-settings" className="analytics-settings" type="button" onClick={onOpenPrivacy}>
            {privacyLabel}
          </button>
        )}
        <a className="site-footer__back" href="#inicio">
          {labels.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
