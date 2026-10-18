import { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets.js';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const SECTIONS = ['home', 'about', 'projects', 'skills', 'contact'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to section smoothly
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately reveal all section-animate elements so nothing is invisible
      document.querySelectorAll('.section-animate').forEach(el => {
        el.classList.add('animate-in');
      });
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // On mount — if URL has a hash, scroll to that section
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && SECTIONS.includes(hash)) {
      // Small delay to let the page render first
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, []);

  // On scroll — update active section and URL hash
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 120;
      let current = 'home';

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          if (scrollPosition >= element.offsetTop) {
            current = section;
          }
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
        // Update URL hash without adding to browser history
        const newHash = current === 'home' ? '' : `#${current}`;
        window.history.replaceState(null, '', `/${newHash}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Handle browser back/forward and manual hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const target = SECTIONS.includes(hash) ? hash : 'home';
      scrollToSection(target);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <img src={assets.logo} alt="Logo" />
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
          {SECTIONS.map((section) => (
            <li key={section} className={activeSection === section ? 'active' : ''}>
              <a onClick={() => scrollToSection(section)}>
                {section === 'skills' ? 'Skills & Tools' : section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}

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
