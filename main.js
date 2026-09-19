    // ── Content Renderer ──────────────────────────────────────────
    // Reads from content.js (SG object) and populates the page.
    (function () {
      if (typeof SG === 'undefined') return;

      // Gallery
      document.querySelectorAll('.gallery-grid').forEach(function (grid) {
        const isPreview = !!grid.dataset.preview;
        const limit = isPreview ? parseInt(grid.dataset.preview) : SG.gallery.length;

        function renderGallery(filterCategory) {
          let items = SG.gallery;
          if (filterCategory && filterCategory !== 'all') {
            items = SG.gallery.filter(function (item) {
              return item.category === filterCategory;
            });
          }
          const displayItems = isPreview ? items.slice(0, limit) : items;

          grid.innerHTML = displayItems.map(function (item, i) {
            const delay = ` style="animation-delay:${(i * 0.05).toFixed(2)}s; opacity:0;"`;
            return `<div class="gallery-item reveal in-view"${delay} data-category="${item.category || ''}">
              <img loading="lazy" src="${item.src}" alt="${item.alt}" />
              <div class="gallery-overlay"><span class="gallery-label">${item.label}</span></div>
            </div>`;
          }).join('');

          if (typeof window.initGalleryTilt === 'function') {
            window.initGalleryTilt();
          }
        }

        renderGallery('all');

        const filterContainer = document.querySelector('.gallery-filters');
        if (filterContainer) {
          const buttons = filterContainer.querySelectorAll('.filter-btn');
          buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
              buttons.forEach(function (b) { b.classList.remove('active'); });
              btn.classList.add('active');
              renderGallery(btn.dataset.filter);
            });
          });
        }
      });

      // Testimonials Continuous Marquee Ticker (Moves like homepage ticker)
      document.querySelectorAll('.testimonials-marquee-track, .testimonials-slider').forEach(function (track) {
        function renderCard(t, i) {
          const company = t.company ? `<div class="testimonial-company">${t.company}</div>` : '';
          const dateTag = t.date ? `<span class="testimonial-meta-dot">•</span><span class="testimonial-date">${t.date}</span>` : '';
          const cleanText = (t.text || '').replace(/^["“]|["”]$/g, '').trim();
          return `<div class="testimonial-card" data-index="${i}">
            <div class="testimonial-meta">
              <div class="testimonial-stars"><svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:-1px;margin-right:5px;flex-shrink:0;" aria-hidden="true"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>★★★★★</div>${dateTag}
            </div>
            <p class="testimonial-text">“${cleanText}”</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">${t.initials}</div>
              <div><div class="testimonial-name">${t.name}</div>${company}</div>
            </div>
          </div>`;
        }

        const cards = SG.testimonials.map(renderCard).join('');
        // Duplicate cards so marquee loops infinitely with zero seams
        track.innerHTML = cards + cards;

        const section = track.closest('#testimonials');
        if (!section) return;

        // Mobile touch pause: holding finger pauses movement to read comfortably
        track.addEventListener('touchstart', function () {
          track.style.animationPlayState = 'paused';
        }, { passive: true });

        track.addEventListener('touchend', function () {
          track.style.animationPlayState = 'running';
        }, { passive: true });

        // Performance: pause animation when testimonials section is scrolled out of view
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
          }, { threshold: 0.05 });
          obs.observe(section);
        }

        // Pause animation when browser tab is inactive
        document.addEventListener('visibilitychange', function () {
          track.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
      });

      // Stats
      const statItems = document.querySelectorAll('.stat-item');
      SG.stats.forEach(function (s, i) {
        if (!statItems[i]) return;
        const num = statItems[i].querySelector('.stat-num');
        const label = statItems[i].querySelector('.stat-label');
        if (num) { num.dataset.count = s.count; num.dataset.suffix = s.suffix; num.textContent = '0' + s.suffix; }
        if (label) label.textContent = s.label;
      });

      // Business info — contact page details
      const phoneEl   = document.getElementById('sg-phone');
      const emailEl   = document.getElementById('sg-email');
      const addressEl = document.getElementById('sg-address');
      if (phoneEl)   phoneEl.textContent   = SG.business.phoneDisplay;
      if (emailEl)   emailEl.textContent   = SG.business.email;
      if (addressEl) addressEl.textContent = SG.business.address;

      // Float buttons
      document.querySelectorAll('a.float-btn.whatsapp').forEach(function (a) {
        a.href = `https://wa.me/${SG.business.whatsapp}?text=${encodeURIComponent("Hi, I'd like to get a quote from StudioGraphic.")}`;
      });
      document.querySelectorAll('a.float-btn.call').forEach(function (a) {
        a.href = `tel:${SG.business.phone}`;
      });

      // Social links
      document.querySelectorAll('a[data-social="instagram"]').forEach(function (a) { a.href = SG.business.instagram; });
      document.querySelectorAll('a[data-social="facebook"]').forEach(function (a) { a.href = SG.business.facebook; });
    })();

    // ── Starfield ─────────────────────────────────────────────────
    // ── Background Starfield & Constellation Animation ───────────────
    (function () {
      const params = new URLSearchParams(window.location.search);
      if (params.get('gclid') || params.get('utm_source') === 'google') return;
      const canvas = document.getElementById('starfield');
      if (!canvas) return;
      const ctx    = canvas.getContext('2d');
      let stars  = [];
      let shoots = [];
      let W, H;
      let isMobile = false;
      let count = 180;
      let connectDist = 120;
      let lineAlphaFactor = 0.12;

      function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        isMobile = W < 768;
        // On mobile, keep the geometric network airy, subtle and non-distracting
        count = isMobile ? 48 : 170;
        connectDist = isMobile ? 75 : 120;
        lineAlphaFactor = isMobile ? 0.05 : 0.12;
      }

      function rand(min, max) { return Math.random() * (max - min) + min; }

      function initStars() {
        const minR = isMobile ? 0.3 : 0.4;
        const maxR = isMobile ? 1.2 : 1.8;
        const minAlpha = isMobile ? 0.07 : 0.12;
        const maxAlpha = isMobile ? 0.22 : 0.40;

        stars = Array.from({ length: count }, () => ({
          x:         rand(0, W),
          y:         rand(0, H),
          r:         rand(minR, maxR),
          baseAlpha: rand(minAlpha, maxAlpha),
          pulseSpeed:rand(0.25, 0.9),
          pulsePhase:rand(0, Math.PI * 2),
          vx:        rand(isMobile ? -0.05 : -0.08, isMobile ? 0.05 : 0.08),
          vy:        rand(isMobile ? -0.04 : -0.06, isMobile ? 0.04 : 0.06),
          wx:        rand(0, Math.PI * 2),
          wy:        rand(0, Math.PI * 2),
          wsx:       rand(0.0003, 0.0012),
          wsy:       rand(0.0003, 0.0012),
          wanderAmt: rand(isMobile ? 0.02 : 0.04, isMobile ? 0.08 : 0.15),
        }));
      }

      function spawnShoot() {
        shoots.push({
          x:     rand(0, W),
          y:     rand(0, H * 0.5),
          len:   rand(isMobile ? 50 : 80, isMobile ? 110 : 180),
          speed: rand(isMobile ? 4 : 6, isMobile ? 9 : 14),
          angle: rand(Math.PI * 0.1, Math.PI * 0.35),
          alpha: isMobile ? 0.45 : 1,
          trail: 0,
        });
      }

      function drawNebula(t) {
        const nebAlpha1 = isMobile ? 0.018 : 0.04;
        const nebAlpha2 = isMobile ? 0.014 : 0.035;
        const ox = Math.sin(t * 0.04) * W * 0.12;
        const oy = Math.cos(t * 0.03) * H * 0.1;
        const g1 = ctx.createRadialGradient(W*0.3+ox, H*0.4+oy, 0, W*0.3+ox, H*0.4+oy, W*0.35);
        g1.addColorStop(0,   `rgba(61,255,0,${nebAlpha1})`);
        g1.addColorStop(0.5, `rgba(61,255,0,${(nebAlpha1 * 0.38).toFixed(4)})`);
        g1.addColorStop(1,   'rgba(61,255,0,0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);

        const ox2 = Math.sin(t * 0.05 + 2) * W * 0.1;
        const oy2 = Math.cos(t * 0.04 + 1) * H * 0.12;
        const g2  = ctx.createRadialGradient(W*0.75+ox2, H*0.6+oy2, 0, W*0.75+ox2, H*0.6+oy2, W*0.28);
        g2.addColorStop(0,   `rgba(61,255,0,${nebAlpha2})`);
        g2.addColorStop(0.5, `rgba(61,255,0,${(nebAlpha2 * 0.3).toFixed(4)})`);
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
            if (dist < connectDist) {
              const a = (1 - dist / connectDist) * lineAlphaFactor;
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(61,255,0,${a.toFixed(3)})`;
              ctx.lineWidth = isMobile ? 0.35 : 0.5;
              ctx.stroke();
            }
          }
        }
      }

      function drawShoots(_dt) {
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
          ctx.lineWidth = isMobile ? 0.9 : 1.5;
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

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(61,255,0,${Math.min(a, 1).toFixed(3)})`;
          ctx.fill();

          const glowMultiplier = isMobile ? 2.5 : 5;
          const glowR = s.r * glowMultiplier;
          const grad  = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          grad.addColorStop(0,   `rgba(61,255,0,${(a * (isMobile ? 0.2 : 0.35)).toFixed(3)})`);
          grad.addColorStop(0.4, `rgba(61,255,0,${(a * (isMobile ? 0.05 : 0.1)).toFixed(3)})`);
          grad.addColorStop(1,   'rgba(61,255,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        if (t - lastShoot > rand(isMobile ? 8 : 3, isMobile ? 18 : 8)) {
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
      const params = new URLSearchParams(window.location.search);
      if (params.get('gclid') || params.get('utm_source') === 'google') {
        intro.style.transition = 'none';
        intro.style.display = 'none';
        const canvas = document.getElementById('starfield');
        if (canvas) canvas.style.display = 'none';
      } else {
        setTimeout(() => intro.classList.add('hidden'), 2200);
      }
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
      if (window.innerWidth < 768) { el.textContent = 'Unmissable.'; el.classList.add('typing-done'); return; }
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
      if (window.innerWidth < 768) { el.textContent = 'Services'; el.classList.add('typing-done'); return; }
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
      }, { threshold: 0.05 });

      obs.observe(document.getElementById('services'));
    })();

    // ── Typing effect on Recent Projects heading ──────────────────
    (function () {
      const el = document.getElementById('typingProjects');
      if (!el) return;
      if (window.innerWidth < 768) { el.textContent = 'Projects'; el.classList.add('typing-done'); return; }
      const text = 'Projects';
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
          else { el.classList.add('typing-done'); setTimeout(deleteOut, pauseAfterType); }
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

      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            obs.disconnect();
            typeOut();
          }
        });
      }, { threshold: 0.05 });

      obs.observe(document.getElementById('gallery'));
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
      if (window.innerWidth < 768) { el.innerHTML = `Don't Take Our <span class="accent">Word For It</span>`; return; }
      const fullText   = "Don't Take Our Word For It";
      const plainPart  = "Don't Take Our ";
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
      }, { threshold: 0.05 });

      obs.observe(document.getElementById('testimonials'));
    })();

    // ── Gallery staggered reveal ──────────────────────────────────
    // Handled dynamically on render inside main.js gallery logic

    // ── Lightbox ──────────────────────────────────────────────────
    (function () {
      const lightbox  = document.getElementById('lightbox');
      const lbImg     = document.getElementById('lightboxImg');
      const lbClose   = document.getElementById('lightboxClose');
      const lbPrev    = document.getElementById('lightboxPrev');
      const lbNext    = document.getElementById('lightboxNext');

      let current = 0;

      function getVisibleItems() {
        return Array.from(document.querySelectorAll('.gallery-item'));
      }

      function open(idx) {
        const visibleItems = getVisibleItems();
        if (idx < 0 || idx >= visibleItems.length) return;
        current = idx;
        const item  = visibleItems[idx];
        const img   = item.querySelector('img');
        lbImg.src   = img ? img.src : '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      function close() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }

      function prev() { 
        const visibleItems = getVisibleItems();
        open((current - 1 + visibleItems.length) % visibleItems.length); 
      }
      function next() { 
        const visibleItems = getVisibleItems();
        open((current + 1) % visibleItems.length); 
      }

      // Event delegation for dynamically rendered gallery items
      document.addEventListener('click', function (e) {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        
        const visibleItems = getVisibleItems();
        const idx = visibleItems.indexOf(item);
        if (idx !== -1) {
          open(idx);
        }
      });

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

    // ── Universal Lead Conversion Tracker ────────────────────────
    function trackLeadConversion(action, label) {
      // 1. Google Ads Conversion Tag
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-11411411417',
          event_category: 'lead_engagement',
          event_label: label || action
        });
      }
      // 2. Google Tag Manager dataLayer push
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_conversion',
        conversion_type: action,
        conversion_label: label || action,
        timestamp: new Date().toISOString()
      });
    }
    window.trackLeadConversion = trackLeadConversion;

    // Global listener for WhatsApp and Phone click tracking
    document.addEventListener('click', function (e) {
      const wa = e.target.closest('a[href*="wa.me"]');
      if (wa) {
        const s = wa.getAttribute('data-service') || 'whatsapp_inquiry';
        trackLeadConversion('whatsapp_click', s);
        return;
      }
      const tel = e.target.closest('a[href^="tel:"]');
      if (tel) {
        trackLeadConversion('phone_call_click', tel.getAttribute('href') || '01228472486');
        return;
      }
    });

    // Auto-select service in dropdown if ?service= query param is provided
    (function () {
      const serviceParam = new URLSearchParams(window.location.search).get('service');
      if (serviceParam) {
        const serviceSelect = document.getElementById('service') || document.querySelector('select[name="Service Required"]');
        if (serviceSelect) {
          const q = serviceParam.toLowerCase().replace(/[\+_-]/g, ' ');
          for (let opt of serviceSelect.options) {
            if (opt.value && (opt.value.toLowerCase().includes(q) || q.includes(opt.value.toLowerCase()))) {
              opt.selected = true;
              break;
            }
          }
        }
      }
    })();

    // ── Form handler ──────────────────────────────────────────────
    async function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const btn  = form.querySelector('button[type=submit]');

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const data = Object.fromEntries(new FormData(form));
        const res = await fetch(form.action, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });

        if (res.ok) {
          btn.textContent = '✓ Sent! We\'ll be in touch.';
          btn.style.background = 'var(--green-d)';
          trackLeadConversion('form_submission', data['Service Required'] || 'contact_form');
          form.reset();
          // Reset upload preview UI if present
          const zone = form.querySelector('.upload-drop-area');
          const previewList = form.querySelector('#uploadPreviewList');
          const uploadText = form.querySelector('#uploadText');
          if (zone) zone.classList.remove('has-files');
          if (previewList) { previewList.innerHTML = ''; previewList.style.display = 'none'; }
          if (uploadText) uploadText.style.display = 'block';
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

    // ── Sticky CTA ────────────────────────────────────────────────
    (function () {
      const bar = document.getElementById('stickyCta');
      if (!bar) return;
      let shown = false;
      window.addEventListener('scroll', function () {
        const past = window.scrollY > (window.innerHeight * 0.6);
        if (past && !shown) { bar.classList.add('visible'); shown = true; }
        else if (!past && shown) { bar.classList.remove('visible'); shown = false; }
      }, { passive: true });
    })();

    // ── Gallery 3D tilt ──────────────────────────────────────────
    window.initGalleryTilt = function () {
      if (window.innerWidth < 768) return;
      document.querySelectorAll('.gallery-item').forEach(function (card) {
        // Prevent duplicate listeners
        if (card.dataset.tiltActive) return;
        card.dataset.tiltActive = 'true';
        
        card.addEventListener('mousemove', function (e) {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width  - 0.5;
          const y = (e.clientY - rect.top)  / rect.height - 0.5;
          card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
          card.style.transition = 'border-color 0.4s, box-shadow 0.4s, transform 0.08s ease';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
          card.style.transition = 'border-color 0.4s, box-shadow 0.4s, transform 0.5s ease';
        });
      });
    };
    window.initGalleryTilt();

    // ── CTA video — click to play ─────────────────────────────────
    (function () {
      const video   = document.getElementById('ctaVideo');
      const overlay = document.getElementById('ctaVideoOverlay');
      if (!video || !overlay) return;

      overlay.addEventListener('click', function () {
        video.play();
        overlay.classList.add('hidden');
      });

      video.addEventListener('ended', function () {
        overlay.classList.remove('hidden');
      });
    })();

    // ── FAQ Accordion ─────────────────────────────────────────────
    (function () {
      document.querySelectorAll('.faq-item').forEach(function (item) {
        item.addEventListener('click', function () {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
          if (!isOpen) item.classList.add('open');
        });
      });
    })();

    // ── Background Video Autoplay Safety ──────────────────────────
    (function () {
      const vids = document.querySelectorAll('#bgVideo, .hero-bg-video');
      if (vids.length) {
        const startPlay = function () {
          vids.forEach(function (v) { v.play().catch(function () {}); });
        };
        startPlay();
        document.addEventListener('touchstart', startPlay, { once: true, passive: true });
        document.addEventListener('click', startPlay, { once: true });
      }
    })();


