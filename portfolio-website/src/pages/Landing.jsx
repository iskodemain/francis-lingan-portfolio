import React, { useState, useEffect, useRef } from 'react';
import './Landing.css';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar.jsx';
import { FaGithub,  FaLinkedin,  FaEnvelope, FaReact, FaCss3Alt, FaJs, FaNodeJs, FaFigma, FaGitAlt, FaArrowRight } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMysql, SiSequelize, SiCanva, SiVercel, SiRender } from 'react-icons/si';

const Landing = () => {
  const [loading, setLoading] = useState(true);

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

  const portfolioProjects = [
    {
      title: "Ordering With Inventory Monitoring System",
      tags: ["React", "CSS", "Express.js", "MySQL", "Sequelize"],
      description: "Web-based application for ordering and inventory monitoring for GAMJ General Merchandise",
      image: assets.project_1,
      link: "https://www.gamjgeneralmerchandise.store/"
    },
    {
      title: "Ordering System for Clothes Store",
      tags: ["React", "Express.js", "Tailwind CSS", "MySQL", "Sequelize"],
      description: "Web-based ordering system for a clothing store, featuring product management and order processing,",
      image: assets.project_2,
      link: "https://angle-online-store-customer.vercel.app/"
    },
    {
      title: "Library Management System",
      tags: ["React", "Tailwind CSS", "Express.js", "MySQL", "Sequelize"],
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
              <div key={index} className="projects-card">
                <div className="projects-image" style={{backgroundImage: `url(${project.image})`}}>
                  <div className="projects-overlay">
                    <div className="projects-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="projects-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="projects-info">
                  <h3 className="projects-title">{project.title}</h3>
                  <p className="projects-description">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects-link" >
                    View Project <FaArrowRight />
                  </a>
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
                <a href="mailto:franciscarl.lingan@gmail.com" className="contact-link">
                  <FaEnvelope className="contact-icon" />
                  <span>franciscarl.lingan@gmail.com</span>
                </a>
                <a href="https://github.com/iskodemain" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaGithub className="contact-icon" />
                  <span>GitHub Profile</span>
                </a>
                <a href="https://linkedin.com/in/francis-lingan" target="_blank" rel="noopener noreferrer" className="contact-link">
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