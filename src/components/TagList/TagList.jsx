import './TagList.css';

export default function TagList({ tags, label = 'Tecnologías' }) {
  return (
    <ul className="tag-list" aria-label={label} role="list">
      {tags.map((tag) => (
        <li className="tag-list__item" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
