import ReactGA from 'react-ga4';

// Replace with your actual Measurement ID from Google Analytics
const MEASUREMENT_ID = 'G-6QLS22YNSB';

/**
 * Initialize Google Analytics
 * Call this once when the app loads
 */
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

/**
 * Track a page view
 * @param {string} path - The page path (e.g. '/')
 * @param {string} title - The page title
 */
export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title,
  });
};

/**
 * Track a custom click event
 * @param {string} category - Event category (e.g. 'Projects')
 * @param {string} action - Event action (e.g. 'Click View Project')
 * @param {string} label - Event label (e.g. project title)
 */
export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
