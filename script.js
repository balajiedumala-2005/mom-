const config = {
  motherName: "Lakshmi Bhavani",
  childName: "Vaibhav",
  themeTitle: "Lakshmi Bhavani's Birthday Movie",
  memoryPhotos: [
    {
      src: "./assets/photos/vb1.jpeg",
      alt: "Mom smiling warmly",
      caption: "Your smile makes our world brighter.",
    },
    {
      src: "./assets/photos/vb2.jpeg",
      alt: "Mom with strength and love",
      caption: "Your love is our greatest strength.",
    },
    {
      src: "./assets/photos/vb3.jpeg",
      alt: "Mom in a loving moment",
      caption: "Your sacrifices are beyond words.",
    },
    {
      src: "./assets/photos/vb4.jpeg",
      alt: "Family togetherness",
      caption: "Your hugs are the safest place in the world.",
    },
    {
      src: "./assets/photos/vb6.jpeg",
      alt: "Childhood memory with mom",
      caption: "Every beautiful memory begins with YOU.",
    },
    {
      src: "./assets/photos/vb5.jpeg",
      alt: "Best mom portrait",
      caption: "You are the heart of our happiness.",
    },
  ],
  letterText: `Dear Mom,

Today is not just your birthday. It is a celebration of the most precious person in my life.

I may not always express my feelings, but I want you to know how much I love you.

Thank you for every sacrifice you made for me.

Thank you for every sleepless night, every silent prayer, every comforting hug, and every smile you gave me even when you were tired.

You have always been my biggest strength, my safest place, and my greatest blessing.

No words can ever describe how much you mean to me.

I pray that your life is always filled with good health, happiness, peace, endless smiles, and countless beautiful moments.

May every wish in your heart come true.

I am forever grateful to be your child.

I LOVE YOU, MOM.

HAPPY BIRTHDAY, MY QUEEN! ❤️`,
};

const appState = {
  sceneIndex: 0,
  isPlaying: true,
  isMusicOn: false,
  musicReady: false,
  animationTimer: null,
  musicFadeTimer: null,
  isPaused: false,
  timeline: null,
  hasStartedMusic: false,
};

const scenes = [...document.querySelectorAll(".scene")];
const loadingScreen = document.getElementById("loading-screen");
const musicEl = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const pauseToggle = document.getElementById("pause-toggle");
const skipSceneBtn = document.getElementById("skip-scene");
const replayBtn = document.getElementById("replay-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const makeWishBtn = document.getElementById("make-wish-btn");
const giftBox = document.getElementById("gift-box");
const letterEnvelope = document.getElementById("letter-envelope");
const letterTextEl = document.getElementById("letter-text");
const finalPortrait = document.querySelector(".final-portrait");
const wishMessage = document.getElementById("wish-message");
const makeWishButtonLabel = makeWishBtn ? makeWishBtn.textContent : "";

if (window.lucide) {
  window.lucide.createIcons();
}

function updateTextCustomizations() {
  document.title = `${config.motherName} Birthday Tribute`;
  document.querySelector(".brand-text").textContent = config.themeTitle;
  const finalName = document.querySelector(".final-message p:last-child");
  if (finalName) {
    finalName.textContent = `WITH ENDLESS LOVE, ${config.childName}`;
  }
}

function renderMemoryCards() {
  const memoryGrid = document.querySelector(".memory-grid");
  if (!memoryGrid) return;

  memoryGrid.innerHTML = config.memoryPhotos
    .map(
      (photo, index) => `
        <article class="memory-card ${index === 0 ? "active-card" : ""}">
          <img src="${photo.src}" alt="${photo.alt}" />
          <div class="card-caption">${photo.caption}</div>
        </article>
      `,
    )
    .join("");
}

function typeLetter() {
  if (!letterTextEl) return;

  const text = config.letterText;
  letterTextEl.textContent = "";
  let index = 0;

  const tick = () => {
    letterTextEl.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      setTimeout(tick, 22);
    }
  };

  tick();
}

function setScene(index) {
  scenes.forEach((scene, sceneIndex) => {
    scene.classList.toggle("active", sceneIndex === index);
  });

  const activeScene = scenes[index];
  if (!activeScene) return;

  const sceneId = Number(activeScene.dataset.scene);

  if (sceneId === 2) {
    const messageLines = document.querySelectorAll("#scene-2 .message-line");
    gsap.fromTo(
      messageLines,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.5, ease: "power3.out" },
    );
  }

  if (sceneId === 3) {
    gsap.fromTo(
      ".memory-card",
      { opacity: 0, y: 30, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
    );
  }

  if (sceneId === 4) {
    letterEnvelope.classList.remove("open");
    setTimeout(() => {
      letterEnvelope.classList.add("open");
    }, 350);
    typeLetter();
  }

  if (sceneId === 5) {
    gsap.fromTo(
      ".wish-star",
      { scale: 0.4, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.7,
        ease: "back.out(1.7)",
      },
    );
  }

  if (sceneId === 6) {
    const candles = document.querySelectorAll(".candle");
    gsap.fromTo(
      candles,
      { scaleY: 0.6, opacity: 0.7 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.24,
        ease: "power2.out",
      },
    );
  }

  if (sceneId === 7) {
    gsap.fromTo(
      ".rose",
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: 0.25,
        ease: "power3.out",
      },
    );
  }

  if (sceneId === 8) {
    setTimeout(() => {
      finalPortrait.classList.add("visible");
    }, 500);
  }
}

function startSceneLoop() {
  if (appState.animationTimer) {
    clearTimeout(appState.animationTimer);
  }

  if (appState.isPaused) return;

  appState.animationTimer = setTimeout(() => {
    if (appState.sceneIndex < scenes.length - 1) {
      appState.sceneIndex += 1;
      setScene(appState.sceneIndex);
      startSceneLoop();
      return;
    }

    finishMusicWithVideo();
  }, 5200);
}

function restartMovie() {
  appState.sceneIndex = 0;
  setScene(appState.sceneIndex);

  if (musicEl && appState.hasStartedMusic) {
    musicEl.currentTime = 0;
    musicEl.volume = 1;
    musicEl.play().catch(() => {});
  }

  startSceneLoop();
}

function canUseMusicSource() {
  return (
    !!musicEl &&
    (musicEl.src.includes("mom.mpeg.wav") ||
      musicEl.src.includes("emotional-music.mp3"))
  );
}

function startBackgroundMusic() {
  if (!musicEl || !canUseMusicSource()) {
    if (musicToggle) {
      musicToggle.querySelector(".btn-label").textContent = "Music Unavailable";
    }
    return false;
  }

  appState.hasStartedMusic = true;
  musicEl.muted = false;
  musicEl.volume = 1;

  if (musicEl.paused) {
    musicEl
      .play()
      .then(() => {
        appState.isMusicOn = true;
        if (musicToggle) {
          musicToggle.classList.add("active");
          musicToggle.querySelector(".btn-label").textContent = "Music On";
        }
      })
      .catch(() => {
        appState.hasStartedMusic = false;
        appState.isMusicOn = false;
        if (musicToggle) {
          musicToggle.classList.remove("active");
          musicToggle.querySelector(".btn-label").textContent = "Music Off";
        }
      });
    return true;
  }

  appState.isMusicOn = true;
  if (musicToggle) {
    musicToggle.classList.add("active");
    musicToggle.querySelector(".btn-label").textContent = "Music On";
  }
  return true;
}

function stopBackgroundMusic() {
  if (!musicEl) return;

  appState.isMusicOn = false;
  musicEl.pause();
  musicEl.currentTime = 0;

  if (musicToggle) {
    musicToggle.classList.remove("active");
    musicToggle.querySelector(".btn-label").textContent = "Music Off";
  }
}

function finishMusicWithVideo() {
  if (!musicEl || !appState.isMusicOn) return;

  const fadeOutDuration = 1600;
  const startVolume = musicEl.volume || 1;
  const stepMs = 40;
  const delta = startVolume / (fadeOutDuration / stepMs);

  clearInterval(appState.musicFadeTimer);
  appState.musicFadeTimer = setInterval(() => {
    const nextVolume = Math.max(0, musicEl.volume - delta);
    musicEl.volume = nextVolume;

    if (nextVolume <= 0.02) {
      clearInterval(appState.musicFadeTimer);
      musicEl.pause();
      musicEl.currentTime = 0;
      appState.isMusicOn = false;
      if (musicToggle) {
        musicToggle.classList.remove("active");
        musicToggle.querySelector(".btn-label").textContent = "Music Off";
      }
    }
  }, stepMs);
}

function toggleMusic() {
  if (!musicEl) return;

  if (!canUseMusicSource()) {
    if (musicToggle) {
      musicToggle.querySelector(".btn-label").textContent = "Music Unavailable";
    }
    return;
  }

  if (musicEl.paused) {
    startBackgroundMusic();
    return;
  }

  musicEl.pause();
  appState.isMusicOn = false;
  if (musicToggle) {
    musicToggle.classList.remove("active");
    musicToggle.querySelector(".btn-label").textContent = "Music Off";
  }
}

function setPauseState(paused) {
  appState.isPaused = paused;
  pauseToggle.querySelector(".btn-label").textContent = paused
    ? "Resume"
    : "Pause";
  pauseToggle
    .querySelector(".icon")
    .setAttribute("data-lucide", paused ? "play" : "pause");

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (paused) {
    clearTimeout(appState.animationTimer);
  } else {
    startSceneLoop();
  }
}

function bindControls() {
  const startMusicOnInteraction = () => {
    if (!appState.hasStartedMusic) {
      startBackgroundMusic();
    }
  };

  const startMusicFromPageInteraction = (event) => {
    if (
      !appState.hasStartedMusic &&
      !(event.target instanceof Element && event.target.closest("#music-toggle"))
    ) {
      startBackgroundMusic();
    }
  };
  document.addEventListener("pointerdown", startMusicFromPageInteraction);
  document.addEventListener("keydown", startMusicFromPageInteraction);

  musicToggle.addEventListener("click", () => {
    toggleMusic();
  });

  pauseToggle.addEventListener("click", () => {
    startMusicOnInteraction();
    setPauseState(!appState.isPaused);
  });

  skipSceneBtn.addEventListener("click", () => {
    startMusicOnInteraction();
    clearTimeout(appState.animationTimer);
    appState.sceneIndex = Math.min(appState.sceneIndex + 1, scenes.length - 1);
    setScene(appState.sceneIndex);
    startSceneLoop();
  });

  replayBtn.addEventListener("click", () => {
    startMusicOnInteraction();
    restartMovie();
  });

  fullscreenBtn.addEventListener("click", async () => {
    startMusicOnInteraction();
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  });

  makeWishBtn.addEventListener("click", () => {
    startMusicOnInteraction();
    document.querySelectorAll(".candle").forEach((candle) => {
      candle.style.opacity = "0";
      candle.style.transform = "scaleY(0.1)";
    });

    wishMessage.classList.add("visible");
    makeWishBtn.textContent = "Wish Sent ✨";
    makeWishBtn.disabled = true;
    makeWishBtn.style.opacity = "0.7";

    const burst = document.createElement("div");
    burst.className = "firework-burst";
    document.querySelector(".cake-scene").appendChild(burst);

    gsap.fromTo(
      burst,
      { opacity: 1, scale: 0.2 },
      {
        opacity: 0,
        scale: 2.4,
        duration: 1.6,
        ease: "power3.out",
        onComplete: () => burst.remove(),
      },
    );
  });

  giftBox.addEventListener("click", () => {
    startMusicOnInteraction();
    giftBox.style.transform = "scale(0.96)";
    setTimeout(() => {
      giftBox.style.transform = "scale(1)";
    }, 130);

    finalPortrait.classList.add("visible");
  });
}

function setCanvasBackground() {
  const canvas = document.getElementById("magic-canvas");
  const ctx = canvas.getContext("2d");
  const particles = [];
  const heartParticles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0,
    );
  }

  for (let i = 0; i < 130; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.6 + 0.8,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5 + 0.2,
      color: i % 2 === 0 ? "rgba(232,200,139,0.85)" : "rgba(248,187,208,0.75)",
    });
  }

  for (let i = 0; i < 30; i += 1) {
    heartParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: Math.random() * 1.6 + 0.4,
      drift: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.7 + 0.2,
    });
  }

  function drawHeart(x, y, s, alpha) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.15);
    ctx.bezierCurveTo(
      x - s * 0.7,
      y - s * 0.85,
      x - s * 1.1,
      y + s * 0.25,
      x,
      y + s * 1.1,
    );
    ctx.bezierCurveTo(
      x + s * 1.1,
      y + s * 0.25,
      x + s * 0.7,
      y - s * 0.85,
      x,
      y + s * 0.15,
    );
    ctx.closePath();
    ctx.fillStyle = `rgba(248, 187, 208, ${alpha})`;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > window.innerWidth)
        p.x = Math.random() * window.innerWidth;
      if (p.y > window.innerHeight) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    heartParticles.forEach((heart, index) => {
      heart.x += Math.sin((heart.y + index) / 60) * 0.4 + heart.drift;
      heart.y += 0.28;
      if (heart.y > window.innerHeight + 20) {
        heart.y = -10;
        heart.x = Math.random() * window.innerWidth;
      }
      drawHeart(heart.x, heart.y, 12 * heart.s, heart.alpha);
    });

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  animate();
}

function init() {
  renderMemoryCards();
  updateTextCustomizations();

  if (musicEl) {
    musicEl.volume = 1;
    musicEl.muted = false;
    musicEl.autoplay = true;
  }

  startBackgroundMusic();
  setScene(0);
  bindControls();
  setCanvasBackground();

  const imageSources = [
    "./assets/photos/best-mom.jpg",
    "./assets/photos/mom1.jpg",
    "./assets/photos/mom2.jpg",
    "./assets/photos/mom3.jpg",
    "./assets/photos/family1.jpg",
    "./assets/photos/childhood.jpg",
  ];

  Promise.all(
    imageSources.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        }),
    ),
  ).then(() => {
    setTimeout(() => loadingScreen.classList.add("hidden"), 900);
    setTimeout(() => startSceneLoop(), 1100);
  });

  if (musicEl) {
    musicEl.addEventListener("error", () => {
      console.warn("Background music unavailable. Falling back gracefully.");
      musicToggle.querySelector(".btn-label").textContent = "Music Off";
    });
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    clearTimeout(appState.animationTimer);
    appState.isPaused = true;
    pauseToggle.querySelector(".btn-label").textContent = "Resume";
  }
}

window.addEventListener("DOMContentLoaded", init);
