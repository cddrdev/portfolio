import Section from '../Section/Section.jsx';
import './Contact.css';

export default function Contact({ contact, title }) {
  return (
    <Section id="contacto" title={title}>
      <p className="contact__intro">{contact.intro}</p>
      <ul className="contact-list" role="list">
        {contact.items.map(({ id, label, value, href }) => (
          <li key={id}>
            <a className="contact-card" href={href} data-analytics-event="contact_click" data-analytics-id={id === 'correo' ? 'email' : id}>
              <span className="contact-card__label">{label}</span>
              <span className="contact-card__value">{value}</span>
              <span className="contact-card__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
