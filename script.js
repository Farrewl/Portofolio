(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const html = document.documentElement;

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
    stagger('.achievements__grid', '.achievement-card', 70);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-item:not(.hero-reveal)').forEach((item) => revealObserver.observe(item));

    let heroRevealed = false;
    function revealHero() {
        if (heroRevealed) return;
        heroRevealed = true;
        document.querySelectorAll('.hero-reveal').forEach((item) => item.classList.add('is-visible'));
        startTypewriter();
    }
    // Safety net: if preloader logic is somehow skipped, still reveal hero.
    window.addEventListener('load', revealHero);

    /* ============================================================
       TYPEWRITER — hero status line
       ============================================================ */
    function startTypewriter() {
        const typedEl = document.getElementById('typedStatus');
        if (!typedEl || typedEl.dataset.done) return;
        const fullText = 'Mahasiswa Informatika — Universitas Diponegoro';

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

    /* ============================================================
       PRELOADER
       ============================================================ */
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

    /* ============================================================
       ANIMATED COUNTERS (about stats)
       ============================================================ */
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

        if (prefersReducedMotion) {
            el.textContent = target.toFixed(decimals);
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
