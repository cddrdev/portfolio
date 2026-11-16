import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Projects from './components/Projects/Projects.jsx';
import Experience from './components/Experience/Experience.jsx';
import Skills from './components/Skills/Skills.jsx';
import Education from './components/Education/Education.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import portfolio from './data/portfolio.js';
import './App.css';
import './motion.css';

export default function App() {
  const { profile, navigation, projects, experience, skills, education, languages, contact, links } =
    portfolio;

  return (
    <div className="portfolio" id="inicio">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header profile={profile} navigation={navigation} />
      <main id="contenido" tabIndex={-1}>
        <Hero
          profile={profile}
          github={links.find(({ label }) => label === 'GitHub')}
        />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Skills skills={skills} />
        <Education education={education} languages={languages} />
        <Contact contact={contact} />
      </main>
      <Footer name={profile.name} links={links} />
    </div>
  );
}
