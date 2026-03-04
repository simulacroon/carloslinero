let x, y;
let targetX, targetY;
let sound;
let filter;
let scrollSpeed = 0;
let lastScrollY = window.scrollY;
let baseRadius = 50;
let extraRadius = 0;
let inactivity = 0;
let alpha = 30;


function preload() {
  sound = loadSound('Sound/gasolinero.mp3');
}




function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-bg');
  noStroke();

  x = width / 2;
  y = height / 2;
  targetX = x;
  targetY = y;

  filter = new p5.LowPass();
  sound.disconnect();
  sound.connect(filter);
}



window.addEventListener('scroll', () => {
  scrollSpeed = abs(window.scrollY - lastScrollY);
  lastScrollY = window.scrollY;

  extraRadius = constrain(scrollSpeed * 2.8, 0, 200);
});




function draw() {
  clear();

  // mouse con inercia
  targetX = mouseX;
  targetY = mouseY;

  x += (targetX - x) * 0.03;
  y += (targetY - y) * 0.03;

  let flow = frameCount * 0.01;

  fill(0, 90, 120, 30);

  blendMode(BLEND);


  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.2) {
    let wave = sin(a * 2 + flow) * 12;
    let noiseFlow = noise(cos(a) + 1, sin(a) + 1, flow) * 40;
    let r = baseRadius + extraRadius + wave + noiseFlow;
    extraRadius *= 0.96; // decay del extraRadius

    let px = x + cos(a) * r;
    let py = y + sin(a) * r;
    curveVertex(px, py);
  }
  endShape(CLOSE);

  // =====================
  // SONIDO VIVO
  // =====================
  if (sound.isPlaying()) {
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (speed < 0.5) {
    inactivity++;
    } else {
    inactivity = 0;
  }

    let vol = constrain(speed / 60, 0, 0.35);
    sound.setVolume(vol);

    let freq = map(y, 0, height, 300, 2200);
    filter.freq(freq);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.addEventListener('load', () => {
  const video = document.getElementById('video-scroll');
  video.muted = true;
  video.play().catch(() => {
    console.log('Autoplay bloqueado, esperando interacción');
  });
});


function mousePressed() {
  if (!sound.isPlaying()) {
    sound.loop();
  }

  const hint = document.querySelector('.sound-hint');
  if (hint) {
    hint.style.opacity = 0;
    hint.style.transition = 'opacity 1.5s ease';
  }
}




