    // ── Starfield ─────────────────────────────────────────────────
    (function () {
      const canvas = document.getElementById('starfield');
      const ctx    = canvas.getContext('2d');
      const COUNT  = 180;
      const CONNECT_DIST = 120;
      let stars  = [];
      let shoots = [];
      let W, H;

      function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }

      function rand(min, max) { return Math.random() * (max - min) + min; }

      function initStars() {
        stars = Array.from({ length: COUNT }, () => ({
          x:         rand(0, W),
          y:         rand(0, H),
          r:         rand(0.4, 1.8),
          baseAlpha: rand(0.12, 0.4),
          pulseSpeed:rand(0.3, 1.0),
          pulsePhase:rand(0, Math.PI * 2),
          vx:        rand(-0.08, 0.08),
          vy:        rand(-0.06, 0.06),
          wx:        rand(0, Math.PI * 2),
          wy:        rand(0, Math.PI * 2),
          wsx:       rand(0.0003, 0.0012),
          wsy:       rand(0.0003, 0.0012),
          wanderAmt: rand(0.04, 0.15),
        }));
      }

      function spawnShoot() {
        shoots.push({
          x:     rand(0, W),
          y:     rand(0, H * 0.5),
          len:   rand(80, 180),
          speed: rand(6, 14),
          angle: rand(Math.PI * 0.1, Math.PI * 0.35),
          alpha: 1,
          trail: 0,
        });
      }

      function drawNebula(t) {
        // Two slow-drifting radial glows
        const ox = Math.sin(t * 0.04) * W * 0.12;
        const oy = Math.cos(t * 0.03) * H * 0.1;
        const g1 = ctx.createRadialGradient(W*0.3+ox, H*0.4+oy, 0, W*0.3+ox, H*0.4+oy, W*0.35);
        g1.addColorStop(0,   'rgba(61,255,0,0.04)');
        g1.addColorStop(0.5, 'rgba(61,255,0,0.015)');
        g1.addColorStop(1,   'rgba(61,255,0,0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);

        const ox2 = Math.sin(t * 0.05 + 2) * W * 0.1;
        const oy2 = Math.cos(t * 0.04 + 1) * H * 0.12;
        const g2  = ctx.createRadialGradient(W*0.75+ox2, H*0.6+oy2, 0, W*0.75+ox2, H*0.6+oy2, W*0.28);
        g2.addColorStop(0,   'rgba(61,255,0,0.035)');
        g2.addColorStop(0.5, 'rgba(61,255,0,0.01)');
        g2.addColorStop(1,   'rgba(61,255,0,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);
      }

      function drawConnections() {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx   = stars[i].x - stars[j].x;
            const dy   = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < CONNECT_DIST) {
              const a = (1 - dist / CONNECT_DIST) * 0.12;
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(61,255,0,${a.toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      function drawShoots(dt) {
        shoots = shoots.filter(s => s.alpha > 0.02);
        shoots.forEach(s => {
          s.trail += s.speed;
          s.alpha  -= 0.018;
          const ex = s.x + Math.cos(s.angle) * s.trail;
          const ey = s.y + Math.sin(s.angle) * s.trail;
          const sx = ex - Math.cos(s.angle) * s.len;
          const sy = ey - Math.sin(s.angle) * s.len;
          const grad = ctx.createLinearGradient(sx, sy, ex, ey);
          grad.addColorStop(0,   'rgba(61,255,0,0)');
          grad.addColorStop(0.7, `rgba(61,255,0,${(s.alpha * 0.6).toFixed(3)})`);
          grad.addColorStop(1,   `rgba(180,255,130,${s.alpha.toFixed(3)})`);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      }

      let lastShoot = 0;
      function draw(ts) {
        const t = ts / 1000;
        ctx.clearRect(0, 0, W, H);

        drawNebula(t);
        drawConnections();

        stars.forEach(s => {
          s.x += s.vx + Math.sin(s.wx + t * s.wsx * 60) * s.wanderAmt;
          s.y += s.vy + Math.sin(s.wy + t * s.wsy * 60) * s.wanderAmt;
          if (s.x < -2)  s.x = W + 2;
          if (s.x > W+2) s.x = -2;
          if (s.y < -2)  s.y = H + 2;
          if (s.y > H+2) s.y = -2;

          const pulse = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.pulseSpeed * Math.PI * 2 + s.pulsePhase));
          const a     = s.baseAlpha * pulse;

          // Core dot
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(61,255,0,${Math.min(a, 1).toFixed(3)})`;
          ctx.fill();

          // Soft glow halo
          const glowR = s.r * 5;
          const grad  = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          grad.addColorStop(0,   `rgba(61,255,0,${(a * 0.35).toFixed(3)})`);
          grad.addColorStop(0.4, `rgba(61,255,0,${(a * 0.1).toFixed(3)})`);
          grad.addColorStop(1,   'rgba(61,255,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Shooting stars — random interval 3-8s
        if (t - lastShoot > rand(3, 8)) {
          spawnShoot();
          lastShoot = t;
        }
        drawShoots(t);

        requestAnimationFrame(draw);
      }

      window.addEventListener('resize', () => { resize(); initStars(); });
      resize();
      initStars();
      requestAnimationFrame(draw);
    })();

    // ── Mobile menu ───────────────────────────────────────────────
    function toggleMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
    }

    // ── Scroll reveal ─────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── Active nav link ───────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}`
          ? 'var(--green)'
          : '';
      });
    });

    // ── Cookie banner ─────────────────────────────────────────────
    (function () {
      const banner = document.getElementById('cookieBanner');
      if (localStorage.getItem('sg_cookies')) banner.classList.add('hidden');
    })();

    function acceptCookies() {
      localStorage.setItem('sg_cookies', 'accepted');
      document.getElementById('cookieBanner').classList.add('hidden');
    }

    function declineCookies() {
      localStorage.setItem('sg_cookies', 'declined');
      document.getElementById('cookieBanner').classList.add('hidden');
    }

    // ── Intro animation ───────────────────────────────────────────
    (function () {
      const intro = document.getElementById('intro');
      setTimeout(() => intro.classList.add('hidden'), 2200);
    })();

    // ── Active nav highlight ──────────────────────────────────────
    (function () {
      const sections = document.querySelectorAll('section[id], #hero');
      const navLinks = document.querySelectorAll('.nav-links a');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }, { threshold: 0.35 });
      sections.forEach(s => observer.observe(s));
    })();

    // ── Typing effect on hero accent ──────────────────────────────
    (function () {
      const el = document.getElementById('typingAccent');
      if (!el) return;
      const text = 'Unmissable.';
      const typeSpeed = 80;
      const deleteSpeed = 40;
      const pauseAfterType = 2000;
      const pauseAfterDelete = 400;

      function typeOut() {
        let i = 0;
        el.classList.remove('typing-done');
        el.textContent = '';
        (function addChar() {
          el.textContent = text.slice(0, ++i);
          if (i < text.length) {
            setTimeout(addChar, typeSpeed);
          } else {
            el.classList.add('typing-done');
            setTimeout(deleteOut, pauseAfterType);
          }
        })();
      }

      function deleteOut() {
        let i = el.textContent.length;
        el.classList.remove('typing-done');
        (function removeChar() {
          el.textContent = text.slice(0, --i);
          if (i > 0) {
            setTimeout(removeChar, deleteSpeed);
          } else {
            setTimeout(typeOut, pauseAfterDelete);
          }
        })();
      }

      setTimeout(typeOut, 2400);
    })();

    // ── Typing effect on Services heading ────────────────────────
    (function () {
      const el = document.getElementById('typingServicesHeading');
      if (!el) return;
      const text = 'Services';
      const typeSpeed = 90;
      const deleteSpeed = 45;
      const pauseAfterType = 4000;
      const pauseAfterDelete = 300;
      let started = false;

      function typeOut() {
        let i = 0;
        el.classList.remove('typing-done');
        el.textContent = '';
        (function addChar() {
          el.textContent = text.slice(0, ++i);
          if (i < text.length) setTimeout(addChar, typeSpeed);
          else {
            el.classList.add('typing-done');
            setTimeout(deleteOut, pauseAfterType);
          }
        })();
      }

      function deleteOut() {
        let i = el.textContent.length;
        el.classList.remove('typing-done');
        (function removeChar() {
          el.textContent = text.slice(0, --i);
          if (i > 0) setTimeout(removeChar, deleteSpeed);
          else setTimeout(typeOut, pauseAfterDelete);
        })();
      }

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            started = true;
            obs.disconnect();
            typeOut();
          }
        });
      }, { threshold: 0.3 });

      obs.observe(document.getElementById('services'));
    })();

    // ── Animated stat counters ────────────────────────────────────
    (function () {
      const counters = document.querySelectorAll('.stat-num[data-count]');
      const duration = 2000;
      const pauseAfter = 800; // ms to hold at target before reset

      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

      function runCounter(el) {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const start  = performance.now();

        function update(now) {
          const elapsed = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(easeOut(elapsed) * target) + suffix;
          if (elapsed < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
            setTimeout(() => runCounter(el), pauseAfter);
          }
        }

        requestAnimationFrame(update);
      }

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          runCounter(entry.target);
        });
      }, { threshold: 0.5 });

      counters.forEach(c => obs.observe(c));
    })();

    // ── Typing effect on testimonials heading ─────────────────────
    (function () {
      const el = document.getElementById('typingReviews');
      if (!el) return;
      const fullText   = "Don't Take Our Word For It";
      const plainPart  = "Don't Take Our ";
      const accentPart = "Word For It";
      const typeSpeed  = 60;
      const deleteSpeed = 35;
      const pauseAfterType = 2000;
      const pauseAfterDelete = 400;
      let started = false;

      function render(typed) {
        if (typed.length <= plainPart.length) {
          el.innerHTML = `${typed}`;
        } else {
          const accent = typed.slice(plainPart.length);
          el.innerHTML = `${plainPart}<span class="accent">${accent}</span>`;
        }
      }

      function typeOut() {
        let i = 0;
        render('');
        (function addChar() {
          render(fullText.slice(0, ++i));
          if (i < fullText.length) setTimeout(addChar, typeSpeed);
          else setTimeout(deleteOut, pauseAfterType);
        })();
      }

      function deleteOut() {
        let i = fullText.length;
        (function removeChar() {
          render(fullText.slice(0, --i));
          if (i > 0) setTimeout(removeChar, deleteSpeed);
          else setTimeout(typeOut, pauseAfterDelete);
        })();
      }

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            started = true;
            obs.disconnect();
            typeOut();
          }
        });
      }, { threshold: 0.3 });

      obs.observe(document.getElementById('testimonials'));
    })();

    // ── Gallery staggered reveal ──────────────────────────────────
    (function () {
      const items = document.querySelectorAll('.gallery-item');
      items.forEach(item => { item.style.opacity = '0'; });

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const item  = entry.target;
          const index = Array.from(items).indexOf(item);
          item.style.animationDelay = `${index * 0.08}s`;
          item.classList.add('in-view');
        });
      }, { threshold: 0.1 });

      items.forEach(item => obs.observe(item));
    })();

    // ── Lightbox ──────────────────────────────────────────────────
    (function () {
      const lightbox  = document.getElementById('lightbox');
      const lbImg     = document.getElementById('lightboxImg');
      const lbCaption = document.getElementById('lightboxCaption');
      const lbClose   = document.getElementById('lightboxClose');
      const lbPrev    = document.getElementById('lightboxPrev');
      const lbNext    = document.getElementById('lightboxNext');

      const items = Array.from(document.querySelectorAll('.gallery-item'));
      let current = 0;

      function open(idx) {
        current = idx;
        const item  = items[idx];
        const img   = item.querySelector('img');
        const label = item.querySelector('.gallery-label');
        lbImg.src          = img ? img.src : '';
        lbCaption.textContent = label ? label.textContent : '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      function close() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }

      function prev() { open((current - 1 + items.length) % items.length); }
      function next() { open((current + 1) % items.length); }

      items.forEach((item, i) => item.addEventListener('click', () => open(i)));
      lbClose.addEventListener('click', close);
      lbPrev.addEventListener('click', prev);
      lbNext.addEventListener('click', next);
      lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

      document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
      });
    })();

    // ── Scroll-scrub video ────────────────────────────────────────
    (function () {
      const section  = document.getElementById('scroll-video-section');
      const video    = document.getElementById('scrubVideo');
      const progress = document.getElementById('videoProgress');
      const label    = document.getElementById('videoLabel');
      const hint     = document.getElementById('scrollHint');

      if (!section || !video) return;

      // Wait until we know the video duration
      function onReady() {
        window.addEventListener('scroll', scrub, { passive: true });
      }

      video.addEventListener('loadedmetadata', onReady);
      // If already loaded (cached)
      if (video.readyState >= 1) onReady();

      function scrub() {
        const rect        = section.getBoundingClientRect();
        const sectionH    = section.offsetHeight;
        const viewH       = window.innerHeight;

        // 0 = sticky just entered view, 1 = sticky about to leave
        const scrolled    = -rect.top;
        const scrollable  = sectionH - viewH;
        const pct         = Math.min(Math.max(scrolled / scrollable, 0), 1);

        if (video.duration) {
          video.currentTime = pct * video.duration;
        }

        // Update progress bar
        progress.style.width = (pct * 100) + '%';

        // Fade label out after 10% scroll, hint out immediately
        label.style.opacity   = pct < 0.08 ? 1 : Math.max(0, 1 - (pct - 0.08) * 12);
        hint.style.opacity    = pct < 0.02 ? (1 - pct * 30) : 0;
      }
    })();

    // ── About section video — click to play ──────────────────────
    (function () {
      const overlay    = document.getElementById('videoPlayOverlay');
      const aboutVideo = document.getElementById('aboutVideo');

      if (!overlay || !aboutVideo) return;

      // Ensure starts at frame 0
      aboutVideo.addEventListener('loadedmetadata', () => {
        aboutVideo.currentTime = 0;
      });
      if (aboutVideo.readyState >= 1) aboutVideo.currentTime = 0;

      overlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
        aboutVideo.play();
      });

      // Show overlay again when video ends
      aboutVideo.addEventListener('ended', () => {
        aboutVideo.currentTime = 0;
        overlay.classList.remove('hidden');
      });
    })();

    // ── Form handler ──────────────────────────────────────────────
    async function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const btn  = form.querySelector('button[type=submit]');

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          btn.textContent = '✓ Sent! We\'ll be in touch.';
          btn.style.background = 'var(--green-d)';
          form.reset();
          setTimeout(() => {
            btn.textContent = 'Send Enquiry';
            btn.style.background = '';
            btn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Failed');
        }
      } catch {
        btn.textContent = 'Error — please call us directly';
        btn.style.background = '#c0392b';
        setTimeout(() => {
          btn.textContent = 'Send Enquiry';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    }
