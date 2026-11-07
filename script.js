// DOM references
const enterBtn = document.getElementById('enterBtn');
const moodButtons = document.querySelectorAll('.mood-btn');
const moodResponse = document.getElementById('moodResponse');
const envelope = document.getElementById('envelope');
const letterText = document.getElementById('letterText');
const surpriseBox = document.getElementById('surpriseBox');
const twistMessage = document.getElementById('twistMessage');
const reasonCards = document.querySelectorAll('.reason-card');
const reasonDisplay = document.getElementById('reasonDisplay');
const scoreCount = document.getElementById('scoreCount');
const gameArea = document.getElementById('gameArea');
const forgiveBtn = document.getElementById('forgiveBtn');
const timeBtn = document.getElementById('timeBtn');
const finalResponse = document.getElementById('finalResponse');
const secretBtn = document.getElementById('secretBtn');
const secretMessage = document.getElementById('secretMessage');

let letterHasOpened = false;

// Smooth intro transition
enterBtn.addEventListener('click', () => {
  document.getElementById('mood').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Mood reactions: each option produces a different humorous response.
const moodResponses = {
  angry: 'Okay, the mood is dramatic. But I still love you. We are not ending the day with a grumpy face 😌',
  okay: 'A little bit okay... which is basically love with a side of dramatic silence 🙃',
  smiling: 'Aha. A tiny smile is appearing. That is a win. We are absolutely not pretending not to be cute 🤭'
};

moodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    moodButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const mood = button.dataset.mood;
    moodResponse.textContent = moodResponses[mood];
    moodResponse.style.transform = 'scale(1.02)';

    setTimeout(() => {
      moodResponse.style.transform = 'scale(1)';
    }, 180);
  });
});

// Open the letter and reveal the typed apology note.
const letterContent =
  "I know things aren't perfect between us right now, and I genuinely don't like knowing that you're upset. I'm sorry for my part in it. You matter to me, and I never want a small misunderstanding to make us forget all the good moments. I hope this little surprise brings a smile to your face.";

function typeLetter(text, el) {
  let index = 0;
  el.textContent = '';

  const typing = setInterval(() => {
    el.textContent += text[index] || '';
    index += 1;

    if (index >= text.length) {
      clearInterval(typing);
    }
  }, 24);
}

envelope.addEventListener('click', () => {
  if (letterHasOpened) return;

  letterHasOpened = true;
  envelope.classList.add('open');
  setTimeout(() => {
    typeLetter(letterContent, letterText);
  }, 400);
});

// Plot twist box with confetti effect.
surpriseBox.addEventListener('click', () => {
  surpriseBox.classList.add('open');
  twistMessage.classList.add('visible');
  createConfetti(2.5);

  setTimeout(() => {
    surpriseBox.classList.remove('open');
  }, 800);
});

function createConfetti(amount) {
  const colors = ['#ff7fbf', '#ffd76a', '#8de3ff', '#c6a6ff', '#ff9d92'];

  for (let i = 0; i < amount * 40; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * window.innerWidth}px`;
    piece.style.top = '40vh';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 260}px`);
    piece.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 1400);
  }
}

// Reason cards reveal sweet messages.
reasonCards.forEach((card) => {
  card.addEventListener('click', () => {
    reasonCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    reasonDisplay.textContent = card.dataset.message;
  });
});

// Mini heart-catching game.
let score = 0;
let heartsCaught = 0;

function spawnHeart() {
  const heart = document.createElement('button');
  heart.type = 'button';
  heart.className = 'heart-float';

  const heartIcons = ['❤️', '💗', '💕'];
  heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

  const areaWidth = gameArea.clientWidth || 600;
  const areaHeight = gameArea.clientHeight || 280;
  const safePadding = 18;
  const left = Math.random() * Math.max(areaWidth - safePadding * 2, 50) + safePadding;

  heart.style.left = `${left}px`;
  heart.style.top = `${areaHeight - 20}px`;
  heart.style.setProperty('--float-duration', `${3.2 + Math.random() * 2.4}s`);

  heart.addEventListener('click', () => {
    score += 1;
    heartsCaught += 1;
    scoreCount.textContent = score;
    heart.remove();

    if (heartsCaught >= 5) {
      scoreCount.textContent = '5+';
      const achievement = document.createElement('div');
      achievement.className = 'glass-panel';
      achievement.textContent = 'Achievement unlocked: Professional Heart Collector! 💗';
      achievement.style.position = 'absolute';
      achievement.style.left = '50%';
      achievement.style.bottom = '18px';
      achievement.style.transform = 'translateX(-50%)';
      achievement.style.padding = '0.8rem 1rem';
      achievement.style.borderRadius = '999px';
      achievement.style.color = '#4a2f69';
      achievement.style.fontWeight = '800';
      achievement.style.zIndex = '3';
      gameArea.appendChild(achievement);
      heartsCaught = 0;
      setTimeout(() => achievement.remove(), 2400);
      setTimeout(() => {
        scoreCount.textContent = '0';
        score = 0;
      }, 2600);
    }
  });

  gameArea.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 5200);
}

const spawnDelay = window.innerWidth < 768 ? 700 : 900;
setInterval(spawnHeart, spawnDelay);

// Final question responses.
forgiveBtn.addEventListener('click', () => {
  finalResponse.textContent = 'Aww, that makes my heart feel so much lighter. Thank you. We are choosing smiles together 💗';
  finalResponse.style.color = '#4c2968';
});

timeBtn.addEventListener('click', () => {
  finalResponse.textContent = "That's okay. Take your time. You matter more than a quick answer.";
  finalResponse.style.color = '#4c2968';
});

// Hidden secret message.
secretBtn.addEventListener('click', () => {
  secretMessage.classList.toggle('visible');
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});
