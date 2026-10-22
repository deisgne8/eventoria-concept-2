/* Independent logo prologue; the approved banner sequence starts after this. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !Element.prototype.animate) return;
  const overlay = document.createElement('div');
  overlay.className = 'eventoria-logo-intro';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.inert = true;
  const logo = document.createElement('img');
  logo.src = 'assets/eventoria-logo.svg';
  logo.alt = '';
  logo.width = 300;
  logo.height = 128;
  overlay.append(logo);
  document.body.append(overlay);
  let resolveReady;
  let animation;
  let settled = false;
  const ready = new Promise(resolve => { resolveReady = resolve; });
  const finish = () => {
    if (settled) return;
    settled = true;
    if (animation) animation.cancel();
    logo.style.opacity = '0';
    resolveReady();
  };
  const dismiss = () => {
    finish();
    overlay.remove();
    reducedMotion.removeEventListener('change', finish);
  };
  window.eventoriaLogoIntro = { ready, dismiss };
  reducedMotion.addEventListener('change', finish, { once: true });
  const play = () => {
    if (settled) return;
    animation = logo.animate([
      { opacity: 0, transform: 'scale(.9)', offset: 0 },
      { opacity: 1, transform: 'scale(1)', offset: .45 },
      { opacity: 1, transform: 'scale(1)', offset: .72 },
      { opacity: 0, transform: 'scale(1.025)', offset: 1 }
    ], { duration: 3200, easing: 'ease-in-out', fill: 'both' });
    animation.finished.then(finish, finish);
  };
  if (logo.complete) play();
  else {
    logo.addEventListener('load', play, { once: true });
    logo.addEventListener('error', finish, { once: true });
  }
  // Never leave an intro covering the site if an asset or script is interrupted.
  setTimeout(finish, 4500);
  setTimeout(dismiss, 7000);
})();
