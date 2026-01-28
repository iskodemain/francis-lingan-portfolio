import React, { useState, useEffect, useRef } from 'react';
import './Landing.css';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar.jsx';
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaEnvelope,
  FaReact,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaNodeJs,
  FaFigma,
  FaGitAlt,
  FaArrowRight
} from 'react-icons/fa';
import { 
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiSequelize,
  SiCanva,
  SiVercel,
  SiRender
} from 'react-icons/si';

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioScroll, setPortfolioScroll] = useState(0);
  const portfolioRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Loading animation
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    if (loading) return;

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

  // Portfolio carousel drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - portfolioRef.current.offsetLeft);
    setScrollLeft(portfolioRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - portfolioRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    portfolioRef.current.scrollLeft = scrollLeft - walk;
  };

  const portfolioProjects = [
    {
      title: "Ordering With Inventory Monitoring System",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based application for ordering and inventory monitoring for GAMJ General Merchandise",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
      link: "https://github.com/iskodemain/gamj-general-merchandise"
    },
    {
      title: "Ordering System for Clothes Store",
      tags: ["React", "Express.js", "Tailwind CSS", "MySQL", "Sequelize"],
      description: "Web-based ordering system for a clothing store, featuring product management and order processing,",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop",
      link: "https://github.com/iskodemain/Angle-Online-Store"
    },
    {
      title: "Library Management System",
      tags: ["React", "Tailwind CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based library management system for managing books, borrowers, return and returns.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop",
      link: "https://github.com/Valiantic/Library-Management-System-"
    },
    {
      title: "Portfolio Website",
      tags: ["React", "CSS"],
      description: "Personal portfolio website showcasing projects, skills, and contact information.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
      link: "https://github.com/iskodemain/francis-lingan-portfolio"
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
            <p className="home-subtitle">Full Stack Developer and UI/UX Designer</p>
            <a 
              href={assets.resume} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-btn"
            >
              Check out my Resume
            </a>
          </div>
          <div className="home-image">
            <div className="profile-circle">
              <img src={assets.profile} alt="Francis Lingan" />
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
              I'm Francis Carl A. Lingan, a full-stack web developer and UI/UX designer 
              currently seeking an internship opportunity. I am a fourth-year college student 
              from Cavite State University - Carmona Campus.
            </p>
            <p className="about-text">
              With a passion for creating seamless digital experiences, I combine technical 
              expertise with creative design to build modern, responsive web applications 
              that solve real-world problems.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section section-animate">
        <div className="container">
          <h2 className="section-title">Portfolio</h2>
          <div 
            className="portfolio-carousel" 
            ref={portfolioRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {portfolioProjects.map((project, index) => (
              <div key={index} className="portfolio-card">
                <div className="portfolio-image" style={{backgroundImage: `url(${project.image})`}}>
                  <div className="portfolio-overlay">
                    <div className="portfolio-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="portfolio-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-description">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-link" >
                    View Project <FaArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="portfolio-hint">← Drag or scroll to explore projects →</p>
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
                  <FaReact className="skill-icon" />
                  <span>React.js</span>
                </div>
                <div className="skill-item">
                  <FaCss3Alt className="skill-icon" />
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <FaJs className="skill-icon" />
                  <span>JavaScript (ES6+)</span>
                </div>
                <div className="skill-item">
                  <SiTailwindcss className="skill-icon" />
                  <span>Tailwind CSS</span>
                </div>
                <div className="skill-item">
                  <FaBootstrap className="skill-icon" />
                  <span>Bootstrap</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="skill-category">
              <h3 className="skill-category-title">Backend Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <FaNodeJs className="skill-icon" />
                  <span>Node.js</span>
                </div>
                <div className="skill-item">
                  <SiExpress className="skill-icon" />
                  <span>Express.js</span>
                </div>
                <div className="skill-item">
                  <SiMysql className="skill-icon" />
                  <span>MySQL Database</span>
                </div>
                <div className="skill-item">
                  <SiSequelize className="skill-icon" />
                  <span>Sequelize ORM</span>
                </div>
              </div>
            </div>

            {/* UI/UX */}
            <div className="skill-category">
              <h3 className="skill-category-title">UI/UX Design</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <SiCanva className="skill-icon" />
                  <span>Canva</span>
                </div>
                <div className="skill-item">
                  <FaFigma className="skill-icon" />
                  <span>Figma</span>
                </div>
              </div>
            </div>

            {/* Deployment */}
            <div className="skill-category">
              <h3 className="skill-category-title">Deployment & Version Control</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <FaGithub className="skill-icon" />
                  <span>GitHub</span>
                </div>
                <div className="skill-item">
                  <FaGitAlt className="skill-icon" />
                  <span>Git</span>
                </div>
                <div className="skill-item">
                  <SiVercel className="skill-icon" />
                  <span>Vercel</span>
                </div>
                <div className="skill-item">
                  <SiRender className="skill-icon" />
                  <span>Render</span>
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
                <a href="mailto:francislingan.onlineclass.94@gmail.com" className="contact-link">
                  <FaEnvelope className="contact-icon" />
                  <span>francislingan.onlineclass.94@gmail.com</span>
                </a>
                <a href="https://github.com/iskodemain" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaGithub className="contact-icon" />
                  <span>GitHub Profile</span>
                </a>
                <a href="https://linkedin.com/in/francis-lingan" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaLinkedin className="contact-icon" />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://facebook.com/carl.lingan.2024" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaFacebook className="contact-icon" />
                  <span>Facebook Profile</span>
                </a>
              </div>
            </div>
            <div className="contact-right">
              <h3 className="contact-cta">Got a vision? Let's bring it to life!</h3>
              <a 
                href={assets.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resume-btn-secondary"
              >
                Check out my Resume
              </a>
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