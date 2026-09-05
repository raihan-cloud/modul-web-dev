/* ==========================================================================
   DEVPATH — Main & Navigation Script (main.js)
   Sidebar mobile drawer, copy code snippets, active link tracking.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // Sidebar Mobile Toggle
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
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
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
      const pre = codeBlock ? codeBlock.querySelector('.code-block__pre') : null;
      if (!pre) return;

      const text = pre.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        btn.classList.add('code-block__copy--copied');

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('code-block__copy--copied');
        }, 2000);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          btn.classList.add('code-block__copy--copied');
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('code-block__copy--copied');
          }, 2000);
        } catch (e) {
          // ignore
        }
        document.body.removeChild(textarea);
      });
    });
  });

  // ========================================================================
  // Sidebar Active Link Highlight
  // ========================================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/^(\.\.\/|\.\/)+/, '').replace(/^\//, '');
    if (currentPath.endsWith(cleanHref) || (cleanHref === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && !currentPath.includes('/modules/') && !currentPath.includes('/lessons/'))) {
      link.classList.add('sidebar__link--active');
    }
  });
});
