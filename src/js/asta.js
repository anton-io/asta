/**
 * Asta - JavaScript Utilities
 *
 * Core framework utilities for maintaining grid alignment, theme management,
 * modals, and navigation. This is the main library for the Asta Design System.
 *
 * @author Antonio Roldao
 * @license MIT
 */

/**
 * CSS Class Names
 * Shared across asta.js and examples.js
 */
const CLASSES = {
  OPEN: 'open',
  VISIBLE: 'visible',
  DEBUG: 'debug',
  OFF_GRID: 'off-grid'
};

/**
 * Get the dimensions of a single grid cell.
 * @returns {{width: number, height: number}} Cell dimensions in pixels
 */
function gridCellDimensions() {
  const element = document.createElement("div");
  element.style.position = "fixed";
  element.style.height = "var(--line-height)";
  element.style.width = "1ch";
  document.body.appendChild(element);
  const rect = element.getBoundingClientRect();
  document.body.removeChild(element);
  return { width: rect.width, height: rect.height };
}

/**
 * Adjust media (img, video) padding to maintain grid alignment
 *
 * This function ensures that images and videos align properly with the
 * monospace grid by adding bottom padding to compensate for aspect ratio.
 */
function adjustMediaPadding() {
  const cell = gridCellDimensions();

  function setHeightFromRatio(media, ratio) {
    const rect = media.getBoundingClientRect();
    const realHeight = rect.width / ratio;
    const diff = cell.height - (realHeight % cell.height);
    media.style.setProperty("padding-bottom", `${diff}px`);
  }

  function setFallbackHeight(media) {
    const rect = media.getBoundingClientRect();
    const height = Math.round((rect.width / 2) / cell.height) * cell.height;
    media.style.setProperty("height", `${height}px`);
  }

  function onMediaLoaded(media) {
    var width, height;
    switch (media.tagName) {
      case "IMG":
        width = media.naturalWidth;
        height = media.naturalHeight;
        break;
      case "VIDEO":
        width = media.videoWidth;
        height = media.videoHeight;
        break;
    }
    if (width > 0 && height > 0) {
      setHeightFromRatio(media, width / height);
    } else {
      setFallbackHeight(media);
    }
  }

  const medias = document.querySelectorAll("img, video");
  for (media of medias) {
    switch (media.tagName) {
      case "IMG":
        if (media.complete) {
          onMediaLoaded(media);
        } else {
          media.addEventListener("load", () => onMediaLoaded(media));
          media.addEventListener("error", function() {
            setFallbackHeight(media);
          });
        }
        break;
      case "VIDEO":
        switch (media.readyState) {
          case HTMLMediaElement.HAVE_CURRENT_DATA:
          case HTMLMediaElement.HAVE_FUTURE_DATA:
          case HTMLMediaElement.HAVE_ENOUGH_DATA:
            onMediaLoaded(media);
            break;
          default:
            media.addEventListener("loadeddata", () => onMediaLoaded(media));
            media.addEventListener("error", function() {
              setFallbackHeight(media);
            });
            break;
        }
        break;
    }
  }
}

/**
 * Check if elements are properly aligned to the grid
 *
 * Adds 'off-grid' class to elements that don't align properly.
 * Only runs in debug mode.
 */
function checkOffsets() {
  const ignoredTagNames = new Set([
    "THEAD",
    "TBODY",
    "TFOOT",
    "TR",
    "TD",
    "TH",
  ]);
  const cell = gridCellDimensions();
  const elements = document.querySelectorAll("body :not(.debug-grid, .debug-toggle)");
  for (const element of elements) {
    if (ignoredTagNames.has(element.tagName)) {
      continue;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      continue;
    }
    const top = rect.top + window.scrollY;
    const offset = top % (cell.height / 2);
    if(offset > 0) {
      element.classList.add(CLASSES.OFF_GRID);
      console.error("Incorrect vertical offset for", element, "with remainder", top % cell.height, "when expecting divisible by", cell.height / 2);
    } else {
      element.classList.remove(CLASSES.OFF_GRID);
    }
  }
}

/**
 * Theme Management
 *
 * Handles dark/light mode switching with localStorage persistence
 */

const THEME_STORAGE_KEY = 'asta-theme';

/**
 * Get the current theme preference
 * @returns {string|null} 'light', 'dark', or null (system preference)
 */
function getTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

/**
 * Set the theme
 * @param {string|null} theme - 'light', 'dark', or null to use system preference
 */
function setTheme(theme) {
  const root = document.documentElement;

  if (theme === null) {
    localStorage.removeItem(THEME_STORAGE_KEY);
    root.removeAttribute('data-theme');
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    root.setAttribute('data-theme', theme);
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = getTheme();
  const root = document.documentElement;

  // Determine what theme is currently active (considering system preference).
  let activeTheme;
  if (currentTheme) {
    activeTheme = currentTheme;
  } else {
    // Check system preference.
    activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Toggle to the opposite.
  const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);

  return newTheme;
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
  // Apply saved theme on load.
  const savedTheme = getTheme();
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Setup theme toggle if present.
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    // Set initial state.
    const currentTheme = getTheme() ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    themeToggle.checked = currentTheme === 'dark';

    // Handle toggle.
    themeToggle.addEventListener("change", () => {
      const newTheme = toggleTheme();
      themeToggle.checked = newTheme === 'dark';
    });
  }
}

/**
 * Modal Management
 */

/**
 * Open a modal by ID
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add(CLASSES.OPEN);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

/**
 * Close a modal by ID
 * @param {string} modalId - The ID of the modal to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove(CLASSES.OPEN);
    document.body.style.overflow = ''; // Restore scrolling
  }
}

/**
 * Close modal on ESC key
 */
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const openModals = document.querySelectorAll(`.modal.${CLASSES.OPEN}`);
    openModals.forEach(modal => {
      modal.classList.remove(CLASSES.OPEN);
      document.body.style.overflow = '';
    });
  }
});

/**
 * Initialize navigation menu toggles
 */
function initNavMenus() {
  const navMenus = document.querySelectorAll('.nav-menu');

  navMenus.forEach(menu => {
    const toggle = menu.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle(CLASSES.OPEN);
      });

      // Close menu when clicking a link.
      const links = menu.querySelectorAll('.nav-list a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove(CLASSES.OPEN);
        });
      });
    }
  });
}

/**
 * Initialize the library
 * Call this function when the DOM is ready
 */
function initAsta() {
  // Initialize theme.
  initThemeToggle();

  // Adjust media padding on load and resize.
  adjustMediaPadding();
  window.addEventListener("load", adjustMediaPadding);
  window.addEventListener("resize", adjustMediaPadding);

  // Setup navigation menus.
  initNavMenus();
}

// Auto-initialize if DOM is ready, otherwise wait.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAsta);
} else {
  initAsta();
}

// Export for module usage.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gridCellDimensions,
    adjustMediaPadding,
    checkOffsets,
    getTheme,
    setTheme,
    toggleTheme,
    openModal,
    closeModal,
    initNavMenus,
    initAsta
  };
}
