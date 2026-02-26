(function () {
  const canvas = document.getElementById("fx");
  if (!canvas) {
    console.error("❌ Canvas #fx tidak ditemukan. Pastikan ada: <canvas id='fx'></canvas> di body.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("❌ Canvas context 2D tidak bisa dibuat.");
    return;
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  const colors = ["#ff2f7e", "#7b2cff", "#00c2ff", "#ffcc00", "#37d67a", "#ff6b6b"];

  const rand = (min, max) => Math.random() * (max - min) + min;

  class P {
    constructor(first = false) {
      this.reset(first);
    }
    reset(first = false) {
      this.x = rand(0, window.innerWidth);
      this.y = first ? rand(-window.innerHeight, window.innerHeight) : rand(-120, -20);
      this.r = rand(5, 14);
      this.speed = rand(1.0, 3.2);
      this.color = colors[(Math.random() * colors.length) | 0];
      this.rot = rand(0, Math.PI * 2);
      this.rotSpeed = rand(-0.08, 0.08);
      this.wSeed = rand(0, Math.PI * 2);
      this.wobble = rand(0.2, 1.2);
      this.type = Math.random() < 0.55 ? "balloon" : "confetti";
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);

      if (this.type === "confetti") {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.r, -this.r * 0.4, this.r * 2, this.r * 0.8);
      } else {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.ellipse(0, 0, this.r * 0.85, this.r * 1.2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(120,60,90,0.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, this.r * 1.15);
        ctx.quadraticCurveTo(6, this.r * 2.2, -2, this.r * 3.2);
        ctx.stroke();
      }

      ctx.restore();
    }
    update() {
      this.wSeed += 0.02;
      this.x += Math.sin(this.wSeed) * this.wobble;
      this.y += this.speed;
      this.rot += this.rotSpeed;

      if (this.y > window.innerHeight + 120) this.reset(false);
    }
  }

  const particles = Array.from({ length: 140 }, () => new P(true));

  function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // DEBUG indicator
    ctx.save();
    ctx.font = "12px system-ui";
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillText("FX ON", 14, 20);
    ctx.restore();

    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(loop);
  }

  console.log("✅ balloons.js jalan. Kalau kamu lihat tulisan 'FX ON', berarti canvas OK.");
  loop();
})();