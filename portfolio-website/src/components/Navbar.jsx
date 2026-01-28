import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets.js';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'portfolio', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <img src={assets.logo} alt="Logo" />
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
          <li className={activeSection === 'home' ? 'active' : ''}>
            <a onClick={() => scrollToSection('home')}>Home</a>
          </li>
          <li className={activeSection === 'about' ? 'active' : ''}>
            <a onClick={() => scrollToSection('about')}>About</a>
          </li>
          <li className={activeSection === 'portfolio' ? 'active' : ''}>
            <a onClick={() => scrollToSection('portfolio')}>Portfolio</a>
          </li>
          <li className={activeSection === 'skills' ? 'active' : ''}>
            <a onClick={() => scrollToSection('skills')}>Skills & Tools</a>
          </li>
          <li className={activeSection === 'contact' ? 'active' : ''}>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </li>

          {isMobileMenuOpen && (
            <button className="mobile-close-btn" onClick={toggleMobileMenu}>
              <IoClose />
            </button>
          )}
        </ul>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <HiMenuAlt3 />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;