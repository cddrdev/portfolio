import GitHubIcon from '../Gh/GitHubIcon.jsx';
import './Hero.css';

export default function Hero({ profile, github, labels }) {
  return (
    <section className="hero" aria-labelledby="titulo-principal">
      <div className="container hero__inner">
        <div>
          <p className="hero__role">{profile.role}</p>
          <h1 id="titulo-principal">
            {profile.name.firstLine}{' '}
            <span>{profile.name.secondLine}</span>
          </h1>
          <p className="hero__summary">{profile.summary}</p>
          <div className="hero__actions">
            <a className="hero__primary" href="#proyectos">
              {labels.projects} <span aria-hidden="true">↓</span>
            </a>
            <a className="hero__secondary" href="#experiencia">
              {labels.experience} <span aria-hidden="true">↓</span>
            </a>
            {github && (
              <a className="hero__secondary hero__external" href={github.href}>
                <GitHubIcon className="hero__github-icon" />
                {github.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
        <figure className="hero__portrait">
          <img
            src={profile.portrait}
            alt=""
            width="320"
            height="382"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
