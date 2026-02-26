const track = document.getElementById("track");
const range = document.getElementById("range");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function maxScrollLeft(el){
  return Math.max(0, el.scrollWidth - el.clientWidth);
}

// 1) Saat user scroll foto, update slider
function syncRangeFromScroll(){
  const max = maxScrollLeft(track);
  const ratio = max === 0 ? 0 : (track.scrollLeft / max);
  range.value = String(Math.round(ratio * 100));
}

// 2) Saat user geser slider, scroll foto
function syncScrollFromRange(){
  const max = maxScrollLeft(track);
  const ratio = Number(range.value) / 100;
  track.scrollLeft = ratio * max;
}

track.addEventListener("scroll", syncRangeFromScroll, { passive: true });
range.addEventListener("input", syncScrollFromRange);

// biar pas load langsung sinkron
window.addEventListener("load", () => {
  syncRangeFromScroll();
});

// Opsional: drag-to-scroll (biar bisa "geser" pakai mouse)
let isDown = false;
let startX = 0;
let startLeft = 0;

track.addEventListener("pointerdown", (e) => {
  isDown = true;
  track.setPointerCapture(e.pointerId);
  startX = e.clientX;
  startLeft = track.scrollLeft;
});

track.addEventListener("pointermove", (e) => {
  if(!isDown) return;
  const dx = e.clientX - startX;
  track.scrollLeft = startLeft - dx;
});

track.addEventListener("pointerup", () => { isDown = false; });
track.addEventListener("pointercancel", () => { isDown = false; });

// Tombol contoh
startBtn.addEventListener("click", () => {
  // contoh: auto geser dikit ke kanan
  track.scrollBy({ left: 260, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  alert("Next Surprise nanti kita bikin halaman ketiga 🎁");
  // contoh: window.location.href = "surprise.html";
});