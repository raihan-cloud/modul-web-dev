/* ==========================================================================
   DEVPATH — Quiz Manager (quiz.js)
   Reusable quiz evaluation logic, instant feedback, scoring +50 XP via progress.js.
   ========================================================================== */

(function () {
  'use strict';

  function initQuizContainer(containerSelector = '.quiz-wrapper, #quiz-container') {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
      const cards = container.querySelectorAll('.quiz-question-card, [data-quiz-question]');
      const scoreCounter = document.getElementById('score-counter');
      const scoreProgressBar = document.getElementById('score-progress-bar');
      const btnReset = document.getElementById('btn-reset-quiz');

      let correctCount = 0;
      let answeredCount = 0;
      const totalQuestions = cards.length;

      function updateScore() {
        if (scoreCounter) {
          scoreCounter.textContent = `${correctCount} Benar / ${answeredCount} dari ${totalQuestions} Terjawab`;
        }
        if (scoreProgressBar) {
          const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
          scoreProgressBar.style.width = `${percentage}%`;
          if (percentage === 100) {
            scoreProgressBar.classList.add('progress__bar--success');
          }
        }
      }

      cards.forEach(card => {
        const correctIndex = parseInt(card.getAttribute('data-correct'), 10);
        const questionId = card.getAttribute('data-quiz-id') || 'quiz-general';
        const options = card.querySelectorAll('.quiz-option');
        const explanation = card.querySelector('.quiz-explanation');

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            const selectedIndex = parseInt(opt.getAttribute('data-index'), 10);
            answeredCount++;

            // Disable all options in this card
            options.forEach(o => o.setAttribute('disabled', 'true'));

            const isCorrect = selectedIndex === correctIndex;
            if (isCorrect) {
              opt.classList.add('quiz-option--correct');
              opt.innerHTML += ' <span style="font-weight:bold;">✅ (+50 XP)</span>';
              correctCount++;
              if (window.DEVPATH_PROGRESS) {
                window.DEVPATH_PROGRESS.recordQuizScore(questionId, 100);
              }
            } else {
              opt.classList.add('quiz-option--wrong');
              opt.innerHTML += ' <span style="font-weight:bold;">❌</span>';
              // Highlight the correct one
              if (options[correctIndex]) {
                options[correctIndex].classList.add('quiz-option--correct');
              }
              if (window.DEVPATH_PROGRESS) {
                window.DEVPATH_PROGRESS.recordQuizScore(questionId, 0);
              }
            }

            if (explanation) {
              explanation.classList.add('quiz-explanation--visible');
            }
            updateScore();
          });
        });
      });

      if (btnReset) {
        btnReset.addEventListener('click', () => {
          window.location.reload();
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initQuizContainer();
  });

  window.DEVPATH_QUIZ = {
    initQuizContainer
  };
})();
