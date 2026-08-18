const slides = document.getElementById('slides');
const sections = slides.querySelectorAll('section');
const dotsContainer = document.getElementById('dots');
let current = 0;
let isAnimating = false;

sections.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('span');

function goToSlide(index) {
  if (index < 0 || index >= sections.length || isAnimating) return;
  isAnimating = true;
  current = index;
  slides.style.transform = `translateY(-${current * 100}vh)`;
  dots.forEach(d => d.classList.remove('active'));
  dots[current].classList.add('active');
  setTimeout(() => { isAnimating = false; }, 800);
}

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) goToSlide(current + 1);
  else if (e.deltaY < 0) goToSlide(current - 1);
}, { passive: true });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchend', (e) => {
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 50) return;
  if (diff > 0) goToSlide(current + 1);
  else goToSlide(current - 1);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') goToSlide(current + 1);
  if (e.key === 'ArrowUp') goToSlide(current - 1);
});