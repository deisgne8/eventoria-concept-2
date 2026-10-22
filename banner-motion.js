/* Banner entrance only. Temporary glyph overlays preserve the original typography. */
(() => {
  const hero = document.querySelector('.hero');
  const heading = hero?.querySelector('h1');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!heading || preference.matches || !heading.animate) return;
  hero.classList.add('banner-motion-pending');

  const animations = [];
  const playbackRate = 0.55; // Slower entrance, with the same relative timing.
  let finished = false;
  let started = false;
  const cleanup = () => {
    finished = true;
    animations.forEach(animation => animation.cancel());
    hero.classList.remove('banner-motion-pending');
    heading.classList.remove('banner-motion-source');
    hero.querySelectorAll('.banner-motion-glyph').forEach(glyph => glyph.remove());
    window.removeEventListener('resize', cleanup);
    preference.removeEventListener('change', cleanup);
  };

  const start = () => {
    if (finished || started || preference.matches) return;
    started = true;
    const bounds = heading.getBoundingClientRect();
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const glyphs = [];
    let node;
    while ((node = walker.nextNode())) {
      for (let i = 0; i < node.length; i++) {
        if (/\s/.test(node.textContent[i])) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (rect.width && rect.height) glyphs.push(rect);
      }
    }
    if (!glyphs.length) {
      hero.classList.remove('banner-motion-pending');
      return;
    }

    // Each overlay renders the unmodified heading, clipped to one original glyph.
    // No inline wrappers, spacing changes, or new content enter the document flow.
    const template = heading.cloneNode(true);
    template.removeAttribute('id');
    template.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    const longestDelay = 260 + (glyphs.length - 1) * 18;
    glyphs.forEach((rect, index) => {
      const clone = template.cloneNode(true);
      clone.classList.add('banner-motion-glyph');
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      Object.assign(clone.style, {
        position: 'absolute', left: '0', top: '0', margin: '0',
        width: `${bounds.width}px`, height: `${bounds.height}px`,
        maxWidth: 'none', pointerEvents: 'none', visibility: 'visible'
      });
      const left = rect.left - bounds.left;
      const right = rect.right - bounds.left;
      const top = rect.top - bounds.top;
      const bottom = rect.bottom - bounds.top;
      const mask = x => `polygon(${x}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${x}px ${bottom}px)`;
      heading.append(clone);
      animations.push(clone.animate([
        { clipPath: mask(right), opacity: 0 },
        { clipPath: mask(left), opacity: 1 }
      ], { duration: 850, delay: 260 + index * 18, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
    });
    heading.classList.add('banner-motion-source');
    hero.classList.remove('banner-motion-pending');
    animations.push(hero.animate([
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)' }
    ], { duration: 1000, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
    const reveal = (element, delay) => {
      if (!element) return;
      animations.push(element.animate([
        { opacity: 0, transform: 'translateY(12px)', clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0% 0 0)' }
      ], { duration: 900, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
    };
    reveal(hero.querySelector('.eyebrow'), 100);
    reveal(hero.querySelector('.hero-meta p'), 780);
    reveal(hero.querySelector('.hero-meta-index'), 940);
    hero.querySelectorAll('.hero-meta-actions .button').forEach((button, i) => reveal(button, 1000 + i * 140));
    animations.forEach(animation => { animation.playbackRate = playbackRate; });
    window.addEventListener('resize', cleanup, { once: true });
    preference.addEventListener('change', cleanup, { once: true });
    Promise.all(animations.map(animation => animation.finished)).then(cleanup, cleanup);
    // A bounded fallback restores the original text even if an animation is interrupted.
    window.setTimeout(cleanup, (longestDelay + 1600) / playbackRate);
  };
  // Wait for the existing brand font before measuring glyph positions, with a fallback.
  Promise.all([
    Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1200))]),
    window.eventoriaLogoIntro?.ready
  ]).then(() => setTimeout(() => requestAnimationFrame(() => {
    try { start(); } finally { window.eventoriaLogoIntro?.dismiss(); }
  }), 180));
})();
