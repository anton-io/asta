/**
 * Examples - Documentation Page Utilities
 *
 * JavaScript specifically for the index.html documentation page.
 * Handles code example toggles, copy buttons, and demo functionality.
 *
 * @author Antonio Roldao
 * @license MIT
 */

/**
 * SVG Icons for code examples.
 */
const ICONS = {
  CODE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>`,
  CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>`,
  COPY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>`,
  CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>`
};

/**
 * CSS Class Names - reuse from asta.js.
 * Note: CLASSES is already defined in asta.js which loads first.
 */

/**
 * Initialize example code toggles and copy buttons.
 */
function initExamples() {
  const examples = document.querySelectorAll('.example');

  examples.forEach(example => {
    const toggle = example.querySelector('.example-toggle');
    const code = example.querySelector('.example-code');

    if (toggle && code) {
      // Check if example is already open by default.
      const isOpen = example.classList.contains(CLASSES.OPEN);

      // Set initial icon based on open state.
      toggle.innerHTML = isOpen ? ICONS.CLOSE : ICONS.CODE;
      toggle.setAttribute('aria-label', isOpen ? 'Hide code' : 'Show code');

      // If open by default, mark code as visible for toggle functionality.
      if (isOpen) {
        code.classList.add(CLASSES.VISIBLE);
      }

      toggle.addEventListener('click', () => {
        code.classList.toggle(CLASSES.VISIBLE);
        const isVisible = code.classList.contains(CLASSES.VISIBLE);
        toggle.innerHTML = isVisible ? ICONS.CLOSE : ICONS.CODE;
        toggle.setAttribute('aria-label', isVisible ? 'Hide code' : 'Show code');

        // Also toggle the open class on the parent example.
        if (isVisible) {
          example.classList.add(CLASSES.OPEN);
        } else {
          example.classList.remove(CLASSES.OPEN);
        }
      });

      // Add copy button to code section.
      const pre = code.querySelector('pre');
      if (pre) {
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-button';
        copyButton.innerHTML = ICONS.COPY;
        copyButton.setAttribute('aria-label', 'Copy code');

        copyButton.addEventListener('click', async () => {
          const codeText = pre.querySelector('code').textContent;
          try {
            await navigator.clipboard.writeText(codeText);
            copyButton.innerHTML = ICONS.CHECK;
            copyButton.setAttribute('aria-label', 'Copied!');
            setTimeout(() => {
              copyButton.innerHTML = ICONS.COPY;
              copyButton.setAttribute('aria-label', 'Copy code');
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });

        code.style.position = 'relative';
        code.appendChild(copyButton);
      }
    }
  });
}

/**
 * Initialize debug toggle
 */
function initDebugToggle() {
  const debugToggle = document.querySelector(".debug-toggle");
  if (debugToggle) {
    function onDebugToggle() {
      document.body.classList.toggle(CLASSES.DEBUG, debugToggle.checked);
      if (debugToggle.checked && typeof checkOffsets === 'function') {
        checkOffsets();
      }
    }
    debugToggle.addEventListener("change", onDebugToggle);
    onDebugToggle();
  }
}

/**
 * Initialize "How to Use" demo functionality.
 */
function initDemo() {
  const demoButton = document.getElementById('demo-button');
  const demoInput = document.getElementById('demo-input');
  const demoModalText = document.getElementById('demo-modal-text');

  if (demoButton && demoInput && demoModalText) {
    const showModal = () => {
      const text = demoInput.value.trim();
      demoModalText.textContent = text || 'Please type something first!';
      if (typeof openModal === 'function') {
        openModal('demo-modal');
      }
    };

    demoButton.onclick = showModal;

    // Allow Enter key to trigger the modal.
    demoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        showModal();
      }
    });
  }
}

/**
 * Initialize all example page functionality.
 */
function initExamplesPage() {
  initExamples();
  initDebugToggle();
  initDemo();
}

// Auto-initialize if DOM is ready, otherwise wait.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExamplesPage);
} else {
  initExamplesPage();
}

// Export for module usage.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initExamples,
    initDebugToggle,
    initDemo,
    initExamplesPage
  };
}
