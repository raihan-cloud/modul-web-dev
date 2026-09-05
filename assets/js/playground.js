/* ==========================================================================
   DEVPATH — Playground Script (playground.js)
   Live interactive code editor with HTML/CSS/JS tab switches & debounced live preview.
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const editorHtml = document.getElementById('editor-html');
    const editorCss = document.getElementById('editor-css');
    const editorJs = document.getElementById('editor-js');
    const previewFrame = document.getElementById('preview-frame');
    const btnRun = document.getElementById('btn-run-code');
    const btnReset = document.getElementById('btn-reset-code');
    const presetSelector = document.getElementById('preset-selector');
    const tabs = document.querySelectorAll('.playground-tab');

    if (!editorHtml || !previewFrame) return;

    // Presets
    const presets = {
      card: {
        html: `<div class="card-wrap">\n  <div class="glass-card">\n    <h2>Glassmorphism UI</h2>\n    <p>Efek modern kaca transparan menggunakan backdrop-filter: blur().</p>\n    <button class="btn-glow" onclick="alert('Halo dari DEVPATH Playground!')">Klik Saya</button>\n  </div>\n</div>`,
        css: `body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #1e3a8a, #9333ea);\n  font-family: system-ui, sans-serif;\n}\n.glass-card {\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n  padding: 32px;\n  color: white;\n  max-width: 320px;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.2);\n}\n.glass-card h2 {\n  margin-top: 0;\n}\n.btn-glow {\n  background: white;\n  color: #1e3a8a;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.btn-glow:hover {\n  transform: translateY(-2px);\n}`,
        js: `console.log("Glassmorphism template loaded!");`
      },
      grid: {
        html: `<div class="container">\n  <h1>Responsive Auto-Fit Grid</h1>\n  <div class="grid">\n    <div class="card">Card 01</div>\n    <div class="card">Card 02</div>\n    <div class="card">Card 03</div>\n    <div class="card">Card 04</div>\n  </div>\n</div>`,
        css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 24px;\n  background: #f8fafc;\n}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 16px;\n}\n.card {\n  background: white;\n  border: 1px solid #e2e8f0;\n  padding: 24px;\n  border-radius: 12px;\n  text-align: center;\n  font-weight: bold;\n  color: #2563eb;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.05);\n}`,
        js: `console.log("Grid template loaded!");`
      },
      todo: {
        html: `<div class="app">\n  <h2>Task Manager</h2>\n  <div class="input-group">\n    <input type="text" id="task-input" placeholder="Tulis tugas baru...">\n    <button id="add-btn">Tambah</button>\n  </div>\n  <ul id="task-list"></ul>\n</div>`,
        css: `body {\n  font-family: system-ui, sans-serif;\n  background: #0f172a;\n  color: white;\n  display: flex;\n  justify-content: center;\n  padding: 40px 20px;\n}\n.app {\n  width: 100%;\n  max-width: 400px;\n  background: #1e293b;\n  padding: 24px;\n  border-radius: 12px;\n}\n.input-group {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 16px;\n}\ninput {\n  flex: 1;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background: #0f172a;\n  color: white;\n}\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\nli {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 12px;\n  background: #0f172a;\n  margin-bottom: 8px;\n  border-radius: 6px;\n}\nli button {\n  background: #ef4444;\n  padding: 2px 8px;\n  font-size: 12px;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}`,
        js: `const input = document.getElementById('task-input');\nconst btn = document.getElementById('add-btn');\nconst list = document.getElementById('task-list');\n\nbtn.addEventListener('click', () => {\n  if (!input.value.trim()) return;\n  const li = document.createElement('li');\n  li.innerHTML = \`<span>\${input.value}</span><button onclick="this.parentElement.remove()">Hapus</button>\`;\n  list.appendChild(li);\n  input.value = '';\n});`
      },
      empty: {
        html: `<h1>Halo Dunia!</h1>\n<p>Mulai coding HTML, CSS, dan JavaScript di sini.</p>`,
        css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  color: #1e293b;\n}`,
        js: `console.log("Ready to code!");`
      }
    };

    function loadPreset(key) {
      const p = presets[key] || presets.card;
      editorHtml.value = p.html;
      if (editorCss) editorCss.value = p.css;
      if (editorJs) editorJs.value = p.js;
      runCode();
    }

    function runCode() {
      const html = editorHtml.value;
      const css = editorCss ? editorCss.value : '';
      const js = editorJs ? editorJs.value : '';

      const doc = `<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>`;
      previewFrame.srcdoc = doc;
    }

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('playground-tab--active'));
        tab.classList.add('playground-tab--active');
        const lang = tab.dataset.lang;

        editorHtml.style.display = lang === 'html' ? 'block' : 'none';
        if (editorCss) editorCss.style.display = lang === 'css' ? 'block' : 'none';
        if (editorJs) editorJs.style.display = lang === 'js' ? 'block' : 'none';
      });
    });

    // Events
    if (btnRun) btnRun.addEventListener('click', runCode);
    if (btnReset) btnReset.addEventListener('click', () => loadPreset(presetSelector.value));
    if (presetSelector) presetSelector.addEventListener('change', (e) => loadPreset(e.target.value));

    // Auto update on change with debounce
    let debounceTimer;
    [editorHtml, editorCss, editorJs].forEach(ed => {
      if (ed) {
        ed.addEventListener('input', () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(runCode, 500);
        });
      }
    });

    // Load initial preset
    loadPreset('card');
  });
})();
