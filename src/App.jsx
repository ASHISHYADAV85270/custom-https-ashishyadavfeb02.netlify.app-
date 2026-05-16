import { useMemo, useState } from 'react'
import {
  FaAws,
  FaCodeBranch,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaGithub,
  FaHtml5,
  FaJsSquare,
  FaLinkedin,
  FaMobileAlt,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { BiLogoMongodb, BiLogoPostgresql, BiLogoTypescript } from 'react-icons/bi'
import { SiExpress, SiNextdotjs, SiRedis, SiTailwindcss } from 'react-icons/si'
import './App.css'
import { ChatbotWidget } from './components/ChatbotWidget'
import { SectionHeader } from './components/SectionHeader'
import {
  designSystemHighlights,
  experiences,
  impactStats,
  profileImage,
  projects,
  profileLinks,
  skillGroups,
  technicalHighlights,
} from './data/portfolioData'

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  let isChatbotEnabled = false;
  const projectFilters = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.tag))],
    [],
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.tag === activeFilter)
  }, [activeFilter])

  const skillIconMap = {
    React: FaReact,
    'Next.js': SiNextdotjs,
    TypeScript: BiLogoTypescript,
    'Tailwind CSS': SiTailwindcss,
    'Node.js': FaNodeJs,
    'Express.js': SiExpress,
    PostgreSQL: BiLogoPostgresql,
    MongoDB: BiLogoMongodb,
    Redis: SiRedis,
    Kafka: FaCodeBranch,
    Docker: FaDocker,
    AWS: FaAws,
    EC2: FaAws,
    ECS: FaAws,
    IAM: FaAws,
    'REST APIs': FaDatabase,
    WebSockets: FaDatabase,
    'Rate Limiting': FaDatabase,
    CQRS: FaCodeBranch,
    'Event-Driven Architecture': FaCodeBranch,
    'Code Splitting': FaJsSquare,
    'Lazy Loading': FaHtml5,
    'Web Workers': FaCss3Alt,
    Zustand: FaReact,
    'TanStack Query': FaReact,
  }

  return (
    <div className="app-shell">
      <header className="hero-section">
        <nav className="top-nav">
          <p className="brand">Ashish Yadav</p>
          <div className="nav-links">
            <a href="#about-video">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#design-system">Design System</a>
          </div>
        </nav>
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Software Engineer | Full-Stack + AI</p>
            <h1>Building scalable digital products with design precision and AI.</h1>
            <p className="hero-description">
              I am Ashish Yadav, a Software Engineer with 2+ years of experience
              crafting user-centric web applications and distributed systems using
              Next.js, Node.js, TypeScript, event-driven architecture, and AI.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#projects">
                Explore Projects
              </a>
              <a className="btn btn-secondary" href="#contact">
                Let&apos;s Collaborate
              </a>
            </div>

            <div className="impact-grid">
              {impactStats.map((stat) => (
                <article key={stat.label} className="impact-card">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img
              src={profileImage}
              alt="Portrait of Ashish Yadav"
              className="hero-photo"
              loading="eager"
            />
          </div>
        </div>
      </header>

      <main>
        <section id="about-video" className="section">
          <SectionHeader
            eyebrow="About Me"
            title="Video Introduction"
            description="A quick introduction to my journey across full-stack engineering, cloud-native architecture, and AI-powered product development."
          />

          
          <div className="video-wrapper">
            <iframe width="560" height="315" src={import.meta.env.VITE_INTRO_VIDEO_URL || 'https://www.youtube.com/embed/YowK53KH6Ic?si=V6Rt3sG8MsYha2mk&amp;start=9'} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeader
            eyebrow="Skill Stack"
            title="Core Technologies & Capabilities"
            description="A practical toolkit for high-performance frontend delivery, resilient backend systems, and AI-led product experiences."
          />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item} className="skill-item">
                      {skillIconMap[item]
                        ? (() => {
                          const Icon = skillIconMap[item]
                          return (
                            <span className="skill-icon" aria-hidden="true">
                              <Icon />
                            </span>
                          )
                        })()
                        : null}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeader
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Selected work that combines product thinking, scalable architecture, and measurable impact."
          />
          <div className="project-filter">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`chip ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.name} className="card project-card">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.name}
                    className="project-image"
                    loading="lazy"
                  />
                ) : null}
                {project.galleryImages?.length ? (
                  <div className="project-gallery">
                    {project.galleryImages.map((image) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt={image.alt || project.name}
                        className="project-image secondary"
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : null}
                <div className="project-meta">
                  <h3>{project.name}</h3>
                  <span>{project.tag}</span>
                </div>
                <p>{project.description}</p>
                {project.websiteUrl ? (
                  <a
                    className="project-link"
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.websiteLabel || 'Live Reference'}
                  </a>
                ) : null}
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeader
            eyebrow="Work Experience"
            title="Building Products Across Teams"
            description="Recent roles focused on robust UI systems, AI integrations, and distributed backend workflows."
          />
          <div className="timeline">
            {experiences.map((experience) => (
              <article key={experience.company} className="timeline-item">
                <div className="timeline-heading">
                  <h3>{experience.company}</h3>
                  <p>{experience.period}</p>
                </div>
                <p className="role">{experience.role}</p>
                <ul>
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="design-system" className="section">
          <SectionHeader
            eyebrow="Design Systems"
            title="Reusable UI at Scale"
            description="Aquera Labs design system outcomes focused on consistency, speed, and cross-product usability."
          />
          <div className="design-system-grid">
            {designSystemHighlights.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="architecture" className="section">
          <SectionHeader
            eyebrow="Technical Highlights"
            title="Scalable Architecture Practices"
            description="Patterns and platform capabilities I apply to deliver resilient, high-throughput systems."
          />
          <div className="architecture-grid">
            {technicalHighlights.map((highlight) => (
              <article key={highlight.title} className="card architecture-card">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="contact-card">
          <h2>Ready to build something meaningful?</h2>
          <p>
            Let&apos;s connect and create your next high-impact product with
            thoughtful design and scalable engineering.
          </p>
          <div className="contact-links">
            <a href={profileLinks.email}>
              <FaEnvelope aria-hidden="true" />
              ashishyadavfeb02@gmail.com
            </a>
            <a href={profileLinks.phone}>
              <FaMobileAlt aria-hidden="true" />
              +91-8527086883
            </a>
            <a href={profileLinks.github} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
            <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {isChatbotEnabled ? <ChatbotWidget /> : null}
    </div>
  )
}

export default App
