/* ==========================================================================
   DEVPATH — App JavaScript
   Theme toggle, sidebar toggle, copy-to-clipboard, progress tracking.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // Theme Toggle (Dark / Light)
  // ========================================================================

  const THEME_KEY = 'devpath_theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update all theme toggle icons
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
        moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
      }
    });
  }

  // Apply initial theme
  applyTheme(getPreferredTheme());

  // Bind theme toggle buttons
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // ========================================================================
  // Sidebar Toggle (Mobile)
  // ========================================================================

  const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  const sidebar = document.querySelector('.sidebar, .lesson-sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('sidebar--open', 'lesson-sidebar--open');
    }
    if (sidebarOverlay) {
      sidebarOverlay.classList.add('sidebar-overlay--visible');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('sidebar--open', 'lesson-sidebar--open');
    }
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('sidebar-overlay--visible');
    }
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const isOpen = sidebar && (sidebar.classList.contains('sidebar--open') || sidebar.classList.contains('lesson-sidebar--open'));
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
  });

  // ========================================================================
  // Copy to Clipboard (Code Blocks)
  // ========================================================================

  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const pre = codeBlock.querySelector('.code-block__pre');
      if (!pre) return;

      const text = pre.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied`;
        btn.classList.add('code-block__copy--copied');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('code-block__copy--copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied`;
          btn.classList.add('code-block__copy--copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('code-block__copy--copied');
          }, 2000);
        } catch (e) {
          // silently fail
        }
        document.body.removeChild(textarea);
      });
    });
  });

  // ========================================================================
  // Sidebar link active state
  // ========================================================================

  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.?\/?/, '').replace(/^\//, ''))) {
      link.classList.add('sidebar__link--active');
    }
  });

});
