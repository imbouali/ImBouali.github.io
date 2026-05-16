// Twinkling star field — robotics & space theme
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS  = ['#f0eeff', '#c084fc', '#c084fc', '#ddd6fe', '#a78bfa', '#60a5fa', '#fef3c7'];
  const COUNT   = 80;
  let   stars   = [];
  let   time    = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeStar() {
    return {
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      r:      0.4 + Math.random() * 1.4,
      color:  COLORS[Math.floor(Math.random() * COLORS.length)],
      base:   0.08 + Math.random() * 0.35,
      speed:  0.4  + Math.random() * 1.2,
      phase:  Math.random() * Math.PI * 2,
      // slow drift
      dx:     (Math.random() - 0.5) * 0.06,
      dy:     (Math.random() - 0.5) * 0.04,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: COUNT }, makeStar);
    window.addEventListener('resize', resize);
    loop();
  }

  function loop() {
    time += 0.012;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed + s.phase);
      const alpha   = s.base * (0.4 + 0.6 * twinkle);

      ctx.globalAlpha = alpha;
      ctx.fillStyle   = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * (0.8 + 0.2 * twinkle), 0, Math.PI * 2);
      ctx.fill();

      // Soft glow for brighter stars
      if (s.r > 1.0 && twinkle > 0.7) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      s.x += s.dx;
      s.y += s.dy;
      if (s.x < -5)             s.x = canvas.width  + 5;
      if (s.x > canvas.width+5) s.x = -5;
      if (s.y < -5)             s.y = canvas.height + 5;
      if (s.y > canvas.height+5) s.y = -5;
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  init();
})();
