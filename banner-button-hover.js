(() => {
  const setup = () => {
    document.querySelectorAll('.hero-meta-actions .banner-button').forEach((button) => {
      const label = button.querySelector('.button-label');
      if (!label || !label.animate || button.dataset.hoverAnimationReady) return;
      button.dataset.hoverAnimationReady = 'true';
      let animation;
      button.addEventListener('mouseenter', () => {
        animation?.cancel();
        animation = label.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-100%)', offset: .4 },
          { opacity: 0, transform: 'translateY(100%)', offset: .41 },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 700, easing: 'ease', fill: 'both' });
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
