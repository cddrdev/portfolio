import Section from '../Section/Section.jsx';
import './Experience.css';

export default function Experience({ experience }) {
  return (
    <Section id="experiencia" title="Experiencia profesional">
      <ul className="experience-list" role="list">
        {experience.map(({ id, role, organization, period, responsibilities }) => (
          <li className="experience-list__item" key={id}>
            <p className="experience-list__period">{period}</p>
            <div>
              <h3>{role}</h3>
              <p className="experience-list__organization">{organization}</p>
              <ul className="experience-list__responsibilities">
                {responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
