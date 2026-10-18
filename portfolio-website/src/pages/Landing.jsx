import { useState, useEffect } from 'react';
import './Landing.css';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaCss3Alt, FaNodeJs, FaGitAlt, FaArrowRight, FaDocker, FaFigma, FaWordpress, FaCloud } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMysql, SiSequelize, SiCanva, SiVercel, SiRender, SiPostgresql, SiPrisma, SiRedis, SiTypescript } from 'react-icons/si';
import { trackPageView, trackEvent } from '../analytics.js';

// Module-level flag — persists across React navigation but resets on full page refresh
let hasLoadedOnce = false;

/* ── Carousel card for design projects ── */
const DesignCard = ({ project }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const total = project.slides.length;

  // Pick icon based on tool used
  const ToolIcon = project.tool === 'canva' ? SiCanva : FaFigma;

  // Auto-advance when hovered
  useEffect(() => {
    if (!isHovered) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 1200);
    return () => clearInterval(id);
  }, [isHovered, total]);

  // Touch swipe
  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent((c) => (c + 1) % total);
    else if (diff < -40) setCurrent((c) => (c - 1 + total) % total);
    setTouchStartX(null);
  };

  return (
    <div className="design-card">
      {/* Full-card slider */}
      <div
        className="design-card-slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        {project.slides.map((slide, i) => (
          <div
            key={i}
            className={`design-card-slide${i === current ? ' design-card-slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}

        {/* Category badge with tool icon */}
        <div className="design-card-overlay">
          <span className="design-card-category">
            <ToolIcon /> {project.category}
          </span>
        </div>

        {/* Dots */}
        <div className="design-carousel-dots">
          {project.slides.map((_, i) => (
            <button
              key={i}
              className={`design-carousel-dot${i === current ? ' design-carousel-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Card info below slider */}
      <div className="design-card-info">
        <h3 className="design-card-title">{project.title}</h3>
        <p className="design-card-description">{project.description}</p>
        <Link
          to={`/design/${project.id}`}
          state={{ from: 'design' }}
          className="design-card-link"
          onClick={() => trackEvent('Design Projects', 'Click View Project', project.title)}
        >
          View Project <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

const Landing = () => {
  // Skip loading if we've already shown it this session
  const [loading, setLoading] = useState(!hasLoadedOnce);

  useEffect(() => {
    if (loading) {
      // Start the loading timer only when loading is true
      const timer = setTimeout(() => {
        hasLoadedOnce = true;
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Once loading is done, track page view
    trackPageView('/', 'Francis Lingan - Portfolio');

    // If URL has a hash (returning from a project page), instantly show all
    // sections as already-animated, then scroll to the target section
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Immediately reveal all sections — user has already seen them
      document.querySelectorAll('.section-animate').forEach(el => {
        el.classList.add('animate-in');
      });
      // Then scroll to the target section
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'instant' });
      }, 50);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
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
      id: 'taravel',
      category: 'Travel Booking Platform · Full-Stack',
      title: "Taravel",
      tags: ["React", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL", "Prisma", "Redis"],
      description: "Web-based travel platform for discovering, booking, and managing travel accommodations and experiences.",
      image: assets.taravel_cover,
      inProgress: true
    },
    {
      id: 'gamj-ordering-system',
      category: 'Ordering & Inventory System · Full-Stack',
      title: "Ordering With Inventory Monitoring System",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based application for ordering and inventory monitoring for GAMJ General Merchandise",
      image: assets.gamj_cover,
    },
    {
      id: 'angle-ordering-system',
      category: 'Ordering System · Full-Stack',
      title: "Ordering System for Clothes Store",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based ordering system for a clothing store for Angle, featuring product management and order processing.",
      image: assets.angle_cover,
    },
    {
      id: 'library-management-system',
      category: 'Library Management System · Full-Stack',
      title: "Library Management System",
      tags: ["React", "CSS", "Tailwind CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based library management system for managing books, borrowers, return and returns.",
      image: assets.aurevia_cover,
    },
    {
      id: 'charina-portfolio',
      category: 'Portfolio Website · Frontend',
      title: "Charina Lingan Portfolio Website",
      tags: ["React", "CSS"],
      description: "Personal portfolio website showcasing projects, skills, and contact information.",
      image: assets.charina_cover,
    }
  ];

  const designProjects = [
    {
      id: 'taravel-ui-design',
      title: 'Taravel UI Design',
      category: 'Travel Booking Web App',
      tool: 'figma',
      description: 'A UI/UX design for a web-based travel platform for discovering, booking, and managing travel accommodations and experiences.',
      slides: [
        assets.taravel_cover,
        assets.taravel_1,
        assets.taravel_2
      ],
    },
    {
      id: 'gamj-ui-design',
      title: 'GAMJ General Merchandise UI Design',
      category: 'Ordering & Inventory System Web App',
      tool: 'figma',
      description: 'A UI/UX design for an ordering and inventory monitoring web application for GAMJ General Merchandise.',
      slides: [
        assets.gamj_cover,
        assets.gamj_1,
        assets.gamj_2
      ],
    },
    {
      id: 'angle-store-ui-design',
      title: 'Angle Clothing Store UI Design',
      category: 'Ordering System Web App',
      tool: 'figma',
      description: 'A UI/UX design for an online clothing store, emphasizing product discovery and a streamlined checkout flow.',
      slides: [
        assets.angle_cover,
        assets.angle_1,
        assets.angle_2
      ],
    },
    {
      id: 'alkansya-ui-design',
      title: 'Alkansya UI Design',
      category: 'Online Banking Mobile App',
      tool: 'figma',
      description: 'A UI/UX design for a mobile e-money app with a built-in financial tracker to send and receive money while managing income, expenses, liabilities, assets, cash flow, savings, and balance all in one place.',
      slides: [
        assets.alkansya_cover,
        assets.alkansya_1,
        assets.alkansya_2,
      ],
    },
    {
      id: 'tracita-ui-design',
      title: 'Tracita UI Design',
      category: 'Tracking System with AR Navigation Mobile App',
      tool: 'figma',
      description: 'A UI/UX design for a mobile tracking system with AR navigation for real-time public safety and disaster preparedness in Barangay Pacita 2, San Pedro Laguna.',
      slides: [
        assets.tracita_cover,
        assets.tracita_1,
        assets.tracita_2,
      ],
    },
    {
      id: 'sightaid-ui-design',
      title: 'SightAid UI Design',
      category: 'Visual Impairment Assistance Mobile App',
      tool: 'figma',
      description: 'A UI/UX design for a mobile app that helps visually impaired users read handwritten text using the camera and listen to it via text-to-speech in both Filipino and English.',
      slides: [
        assets.sightaid_cover,
        assets.sightaid_1,
        assets.sightaid_2,
      ],
    },
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
          <h2 className="section-title">Web Development Projects</h2>
          <div className="projects-grid">
            {portfolioProjects.map((project, index) => (
              <div key={index} className={`projects-card${project.inProgress ? ' projects-card--in-progress' : ''}`}>
                <div className="projects-image" style={{backgroundImage: `url(${project.image})`}}>
                  {/* Category badge — top left */}
                  <div className="projects-card-badge">
                    <span className="projects-card-category">{project.category}</span>
                  </div>
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
                  <Link
                    to={`/project/${project.id}`}
                    state={{ from: 'projects' }}
                    className="projects-link"
                    onClick={() => trackEvent('Projects', 'Click View Project', project.title)}>
                    View Project <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Projects Section */}
      <section id="design" className="design-section section-animate">
        <div className="container">
          <div className="design-section-header">
            <h2 className="section-title">UI/UX Design Projects</h2>
          </div>
          <div className="design-grid">
            {designProjects.map((project) => (
              <DesignCard key={project.id} project={project} />
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
