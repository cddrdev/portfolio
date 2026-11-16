import { useInView } from '../../hooks/useInView.js';
import './Section.css';

export default function Section({ id, title, children }) {
  const titleId = id + '-titulo';
  const [ref, visible] = useInView(0.15);

  return (
    <section
      className={`section${visible ? ' is-visible' : ''}`}
      id={id}
      aria-labelledby={titleId}
      ref={ref}
    >
      <div className="container">
        <h2 className="section__title" id={titleId}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
