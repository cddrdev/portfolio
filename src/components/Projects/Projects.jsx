import Section from '../Section/Section.jsx';
import TagList from '../TagList/TagList.jsx';
import './Projects.css';

export default function Projects({ projects }) {
  return (
    <Section id="proyectos" title="Proyectos">
      <div className="project-grid">
        {projects.map(({ id, title, category, description, technologies, link }) => (
          <article className="project-card" key={id}>
            <p className="project-card__category">{category}</p>
            <h3>{title}</h3>
            <p className="project-card__description">{description}</p>
            <TagList tags={technologies} />
            {link && (
              <a className="project-card__link" href={link.href}>
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
