import Section from '../Section/Section.jsx';
import './Education.css';

export default function Education({ education, languages }) {
  return (
    <Section id="formacion" title="Formación">
      <div className="education-grid">
        <ul className="education-list" role="list">
          {education.map(({ id, title, institution, period }) => (
            <li className="education-list__item" key={id}>
              <div>
                <h3>{title}</h3>
                <p>{institution}</p>
              </div>
              <span className="education-list__period">{period}</span>
            </li>
          ))}
        </ul>
        <aside className="languages" aria-labelledby="idiomas-titulo">
          <h3 id="idiomas-titulo">Idiomas</h3>
          <dl className="languages__list">
            {languages.map(({ name, level }) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{level}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
