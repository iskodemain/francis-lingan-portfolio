import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaFigma, FaExternalLinkAlt, FaGithub, FaLock } from 'react-icons/fa';
import { SiCanva } from 'react-icons/si';
import './ProjectDetail.css';
import { assets } from '../assets/assets.js';

// ── Web Development Projects ──
const webProjects = [
  {
    id: 'taravel',
    title: 'Taravel',
    category: 'Travel Booking Platform · Full-Stack',
    type: 'web',
    description:
      'A web-based travel platform for discovering, booking, and managing travel accommodations and experiences. Built with React, TypeScript, Express.js, PostgreSQL, Prisma, and Redis.',
    coverImage: assets.taravel_cover,
    liveLink: 'https://taravel-silk.vercel.app/',
    githubLink: null, // private repo
    inProgress: true,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis'],
    videoDemo: null, // add YouTube embed URL when ready
    screenshots: [
      { label: 'Homepage', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop' },
      { label: 'Listings', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop' },
      { label: 'Booking Flow', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'gamj-ordering-system',
    title: 'Ordering With Inventory Monitoring System',
    category: 'Ordering & Inventory System · Full-Stack',
    type: 'web',
    description:
      'A web-based application for ordering and inventory monitoring built for GAMJ General Merchandise. Features real-time inventory tracking, order management, and reporting.',
    coverImage: assets.gamj_cover,
    liveLink: 'https://www.gamjgeneralmerchandise.store/',
    githubLink: 'https://github.com/iskodemain/gamj-general-merchandise',
    tags: ['React', 'CSS', 'Express.js', 'MySQL', 'Sequelize'],
    videoDemo: null,
    screenshots: [
      { label: 'Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop' },
      { label: 'Order Management', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop' },
      { label: 'Inventory View', image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'angle-ordering-system',
    title: 'Ordering System for Clothes Store',
    category: 'Ordering System · Full-Stack',
    type: 'web',
    description:
      'A web-based ordering system for Angle clothing store, featuring product management, order processing, and customer management.',
    coverImage: assets.angle_cover,
    liveLink: 'https://angle-online-store-customer.vercel.app/',
    githubLink: 'https://github.com/iskodemain/Angle-Online-Store',
    tags: ['React', 'CSS', 'Express.js', 'MySQL', 'Sequelize'],
    videoDemo: null,
    screenshots: [
      { label: 'Homepage', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=500&fit=crop' },
      { label: 'Product Listing', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop' },
      { label: 'Order Flow', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'library-management-system',
    title: 'Library Management System',
    category: 'Library Management System · Full-Stack',
    type: 'web',
    description:
      'A web-based library management system for managing books, borrowers, and returns. Includes book catalog, borrower records, and overdue tracking.',
    coverImage: assets.aurevia_cover,
    liveLink: null, // no live deployment
    githubLink: 'https://github.com/Valiantic/Library-Management-System-',
    tags: ['React', 'CSS', 'Tailwind CSS', 'Express.js', 'MySQL', 'Sequelize'],
    videoDemo: null,
    screenshots: [
      { label: 'Book Catalog', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop' },
      { label: 'Borrower Records', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop' },
      { label: 'Returns', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'charina-portfolio',
    title: 'Charina Lingan Portfolio Website',
    category: 'Portfolio Website · Frontend',
    type: 'web',
    description:
      'A personal portfolio website for Charina Lingan, showcasing projects, skills, and contact information. Built with React and CSS.',
    coverImage: assets.charina_cover,
    liveLink: 'https://charina-lingan-portfolio.vercel.app',
    githubLink: 'https://github.com/iskodemain/charina-lingan-portfolio',
    tags: ['React', 'CSS'],
    videoDemo: null,
    screenshots: [
      { label: 'Homepage', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop' },
      { label: 'Projects', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop' },
      { label: 'Contact', image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=500&fit=crop' },
    ],
  },
];

// ── UI/UX Design Projects ──
const designProjects = [
  {
    id: 'taravel-ui-design',
    title: 'Taravel UI Design',
    category: 'Travel Booking Web App',
    type: 'design',
    tool: 'figma',
    description: 'A UI/UX design for a web-based travel platform for discovering, booking, and managing travel accommodations and experiences.',
    coverImage: assets.taravel_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/NOrCtMuXxeGmgk9OCeDDzl/TARAVEL?node-id=0-1&t=2glsi7RmvUnpwPdY-1',
    screenshots: [
      { label: 'Screen 1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'gamj-ui-design',
    title: 'GAMJ General Merchandise UI Design',
    category: 'Ordering & Inventory System Web App',
    type: 'design',
    tool: 'figma',
    description:
      'A UI/UX design for an ordering and inventory monitoring web application for GAMJ General Merchandise. The design focuses on clean navigation, intuitive order flow, and real-time inventory visibility.',
    coverImage: assets.gamj_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/3fiHAJshSZmu7RJ0e18Uq5/ORDERING-WITH-INVENTORY-MONITORING-SYSTEM-FOR-GAMJ-GENERAL-MERCHANDISE?node-id=0-1&t=MPJKhgm1G1SZTDiP-1',
    screenshots: [
      { label: 'Dashboard Overview', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop' },
      { label: 'Order Management', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop' },
      { label: 'Inventory Monitoring', image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'angle-store-ui-design',
    title: 'Angle Clothing Store UI Design',
    category: 'Ordering System Web App',
    type: 'design',
    tool: 'figma',
    description:
      'A UI/UX design for an online clothing store, emphasizing product discovery, a seamless browsing experience, and a streamlined checkout flow.',
    coverImage: assets.angle_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/5D8E5JAwxzhUq0i2J63FMz/AOS-SYSTEM?node-id=0-1&t=UyjtnEQzh062ug63-1',
    screenshots: [
      { label: 'Homepage', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=500&fit=crop' },
      { label: 'Product Listing', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop' },
      { label: 'Checkout Flow', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'alkansya-ui-design',
    title: 'Alkansya UI Design',
    category: 'Online Banking Mobile App',
    type: 'design',
    tool: 'figma',
    description: 'A UI/UX design for a mobile e-money application with a unique built-in financial tracker. It allows users to send and receive money while also monitoring and managing their income, expenses, liabilities, assets, cash flow, savings, and overall balance — all within a single, easy-to-use platform.',
    coverImage: assets.alkansya_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/ni84eS56LblWF1A0CPCZew/Alkansya-Online-Banking-App?node-id=0-1&t=FKVSrD6B8LqUxvVg-1',
    screenshots: [
      { label: 'Screen 1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'tracita-ui-design',
    title: 'Tracita UI Design',
    category: 'Tracking System with AR Navigation Mobile App',
    type: 'design',
    tool: 'figma',
    description: 'A UI/UX design for a mobile-based tracking system with Augmented Reality (AR) navigation developed for public safety and disaster preparedness in Barangay Pacita 2, San Pedro Laguna. The app provides real-time, detailed location updates to help barangay officials and residents respond quickly during emergencies and disasters.',
    coverImage: assets.tracita_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/vDYBCOgGclEk4fj8dftRLy/TRACITA--A-MOBILE-BASED-TRACKING-SYSTEM-WITH-AR-NAVIGATION-FOR-PUBLIC-SAFETY-AND-DISASTER-PREPAREDNE?node-id=0-1&t=Zf8ewtJ6TPBH3T9j-1',
    screenshots: [
      { label: 'Screen 1', image: assets.tracita_1 },
      { label: 'Screen 2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
    ],
  },
  {
    id: 'sightaid-ui-design',
    title: 'SightAid UI Design',
    category: 'Visual Impairment Assistance Mobile App',
    type: 'design',
    tool: 'figma',
    description: 'A UI/UX design for a mobile app that helps visually impaired users read handwritten text using their phone camera. The app recognizes and digitizes handwritten content, then converts it to speech via a text-to-speech (TTS) system supporting both Filipino and English. Designed to be simple, accessible, and inclusive — improving communication, learning, and everyday interaction for people with visual deficiencies.',
    coverImage: assets.sightaid_cover,
    videoDemo: null,
    designLink: 'https://www.figma.com/design/XkvrGKDuFeSkxmuio0CbLy/Mobile-App-for-Visual-Impairment?node-id=23-309&t=JrK8F8edIMkdpie2-1',
    screenshots: [
      { label: 'Screen 1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
      { label: 'Screen 3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop' },
    ],
  },
];

const allProjects = [...webProjects, ...designProjects];

// ── Action Buttons for web projects ──
const WebProjectActions = ({ project }) => {
  const hasLive = !!project.liveLink;
  const hasGithub = !!project.githubLink;

  return (
    <div className="project-detail-actions">

      {/* Live Demo Button */}
      {hasLive ? (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-detail-btn project-detail-btn--primary"
        >
          <FaExternalLinkAlt />
          {project.inProgress ? 'View Live (In Progress)' : 'View Live'}
        </a>
      ) : (
        <button className="project-detail-btn project-detail-btn--disabled" disabled>
          <FaExternalLinkAlt />
          {project.inProgress ? 'Live Coming Soon' : 'Live Unavailable'}
        </button>
      )}

      {/* GitHub Button */}
      {hasGithub ? (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-detail-btn project-detail-btn--secondary"
        >
          <FaGithub /> View on GitHub
        </a>
      ) : (
        <button className="project-detail-btn project-detail-btn--disabled" disabled>
          <FaLock /> Private Repository
        </button>
      )}

    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = allProjects.find((p) => p.id === id);

  // Always scroll to top when entering a project page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!project) {
    navigate('/');
    return null;
  }

  const isDesign = project.type === 'design';
  const ToolIcon = project.tool === 'canva' ? SiCanva : FaFigma;
  const toolLabel = project.tool === 'canva' ? 'View in Canva' : 'View in Figma';

  // Navigate back to the section the user came from
  const handleBack = () => {
    const from = location.state?.from;
    if (from) {
      navigate(`/#${from}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="project-detail-page">

      {/* Back Button */}
      <button className="project-detail-back" onClick={handleBack}>
        <FaArrowLeft /> Back to Portfolio
      </button>

      {/* Hero Cover */}
      <div
        className="project-detail-cover"
        style={{ backgroundImage: `url(${project.coverImage})` }}
      >
        <div className="project-detail-cover-overlay">
          <span className="project-detail-category">
            {isDesign ? <ToolIcon /> : null} {project.category}
            {project.inProgress && <span className="project-detail-wip">🚧 In Progress</span>}
          </span>
          <h1 className="project-detail-title">{project.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="project-detail-content">

        {/* Tags */}
        {project.tags && (
          <div className="project-detail-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-detail-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="project-detail-description">{project.description}</p>

        {/* Video Demo — both web and design projects */}
        <h2 className="project-detail-section-title">Video Demo</h2>
        <div className="project-detail-video-wrapper">
          {project.videoDemo ? (
            <iframe
              src={project.videoDemo}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="project-detail-video"
            />
          ) : (
            <div className="project-detail-video-placeholder">
              <span>🎬 Video demo coming soon</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isDesign ? (
          <div className="project-detail-actions">
            <a
              href={project.designLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-btn project-detail-btn--primary"
            >
              <ToolIcon /> {toolLabel}
            </a>
          </div>
        ) : (
          <WebProjectActions project={project} />
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;


