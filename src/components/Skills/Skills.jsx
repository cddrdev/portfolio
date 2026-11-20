import Section from '../Section/Section.jsx';
import TagList from '../TagList/TagList.jsx';
import './Skills.css';

export default function Skills({ skills, title }) {
  return (
    <Section id="tecnologias" title={title}>
      <div className="skills-grid">
        {skills.map(({ title, technologies }) => (
          <article className="skill-card" key={title}>
            <h3>{title}</h3>
            <TagList tags={technologies} label={title} />
          </article>
        ))}
      </div>
    </Section>
  );
}
