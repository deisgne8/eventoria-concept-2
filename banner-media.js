/* Muted sample event video fades in after the approved banner completes. */
(() => {
  const hero = document.querySelector('.hero');
  const heading = hero?.querySelector('h1');
  if (!heading) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const layer = document.createElement('div');
  layer.className = 'banner-event-media';
  layer.setAttribute('aria-hidden', 'true');
  const image = document.createElement('img');
  image.src = 'assets/unsplash/pablo-heimplatz.jpg';
  image.alt = '';
  image.decoding = 'async';
  const video = document.createElement('video');
  video.className = 'banner-event-video';
  video.src = 'assets/sample-event.mp4';
  video.poster = 'assets/unsplash/pablo-heimplatz.jpg';
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.disablePictureInPicture = true;
  video.setAttribute('aria-hidden', 'true');
  video.addEventListener('playing', () => { video.style.opacity = '1'; });
  video.addEventListener('error', () => { video.style.opacity = '0'; });
  // Extra brand tint covers purple opening and ending frames across each loop.
  const openingTint = document.createElement('div');
  openingTint.className = 'banner-video-opening-tint';
  const updateOpeningTint = () => {
    const openingOpacity = video.currentTime <= 2 ? .9 : Math.max(0, .9 * (5 - video.currentTime) / 3);
    const remaining = video.duration - video.currentTime;
    const endingOpacity = Number.isFinite(remaining) ? .9 * Math.max(0, Math.min(1, (5 - remaining) / 3)) : 0;
    openingTint.style.opacity = String(Math.max(openingOpacity, endingOpacity));
  };
  video.addEventListener('timeupdate', updateOpeningTint);
  video.addEventListener('error', () => { openingTint.remove(); }, { once: true });
  layer.append(image, video, openingTint);
  hero.prepend(layer);
  let ready = false;
  let revealed = false;
  let sawBanner = heading.classList.contains('banner-motion-source');
  let fade;
  const reveal = async () => {
    if (!ready || revealed) return;
    revealed = true;
    if (!preference.matches) hero.classList.add('is-video-revealing');
    hero.removeEventListener('pointerenter', onEnter);
    hero.removeEventListener('focusin', onFocus);
    hover.removeEventListener('change', onHoverChange);
    if (!preference.matches) video.play().catch(() => { video.style.opacity = '0'; });
    const showStatic = () => {
      layer.classList.add('is-revealed');
      hero.classList.add('is-video-revealed');
      fade?.cancel();
    };
    if (preference.matches || !layer.animate) { showStatic(); return; }
    // Dissolve the background colour into the image, with no directional wipe.
    fade = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1400, easing: 'ease-in-out', fill: 'both'
    });
    const stop = () => {
      showStatic();
      if (preference.matches) { video.pause(); video.style.opacity = '0'; }
      preference.removeEventListener('change', stop);
    };
    preference.addEventListener('change', stop, { once: true });
    fade.finished.then(stop, stop);
  };
  const onEnter = () => reveal();
  const onFocus = () => reveal();
  const onHoverChange = () => { if (!hover.matches) reveal(); };
  const arm = () => {
    if (ready) return;
    ready = true;
    observer.disconnect();
    // Continue the approved banner sequence automatically after the logo/text intro.
    // Hover and focus still reveal immediately, but desktop no longer pauses on the title.
    reveal();
  };
  hero.addEventListener('pointerenter', onEnter);
  hero.addEventListener('focusin', onFocus);
  hover.addEventListener('change', onHoverChange);
  const observer = new MutationObserver(() => {
    const active = heading.classList.contains('banner-motion-source');
    if (active) sawBanner = true;
    else if (sawBanner) arm();
  });
  observer.observe(heading, { attributes: true, attributeFilter: ['class'] });
  // Mobile reveals automatically; reduced motion uses the same sequence without fading.
  Promise.all([
    window.eventoriaLogoIntro?.ready,
    Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1500))])
  ]).then(() => setTimeout(() => { if (!sawBanner) arm(); }, 1600));
})();
