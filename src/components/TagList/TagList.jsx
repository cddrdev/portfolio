import './TagList.css';

export default function TagList({ tags, label }) {
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
