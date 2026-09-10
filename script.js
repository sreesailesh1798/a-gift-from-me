// ===================================================
// SURPRISE PROPOSAL INTERACTIVE LOGIC
// Dynamic personalization, smooth transitions & animations
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initParticleCanvas();
  initComplimentGenerator();
  initMysteryBoxTransition();
  initProposalInteractions();
});

// ---------------------------------------------------
// 1. POPULATE PERSONALIZED CONTENT FROM CONFIG
// ---------------------------------------------------
function initPersonalization() {
  if (typeof CONFIG === 'undefined') return;

  // Page 1 Elements
  const heroName = document.getElementById('heroName');
  if (heroName) heroName.textContent = CONFIG.herName || "Sasmiithaa";

  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle && CONFIG.subtitle) heroSubtitle.textContent = CONFIG.subtitle;

  const footerName = document.getElementById('footerName');
  if (footerName) footerName.textContent = CONFIG.herName || "Sasmiithaa";

  // Render Qualities Grid
  const qualitiesGrid = document.getElementById('qualitiesGrid');
  if (qualitiesGrid && Array.isArray(CONFIG.qualities)) {
    qualitiesGrid.innerHTML = '';
    CONFIG.qualities.forEach(q => {
      const card = document.createElement('div');
      card.className = 'quality-card';
      card.innerHTML = `
        <div class="quality-icon">${q.icon || '✨'}</div>
        <h3>${q.title}</h3>
        <p>${q.description}</p>
      `;
      qualitiesGrid.appendChild(card);
    });
  }

  // Render Little Things
  const littleThingsGrid = document.getElementById('littleThingsGrid');
  if (littleThingsGrid && Array.isArray(CONFIG.littleThings)) {
    littleThingsGrid.innerHTML = '';
    CONFIG.littleThings.forEach(item => {
      const card = document.createElement('div');
      card.className = 'little-thing-card';
      card.innerHTML = `
        <span class="lt-label">${item.label}</span>
        <span class="lt-value">${item.value}</span>
      `;
      littleThingsGrid.appendChild(card);
    });
  }

  // Mystery Box Teaser
  if (CONFIG.mysteryBox) {
    const mbTag = document.getElementById('mysteryTag');
    const mbTitle = document.getElementById('mysteryTitle');
    const mbDesc = document.getElementById('mysteryDesc');
    const mbBtnText = document.getElementById('openBoxBtnText');

    if (mbTag && CONFIG.mysteryBox.tagline) mbTag.textContent = CONFIG.mysteryBox.tagline;
    if (mbTitle && CONFIG.mysteryBox.heading) mbTitle.textContent = CONFIG.mysteryBox.heading;
    if (mbDesc && CONFIG.mysteryBox.subtext) mbDesc.textContent = CONFIG.mysteryBox.subtext;
    if (mbBtnText && CONFIG.mysteryBox.buttonText) mbBtnText.textContent = CONFIG.mysteryBox.buttonText;
  }

  // Page 2 Reveal Elements
  if (CONFIG.reveal) {
    const revealTag = document.getElementById('revealTag');
    const revealHeadline = document.getElementById('revealHeadline');
    const letterBody = document.getElementById('letterBody');
    const proposalTag = document.getElementById('proposalTag');
    const proposalQuestion = document.getElementById('proposalQuestion');
    const yesBtnText = document.getElementById('yesBtnText');
    const noBtnText = document.getElementById('noBtnText');

    if (revealTag && CONFIG.reveal.tag) revealTag.textContent = CONFIG.reveal.tag;
    if (revealHeadline && CONFIG.reveal.headline) revealHeadline.textContent = CONFIG.reveal.headline;

    if (letterBody && Array.isArray(CONFIG.reveal.letterParagraphs)) {
      letterBody.innerHTML = '';
      CONFIG.reveal.letterParagraphs.forEach(p => {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        letterBody.appendChild(pEl);
      });
    }

    if (proposalTag && CONFIG.reveal.questionTag) proposalTag.textContent = CONFIG.reveal.questionTag;
    if (proposalQuestion && CONFIG.reveal.proposalQuestion) proposalQuestion.textContent = CONFIG.reveal.proposalQuestion;
    if (yesBtnText && CONFIG.reveal.yesButtonText) yesBtnText.textContent = CONFIG.reveal.yesButtonText;
    if (noBtnText && CONFIG.reveal.noButtonText) noBtnText.textContent = CONFIG.reveal.noButtonText;

    // Celebration modal texts
    if (CONFIG.reveal.celebration) {
      const cTitle = document.getElementById('celebrationTitle');
      const cSub = document.getElementById('celebrationSubtitle');
      const cNote = document.getElementById('celebrationNote');
      if (cTitle) cTitle.textContent = CONFIG.reveal.celebration.title;
      if (cSub) cSub.textContent = CONFIG.reveal.celebration.subtitle;
      if (cNote) cNote.textContent = CONFIG.reveal.celebration.note;
    }
  }
}

// ---------------------------------------------------
// 2. INTERACTIVE COMPLIMENT GENERATOR
// ---------------------------------------------------
let complimentIdx = 0;
let discoveredCount = 1;

function initComplimentGenerator() {
  const display = document.getElementById('complimentDisplay');
  const btn = document.getElementById('nextComplimentBtn');
  const counter = document.getElementById('complimentCounter');
  const compliments = (CONFIG && CONFIG.compliments) || [
    "You have a heart so genuine it makes the world feel softer.",
    "Your smile effortlessly lights up everyone around you.",
    "The world is just so much brighter with you in it."
  ];

  if (!btn || !display) return;

  btn.addEventListener('click', () => {
    complimentIdx = (complimentIdx + 1) % compliments.length;
    discoveredCount++;

    display.style.opacity = '0';
    display.style.transform = 'translateY(10px)';

    setTimeout(() => {
      display.textContent = `"${compliments[complimentIdx]}"`;
      display.style.opacity = '1';
      display.style.transform = 'translateY(0)';
      
      if (counter) {
        counter.textContent = `✨ You've unlocked ${discoveredCount} sweet truths! Keep going or discover the secret below...`;
      }
    }, 250);

    // Spawn mini floating heart near button
    spawnClickHeart(btn);
  });
}

function spawnClickHeart(element) {
  const rect = element.getBoundingClientRect();
  const heart = document.createElement('div');
  const symbols = ['💖', '✨', '🌸', '🥰', '💫'];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.position = 'fixed';
  heart.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
  heart.style.top = `${rect.top}px`;
  heart.style.fontSize = '1.6rem';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.3, 1)';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${Math.random() * 80 - 40}px, -70px) scale(1.4)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => heart.remove(), 1000);
}

// ---------------------------------------------------
// 3. THE MYSTERY BOX UNLOCK & TRANSITION TO PAGE 2
// ---------------------------------------------------
function initMysteryBoxTransition() {
  const triggerBox = document.getElementById('giftBoxTrigger');
  const openBtn = document.getElementById('openMysteryBoxBtn');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const giftIcon = document.getElementById('giftBoxIcon');

  const triggerReveal = () => {
    // Shake gift box animation
    if (giftIcon) {
      giftIcon.style.transform = 'scale(1.35) rotate(15deg)';
      giftIcon.textContent = '💖';
    }

    // Launch burst of heart particles from the box
    const rect = (triggerBox || openBtn).getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSparkleBurst(originX, originY, 40);

    // Fade out Page 1 smoothly
    setTimeout(() => {
      page1.style.opacity = '0';
      page1.style.transform = 'scale(0.96)';

      setTimeout(() => {
        page1.classList.add('hidden-page');
        page2.classList.remove('hidden-page');
        page2.style.opacity = '0';
        page2.style.transform = 'translateY(30px)';

        // Scroll to top of Page 2 smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        requestAnimationFrame(() => {
          page2.style.opacity = '1';
          page2.style.transform = 'translateY(0)';
        });

        // Trigger welcoming confetti celebration on Page 2
        triggerSparkleBurst(0.5, 0.3, 50);
      }, 500);
    }, 400);
  };

  if (triggerBox) triggerBox.addEventListener('click', triggerReveal);
  if (openBtn) openBtn.addEventListener('click', triggerReveal);

  // Return to Page 1 if desired
  const revisitBtn = document.getElementById('revisitPage1Btn');
  if (revisitBtn) {
    revisitBtn.addEventListener('click', () => {
      page2.style.opacity = '0';
      setTimeout(() => {
        page2.classList.add('hidden-page');
        page1.classList.remove('hidden-page');
        page1.style.opacity = '1';
        page1.style.transform = 'scale(1)';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    });
  }
}

// ---------------------------------------------------
// 4. THE INTERACTIVE PROPOSAL (YES / RUNAWAY NO)
// ---------------------------------------------------
function initProposalInteractions() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const modal = document.getElementById('celebrationModal');
  const closeModalBtn = document.getElementById('closeCelebrationBtn');

  // YES Button Click
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      // Massive Confetti Explosion
      triggerFullCelebrationConfetti();

      // Show Celebration Modal
      if (modal) {
        modal.classList.add('active');
      }

      // Notify backend if running on Render / server
      fetch('/api/she-said-yes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: new Date().toISOString() })
      }).catch(() => {});
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      triggerSparkleBurst(0.5, 0.5, 60);
    });
  }

  // Playful Runaway "NO" Button
  if (noBtn) {
    let reactionIdx = 0;
    const reactions = (CONFIG && CONFIG.reveal && CONFIG.reveal.noButtonReactions) || [
      "Are you sure? 🥺",
      "Nice try! 🏃‍♂️💨",
      "Think again! 😉",
      "Wrong button, Sasmiithaa! 💖",
      "You can't escape my love! 🥰"
    ];

    const flee = (e) => {
      e.preventDefault();
      
      const arena = document.getElementById('buttonsArena');
      if (!arena) return;

      const arenaRect = arena.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();

      // Calculate random safe offsets within boundaries
      const maxOffsetX = Math.min(window.innerWidth - btnRect.width - 40, 260);
      const maxOffsetY = 140;

      const randomX = (Math.random() * 2 - 1) * (maxOffsetX / 2);
      const randomY = (Math.random() * 2 - 1) * (maxOffsetY / 2);

      noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

      // Show cute reaction tooltip
      showReactionTooltip(noBtn, reactions[reactionIdx]);
      reactionIdx = (reactionIdx + 1) % reactions.length;
    };

    // For desktop hover and mobile touch
    noBtn.addEventListener('mouseenter', flee);
    noBtn.addEventListener('touchstart', flee, { passive: false });
    
    // If somehow clicked:
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flee(e);
    });
  }
}

function showReactionTooltip(btn, text) {
  const existing = btn.querySelector('.no-reaction-tooltip');
  if (existing) existing.remove();

  const tooltip = document.createElement('div');
  tooltip.className = 'no-reaction-tooltip';
  tooltip.textContent = text;
  btn.appendChild(tooltip);

  setTimeout(() => {
    if (tooltip.parentNode === btn) tooltip.remove();
  }, 1200);
}

// ---------------------------------------------------
// 5. CANVAS PARTICLE SYSTEM (HEARTS, STARS & SPARKLES)
// ---------------------------------------------------
let canvas, ctx, particles = [];

function initParticleCanvas() {
  canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // Seed ambient floating particles
  const particleCount = Math.min(window.innerWidth < 768 ? 25 : 50, 60);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new AmbientParticle(canvas.width, canvas.height));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    // Update and draw burst particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      burstParticles[i].update();
      burstParticles[i].draw(ctx);
      if (burstParticles[i].life <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

class AmbientParticle {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : h + 15;
    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.6 - 0.3;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
    this.color = ['#ff758c', '#ff7eb3', '#feca57', '#e0d7f5'][Math.floor(Math.random() * 4)];
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) {
      this.reset(canvas.width, canvas.height);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.type === 'heart' ? '♥' : '✦', this.x, this.y);
    ctx.restore();
  }
}

// ---------------------------------------------------
// 6. CONFETTI & BURST EFFECTS
// ---------------------------------------------------
const burstParticles = [];

class BurstParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 3;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 4;
    this.gravity = 0.28;
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.012;
    this.size = Math.random() * 14 + 6;
    this.color = ['#ff2a7a', '#ff758c', '#feca57', '#6c5ce7', '#00d2d3', '#ffffff'][Math.floor(Math.random() * 6)];
    this.symbol = ['♥', '★', '●', '✦', '◆'][Math.floor(Math.random() * 5)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x, this.y);
    ctx.restore();
  }
}

function triggerSparkleBurst(normX, normY, count = 35) {
  if (!canvas) return;
  const x = normX * canvas.width;
  const y = normY * canvas.height;
  for (let i = 0; i < count; i++) {
    burstParticles.push(new BurstParticle(x, y));
  }
}

function triggerFullCelebrationConfetti() {
  if (!canvas) return;
  let waves = 0;
  const interval = setInterval(() => {
    triggerSparkleBurst(0.2, 0.6, 35);
    triggerSparkleBurst(0.8, 0.6, 35);
    triggerSparkleBurst(0.5, 0.4, 45);
    waves++;
    if (waves >= 6) clearInterval(interval);
  }, 350);
}
