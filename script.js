// Data de lançamento: 03/10/2026, 06:00 (horário de Brasília, UTC-3)
const releaseDate = new Date("2026-10-03T06:00:00-03:00").getTime();

const daysEl = document.getElementById('cd-days');
const hoursEl = document.getElementById('cd-hours');
const minutesEl = document.getElementById('cd-minutes');
const secondsEl = document.getElementById('cd-seconds');
const wrapEl = document.getElementById('countdown');
const dateTextEl = document.getElementById('release-date-text');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const now = Date.now();
  const diff = releaseDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    wrapEl.classList.add('done');
    dateTextEl.textContent = 'Fantasmas já está disponível.';
    clearInterval(timer);
    return;
  }

  daysEl.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
  hoursEl.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  minutesEl.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
  secondsEl.textContent = pad(Math.floor((diff / 1000) % 60));
}

tick();
const timer = setInterval(tick, 1000);
