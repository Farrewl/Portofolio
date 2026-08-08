(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const hasAnime = typeof window.anime !== 'undefined';
    const html = document.documentElement;

    const I18N = {
        id: {
            'meta.title': 'Ibnu Farrel Athaillah Firdaus — Portofolio',
            'meta.desc': 'Portofolio Ibnu Farrel Athaillah Firdaus, mahasiswa Informatika Universitas Diponegoro dengan minat di cyber security, software development, machine learning, dan robotika.',
            'meta.ogDesc': 'Mahasiswa Informatika Undip — cyber security, software development, machine learning, robotika.',
            skip: 'Lewati ke konten utama',
            preloader: 'LOADING...',
            'nav.beranda': 'Beranda', 'nav.tentang': 'Tentang', 'nav.perjalanan': 'Perjalanan', 'nav.proyek': 'Proyek', 'nav.kontak': 'Kontak',
            'aria.logo': 'Kembali ke beranda',
            'aria.dotnav': 'Navigasi bagian',
            'aria.backtotop': 'Kembali ke atas',
            'aria.timelineFilter': 'Saring linimasa berdasarkan kategori',
            'aria.copyEmail': 'Salin email',
            'aria.copyWa': 'Salin nomor WhatsApp',
            'hero.eyebrow': 'MAHASISWA INFORMATIKA · UNIVERSITAS DIPONEGORO',
            'hero.photoAlt': 'Foto Ibnu Farrel Athaillah Firdaus',
            'hero.status': 'Mahasiswa Informatika — Universitas Diponegoro',
            'hero.cvBtn': 'Lihat CV',
            'hero.projectsBtn': 'Lihat Proyek',
            'about.eyebrow': '01 · TENTANG',
            'about.title': 'Tentang Saya',
            'about.bio1': 'Mahasiswa baru Program Studi Informatika, Universitas Diponegoro, dengan minat besar pada <strong>cyber security</strong> dan <strong>machine learning</strong>. Memiliki dasar keterampilan pemrograman web serta aktif dalam riset robotik bersama tim kapal ASV kampus.',
            'about.bio2': 'Terbiasa belajar mandiri lewat proyek-proyek kecil untuk memperluas wawasan teknologi, sekaligus aktif berorganisasi dan berkompetisi — mulai dari lapangan taekwondo hingga kompetisi sains informatika.',
            'about.skills.tech': 'Bahasa & Teknologi',
            'about.skills.interest': 'Bidang Minat',
            'skill.cybersec': 'Cyber Security', 'skill.swdev': 'Software Development', 'skill.robotics': 'Robotika',
            'about.stat1.label': 'IP Kumulatif', 'about.stat1.sub': 'dari skala 4.00',
            'about.stat2.label': 'Pengalaman Aktif', 'about.stat2.sub': 'kerja & organisasi',
            'about.stat3.label': 'Penghargaan', 'about.stat3.sub': 'bidang informatika',
            'about.stat4.label': 'Proyek Web', 'about.stat4.sub': 'dipublikasikan',
            'journey.eyebrow': '02 · PERJALANAN',
            'journey.title': 'Catatan Perjalanan',
            'journey.lede': 'Rangkaian pendidikan, pengalaman, dan pencapaian di bidang informatika yang membentuk arah saat ini — disusun secara kronologis.',
            'filter.all': 'Semua',
            'filter.empty': 'Belum ada entri untuk kategori ini.',
            'tag.pendidikan': 'Pendidikan', 'tag.pekerjaan': 'Pekerjaan', 'tag.organisasi': 'Organisasi', 'tag.kepanitiaan': 'Kepanitiaan', 'tag.penghargaan': 'Penghargaan',
            'item1.title': 'SMAS Al-Mubarak', 'item1.org': 'Tangerang Selatan · Jurusan IPA',
            'item2.title': 'Medali Perunggu Informatika', 'item2.org': 'Kejuaraan Sains Nasional',
            'item3.title': 'Pelatih Atlet Kyorugi', 'item3.org': 'Java Eagle Taekwondo Academy · Tangerang Selatan',
            'item3.desc': 'Menyusun program latihan terstruktur dan membimbing atlet meningkatkan teknik, strategi, serta mental bertanding.',
            'item4.title': 'Anggota Seksi Peralatan', 'item4.org': 'Albin Leadership Training — OSISMPK Albin',
            'item4.desc': 'Mengoordinasikan kesiapan logistik dan kelayakan peralatan sebelum serta selama acara berlangsung.',
            'item5.title': 'Medali Perak Informatika', 'item5.org': 'Prestasi Maju Indonesia',
            'item6.title': 'Anggota Elektrik — Program ASV Aterkia', 'item6.org': 'Undip Robotics Development Center · Semarang',
            'item6.desc': 'Mengintegrasikan hardware dan program robot kapal, serta riset lintas divisi untuk optimalisasi performa ASV.',
            'item7.title': 'Anggota Divisi Ekokeu', 'item7.org': 'UKM Taekwondo Undip · Semarang',
            'item7.desc': 'Mengatur arus dana UKM dan menghubungi sponsor untuk kebutuhan latihan maupun kompetisi.',
            'item8.title': 'Universitas Diponegoro', 'item8.org': 'Sarjana Informatika · IPK 3.88/4.00',
            'item8.desc': '*Estimasi kelulusan.',
            'item9.title': 'Anggota Divisi Keamanan', 'item9.org': 'Keluarga Mahasiswa Banten — Roadshow KMB · Tangerang Selatan',
            'item9.desc': 'Mengoordinasikan panitia lapangan agar sesuai rundown serta mencatat kehadiran dan evaluasi kegiatan.',
            'webinars.label': 'Seminar & Pelatihan Terverifikasi',
            webinar1: 'Kegiatan LKMM-PD Informatika Undip · 2025',
            webinar2: 'GORe FSM Undip · 2025',
            'projects.eyebrow': '03 · PROYEK',
            'projects.title': 'Proyek Unggulan',
            'projects.lede': 'Tiga platform web yang dibangun dan dipublikasikan secara mandiri maupun tim.',
            'proj1.desc': 'Platform computer vision robot kapal tim Aterkia ASV Undip untuk memantau status kapal secara real-time.',
            'proj2.desc': 'Platform untuk mengonversi dokumen ke berbagai format dengan cepat lewat antarmuka yang sederhana.',
            'proj3.desc': 'Platform marketplace multi-peran — menghubungkan Buyer, Seller, dan Driver dalam satu ekosistem. Dikerjakan secara individu sebagai syarat seleksi COMPFEST 18 Software Engineering Academy.',
            'proj.demo': 'Demo', 'proj.code': 'Kode',
            'contact.eyebrow': '04 · KONTAK',
            'contact.title': 'Mari Terhubung',
            'contact.lede': 'Terbuka untuk diskusi, kolaborasi proyek, maupun kesempatan magang. Silakan hubungi lewat kanal berikut.',
            copied: 'Tersalin!',
            'footer.built': 'Dibangun dengan HTML, CSS & JavaScript',
            'aria.closePanel': 'Tutup panel detail',
            'panel.badge.web-asv': 'Tim — Divisi Program',
            'panel.badge.convertly': 'Proyek Individu',
            'panel.badge.seapedia': 'Individu — Seleksi Academy',
        },
        en: {
            'meta.title': 'Ibnu Farrel Athaillah Firdaus — Portfolio',
            'meta.desc': 'Portfolio of Ibnu Farrel Athaillah Firdaus, an Informatics student at Universitas Diponegoro focused on cyber security, software development, and robotics.',
            'meta.ogDesc': 'Informatics student at Undip — cyber security, software development, robotics.',
            skip: 'Skip to main content',
            preloader: 'LOADING...',
            'nav.beranda': 'Home', 'nav.tentang': 'About', 'nav.perjalanan': 'Journey', 'nav.proyek': 'Projects', 'nav.kontak': 'Contact',
            'aria.logo': 'Back to homepage',
            'aria.dotnav': 'Section navigation',
            'aria.backtotop': 'Back to top',
            'aria.timelineFilter': 'Filter timeline by category',
            'aria.copyEmail': 'Copy email address',
            'aria.copyWa': 'Copy WhatsApp number',
            'hero.eyebrow': 'INFORMATICS STUDENT · DIPONEGORO UNIVERSITY',
            'hero.photoAlt': 'Photo of Ibnu Farrel Athaillah Firdaus',
            'hero.status': 'Informatics Student — Diponegoro University',
            'hero.cvBtn': 'View CV',
            'hero.projectsBtn': 'View Projects',
            'about.eyebrow': '01 · ABOUT',
            'about.title': 'About Me',
            'about.bio1': 'A first-year Informatics student at Universitas Diponegoro with a strong interest in <strong>cyber security</strong> and <strong>software development</strong>. I have foundational web development skills and stay active in robotics research with the campus ASV boat team.',
            'about.bio2': 'I regularly teach myself through small independent projects to broaden my technical knowledge, while staying active in organizations and competitions — from the taekwondo mat to informatics science competitions.',
            'about.skills.tech': 'Languages & Technologies',
            'about.skills.interest': 'Areas of Interest',
            'skill.cybersec': 'Cyber Security', 'skill.swdev': 'Software Development', 'skill.robotics': 'Robotics',
            'about.stat1.label': 'Cumulative GPA', 'about.stat1.sub': 'out of 4.00 scale',
            'about.stat2.label': 'Active Experience', 'about.stat2.sub': 'work & organizations',
            'about.stat3.label': 'Awards', 'about.stat3.sub': 'in informatics',
            'about.stat4.label': 'Web Projects', 'about.stat4.sub': 'published',
            'journey.eyebrow': '02 · JOURNEY',
            'journey.title': 'Journey Log',
            'journey.lede': 'A chronological record of the education, experience, and informatics achievements that shaped where I am today.',
            'filter.all': 'All',
            'filter.empty': 'No entries in this category yet.',
            'tag.pendidikan': 'Education', 'tag.pekerjaan': 'Work', 'tag.organisasi': 'Organization', 'tag.kepanitiaan': 'Committee', 'tag.penghargaan': 'Award',
            'item1.title': 'SMAS Al-Mubarak', 'item1.org': 'South Tangerang · Science Major',
            'item2.title': 'Bronze Medal in Informatics', 'item2.org': 'National Science Championship',
            'item3.title': 'Kyorugi Athlete Coach', 'item3.org': 'Java Eagle Taekwondo Academy · South Tangerang',
            'item3.desc': 'Designed structured training programs and coached athletes to improve technique, strategy, and competitive mindset.',
            'item4.title': 'Equipment Section Member', 'item4.org': 'Albin Leadership Training — OSISMPK Albin',
            'item4.desc': 'Coordinated logistics readiness and equipment condition before and during the event.',
            'item5.title': 'Silver Medal in Informatics', 'item5.org': 'Prestasi Maju Indonesia',
            'item6.title': 'Electrical Member — Aterkia ASV Program', 'item6.org': 'Undip Robotics Development Center · Semarang',
            'item6.desc': 'Integrated hardware and software for the boat robot, and conducted cross-division research to optimize ASV performance.',
            'item7.title': 'Finance & Economy Division Member', 'item7.org': 'UKM Taekwondo Undip · Semarang',
            'item7.desc': "Managed the club's cash flow and liaised with sponsors for training and competition needs.",
            'item8.title': 'Universitas Diponegoro', 'item8.org': 'Bachelor of Informatics · GPA 3.88/4.00',
            'item8.desc': '*Expected graduation.',
            'item9.title': 'Security Division Member', 'item9.org': 'Keluarga Mahasiswa Banten — KMB Roadshow · South Tangerang',
            'item9.desc': 'Coordinated on-site committee members to keep to the run-of-show, and logged attendance and event evaluations.',
            'webinars.label': 'Verified Seminars & Training',
            webinar1: 'LKMM-PD Informatics Undip Program · 2025',
            webinar2: 'GORe FSM Undip · 2025',
            'projects.eyebrow': '03 · PROJECTS',
            'projects.title': 'Featured Projects',
            'projects.lede': 'Three web platforms built and published, both independently and as part of a team.',
            'proj1.desc': 'A computer vision platform for the Aterkia ASV team boat robot, used to monitor vessel status in real time.',
            'proj2.desc': 'A platform for quickly converting documents between formats through a simple interface.',
            'proj3.desc': 'A multi-role marketplace platform — connecting Buyer, Seller, and Driver within one ecosystem. Built individually as an admission requirement for COMPFEST 18 Software Engineering Academy.',
            'proj.demo': 'Demo', 'proj.code': 'Code',
            'contact.eyebrow': '04 · CONTACT',
            'contact.title': "Let's Connect",
            'contact.lede': 'Open to discussion, project collaboration, and internship opportunities. Feel free to reach out through the channels below.',
            copied: 'Copied!',
            'footer.built': 'Built with HTML, CSS & JavaScript',
            'aria.closePanel': 'Close detail panel',
            'panel.badge.web-asv': 'Team — Electrical Division',
            'panel.badge.convertly': 'Individual Project',
            'panel.badge.seapedia': 'Individual — Academy Selection',
        },
    };

    let currentLang = 'id';
    try {
        const saved = localStorage.getItem('ibnu-portfolio-lang');
        if (saved === 'id' || saved === 'en') currentLang = saved;
    } catch (e) { console.log('localStorage unavailable, defaulting to id'); }

    let currentPanelCard = null;

    function getText(key) {
        return (I18N[currentLang] && I18N[currentLang][key] !== undefined) ? I18N[currentLang][key] : (I18N.id[key] || '');
    }

    function applyLanguage(lang) {
        currentLang = (lang === 'en') ? 'en' : 'id';
        html.setAttribute('lang', currentLang);
        try { localStorage.setItem('ibnu-portfolio-lang', currentLang); } catch (e) { /* ignore */ }

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (I18N[currentLang][key] !== undefined) el.textContent = getText(key);
        });
        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (I18N[currentLang][key] !== undefined) el.innerHTML = getText(key);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria');
            if (I18N[currentLang][key] !== undefined) el.setAttribute('aria-label', getText(key));
        });
        document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.getAttribute('data-i18n-alt');
            if (I18N[currentLang][key] !== undefined) el.setAttribute('alt', getText(key));
        });

        document.title = getText('meta.title');
        const descEl = document.getElementById('pageDesc');
        const ogTitleEl = document.getElementById('ogTitle');
        const ogDescEl = document.getElementById('ogDesc');
        if (descEl) descEl.setAttribute('content', getText('meta.desc'));
        if (ogTitleEl) ogTitleEl.setAttribute('content', getText('meta.title'));
        if (ogDescEl) ogDescEl.setAttribute('content', getText('meta.ogDesc'));

        const toggle = document.getElementById('langToggle');
        if (toggle) toggle.classList.toggle('is-en', currentLang === 'en');

        const typedEl = document.getElementById('typedStatus');
        if (typedEl && typedEl.dataset.done === 'true') typedEl.textContent = getText('hero.status');

        if (currentPanelCard && document.getElementById('projectPanel')?.classList.contains('is-open')) {
            populatePanel(currentPanelCard);
        }
    }
    applyLanguage(currentLang);

    //    REVEAL-ON-SCROLL SYSTEM
    html.classList.add('reveal-ready');

    function stagger(containerSelector, itemSelector, step) {
        document.querySelectorAll(containerSelector).forEach((container) => {
            const items = container.querySelectorAll(itemSelector);
            items.forEach((item, i) => item.style.setProperty('--d', (i * step) + 'ms'));
        });
    }
    stagger('.hero__content', '.hero-reveal', 130);
    stagger('.about__stats', '.stat', 90);
    stagger('.about__skills', '.skills__group', 120);
    stagger('.timeline', '.timeline-item', 60);
    stagger('.projects__grid', '.project-card', 120);

    function revealElement(el) {
        if (hasAnime && !prefersReducedMotion) {
            el.style.transition = 'none';
            anime.animate(el, {
                opacity: [0, 1],
                translateY: [34, 0],
                duration: 900,
                ease: 'outExpo',
            });
        }
        el.classList.add('is-visible');
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                revealElement(entry.target);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-item:not(.hero-reveal)').forEach((item) => revealObserver.observe(item));

    let heroRevealed = false;
    function revealHero() {
        if (heroRevealed) return;
        heroRevealed = true;
        document.querySelectorAll('.hero-reveal:not(.hero__name)').forEach((item) => revealElement(item));
        animateHeroName(document.querySelector('.hero__name'));
        startTypewriter();
    }
    // Safety net: if preloader logic is somehow skipped, still reveal hero.
    window.addEventListener('load', revealHero);

    /* ============================================================
       HERO NAME — staggered word entrance via Anime.js text-split.
       Falls back to the plain whole-block reveal used by every other
       hero element when Anime.js or motion isn't available.
       ============================================================ */
    function animateHeroName(nameEl) {
        if (!nameEl) return;
        if (hasAnime && !prefersReducedMotion) {
            try {
                nameEl.style.transition = 'none';
                nameEl.style.opacity = '1';
                nameEl.style.transform = 'none';
                const splitter = anime.text.split(nameEl, { words: true, chars: false, lines: false });
                anime.animate(splitter.words, {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 750,
                    delay: anime.stagger(70),
                    ease: 'outExpo',
                });
                nameEl.classList.add('is-visible');
                return;
            } catch (e) { /* fall through to plain reveal below */ }
        }
        revealElement(nameEl);
    }

    //    TYPEWRITER — hero status line
    function startTypewriter() {
        const typedEl = document.getElementById('typedStatus');
        if (!typedEl || typedEl.dataset.done) return;
        const fullText = getText('hero.status');

        if (prefersReducedMotion) {
            typedEl.textContent = fullText;
            typedEl.dataset.done = 'true';
            return;
        }

        typedEl.dataset.done = 'true';
        let i = 0;
        function typeChar() {
            typedEl.textContent = fullText.slice(0, i);
            i++;
            if (i <= fullText.length) setTimeout(typeChar, 28);
        }
        setTimeout(typeChar, 500);
    }

    //    PRELOADER
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPct = document.getElementById('preloaderPct');

    function hidePreloader() {
        if (preloader) preloader.classList.add('is-hidden');
        revealHero();
    }

    if (preloader && !prefersReducedMotion) {
        let pct = 0;
        const timer = setInterval(() => {
            pct += Math.random() * 22 + 12;
            if (pct >= 100) {
                pct = 100;
                clearInterval(timer);
                setTimeout(hidePreloader, 260);
            }
            if (preloaderFill) preloaderFill.style.width = pct + '%';
            if (preloaderPct) preloaderPct.textContent = Math.round(pct) + '%';
        }, 170);
    } else {
        hidePreloader();
    }

    //    ANIMATED COUNTERS (about stats)
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

        if (prefersReducedMotion) {
            el.textContent = target.toFixed(decimals);
            return;
        }

        if (hasAnime) {
            const counter = { value: 0 };
            anime.animate(counter, {
                value: target,
                duration: 1300,
                ease: 'outExpo',
                onUpdate: () => { el.textContent = counter.value.toFixed(decimals); },
                onComplete: () => { el.textContent = target.toFixed(decimals); },
            });
            return;
        }

        const duration = 1300;
        const start = performance.now();
        function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals);
        }
        requestAnimationFrame(tick);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.stat__value').forEach((el) => statObserver.observe(el));

    /* ============================================================
       LANGUAGE TOGGLE
       ============================================================ */
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'id' ? 'en' : 'id');
        });
    }

    /* ============================================================
       TIMELINE CATEGORY FILTER
       ============================================================ */
    const filterChips = document.querySelectorAll('.filter-chip');
    const filterableItems = document.querySelectorAll('.timeline-item');
    const timelineEmptyMsg = document.getElementById('timelineEmpty');

    filterChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const filter = chip.getAttribute('data-filter');
            filterChips.forEach((c) => c.classList.toggle('is-active', c === chip));

            let visibleCount = 0;
            filterableItems.forEach((item) => {
                const match = filter === 'all' || item.getAttribute('data-category') === filter;
                item.classList.toggle('is-filtered-out', !match);
                if (match) visibleCount += 1;
            });

            if (timelineEmptyMsg) timelineEmptyMsg.hidden = visibleCount > 0;
            updateScrollEffects();
        });
    });

    /* ============================================================
       PROJECT DETAIL PANEL
       Slides in from the right rather than a centered modal — reads
       like a mission-control detail readout, matching the rest of
       the site. Content is populated by cloning from the clicked
       card, so the card markup stays the single source of truth.
       ============================================================ */
    const projectPanel = document.getElementById('projectPanel');
    const projectPanelClose = document.getElementById('projectPanelClose');
    const projectPanelBackdrop = document.getElementById('projectPanelBackdrop');

    function populatePanel(card) {
        currentPanelCard = card;
        const id = card.getAttribute('data-project');

        const visualEl = document.getElementById('panelVisual');
        visualEl.innerHTML = '';

        const previewVideoSrc = card.dataset.previewVideo;
        const previewPoster = card.dataset.previewPoster;
        const cardVideo = card.querySelector('.project-card__visual video');
        const cardImg = card.querySelector('.project-card__visual img');
        const cardSvg = card.querySelector('.project-card__visual svg');

        if (previewVideoSrc) {
            const video = document.createElement('video');
            video.src = previewVideoSrc;
            if (previewPoster) video.poster = previewPoster;
            video.controls = false;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.disablePictureInPicture = true;
            video.controlsList = 'nodownload nofullscreen noremoteplayback';
            video.className = 'project-panel__preview';
            video.setAttribute('aria-hidden', 'true');
            video.addEventListener('error', () => {
                if (video.isConnected) video.remove();
                if (cardSvg) visualEl.appendChild(cardSvg.cloneNode(true));
                else if (cardImg) visualEl.appendChild(cardImg.cloneNode(true));
            }, { once: true });
            visualEl.appendChild(video);
            video.play().catch(() => {});
        } else if (cardVideo) {
            const clone = cardVideo.cloneNode(true);
            clone.controls = false;
            clone.autoplay = true;
            clone.loop = true;
            clone.muted = true;
            clone.playsInline = true;
            clone.disablePictureInPicture = true;
            clone.controlsList = 'nodownload nofullscreen noremoteplayback';
            clone.className = 'project-panel__preview';
            clone.setAttribute('aria-hidden', 'true');
            visualEl.appendChild(clone);
            clone.play().catch(() => {});
        } else if (cardImg) {
            visualEl.appendChild(cardImg.cloneNode(true));
        } else if (cardSvg) {
            visualEl.appendChild(cardSvg.cloneNode(true));
        }

        const titleSource = card.querySelector('.project-card__body > h3');
        document.getElementById('panelTitle').textContent = titleSource ? titleSource.textContent.trim() : '';

        const descSource = card.querySelector('.project-card__body > p');
        document.getElementById('panelDesc').textContent = descSource ? descSource.textContent.trim() : '';

        document.getElementById('panelBadge').textContent = getText('panel.badge.' + id);

        const tagsWrap = document.getElementById('panelTags');
        tagsWrap.innerHTML = '';
        card.querySelectorAll('.project-card__tags .tag').forEach((tag) => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag.textContent;
            tagsWrap.appendChild(span);
        });

        const linksWrap = document.getElementById('panelLinks');
        linksWrap.innerHTML = '';
        card.querySelectorAll('.project-card__links a').forEach((link) => {
            const clone = link.cloneNode(true);
            clone.classList.remove('project-link', 'project-link--demo', 'project-link--repo');
            clone.classList.add('btn', link.classList.contains('project-link--demo') ? 'btn-primary' : 'btn-outline');
            linksWrap.appendChild(clone);
        });
    }

    function getPanelFocusables() {
        return Array.from(projectPanel.querySelectorAll('a, button')).filter((el) => el.offsetParent !== null);
    }

    function onPanelKeydown(e) {
        if (e.key === 'Escape') {
            closeProjectDetail();
            return;
        }
        if (e.key === 'Tab') {
            const focusables = getPanelFocusables();
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    let panelOpenerEl = null;

    const inertTargets = ['#topbar', '.dot-nav', '#backToTop', '#konten-utama', '.site-footer']
        .map((sel) => document.querySelector(sel))
        .filter(Boolean);

    function openProjectDetail(card) {
        panelOpenerEl = card;
        populatePanel(card);
        projectPanel.classList.add('is-open');
        projectPanel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        inertTargets.forEach((el) => { el.inert = true; });
        document.addEventListener('keydown', onPanelKeydown);
        (projectPanelClose || projectPanel).focus();
    }

    function closeProjectDetail() {
        projectPanel.classList.remove('is-open');
        projectPanel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        inertTargets.forEach((el) => { el.inert = false; });
        document.removeEventListener('keydown', onPanelKeydown);
        const panelVideo = document.querySelector('.project-panel__preview');
        if (panelVideo) {
            panelVideo.pause();
            panelVideo.removeAttribute('src');
            panelVideo.load();
        }
        if (panelOpenerEl) panelOpenerEl.focus();
    }

    if (projectPanel) {
        if (projectPanelClose) projectPanelClose.addEventListener('click', closeProjectDetail);
        if (projectPanelBackdrop) projectPanelBackdrop.addEventListener('click', closeProjectDetail);

        document.querySelectorAll('.project-card[data-project]').forEach((card) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('click', (e) => {
                if (e.target.closest('.project-card__links')) return;
                openProjectDetail(card);
            });
            card.addEventListener('keydown', (e) => {
                if (e.target.closest('.project-card__links')) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectDetail(card);
                }
            });
        });
    }

    /* ============================================================
       COPY TO CLIPBOARD (email / WhatsApp)
       ============================================================ */
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-copy-value');
            if (!value || !navigator.clipboard) return;
            navigator.clipboard.writeText(value).then(() => {
                btn.classList.add('is-copied');
                clearTimeout(btn._copyTimeout);
                btn._copyTimeout = setTimeout(() => btn.classList.remove('is-copied'), 1800);
            }).catch(() => { /* clipboard unavailable — silently ignore, link buttons still work */ });
        });
    });

    /* ============================================================
       LIVE CLOCK — Asia/Jakarta (WIB)
       ============================================================ */
    const clockTimeEl = document.getElementById('clockTime');
    if (clockTimeEl) {
        const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        });
        function updateClock() {
            try {
                clockTimeEl.textContent = formatter.format(new Date());
            } catch (e) {
                clockTimeEl.parentElement.style.display = 'none';
            }
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    /* ============================================================
       SCROLL-DRIVEN EFFECTS (single rAF-throttled handler)
       progress bar · topbar state · back-to-top · timeline scan-fill
       ============================================================ */
    const scrollProgressFill = document.getElementById('scrollProgressFill');
    const topbar = document.getElementById('topbar');
    const backToTop = document.getElementById('backToTop');
    const timelineEl = document.querySelector('.timeline');
    const timelineFill = document.getElementById('timelineFill');
    const timelineItems = document.querySelectorAll('.timeline-item');

    let scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    }

    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - vh;
        const progress = docHeight > 0 ? Math.max(0, Math.min(scrollY / docHeight, 1)) : 0;
        if (scrollProgressFill) scrollProgressFill.style.width = (progress * 100) + '%';

        if (topbar) topbar.classList.toggle('is-scrolled', scrollY > 30);
        if (backToTop) backToTop.classList.toggle('is-visible', scrollY > vh * 0.6);

        if (timelineEl && timelineFill) {
            const rect = timelineEl.getBoundingClientRect();
            const scanLine = vh * 0.55;
            const fillProgress = Math.max(0, Math.min(1, (scanLine - rect.top) / rect.height));
            timelineFill.style.height = (fillProgress * 100) + '%';
            timelineItems.forEach((item) => {
                item.classList.toggle('is-active', item.getBoundingClientRect().top < scanLine);
            });
        }

        scrollTicking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollEffects();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ============================================================
       SCROLLSPY — side dot navigation
       ============================================================ */
    const navLinks = document.querySelectorAll('.dot-nav a');
    if (navLinks.length) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                navLinks.forEach((l) => l.classList.toggle('is-active', l.dataset.section === id));
            });
        }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

        document.querySelectorAll('main section[id]').forEach((sec) => spyObserver.observe(sec));
    }

    /* ============================================================
       CUSTOM CURSOR — fine pointers only, motion allowed only
       ============================================================ */
    if (isFinePointer && !prefersReducedMotion) {
        const cursorDot = document.getElementById('cursorDot');
        const cursorRing = document.getElementById('cursorRing');

        if (cursorDot && cursorRing) {
            document.body.classList.add('cursor-enabled');

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let ringX = mouseX;
            let ringY = mouseY;
            let cursorMoved = false;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
                cursorMoved = true;
            });

            function animateRing() {
                ringX += (mouseX - ringX) * 0.18;
                ringY += (mouseY - ringY) * 0.18;
                cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
                requestAnimationFrame(animateRing);
            }
            animateRing();

            document.querySelectorAll('a, button, .skill-chip').forEach((el) => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
            });
        }
    }

    /* ============================================================
       MAGNETIC BUTTONS
       ============================================================ */
    if (isFinePointer && !prefersReducedMotion) {
        document.querySelectorAll('.magnetic').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.35}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }

    /* ============================================================
       PROJECT CARD TILT
       ============================================================ */
    if (isFinePointer && !prefersReducedMotion) {
        document.querySelectorAll('.project-card.tilt').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ============================================================
       SVG MOTION (Anime.js) — satellite orbit, radar sweep, and the
       marketplace packet-in-transit. These were SMIL-driven before;
       Anime.js gives the same continuous loops with one engine and
       consistent reduced-motion handling. If Anime.js didn't load,
       these elements simply stay static — still legible, nothing
       breaks (see the CSS reduced-motion rules for the static state).
       ============================================================ */
    if (hasAnime && !prefersReducedMotion) {
        const satelliteEl = document.getElementById('ringSatellite');
        if (satelliteEl) {
            anime.animate(satelliteEl, { rotate: 360, duration: 14000, loop: true, ease: 'linear' });
        }
        const radarSweepEl = document.getElementById('radarSweep');
        if (radarSweepEl) {
            anime.animate(radarSweepEl, { rotate: 360, duration: 4000, loop: true, ease: 'linear' });
        }
        const marketRouteEl = document.getElementById('marketRoute');
        const marketPacketEl = document.getElementById('marketPacket');
        if (marketRouteEl && marketPacketEl) {
            anime.animate(marketPacketEl, {
                ...anime.svg.createMotionPath(marketRouteEl),
                duration: 6000,
                loop: true,
                ease: 'linear',
            });
        }
    }

    /* ============================================================
       HERO STARFIELD CANVAS — the signature moment
       Pauses automatically when the hero is off-screen or the tab
       is hidden. Falls back to a single static paint under
       prefers-reduced-motion (no continuous loop).
       ============================================================ */
    const canvas = document.getElementById('starCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let w = 0, h = 0, dpr = 1, stars = [], shootingStars = [], time = 0;
        let running = false, rafId = null;
        let mx = 0, my = 0;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initStars();
            if (prefersReducedMotion) paintStatic();
        }

        function initStars() {
            const count = Math.min(Math.floor((w * h) / 7500), 230);
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.3 + 0.35,
                base: Math.random() * 0.5 + 0.3,
                speed: Math.random() * 0.03 + 0.008,
                phase: Math.random() * Math.PI * 2
            }));
        }

        function paintStatic() {
            ctx.clearRect(0, 0, w, h);
            stars.forEach((s) => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245,246,248,${s.base})`;
                ctx.fill();
            });
        }

        function maybeSpawnShootingStar() {
            if (shootingStars.length >= 2 || Math.random() >= 0.004) return;
            shootingStars.push({
                x: Math.random() * w * 0.6 + w * 0.2,
                y: Math.random() * h * 0.18,
                len: Math.random() * 70 + 60,
                speed: Math.random() * 7 + 9,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
                life: 1
            });
        }

        function draw() {
            if (!running) return;
            ctx.clearRect(0, 0, w, h);
            const px = mx * 10;
            const py = my * 10;

            stars.forEach((s) => {
                const o = s.base + Math.sin(time * s.speed + s.phase) * 0.28;
                ctx.beginPath();
                ctx.arc(s.x + px, s.y + py, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245,246,248,${Math.max(0, Math.min(1, o))})`;
                ctx.fill();
            });

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                ctx.save();
                ctx.globalAlpha = Math.max(0, s.life);
                const tailX = s.x - Math.cos(s.angle) * s.len;
                const tailY = s.y - Math.sin(s.angle) * s.len;
                const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                grad.addColorStop(0, 'rgba(255,255,255,0.95)');
                grad.addColorStop(1, 'rgba(255,101,0,0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
                ctx.restore();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.life -= 0.018;
                if (s.life <= 0 || s.x > w + 100 || s.y > h + 100) shootingStars.splice(i, 1);
            }

            time += 1;
            maybeSpawnShootingStar();
            rafId = requestAnimationFrame(draw);
        }

        function startLoop() {
            if (running || prefersReducedMotion) return;
            running = true;
            rafId = requestAnimationFrame(draw);
        }
        function stopLoop() {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
        }

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX / window.innerWidth - 0.5;
            my = e.clientY / window.innerHeight - 0.5;
        });

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopLoop();
            else if (heroInView) startLoop();
        });

        let heroInView = true;
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroObserver = new IntersectionObserver((entries) => {
                heroInView = entries[0].isIntersecting;
                if (heroInView && !document.hidden) startLoop(); else stopLoop();
            }, { threshold: 0 });
            heroObserver.observe(heroSection);
        }

        resize();
        if (!prefersReducedMotion) startLoop();
    }

})();
