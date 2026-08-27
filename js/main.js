/* ==========================================================================
   Josh McGuigan Photography — shared site behaviour
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     Image fallback — shows a soft placeholder tile until a real photo
     exists at the given path. Safe to leave in for production; once a
     real file is present at that path it just loads normally.
  --------------------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      const div = document.createElement('div');
      div.className = 'img-fallback';
      // static hero/photo/cover images sit inside a container that already
      // has its own size (absolute inset:0, or a fixed aspect-ratio),
      // so the fallback just needs to fill it.
      div.style.width = '100%';
      div.style.height = '100%';
      div.textContent = img.dataset.fallback;
      img.replaceWith(div);
    }, { once: true });
  });

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobilePanel = document.querySelector('.nav-mobile-panel');
  if (navToggle && navMobilePanel) {
    navToggle.addEventListener('click', () => {
      navMobilePanel.classList.toggle('is-open');
    });
    navMobilePanel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMobilePanel.classList.remove('is-open'));
    });
  }

  /* ---------------------------------------------------------------------
     Active nav link (matches body[data-page])
  --------------------------------------------------------------------- */
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(l => l.classList.add('is-active'));
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
     Header social icons — fade in on scroll (home page only; see CSS)
  --------------------------------------------------------------------- */
  const scrollThreshold = 120;
  const syncNavScrolled = () => {
    document.body.classList.toggle('nav-scrolled', window.scrollY > scrollThreshold);
  };
  window.addEventListener('scroll', syncNavScrolled, { passive: true });
  syncNavScrolled();

  /* ---------------------------------------------------------------------
     Hero — gentle shrink + fade as you scroll away from it
  --------------------------------------------------------------------- */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroSection = document.querySelector('.hero');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = heroSection.offsetHeight;
        const p = Math.min(Math.max(window.scrollY / h, 0), 1);
        heroContent.style.transform = `scale(${1 - p * 0.16}) translateY(${p * 40}px)`;
        heroContent.style.opacity = `${1 - p * 1.1}`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------------
     Lightbox (shared by carousel + galleries)
  --------------------------------------------------------------------- */
  const lightbox = document.querySelector('.lightbox');
  let lbList = [];
  let lbIndex = 0;

  function renderLightbox() {
    const item = lbList[lbIndex];
    if (!item) return;
    const img = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    img.style.opacity = 0;
    const temp = new Image();
    temp.onload = () => { img.src = item.src; img.style.opacity = 1; };
    temp.onerror = () => { img.src = item.src; img.style.opacity = 1; };
    temp.src = item.src;
    title.textContent = item.title || '';
  }

  function openLightbox(list, index) {
    if (!lightbox) return;
    lbList = list;
    lbIndex = index;
    renderLightbox();
    lightbox.classList.add('is-open');
    document.body.classList.add('lock-scroll');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lock-scroll');
  }

  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    renderLightbox();
  }

  if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lightbox.querySelectorAll('.lightbox-arrow.prev').forEach(b => b.addEventListener('click', () => stepLightbox(-1)));
    lightbox.querySelectorAll('.lightbox-arrow.next').forEach(b => b.addEventListener('click', () => stepLightbox(1)));
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  /* ---------------------------------------------------------------------
     Homepage carousel — driven by requestAnimationFrame rather than a
     CSS animation. This is what makes the hover slow-down smooth: instead
     of swapping animation-duration (which snaps to a new position), we
     ease the current speed toward a target speed every frame.
  --------------------------------------------------------------------- */
  const track = document.getElementById('carousel-track');
  if (track && typeof CAROUSEL_IMAGES !== 'undefined') {
    const list = CAROUSEL_IMAGES;
    // a handful of varied placeholder aspect ratios so the row visibly
    // reads as "mixed widths, same height" even before real photos with
    // their own natural aspect ratios are dropped in.
    const placeholderRatios = ['3/4', '4/3', '1/1', '16/9', '2/3', '5/4'];

    const buildItems = () => list.map((item, i) => {
      const el = document.createElement('div');
      el.className = 'carousel-item';
      const ratio = placeholderRatios[i % placeholderRatios.length];
      el.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy" data-fallback="${item.title}" data-ratio="${ratio}">
        <span class="carousel-item-title">${item.title}</span>
      `;
      el.addEventListener('click', () => openLightbox(list, i));
      el.querySelector('img').addEventListener('error', function handler() {
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = '1';
        const div = document.createElement('div');
        div.className = 'img-fallback';
        const [w, h] = ratio.split('/').map(Number);
        div.style.height = '100%';
        div.style.width = `${Math.round(340 * (w / h))}px`;
        div.textContent = item.title;
        this.replaceWith(div);
        requestMeasure();
      });
      return el;
    });

    // duplicate the set once for a seamless infinite loop
    buildItems().forEach(el => track.appendChild(el));
    buildItems().forEach(el => track.appendChild(el));

    const wrap = track.closest('.carousel-wrap');
    const prevBtn = wrap.querySelector('.carousel-arrow.prev');
    const nextBtn = wrap.querySelector('.carousel-arrow.next');

    const NORMAL_SPEED = 34;  // px / second
    const SLOW_SPEED = 6;     // px / second while hovering
    let currentSpeed = NORMAL_SPEED;
    let targetSpeed = NORMAL_SPEED;
    let position = 0;
    let nudgeVelocity = 0;
    let halfWidth = 0;
    let lastTime = null;
    let measureQueued = false;

    function measure() {
      halfWidth = track.scrollWidth / 2;
      measureQueued = false;
    }
    function requestMeasure() {
      if (measureQueued) return;
      measureQueued = true;
      requestAnimationFrame(measure);
    }
    requestMeasure();
    window.addEventListener('resize', requestMeasure);
    window.addEventListener('load', requestMeasure);
    track.querySelectorAll('img').forEach(img => img.addEventListener('load', requestMeasure, { once: true }));

    wrap.addEventListener('mouseenter', () => { targetSpeed = SLOW_SPEED; });
    wrap.addEventListener('mouseleave', () => { targetSpeed = NORMAL_SPEED; });

    function nudge(dir) {
      // a smooth, decaying velocity "flick" rather than an instant jump
      nudgeVelocity += dir * 1500;
    }
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); nudge(-1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nudge(1); });

    function step(timestamp) {
      if (lastTime === null) lastTime = timestamp;
      const dt = Math.min(timestamp - lastTime, 50) / 1000;
      lastTime = timestamp;

      // ease current speed toward target speed — no sudden snaps
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(dt * 2.0, 1);
      // let any arrow-nudge velocity decay smoothly back to zero
      nudgeVelocity *= Math.exp(-dt * 3.2);

      if (halfWidth > 0) {
        position += (currentSpeed + nudgeVelocity) * dt;
        position = ((position % halfWidth) + halfWidth) % halfWidth;
        track.style.transform = `translateX(${-position}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------------------
     Gallery category pages — masonry grid
  --------------------------------------------------------------------- */
  const masonry = document.getElementById('masonry-grid');
  if (masonry && typeof GALLERY_IMAGES !== 'undefined') {
    const category = document.body.dataset.gallery;
    const list = GALLERY_IMAGES[category] || [];
    list.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'masonry-item';
      el.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy" data-fallback="${item.title}" data-ratio="${(3 + (i % 3) * 0.3).toFixed(2)}/4">
        <span class="masonry-item-title">${item.title}</span>
      `;
      el.addEventListener('click', () => openLightbox(list, i));
      el.querySelector('img').addEventListener('error', function handler() {
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = '1';
        const div = document.createElement('div');
        div.className = 'img-fallback';
        div.style.aspectRatio = this.dataset.ratio;
        div.textContent = item.title;
        this.replaceWith(div);
      });
      masonry.appendChild(el);
    });
  }

  /* ---------------------------------------------------------------------
     Forms — front-end only. GitHub Pages can't process form submissions
     on its own, so this just gives visual confirmation. Wire this up to
     Formspree / Netlify Forms / your own endpoint when you're ready
     (see README.md).
  --------------------------------------------------------------------- */
  document.querySelectorAll('.glass-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit button');
      const original = btn.textContent;
      btn.textContent = 'Sent — thank you!';
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3200);
    });
  });

});
