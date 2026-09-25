import { useState, useEffect } from 'react';
import './Landing.css';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar.jsx';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaCss3Alt, FaNodeJs, FaGitAlt, FaArrowRight, FaDocker, FaFigma, FaWordpress, FaCloud } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMysql, SiSequelize, SiCanva, SiVercel, SiRender, SiPostgresql, SiPrisma, SiRedis, SiTypescript } from 'react-icons/si';
import { trackPageView, trackEvent } from '../analytics.js';

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Start the loading timer only when loading is true
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Once loading is done, track page view
    trackPageView('/', 'Francis Lingan - Portfolio');

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  const portfolioProjects = [
    {
      title: "Taravel",
      tags: ["React", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL", "Prisma", "Redis"],
      description: "Web-based travel platform for discovering, booking, and managing travel accommodations and experiences.",
      image: assets.project_3,
      link: "https://taravel-silk.vercel.app/",
      inProgress: true
    },
    {
      title: "Ordering With Inventory Monitoring System",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based application for ordering and inventory monitoring for GAMJ General Merchandise",
      image: assets.project_1,
      link: "https://www.gamjgeneralmerchandise.store/"
    },
    {
      title: "Ordering System for Clothes Store",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based ordering system for a clothing store for Angle, featuring product management and order processing.",
      image: assets.project_2,
      link: "https://angle-online-store-customer.vercel.app/"
    },
    {
      title: "Library Management System",
      tags: ["React", "CSS", "Tailwind CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based library management system for managing books, borrowers, return and returns.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop",
      link: "https://github.com/Valiantic/Library-Management-System-"
    },
    {
      title: "Charina Lingan Portfolio Website",
      tags: ["React", "CSS"],
      description: "Personal portfolio website showcasing projects, skills, and contact information.",
      image: assets.project_4,
      link: "https://charina-lingan-portfolio.vercel.app"
    }
  ];

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <img src={assets.logo} alt="Logo" />
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <p className="loading-text">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <Navbar />

      {/* Home Section */}
      <section id="home" className="home-section">
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-title">Francis Lingan</h1>
            <p className="home-subtitle">Web Developer, UI/UX Designer, and QA Tester</p>
          </div>
          <div className="home-image">
            <div className="profile-circle">
              <img src={assets.profile_1} alt="Francis Lingan" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section-animate">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p className="about-text">
              I'm Francis Carl A. Lingan, a Full-Stack Web Developer specializing in web development, UI/UX design, and QA testing, currently seeking work opportunities. I am a graduate of Bachelor of Science in Information Technology from Cavite State University – Carmona Campus.
            </p>
            <p className="about-text">
              I leverage AI-assisted development alongside modern full-stack technologies to design, develop, and maintain responsive web applications. My technical specialization includes React.js and CSS for frontend development, and Node.js, Express.js, MySQL, and Sequelize ORM for backend development, with a focus on building and maintainable software systems.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section-animate">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {portfolioProjects.map((project, index) => (
              <div key={index} className={`projects-card${project.inProgress ? ' projects-card--in-progress' : ''}`}>
                <div className="projects-image" style={{backgroundImage: `url(${project.image})`}}>
                  <div className="projects-overlay">
                    <div className="projects-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="projects-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {project.inProgress && (
                    <div className="projects-in-progress-overlay">
                      <span className="projects-in-progress-label">🚧 In Progress</span>
                    </div>
                  )}
                </div>
                <div className="projects-info">
                  <h3 className="projects-title">{project.title}</h3>
                  <p className="projects-description">{project.description}</p>
                  {project.inProgress ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects-link projects-link--in-progress"
                      onClick={() => trackEvent('Projects', 'Click In Progress', project.title)}>
                      In Progress <FaArrowRight />
                    </a>
                  ) : (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects-link"
                      onClick={() => trackEvent('Projects', 'Click View Project', project.title)}>
                      View Project <FaArrowRight />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section id="skills" className="skills-section section-animate">
        <div className="container">
          <h2 className="section-title">Skills & Tools</h2>
          <div className="skills-grid">

            {/* Frontend */}
            <div className="skill-category">
              <h3 className="skill-category-title">Frontend Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaReact className="skill-icon" />
                    <span>React.js</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaCss3Alt className="skill-icon" />
                    <span>CSS3</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiTailwindcss className="skill-icon" />
                    <span>Tailwind CSS</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiTypescript className="skill-icon" />
                    <span>TypeScript</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
              </div>
            </div>

            {/* State Management */}
            <div className="skill-category">
              <h3 className="skill-category-title">State Management</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaReact className="skill-icon" />
                    <span>Context API</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiTypescript className="skill-icon" />
                    <span>TanStack Query</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaReact className="skill-icon" />
                    <span>Zustand</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="skill-category">
              <h3 className="skill-category-title">Backend Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaNodeJs className="skill-icon" />
                    <span>Node.js</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiExpress className="skill-icon" />
                    <span>Express.js</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiMysql className="skill-icon" />
                    <span>MySQL</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiSequelize className="skill-icon" />
                    <span>Sequelize ORM</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiTypescript className="skill-icon" />
                    <span>TypeScript</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiPostgresql className="skill-icon" />
                    <span>PostgreSQL</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiPrisma className="skill-icon" />
                    <span>Prisma ORM</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiRedis className="skill-icon" />
                    <span>Redis</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
              </div>
            </div>

            {/* DevOps & Tools */}
            <div className="skill-category">
              <h3 className="skill-category-title">DevOps & Tools</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaDocker className="skill-icon" />
                    <span>Docker</span>
                  </div>
                  <span className="skill-badge skill-badge--learning">Learning</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaGitAlt className="skill-icon" />
                    <span>Git</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiVercel className="skill-icon" />
                    <span>Vercel</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiRender className="skill-icon" />
                    <span>Render</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaCloud className="skill-icon" />
                    <span>Aiven</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
              </div>
            </div>

            {/* UI/UX & CMS */}
            <div className="skill-category">
              <h3 className="skill-category-title">UI/UX & CMS</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaFigma className="skill-icon" />
                    <span>Figma</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <SiCanva className="skill-icon" />
                    <span>Canva</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
                <div className="skill-item">
                  <div className="skill-item-left">
                    <FaWordpress className="skill-icon" />
                    <span>WordPress</span>
                  </div>
                  <span className="skill-badge skill-badge--familiar">Proficient</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-animate">
        <div className="container">
          <h2 className="section-title">Work with me</h2>
          <div className="contact-content">
            <div className="contact-left">
              <div className="contact-links">
                <a href="mailto:franciscarl.lingan@gmail.com" className="contact-link"
                  onClick={() => trackEvent('Contact', 'Click Email', 'franciscarl.lingan@gmail.com')}>
                  <FaEnvelope className="contact-icon" />
                  <span>franciscarl.lingan@gmail.com</span>
                </a>
                <a href="https://github.com/iskodemain" target="_blank" rel="noopener noreferrer" className="contact-link"
                  onClick={() => trackEvent('Contact', 'Click GitHub', 'GitHub Profile')}>
                  <FaGithub className="contact-icon" />
                  <span>GitHub Profile</span>
                </a>
                <a href="https://linkedin.com/in/francis-lingan" target="_blank" rel="noopener noreferrer" className="contact-link"
                  onClick={() => trackEvent('Contact', 'Click LinkedIn', 'LinkedIn Profile')}>
                  <FaLinkedin className="contact-icon" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
            <div className="contact-right">
              <h3 className="contact-cta">Got a vision? Let's bring it to life!</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <img src={assets.logo} alt="Logo" />
        </div>
      </footer>
    </div>
  );
};

export default Landing;
