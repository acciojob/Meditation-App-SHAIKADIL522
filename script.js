//your JS code here. If required.
const song = document.querySelector(".song");
const video = document.querySelector(".vid-container video");
const play = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const outline = document.querySelector(".moving-outline");
const timeBtns = document.querySelectorAll("#time-select button");
const soundBtns = document.querySelectorAll(".sound-picker button");

const circumference = 2 * Math.PI * outline.getAttribute("r");
outline.style.strokeDasharray = circumference;
outline.style.strokeDashoffset = circumference;

let duration = 600;
let remaining = 600;
let timer = null;

function render() {
  const m = Math.floor(remaining / 60);
  const s = Math.floor(remaining % 60);
  timeDisplay.textContent = `${m}:${s}`;
  const elapsed = duration - remaining;
  outline.style.strokeDashoffset =
    circumference - (elapsed / duration) * circumference;
}

function start() {
  song.play();
  video.play();
  play.innerHTML = "&#10074;&#10074;";
  timer = setInterval(() => {
    remaining--;
    render();
    if (remaining <= 0) reset();
  }, 1000);
}

function pause() {
  song.pause();
  video.pause();
  play.innerHTML = "&#9654;";
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  song.currentTime = 0;
  remaining = duration;
  render();
}

play.addEventListener("click", () => {
  if (timer) pause();
  else start();
});

timeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    timeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    duration = Number(btn.dataset.time);
    reset();
  });
});

soundBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const wasPlaying = timer !== null;
    song.src = btn.dataset.sound;
    video.src = btn.dataset.video;
    if (wasPlaying) {
      song.play();
      video.play();
    }
  });
});

render();