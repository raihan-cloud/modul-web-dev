/* ==========================================================================
   DEVPATH — Dynamic Progress & Learning Engine (progress.js)
   Single Source of Truth via localStorage (key: devpath-progress)
   Handles lesson completion, streaks, XP, module & overall calculations.
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'devpath-progress';

  // 18 Total Lessons Metadata Directory
  const LESSONS_DIRECTORY = [
    // Module 01: HTML5 (6 lessons)
    { id: 'html-semantic', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.1 Struktur Semantik & Hierarki SEO', url: 'lessons/semantic-html.html', duration: '20 min', nextLessonId: 'html-accessibility' },
    { id: 'html-accessibility', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.2 Aksesibilitas (a11y) & ARIA Attributes', url: 'lessons/accessibility.html', duration: '20 min', nextLessonId: 'html-forms' },
    { id: 'html-forms', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.3 Form & Validasi Bawaan Lanjutan', url: 'lessons/forms.html', duration: '25 min', nextLessonId: 'html-media' },
    { id: 'html-media', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.4 Optimasi Media & Mencegah CLS', url: 'lessons/media.html', duration: '20 min', nextLessonId: 'html-open-graph' },
    { id: 'html-open-graph', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.5 Open Graph & Social Meta Tags', url: 'lessons/open-graph.html', duration: '15 min', nextLessonId: 'html-data-attributes' },
    { id: 'html-data-attributes', moduleId: 'html5', moduleTitle: 'HTML5 Fundamentals', title: '1.6 Data Attributes & Custom State', url: 'lessons/data-attributes.html', duration: '20 min', nextLessonId: 'css-variables' },

    // Module 02: CSS3 (6 lessons)
    { id: 'css-variables', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.1 CSS Variables & Dark Mode System', url: 'lessons/css-variables.html', duration: '25 min', nextLessonId: 'css-flexbox-grid' },
    { id: 'css-flexbox-grid', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.2 Flexbox vs CSS Grid Mastery', url: 'lessons/flexbox-grid.html', duration: '30 min', nextLessonId: 'css-fluid-typography' },
    { id: 'css-fluid-typography', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.3 Fluid Typography dengan clamp()', url: 'lessons/fluid-typography.html', duration: '20 min', nextLessonId: 'css-animations' },
    { id: 'css-animations', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.4 CSS Animations & Glassmorphism UI', url: 'lessons/animations.html', duration: '25 min', nextLessonId: 'css-container-queries' },
    { id: 'css-container-queries', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.5 Container Queries (@container)', url: 'lessons/container-queries.html', duration: '25 min', nextLessonId: 'css-bem' },
    { id: 'css-bem', moduleId: 'css3', moduleTitle: 'CSS3 Modern Layout', title: '2.6 Metode BEM & Clean Architecture', url: 'lessons/bem.html', duration: '25 min', nextLessonId: 'js-es6-modules' },

    // Module 03: JavaScript (6 lessons)
    { id: 'js-es6-modules', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.1 Loading Strategy Modern & ES6 Modules', url: 'lessons/es6-modules.html', duration: '25 min', nextLessonId: 'js-es6-syntax' },
    { id: 'js-es6-syntax', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.2 Syntax Modern (Shorthand ES6+)', url: 'lessons/es6-syntax.html', duration: '30 min', nextLessonId: 'js-dom-manipulation' },
    { id: 'js-dom-manipulation', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.3 DOM Selection & Class Manipulation', url: 'lessons/dom-manipulation.html', duration: '30 min', nextLessonId: 'js-event-delegation' },
    { id: 'js-event-delegation', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.4 Event Delegation (Arsitektur Event)', url: 'lessons/event-delegation.html', duration: '30 min', nextLessonId: 'js-async-fetch' },
    { id: 'js-async-fetch', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.5 Asynchronous JS & Fetch API', url: 'lessons/async-fetch.html', duration: '35 min', nextLessonId: 'js-local-storage' },
    { id: 'js-local-storage', moduleId: 'javascript', moduleTitle: 'JavaScript ES6+', title: '3.6 State Persistence via localStorage', url: 'lessons/local-storage.html', duration: '30 min', nextLessonId: null }
  ];

  const MODULES_DIRECTORY = [
    { id: 'html5', number: '01', title: 'HTML5 Fundamentals', lessonCount: 6, duration: '120 min', desc: 'Semantic HTML, accessibility, forms, media optimization, Open Graph, dan data attributes.' },
    { id: 'css3', number: '02', title: 'CSS3 Modern Layout', lessonCount: 6, duration: '150 min', desc: 'CSS Variables, Flexbox, Grid, fluid typography, animations, container queries, dan BEM.' },
    { id: 'javascript', number: '03', title: 'JavaScript ES6+', lessonCount: 6, duration: '180 min', desc: 'Modern syntax, DOM manipulation, event delegation, async/await, Web Storage, dan ES Modules.' }
  ];

  function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getInitialProgress() {
    return {
      startedLessons: [],
      completedLessons: [],
      quizScores: {},
      lastLesson: null,
      xp: 0,
      streak: 1,
      lastActivityDate: getTodayDateString()
    };
  }

  function getProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = getInitialProgress();
        saveProgress(initial);
        return initial;
      }
      const parsed = JSON.parse(raw);
      // Ensure all keys exist
      return {
        startedLessons: Array.isArray(parsed.startedLessons) ? parsed.startedLessons : [],
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
        lastLesson: parsed.lastLesson || null,
        xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
        streak: typeof parsed.streak === 'number' ? parsed.streak : 1,
        lastActivityDate: parsed.lastActivityDate || getTodayDateString()
      };
    } catch (e) {
      console.error('Failed to parse devpath-progress:', e);
      return getInitialProgress();
    }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom event so any component on the page can listen for progress changes
      window.dispatchEvent(new CustomEvent('devpath:progress-updated', { detail: data }));
    } catch (e) {
      console.error('Failed to save devpath-progress:', e);
    }
  }

  function checkAndUpdateStreak(data) {
    const today = getTodayDateString();
    const lastDate = data.lastActivityDate;

    if (!lastDate) {
      data.lastActivityDate = today;
      data.streak = 1;
      return;
    }

    if (lastDate === today) {
      // Same day, streak unchanged
      return;
    }

    const last = new Date(lastDate);
    const now = new Date(today);
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      data.streak += 1;
    } else if (diffDays > 1) {
      data.streak = 1;
    }
    data.lastActivityDate = today;
  }

  function getLessonById(lessonId) {
    return LESSONS_DIRECTORY.find(l => l.id === lessonId) || null;
  }

  function markLessonStarted(lessonId) {
    const lesson = getLessonById(lessonId);
    if (!lesson) return;

    const data = getProgress();
    checkAndUpdateStreak(data);

    if (!data.startedLessons.includes(lessonId)) {
      data.startedLessons.push(lessonId);
    }

    data.lastLesson = {
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      moduleTitle: lesson.moduleTitle,
      url: lesson.url
    };

    saveProgress(data);
  }

  function markLessonCompleted(lessonId) {
    const lesson = getLessonById(lessonId);
    if (!lesson) return;

    const data = getProgress();
    checkAndUpdateStreak(data);

    if (!data.startedLessons.includes(lessonId)) {
      data.startedLessons.push(lessonId);
    }

    let isNewCompletion = false;
    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId);
      data.xp += 100; // +100 XP per lesson
      isNewCompletion = true;
    }

    data.lastLesson = {
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      moduleTitle: lesson.moduleTitle,
      url: lesson.url
    };

    saveProgress(data);
    return isNewCompletion;
  }

  function recordQuizScore(lessonOrQuizId, score) {
    const data = getProgress();
    checkAndUpdateStreak(data);

    const prevScore = data.quizScores[lessonOrQuizId] || 0;
    data.quizScores[lessonOrQuizId] = score;

    // Award +50 XP if first time or improved
    if (score >= 80 && prevScore < 80) {
      data.xp += 50;
    }

    saveProgress(data);
  }

  function isLessonCompleted(lessonId) {
    const data = getProgress();
    return data.completedLessons.includes(lessonId);
  }

  function isLessonStarted(lessonId) {
    const data = getProgress();
    return data.startedLessons.includes(lessonId);
  }

  function getLessonStatus(lessonId) {
    if (isLessonCompleted(lessonId)) return 'completed';
    if (isLessonStarted(lessonId)) return 'in-progress';
    return 'not-started';
  }

  function getModuleProgress(moduleId) {
    const moduleLessons = LESSONS_DIRECTORY.filter(l => l.moduleId === moduleId);
    const data = getProgress();
    const completed = moduleLessons.filter(l => data.completedLessons.includes(l.id)).length;
    const total = moduleLessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }

  function getOverallProgress() {
    const data = getProgress();
    const total = LESSONS_DIRECTORY.length; // 18
    const completed = data.completedLessons.length;
    const percentage = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    return { completed, total, percentage };
  }

  function getRecommendedNextLesson(moduleId = null) {
    const data = getProgress();
    let pool = LESSONS_DIRECTORY;
    if (moduleId) {
      pool = LESSONS_DIRECTORY.filter(l => l.moduleId === moduleId);
    }
    // Find the first uncompleted lesson
    const next = pool.find(l => !data.completedLessons.includes(l.id));
    return next || pool[0];
  }

  function resetAllProgress() {
    const initial = getInitialProgress();
    saveProgress(initial);
    return initial;
  }

  // ========================================================================
  // DOM Sync Functions for Dashboard & Pages
  // ========================================================================

  function getRelativePrefix() {
    const path = window.location.pathname;
    if (path.includes('/lessons/') || path.includes('/modules/') || path.includes('/playground/') || path.includes('/quiz/') || path.includes('/progress/') || path.includes('/resources/')) {
      return '../';
    }
    return '';
  }

  function syncDashboardUI() {
    const overall = getOverallProgress();
    const data = getProgress();
    const prefix = getRelativePrefix();

    // 1. Overall progress widgets
    const overallBar = document.getElementById('dash-overall-bar');
    const overallPercent = document.getElementById('dash-overall-percent');
    const overallText = document.getElementById('dash-overall-text');
    if (overallBar) overallBar.style.width = `${overall.percentage}%`;
    if (overallPercent) overallPercent.textContent = `${overall.percentage}%`;
    if (overallText) overallText.textContent = `${overall.completed} of ${overall.total} lessons completed`;

    // 2. Stats
    const streakVal = document.getElementById('dash-stat-streak');
    const xpVal = document.getElementById('dash-stat-xp');
    const completedVal = document.getElementById('dash-stat-completed');
    if (streakVal) streakVal.textContent = `${data.streak} Days 🔥`;
    if (xpVal) xpVal.textContent = `${data.xp} XP ⚡`;
    if (completedVal) completedVal.textContent = `${overall.completed} / ${overall.total}`;

    // 3. Continue Learning Card
    const continueWrap = document.getElementById('dash-continue-card');
    if (continueWrap) {
      let targetLesson = null;
      if (data.lastLesson && data.lastLesson.id) {
        targetLesson = getLessonById(data.lastLesson.id);
      }
      if (!targetLesson) {
        targetLesson = getRecommendedNextLesson();
      }

      const status = getLessonStatus(targetLesson.id);
      const statusText = status === 'completed' ? '✓ Completed' : (status === 'in-progress' ? '◐ In Progress' : '○ Not Started');
      const moduleProg = getModuleProgress(targetLesson.moduleId);

      const titleEl = document.getElementById('dash-continue-title');
      const modBadge = document.getElementById('dash-continue-mod-badge');
      const statusEl = document.getElementById('dash-continue-status');
      const barEl = document.getElementById('dash-continue-bar');
      const btnEl = document.getElementById('dash-continue-btn');

      if (titleEl) titleEl.textContent = targetLesson.title;
      if (modBadge) modBadge.textContent = targetLesson.moduleTitle;
      if (statusEl) statusEl.textContent = statusText;
      if (barEl) barEl.style.width = `${moduleProg.percentage}%`;
      if (btnEl) {
        btnEl.setAttribute('href', `${prefix}${targetLesson.url}`);
        btnEl.textContent = status === 'completed' ? 'Review Lesson →' : (status === 'in-progress' ? 'Continue Learning →' : 'Start Lesson →');
      }
    }

    // 4. Module cards on Dashboard
    MODULES_DIRECTORY.forEach(mod => {
      const prog = getModuleProgress(mod.id);
      const bar = document.getElementById(`dash-mod-bar-${mod.id}`);
      const badge = document.getElementById(`dash-mod-badge-${mod.id}`);
      const compText = document.getElementById(`dash-mod-completed-${mod.id}`);
      const btn = document.getElementById(`dash-mod-btn-${mod.id}`);

      if (bar) bar.style.width = `${prog.percentage}%`;
      if (badge) badge.textContent = `${prog.percentage}% Complete`;
      if (compText) compText.textContent = `${prog.completed} / ${prog.total} completed`;
      if (btn) {
        btn.textContent = prog.percentage === 100 ? 'Review Module →' : (prog.percentage > 0 ? 'Continue →' : 'Start Module →');
      }
    });
  }

  function syncModuleDetailUI(moduleId) {
    const prog = getModuleProgress(moduleId);
    const data = getProgress();

    // Update Header progress
    const bar = document.getElementById('module-progress-bar');
    const badge = document.getElementById('module-progress-badge');
    const compText = document.getElementById('module-completed-text');
    if (bar) bar.style.width = `${prog.percentage}%`;
    if (badge) badge.textContent = `${prog.percentage}% Selesai`;
    if (compText) compText.textContent = `${prog.completed} dari ${prog.total} Materi Selesai`;

    // Update each lesson item
    const moduleLessons = LESSONS_DIRECTORY.filter(l => l.moduleId === moduleId);
    moduleLessons.forEach(l => {
      const itemEl = document.querySelector(`[data-lesson-id="${l.id}"]`);
      if (!itemEl) return;

      const status = getLessonStatus(l.id);
      itemEl.classList.remove('lesson-list__item--completed', 'lesson-list__item--active', 'lesson-list__item--not-started');

      const numEl = itemEl.querySelector('.lesson-list__number');
      const badgeEl = itemEl.querySelector('.lesson-item-badge');

      if (status === 'completed') {
        itemEl.classList.add('lesson-list__item--completed');
        if (numEl) numEl.innerHTML = '&#10003;';
        if (badgeEl) {
          badgeEl.className = 'badge badge--success lesson-item-badge';
          badgeEl.textContent = 'Selesai';
        }
      } else if (status === 'in-progress') {
        itemEl.classList.add('lesson-list__item--active');
        if (numEl) numEl.textContent = l.id.split('-')[1].substring(0, 2).toUpperCase();
        if (badgeEl) {
          badgeEl.className = 'badge badge--accent lesson-item-badge';
          badgeEl.textContent = 'Sedang Berjalan';
        }
      } else {
        if (badgeEl) {
          badgeEl.className = 'badge badge--default lesson-item-badge';
          badgeEl.textContent = 'Belum Dimulai';
        }
      }
    });
  }

  function syncLessonPlayerSidebar(moduleId, activeLessonId) {
    const prog = getModuleProgress(moduleId);
    const data = getProgress();

    // Module Progress in Sidebar
    const sideBar = document.getElementById('lesson-sidebar-progress-bar');
    const sidePercent = document.getElementById('lesson-sidebar-progress-percent');
    if (sideBar) sideBar.style.width = `${prog.percentage}%`;
    if (sidePercent) sidePercent.textContent = `${prog.percentage}%`;

    // Sidebar items
    const moduleLessons = LESSONS_DIRECTORY.filter(l => l.moduleId === moduleId);
    moduleLessons.forEach((l, idx) => {
      const item = document.querySelector(`[data-sidebar-lesson-id="${l.id}"]`);
      if (!item) return;

      const status = getLessonStatus(l.id);
      const isCurrent = l.id === activeLessonId;

      item.classList.remove('lesson-sidebar__item--completed', 'lesson-sidebar__item--active');
      const numEl = item.querySelector('.lesson-sidebar__item-number');

      if (isCurrent) {
        item.classList.add('lesson-sidebar__item--active');
        if (status === 'completed' && numEl) {
          numEl.innerHTML = '&#10003;';
        }
      } else if (status === 'completed') {
        item.classList.add('lesson-sidebar__item--completed');
        if (numEl) numEl.innerHTML = '&#10003;';
      } else if (numEl) {
        numEl.textContent = idx + 1;
      }
    });
  }

  function syncProgressPageUI() {
    const overall = getOverallProgress();
    const data = getProgress();

    const overBar = document.getElementById('prog-overall-bar');
    const overPercent = document.getElementById('prog-overall-percent');
    const overText = document.getElementById('prog-overall-text');
    if (overBar) overBar.style.width = `${overall.percentage}%`;
    if (overPercent) overPercent.textContent = `${overall.percentage}% Selesai`;
    if (overText) overText.textContent = `${overall.completed} dari ${overall.total} Pelajaran Tuntas`;

    // Stats
    const streakEl = document.getElementById('prog-streak-val');
    const xpEl = document.getElementById('prog-xp-val');
    const completedEl = document.getElementById('prog-completed-val');
    const quizAvgEl = document.getElementById('prog-quiz-avg');

    if (streakEl) streakEl.textContent = `${data.streak} Hari 🔥`;
    if (xpEl) xpEl.textContent = `${data.xp} XP ⚡`;
    if (completedEl) completedEl.textContent = `${overall.completed} / ${overall.total}`;

    // Quiz average calculation
    const scores = Object.values(data.quizScores);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    if (quizAvgEl) quizAvgEl.textContent = scores.length > 0 ? `${avg}% (${scores.length} Kuis)` : '0% (0 Kuis)';

    // Module progress
    MODULES_DIRECTORY.forEach(mod => {
      const p = getModuleProgress(mod.id);
      const bar = document.getElementById(`prog-mod-bar-${mod.id}`);
      const text = document.getElementById(`prog-mod-text-${mod.id}`);
      if (bar) bar.style.width = `${p.percentage}%`;
      if (text) text.textContent = `${p.percentage}% (${p.completed}/${p.total} Selesai)`;
    });

    // Certificate Unlock Status
    const certBtn = document.getElementById('prog-cert-btn');
    const certText = document.getElementById('prog-cert-status-text');
    if (overall.completed >= overall.total) {
      if (certBtn) {
        certBtn.removeAttribute('disabled');
        certBtn.style.opacity = '1';
        certBtn.style.cursor = 'pointer';
        certBtn.className = 'btn btn--success btn--md';
        certBtn.textContent = '🎓 Unduh Sertifikat Kelulusan';
      }
      if (certText) certText.textContent = 'Selamat! Anda telah menuntaskan seluruh 18 materi pembelajaran.';
    } else {
      const remaining = overall.total - overall.completed;
      if (certBtn) {
        certBtn.setAttribute('disabled', 'true');
        certBtn.textContent = `🔒 Terkunci (Selesaikan ${remaining} Materi Lagi)`;
      }
      if (certText) certText.textContent = `Selesaikan semua 18 materi pembelajaran dan kuis untuk membuka sertifikat digital resmi DEVPATH.`;
    }
  }

  // Global Auto-init on page load
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Check current page
    const bodyEl = document.body;
    const currentLessonId = bodyEl.getAttribute('data-current-lesson-id');
    const currentModuleId = bodyEl.getAttribute('data-current-module-id');
    const pageType = bodyEl.getAttribute('data-page-type');

    if (currentLessonId) {
      // User opened a lesson -> mark as started
      markLessonStarted(currentLessonId);
      if (currentModuleId) {
        syncLessonPlayerSidebar(currentModuleId, currentLessonId);
      }
    }

    if (pageType === 'dashboard') {
      syncDashboardUI();
    } else if (pageType === 'module-detail' && currentModuleId) {
      syncModuleDetailUI(currentModuleId);
    } else if (pageType === 'progress-page') {
      syncProgressPageUI();
    }

    // Re-sync UI on progress updates
    window.addEventListener('devpath:progress-updated', () => {
      if (pageType === 'dashboard') syncDashboardUI();
      if (pageType === 'module-detail' && currentModuleId) syncModuleDetailUI(currentModuleId);
      if (pageType === 'progress-page') syncProgressPageUI();
      if (currentLessonId && currentModuleId) syncLessonPlayerSidebar(currentModuleId, currentLessonId);
    });
  });

  // Export to Global Scope
  window.DEVPATH_PROGRESS = {
    LESSONS_DIRECTORY,
    MODULES_DIRECTORY,
    getProgress,
    saveProgress,
    getLessonById,
    markLessonStarted,
    markLessonCompleted,
    recordQuizScore,
    isLessonCompleted,
    isLessonStarted,
    getLessonStatus,
    getModuleProgress,
    getOverallProgress,
    getRecommendedNextLesson,
    resetAllProgress,
    syncDashboardUI,
    syncModuleDetailUI,
    syncLessonPlayerSidebar,
    syncProgressPageUI
  };
})();
