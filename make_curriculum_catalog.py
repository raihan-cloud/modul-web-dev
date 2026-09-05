import json

catalog = []

def add_l(lid, mid, mtitle, num, title, fname, dur, lvl, tags, desc, obj, prereq, concept, why, code, best, mistakes, ex, chal, q_q, q_opts, q_corr, q_exp):
    catalog.append({
        "id": lid,
        "moduleId": mid,
        "moduleTitle": mtitle,
        "num": num,
        "title": title,
        "filename": fname,
        "duration": dur,
        "level": lvl,
        "tags": tags,
        "desc": desc,
        "objectives": obj,
        "prerequisites": prereq,
        "concept": concept,
        "whyMatters": why,
        "codeSnippet": code,
        "bestPractice": best,
        "commonMistakes": mistakes,
        "exercise": ex,
        "challenge": chal,
        "quiz": {
            "question": q_q,
            "options": q_opts,
            "correct": q_corr,
            "explanation": q_exp
        }
    })

# =========================================================================
# MODULE 01: HTML5 FUNDAMENTALS (10 LESSONS)
# =========================================================================
add_l("html-doc-structure", "html5", "HTML5 Fundamentals", "01", "1.1 HTML Document Structure & Doctype", "html-doc-structure.html", "15 min", "Beginner", ["HTML", "Foundation"],
      "Anatomi dokumen web standar W3C: doctype, elemen html, head, meta viewport, title, dan body.",
      ["Memahami peran <!DOCTYPE html> dalam memicu standards mode pada browser modern.", "Mengetahui elemen wajib di dalam tag <head> (charset, viewport, title).", "Menghubungkan file stylesheet CSS dan script JavaScript dengan urutan pemuatan yang benar."],
      "Pemahaman dasar peramban web dan cara membuka file teks.",
      "Setiap halaman web modern dibangun di atas kerangka dokumen HTML5 standar. Deklarasi <!DOCTYPE html> memastikan peramban merender halaman dalam standards mode tanpa quirks mode.",
      "Dokumen yang tidak memiliki deklarasi doctype atau meta viewport yang tepat akan rusak di perangkat seluler dan gagal diindeks dengan optimal oleh mesin pencari.",
      """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Profil Saya — Portfolio 2026</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header>
    <h1>Halo, Dunia!</h1>
  </header>
  <main>
    <p>Selamat datang di platform belajar web development modern.</p>
  </main>
  <script src="assets/js/main.js" defer></script>
</body>
</html>""",
      "Selalu sertakan atribut lang pada tag <html> (misal lang='id' atau lang='en') agar teknologi asistif membaca teks dengan pelafalan fonetik yang tepat.",
      [{"wrong": "Menempatkan tag visual seperti <h1> di dalam <head>.", "right": "Tag <head> hanya untuk metadata dokumen; seluruh konten yang tampak wajib di dalam <body>."},
       {"wrong": "Lupa menyertakan meta viewport.", "right": "Meta viewport wajib agar layout mobile tidak dirender mengecil seperti layar desktop (zoomed-out)."}],
      "Buka teks editor, buat file index.html baru, dan periksa struktur menggunakan Developer Tools peramban di tab Elements.",
      "Buat kerangka halaman dengan meta deskripsi 150 karakter, favicon link, dan tag body yang berisi heading dan paragraf singkat tentang tujuan belajar Anda.",
      "Apa akibat jika kita menghilangkan tag <meta name='viewport' content='width=device-width, initial-scale=1.0'>?",
      ["Halaman tidak akan bisa dibuka di Google Chrome", "Browser mobile akan menampilkan halaman versi desktop yang diperkecil (zoomed-out)", "File CSS tidak akan dimuat oleh browser"],
      1, "Meta viewport menginstruksikan browser seluler untuk mencocokkan lebar viewport dokumen dengan lebar fisik layar perangkat pengguna.")

add_l("html-semantic", "html5", "HTML5 Fundamentals", "02", "1.2 Semantic HTML Architecture", "semantic-html.html", "20 min", "Beginner", ["HTML", "Semantic"],
      "Menghindari Div Soup dengan tag header, nav, main, section, article, aside, dan footer.",
      ["Membedakan fungsi semantik antara <section>, <article>, dan <div> umum.", "Mematuhi aturan emas: hanya ada tepat SATU tag <main> per dokumen.", "Membangun arsitektur dokumen yang ramah screen reader dan web crawler."],
      "1.1 HTML Document Structure & Doctype",
      "Semantic HTML menggunakan tag yang memiliki arti intrinsik untuk mendeskripsikan kontennya, bukan sekadar kotak pembungkus visual tanpa makna.",
      "Screen reader bagi tunanetra mengandalkan landmark semantik untuk melompat antar bagian halaman secara instan.",
      """<header class="site-header">
  <nav aria-label="Navigasi Utama">
    <a href="/">Beranda</a>
    <a href="/tentang">Tentang</a>
  </nav>
</header>

<main>
  <article>
    <h2>Mengapa Semantik Itu Krusial</h2>
    <p>HTML semantik membuat website dapat diakses siapa saja.</p>
  </article>

  <aside>
    <h3>Topik Terkait</h3>
  </aside>
</main>

<footer class="site-footer">
  <p>&copy; 2026 DEVPATH.</p>
</footer>""",
      "Gunakan <div> hanya sebagai pembungkus murni untuk kebutuhan styling CSS ketika tidak ada elemen semantik HTML5 yang representatif.",
      [{"wrong": "Menggunakan banyak tag <main> dalam satu halaman HTML.", "right": "Hanya boleh ada tepat satu elemen <main> per halaman sebagai konten primer unik."},
       {"wrong": "Mengganti semua <button> dan <a> dengan <div onclick='...'>.", "right": "Gunakan elemen interaktif asli agar mendukung navigasi keyboard (Enter/Spasi)."}],
      "Buka sebuah website favorit Anda, inspect element, dan catat apakah mereka menggunakan tag semantic <header>, <nav>, <main>, dan <footer>.",
      "Refactor halaman HTML yang penuh dengan <div class='header'>, <div class='sidebar'>, dan <div class='content'> menjadi elemen semantik HTML5 standar.",
      "Kapan elemen <article> sebaiknya digunakan dibandingkan <section>?",
      ["Hanya ketika membuat website berita", "Ketika konten tersebut independen dan dapat didistribusikan ulang sendiri (self-contained)", "Ketika konten memiliki warna background yang berbeda"],
      1, "Elemen <article> didesain untuk konten yang berdiri sendiri dan masuk akal jika dibaca terpisah di feed RSS atau platform syndication lain.")

add_l("html-headings-hierarchy", "html5", "HTML5 Fundamentals", "03", "1.3 Headings & Content Hierarchy", "headings-hierarchy.html", "15 min", "Beginner", ["HTML", "SEO", "Accessibility"],
      "Hierarki h1–h6, struktur paragraf, list terurut & tak terurut, dan kaitannya dengan SEO on-page.",
      ["Menyusun heading h1 hingga h6 secara berurutan tanpa melompati level.", "Memahami mengapa hanya boleh ada satu <h1> sebagai topik utama halaman.", "Memilih elemen list yang tepat: <ul>, <ol>, atau <dl>."],
      "1.2 Semantic HTML Architecture",
      "Heading membentuk kerangka outline dokumen bagi mesin pencari dan teknologi asistif, mirip daftar isi dalam buku.",
      "Screen reader memungkinkan pengguna menavigasi halaman dengan menekan tombol 'H' untuk melompat antar heading; hierarki yang rusak akan membingungkan navigasi audio.",
      """<!-- Hierarki Heading yang Benar -->
<h1>Panduan Lengkap Belajar Frontend</h1>

<section>
  <h2>1. Fondasi HTML5</h2>
  <p>HTML adalah kerangka struktural web.</p>
  
  <h3>1.1 Elemen Semantik</h3>
  <ul>
    <li>header dan footer</li>
    <li>navigasi mandiri</li>
  </ul>
</section>

<section>
  <h2>2. Styling dengan CSS3</h2>
  <p>CSS memberikan keindahan visual.</p>
</section>""",
      "Jangan pernah memilih tag heading berdasarkan ukuran font visualnya. Gunakan CSS font-size untuk ukuran, dan gunakan h1–h6 murni untuk tingkat kepentingannya.",
      [{"wrong": "Melompati level heading dari <h1> langsung ke <h4> karena ingin teks lebih kecil.", "right": "Pertahankan urutan logis: h1 -> h2 -> h3. Ubah ukuran visual menggunakan class CSS."},
       {"wrong": "Membuat banyak tag <h1> di satu halaman non-multipage.", "right": "Satu halaman idealnya memiliki satu <h1> utama untuk topik sentral SEO."}],
      "Buat outline sebuah artikel blog menggunakan h1, dua h2, dan masing-masing dua h3 di bawah h2 tersebut.",
      "Buat daftar spesifikasi produk menggunakan tag Description List (<dl>, <dt>, <dd>) yang semantik.",
      "Mengapa kita tidak boleh melompati level heading (misal h1 langsung ke h4)?",
      ["Browser akan memunculkan error console", "Merusak hierarki outline dokumen bagi screen reader dan algoritma SEO", "Halaman tidak akan dapat dimuat di mobile"],
      1, "Pengguna screen reader mengandalkan hirarki bertingkat untuk memahami sub-topik. Melompati level menimbulkan disorientasi navigasi.")

add_l("html-links-navigation", "html5", "HTML5 Fundamentals", "04", "1.4 Links & Navigation Patterns", "links-navigation.html", "20 min", "Beginner", ["HTML", "Navigation"],
      "Tag anchor <a>, URL relatif vs absolut, target blank dengan rel noopener, download, dan internal bookmark links.",
      ["Memahami perbedaan URL relatif (relative path) dan absolut (absolute URL).", "Mengamankan target='_blank' dengan atribut rel='noopener noreferrer'.", "Membuat navigasi internal melompat ke section id (skip links & bookmarks)."],
      "1.1 HTML Document Structure",
      "Tautan (hyperlink) adalah fondasi World Wide Web. Tag <a> menghubungkan dokumen, file unduhan, nomor telepon, dan lokasi di dalam halaman yang sama.",
      "Membuka link di tab baru tanpa rel='noopener' membuka celah keamanan 'tab-nabbing' di mana halaman luar dapat mengontrol tab asal.",
      """<!-- Tautan Internal Antar-Halaman -->
<a href="modules/css3.html">Modul CSS3</a>

<!-- Tautan Eksternal Aman -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  Dokumentasi MDN (Buka di Tab Baru)
</a>

<!-- Tautan Bookmark Internal -->
<a href="#kontak">Lompat ke Kontak</a>

<!-- Tautan Telepon & Email -->
<a href="mailto:halo@devpath.id">Kirim Email</a>
<a href="tel:+628123456789">Hubungi Kami</a>""",
      "Gunakan teks tautan yang deskriptif. Hindari menulis 'Klik di sini'; gunakan 'Unduh silabus PDF' agar informatif di luar konteks.",
      [{"wrong": "Menggunakan <a href='#'> untuk tombol aksi JavaScript tanpa peran link yang nyata.", "right": "Gunakan tag <button type='button'> untuk aksi interaktif di halaman."},
       {"wrong": "Menggunakan target='_blank' tanpa rel='noopener'.", "right": "Selalu tambahkan rel='noopener noreferrer' untuk perlindungan keamanan dan kinerja thread peramban."}],
      "Buat 3 link internal yang menghubungkan folder latihan lokal dan 1 link eksternal dengan target blank yang aman.",
      "Buat tombol 'Skip to Content' (Lompat ke Konten) di bagian atas halaman yang hanya melompat langsung ke id='main-content'.",
      "Apa fungsi utama dari atribut rel='noopener' ketika menggunakan target='_blank'?",
      ["Mempercepat unduhan file PDF", "Mencegah halaman baru mengakses window.opener dari tab asal demi keamanan", "Membuat link otomatis berwarna biru"],
      1, "rel='noopener' mencegah tab tujuan mengeksekusi JavaScript pada properti window.opener yang bisa mengalihkan tab asal ke situs phishing.")

add_l("html-media", "html5", "HTML5 Fundamentals", "05", "1.5 Images, Picture & Media Optimization", "media.html", "25 min", "Beginner", ["HTML", "Media", "Performance"],
      "Optimasi img, atribut alt informatif, elemen figure & figcaption, audio, video, dan pencegahan CLS.",
      ["Menulis alt text yang akurat atau alt='' untuk gambar dekoratif murni.", "Menyertakan atribut width dan height numerik untuk mencegah Layout Shift (CLS).", "Menerapkan elemen <picture> untuk art direction dan format next-gen (WebP/AVIF)."],
      "1.1 HTML Document Structure",
      "Media visual memperkaya konten web, namun tanpa optimasi dimensi dan format modern, media adalah penyebab nomor satu website lambat.",
      "Jika tag <img> tidak memiliki atribut width dan height, browser tidak tahu rasio aspek sebelum gambar selesai diunduh, menyebabkan teks di bawahnya melompat secara tiba-tiba.",
      """<!-- Gambar Responsif dengan Dimensi Anti-CLS -->
<figure>
  <picture>
    <source srcset="banner.avif" type="image/avif">
    <source srcset="banner.webp" type="image/webp">
    <img src="banner.jpg" alt="Diagram arsitektur micro-frontend DEVPATH" width="800" height="450" loading="lazy">
  </picture>
  <figcaption>Gambar 1: Arsitektur data flow aplikasi.</figcaption>
</figure>

<!-- Audio & Video Native -->
<video controls width="640" height="360" preload="metadata">
  <source src="tutorial.mp4" type="video/mp4">
  <p>Browser Anda tidak mendukung tag video HTML5.</p>
</video>""",
      "Tambahkan loading='lazy' pada semua gambar di bawah lipatan layar (below-the-fold) untuk menghemat kuota pengguna dan meningkatkan kecepatan loading awal.",
      [{"wrong": "Menghilangkan atribut alt sama sekali pada tag <img>.", "right": "Selalu sertakan alt. Jika gambar murni hiasan, gunakan alt='' agar diabaikan screen reader."},
       {"wrong": "Memberikan loading='lazy' pada banner hero di bagian paling atas layar.", "right": "Gambar hero teratas harus dimuat secepat mungkin (loading='eager' atau default) demi skor LCP yang optimal."}],
      "Pasang satu gambar lokal dengan atribut width, height, loading='lazy', dan bungkus dengan <figure> serta <figcaption>.",
      "Gunakan elemen <picture> dengan dua format berbeda (WebP dan fallback JPG) yang memiliki rasio aspek 16:9.",
      "Mengapa atribut numerik width dan height pada tag <img> sangat dianjurkan oleh standar web modern?",
      ["Untuk memaksa gambar diubah ukurannya tanpa CSS", "Agar browser dapat menghitung aspect-ratio dan mencadangkan ruang kosong sebelum gambar terunduh (mencegah CLS)", "Untuk mengompres ukuran file gambar secara otomatis"],
      1, "Browser modern menggunakan atribut width & height numerik untuk menghitung rasio aspek bawaan, sehingga ruang tampilan dicadangkan dan konten tidak melompat.")

add_l("html-forms", "html5", "HTML5 Fundamentals", "06", "1.6 Modern HTML Forms & Controls", "forms.html", "25 min", "Beginner", ["HTML", "Forms"],
      "Struktur form yang benar, asosiasi label dengan id, input types modern, textarea, select, checkbox, radio, dan button.",
      ["Menghubungkan <label for='...'> dengan <input id='...'> secara eksplisit.", "Memilih tipe input modern (email, tel, number, date, url) untuk memicu keyboard mobile yang sesuai.", "Mengelompokkan kontrol terkait dengan <fieldset> dan <legend>."],
      "1.2 Semantic HTML Architecture",
      "Form adalah sarana interaksi utama antara pengguna dan aplikasi web. Formulir yang semantik mempermudah pengisian otomatis (autofill) dan navigasi sentuh.",
      "Label yang tidak terhubung dengan input membuat pengguna screen reader tidak tahu informasi apa yang diminta saat kolom tersebut mendapatkan fokus.",
      """<form action="/api/daftar" method="POST">
  <fieldset>
    <legend>Informasi Akun</legend>

    <div class="form-group">
      <label for="nama-lengkap">Nama Lengkap</label>
      <input type="text" id="nama-lengkap" name="fullname" autocomplete="name" required>
    </div>

    <div class="form-group">
      <label for="email-user">Alamat Email</label>
      <input type="email" id="email-user" name="email" autocomplete="email" required>
    </div>

    <div class="form-group">
      <label for="peran-dev">Pilihan Jalur Belajar</label>
      <select id="peran-dev" name="track">
        <option value="frontend">Frontend Specialist</option>
        <option value="fullstack">Fullstack Developer</option>
      </select>
    </div>
  </fieldset>

  <button type="submit">Daftar Sekarang</button>
</form>""",
      "Selalu sertakan atribut autocomplete (misal 'email', 'new-password', 'tel') untuk membantu fitur pengisian otomatis peramban.",
      [{"wrong": "Menggunakan placeholder sebagai pengganti elemen <label>.", "right": "Placeholder akan hilang saat pengguna mulai mengetik; label permanen wajib selalu ada."},
       {"wrong": "Membuat tombol submit berupa <div onclick='submit()'>.", "right": "Gunakan <button type='submit'> agar formulir dapat dikirim hanya dengan menekan tombol Enter di keyboard."}],
      "Buat formulir kontak sederhana berisi nama, email, pilihan topik (select), dan pesan (textarea) yang seluruhnya memiliki label terkait.",
      "Buat pilihan radio button status yang dibungkus rapi dalam <fieldset> dan diberi judul menggunakan elemen <legend>.",
      "Mengapa atribut 'for' pada <label> harus bernilai sama dengan atribut 'id' pada <input>?",
      ["Agar CSS dapat memberi warna background yang sama", "Menciptakan hubungan programmatic sehingga klik pada teks label otomatis memfokuskan input", "Sebagai syarat wajib dari database SQL backend"],
      1, "Asosiasi eksplisit ini memperbesar area klik untuk pengguna dan membacakan label secara otomatis pada perangkat screen reader saat input aktif.")

add_l("html-form-validation", "html5", "HTML5 Fundamentals", "07", "1.7 Native HTML5 Form Validation", "form-validation.html", "25 min", "Intermediate", ["HTML", "Forms", "Validation"],
      "Validasi formulir tanpa dependensi JavaScript: required, pattern regex, min/max, minlength, maxlength, dan styling pseudo-class CSS.",
      ["Menerapkan atribut validasi bawaan: required, minlength, maxlength, pattern, min, dan max.", "Menghubungkan pola regex aman pada input teks tanpa error parsing.", "Memberikan styling visual status valid/invalid menggunakan pseudo-class CSS :valid dan :invalid."],
      "1.6 Modern HTML Forms & Controls",
      "Browser modern memiliki engine validasi bawaan (Constraint Validation API) yang memeriksa input sebelum formulir dikirimkan ke server, menghemat puluhan kilobyte library eksternal.",
      "Validasi sisi klien memberikan umpan balik instan kepada pengguna tanpa menunggu jeda round-trip jaringan.",
      """<form class="validated-form">
  <!-- Validasi Email & Wajib -->
  <label for="v-email">Email Kerja</label>
  <input type="email" id="v-email" required placeholder="nama@perusahaan.com">

  <!-- Validasi Pola Regex (6 Digit Angka) -->
  <label for="v-pin">PIN Keamanan (6 Digit Angka)</label>
  <input type="text" id="v-pin" pattern="[0-9]{6}" maxlength="6" inputmode="numeric" required title="Harap masukkan tepat 6 digit angka">

  <!-- Validasi Nilai Numerik -->
  <label for="v-age">Usia (17 - 99)</label>
  <input type="number" id="v-age" min="17" max="99" required>

  <!-- Autocomplete Native Datalist -->
  <label for="v-framework">Framework Pilihan</label>
  <input list="fw-list" id="v-framework" placeholder="Ketik atau pilih...">
  <datalist id="fw-list">
    <option value="Vanilla JavaScript">
    <option value="Web Components">
    <option value="Astro">
  </datalist>

  <button type="submit">Kirim Data</button>
</form>""",
      "Sertakan atribut title pada input yang menggunakan atribut pattern untuk menjelaskan aturan format kepada pengguna saat validasi gagal.",
      [{"wrong": "Mengandalkan validasi HTML5 sebagai satu-satunya sistem keamanan data.", "right": "Validasi klien adalah untuk kenyamanan UX; server backend tetap wajib memvalidasi ulang seluruh data."},
       {"wrong": "Memberi styling warna merah :invalid sebelum pengguna selesai mengetik.", "right": "Gunakan pseudo-class :user-invalid atau :focus:invalid agar tidak mengganggu pengguna yang baru mulai mengetik."}],
      "Buat input username dengan syarat: minimal 4 karakter, maksimal 16 karakter, hanya boleh huruf kecil dan angka menggunakan pattern regex.",
      "Kombinasikan <input type='text' list='...'> dengan <datalist> untuk membuat pilihan kota asal di Indonesia.",
      "Atribut apa yang digunakan untuk membatasi input hanya menerima pola ekspresi reguler tertentu?",
      ["regex='...'", "pattern='...'", "validate='...'"],
      1, "Atribut pattern menerima format Regular Expression (JavaScript regex) yang secara otomatis divalidasi oleh peramban saat tombol kirim ditekan.")

add_l("html-accessibility", "html5", "HTML5 Fundamentals", "08", "1.8 Accessible HTML & ARIA Attributes", "accessibility.html", "25 min", "Intermediate", ["HTML", "Accessibility", "ARIA"],
      "Standar WCAG, navigasi keyboard (tabindex), aria-label, aria-hidden, aria-expanded, dan screen reader mental model.",
      ["Memahami aturan nomor satu ARIA: 'Jangan gunakan ARIA jika elemen HTML semantik sudah menyediakannya'.", "Menggunakan aria-label untuk tombol yang hanya memiliki ikon visual.", "Menyembunyikan elemen dekoratif murni dengan aria-hidden='true'."],
      "1.2 Semantic HTML Architecture",
      "Aksesibilitas web (a11y) memastikan website dapat diakses oleh semua orang, termasuk penyandang disabilitas motorik, penglihatan, pendengaran, dan kognitif.",
      "Banyak negara dan perusahaan global mewajibkan standar aksesibilitas WCAG 2.1 Level AA secara hukum.",
      """<!-- Tombol Icon dengan Accessible Label -->
<button type="button" aria-label="Tutup jendela modal" class="btn-icon">
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
</button>

<!-- Komponen Dropdown/Accordion dengan State ARIA -->
<button type="button" aria-expanded="false" aria-controls="menu-dropdown">
  Kategori Materi
</button>
<div id="menu-dropdown" hidden>
  <a href="#html">HTML5</a>
  <a href="#css">CSS3</a>
</div>

<!-- Deskripsi Tambahan untuk Input -->
<input type="password" id="pass" aria-describedby="pass-rule">
<p id="pass-rule">Kata sandi minimal 8 karakter dan mengandung 1 angka.</p>""",
      "Selalu uji halaman Anda menggunakan navigasi keyboard murni: tekan tombol Tab untuk maju, Shift+Tab untuk mundur, dan Enter/Spasi untuk mengaktifkan kontrol.",
      [{"wrong": "Menghilangkan outline fokus tombol dengan CSS (outline: none) tanpa menyediakan alternatif.", "right": "Pertahankan atau buat indikator fokus yang kontras agar pengguna keyboard tahu elemen mana yang sedang aktif."},
       {"wrong": "Menggunakan tabindex='5' (nilai positif di atas 0).", "right": "Hindari nilai tabindex positif karena merusak urutan tab alami peramban; gunakan tabindex='0' atau tabindex='-1'."}],
      "Tambahkan aria-label pada tombol navigasi yang hanya memiliki ikon SVG tanpa teks visual.",
      "Buat tombol accordion sederhana yang mengubah atribut aria-expanded dari 'false' menjadi 'true' saat dibuka.",
      "Apa fungsi dari atribut aria-hidden='true'?",
      ["Menyembunyikan elemen dari layar monitor pengguna", "Menyembunyikan elemen dari teknologi pembaca layar (Screen Reader) namun tetap terlihat visual di layar", "Menghapus elemen dari memory RAM komputer"],
      1, "aria-hidden='true' memberi tahu screen reader untuk melewatkan elemen dekoratif (seperti ikon panah atau bintang) agar tidak dibacakan.")

add_l("html-open-graph", "html5", "HTML5 Fundamentals", "09", "1.9 SEO Fundamentals & Social Meta Tags", "open-graph.html", "20 min", "Intermediate", ["HTML", "SEO", "OpenGraph"],
      "Optimasi mesin pencari on-page: title, meta description, canonical link, Open Graph preview WhatsApp/Twitter, dan theme-color.",
      ["Menulis tag title yang unik dan deskriptif (maksimal 60 karakter).", "Menyusun meta description informatif (120-155 karakter) untuk click-through rate Google.", "Mengonfigurasi protokol Open Graph (og:title, og:image, og:description) untuk kartu pratinjau media sosial."],
      "1.1 HTML Document Structure",
      "Metadata di dalam tag <head> tidak ditampilkan langsung di canvas halaman, melainkan dikonsumsi oleh robot mesin pencari dan bot crawler aplikasi pesan seperti WhatsApp dan Telegram.",
      "Tautan yang dibagikan dengan pratinjau banner gambar dan judul yang memikat memiliki rasio klik (CTR) 300% lebih tinggi dibanding tautan teks biasa.",
      """<head>
  <!-- SEO Dasar -->
  <title>Belajar Web Development Modern — DEVPATH</title>
  <meta name="description" content="Platform belajar web development komprehensif dari dasar hingga arsitektur industri. 100% interaktif tanpa dependensi berat.">
  <link rel="canonical" href="https://devpath.id/kursus/frontend">

  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://devpath.id/kursus/frontend">
  <meta property="og:title" content="Belajar Web Development Modern — DEVPATH">
  <meta property="og:description" content="Kuasai fondasi HTML5, CSS3, dan JavaScript standar industri.">
  <meta property="og:image" content="https://devpath.id/assets/images/og-preview.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Belajar Web Development Modern — DEVPATH">
  <meta name="twitter:image" content="https://devpath.id/assets/images/og-preview.jpg">

  <!-- Mobile Browser Shell -->
  <meta name="theme-color" content="#2563eb">
</head>""",
      "Pastikan og:image menggunakan URL absolut lengkap (dimulai dengan https://), memiliki rasio aspek 1.91:1 (rekomendasi 1200x630 piksel), dan ukuran file di bawah 1MB.",
      [{"wrong": "Menggunakan URL relatif pada og:image (misal og:image content='/gambar.jpg').", "right": "Crawler WhatsApp dan Facebook membutuhkan URL absolut lengkap (https://domain.com/gambar.jpg) untuk mengunduh pratinjau."},
       {"wrong": "Menulis meta description yang sama persis di seluruh halaman website.", "right": "Setiap halaman wajib memiliki judul dan deskripsi unik sesuai konten spesifiknya."}],
      "Inspect tag <head> dari halaman DEVPATH saat ini dan amati bagaimana og:title dan theme-color dikonfigurasi.",
      "Konfigurasikan meta tag lengkap untuk sebuah artikel portofolio proyek pribadi, lengkap dengan tag Twitter Card dan URL canonical.",
      "Mengapa atribut content pada meta tag og:image wajib menggunakan URL absolut (https://...)?",
      ["Karena browser tidak bisa merender gambar relatif", "Karena crawler media sosial (seperti bot WhatsApp) mengakses file dari luar domain Anda dan tidak memiliki konteks direktori relatif", "Sebagai syarat wajib dari W3C HTML validator"],
      1, "Bot crawler eksternal membutuhkan alamat web lengkap yang dapat diunduh langsung dari server publik tanpa menebak direktori.")

add_l("html-mini-project", "html5", "HTML5 Fundamentals", "10", "1.10 HTML Mini Project: Accessible Portfolio Structure", "html-mini-project.html", "45 min", "Intermediate", ["HTML", "Project", "Portfolio"],
      "Proyek mini: Membangun struktur lengkap website portofolio developer yang semantik, aksesibel, dan ramah SEO.",
      ["Menggabungkan seluruh materi Modul 01 ke dalam satu dokumen produksi yang utuh.", "Menyusun section: Header & Navigasi, Hero Banner, About Me, Skills, Projects Showcase, Contact Form, dan Footer.", "Memastikan dokumen lolos validasi W3C tanpa error semantik."],
      "Materi 1.1 hingga 1.9 Modul HTML5",
      "Penerapan nyata pemikiran semantik. Website portofolio profesional tidak memerlukan ribuan baris kode yang rumit; struktur HTML yang bersih dan rapi adalah pondasi pertama yang dinilai oleh calon perekrut teknis.",
      "Penguji teknis dan perekrut sering menginspeksi kode HTML dasar kandidat untuk melihat apakah kandidat memahami cara kerja web dari akarnya atau hanya mengandalkan generator framework.",
      """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raihan — Frontend Software Engineer</title>
  <meta name="description" content="Portofolio resmi Raihan, developer web spesialisasi antarmuka performa tinggi dan aksesibel.">
</head>
<body>
  <!-- Header & Navigasi -->
  <header>
    <a href="#main-content" class="skip-link">Lompat ke Konten Utama</a>
    <nav aria-label="Navigasi Utama">
      <a href="#about">Tentang</a>
      <a href="#projects">Proyek</a>
      <a href="#contact">Kontak</a>
    </nav>
  </header>

  <!-- Konten Primer -->
  <main id="main-content">
    <section id="hero">
      <h1>Raihan — Frontend Engineer</h1>
      <p>Membangun antarmuka web modern dengan fokus pada performa, aksesibilitas, dan standar W3C.</p>
      <a href="#projects">Lihat Karya Saya &rarr;</a>
    </section>

    <section id="about">
      <h2>Tentang Saya</h2>
      <p>Spesialis antarmuka web dengan pengalaman dalam arsitektur CSS bersih dan performa Core Web Vitals.</p>
    </section>

    <section id="projects">
      <h2>Proyek Pilihan</h2>
      <article>
        <h3>DEVPATH Learning LMS</h3>
        <p>Platform edukasi web development statis dengan pelacakan progres lokal.</p>
      </article>
    </section>

    <section id="contact">
      <h2>Hubungi Saya</h2>
      <form action="/api/contact" method="POST">
        <label for="c-name">Nama</label>
        <input type="text" id="c-name" name="name" required>
        <label for="c-email">Email</label>
        <input type="email" id="c-email" name="email" required>
        <label for="c-msg">Pesan</label>
        <textarea id="c-msg" name="message" required></textarea>
        <button type="submit">Kirim Pesan</button>
      </form>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Raihan. Dibuat dengan HTML5 murni.</p>
  </footer>
</body>
</html>""",
      "Validasi kode Anda menggunakan W3C Markup Validation Service (validator.w3.org) untuk memastikan tidak ada tag yang tertinggal atau atribut tidak standar.",
      [{"wrong": "Menggunakan banyak elemen <main>.", "right": "Hanya boleh ada tepat satu elemen <main> per dokumen."},
       {"wrong": "Lupa menghubungkan label formulir dengan id input di bagian formulir kontak.", "right": "Pastikan semua atribut 'for' memiliki pasangan 'id' yang identik."}],
      "Salin kode boilerplate di atas, sesuaikan dengan nama dan riwayat proyek Anda sendiri, dan simpan di folder lokal.",
      "Tambahkan section 'Keahlian' (Skills) yang menggunakan elemen <dl>, <dt>, dan <dd> untuk mendeskripsikan teknologi yang Anda kuasai.",
      "Mengapa penambahan link 'Skip to content' di awal body sangat penting pada halaman portofolio?",
      ["Agar halaman dapat di-refresh lebih cepat", "Memungkinkan pengguna keyboard melompati menu navigasi yang berulang langsung menuju konten artikel utama", "Meningkatkan resolusi foto proyek"],
      1, "Skip link membantu pengguna disabilitas yang menggunakan keyboard agar tidak perlu menekan tombol Tab puluhan kali melewati menu sebelum membaca konten utama.")

# Save module 1
with open('module_01.json', 'w') as f:
    json.dump(catalog, f, indent=2)
print("Module 01 catalog created: 10 lessons")
