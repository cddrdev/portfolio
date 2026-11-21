import Section from '../Section/Section.jsx';
import TagList from '../TagList/TagList.jsx';
import './Projects.css';

export default function Projects({ projects, title, technologiesLabel }) {
  return (
    <Section id="proyectos" title={title}>
      <div className="project-grid">
        {projects.map(({ id, title, category, description, technologies, link }) => (
          <article className="project-card" key={id}>
            <p className="project-card__category">{category}</p>
            <h3>{title}</h3>
            <p className="project-card__description">{description}</p>
            <TagList tags={technologies} label={technologiesLabel} />
            {link && (
              <a className="project-card__link" href={link.href} data-analytics-event="project_click" data-analytics-id={id}>
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
