const letter = 
`Mi hai detto che sono la cosa più bella che la vita potesse regalarti,
ma sei sicura che tu non lo sia?
Resta sempre quella che sei: una persona speciale e semplice allo stesso tempo,
perché se mi sono innamorato di te è perché sei così, unica e rara.
Vuoi essere la mia Valentina? ❤️
`;

let opened = false;
let musicStarted = false;

function openLetter() {
  if (!musicStarted) {
    const music = document.getElementById("bgMusic");
    music.volume = 0.3;
    music.play();
    musicStarted = true;
  }

  if (opened) return;
  opened = true;

  document.body.classList.add("opened");
  document.querySelector(".envelope").textContent = "💌";

  // Piccola esplosione iniziale di cuori
  for (let i = 0; i < 25; i++) setTimeout(createHeart, i * 80);

  const hint = document.querySelector(".hint");
  if (hint) hint.style.display = "none";

  document.getElementById("pageTitle").classList.add("show");
  document.getElementById("subtitle").classList.add("show");

  const textDiv = document.getElementById("text");
  let index = 0;
  const interval = setInterval(() => {
    textDiv.textContent += letter[index];
    index++;
    if (index >= letter.length) {
      clearInterval(interval);
      document.getElementById("choices").style.display = "block";
      // Mostriamo anche il pulsante indietro nascosto inizialmente
      document.getElementById("backBtn").style.display = "none"; // nascosto all'inizio
    }
  }, 45);

  const envelope = document.querySelector(".envelope");
  const overlay = document.getElementById("imageOverlay");
  const closeOverlay = document.getElementById("closeOverlay");

  // Interrompi attenzione temporanea quando si clicca
  //stopEnvelopeAttention();


  // Se clicchi la busta dopo l’apertura
  envelope.addEventListener("click", () => {
    if (!opened) {
      openLetter();
    } else {
      overlay.style.display = "flex"; // mostra overlay
    }
  });

  // Chiudi overlay
  closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

}
let noAttempts = 0;
const noButton = document.getElementById("noBtn");
const yesButton = document.getElementById("yesBtn");
const backBtn = document.getElementById("backBtn");
const container = document.querySelector(".container");
const textDiv = document.getElementById("text");

// Salva la posizione iniziale del pulsante NO
const noInitPos = { left: noButton.offsetLeft, top: noButton.offsetTop };

// Funzione SÌ
function yes() {
  // Mostra testo finale
  textDiv.textContent =
`Perché grazie a te ho ricominciato ad amare.

Perché con te qualunque cosa può diventare speciale.

Perché con te le ore diventano secondi.

Ti amo amore mio ❤️`;

  yesButton.style.display = "none";
  noButton.style.display = "none";
  backBtn.style.display = "inline-block";

  const envelope = document.querySelector(".envelope");
  for (let i = 0; i < 200; i++) {
    setTimeout(() => createHeartFromEnvelope(envelope), i * 50);
  }
}

// Funzione cuori overlay dal centro della busta
function createHeartFromEnvelope(envelope) {
  const rect = envelope.getBoundingClientRect();
  const offsetX=15;
  const centerX = rect.left + rect.width / 2 - offsetX; //per far uscire i cuori dal centro
  const centerY = rect.top + rect.height / 2;

  const heart = document.createElement("div");
  heart.className = "text-heart";
  heart.textContent = "💖";
  heart.style.left = centerX + "px";
  heart.style.top = centerY + "px";
  heart.style.opacity = 1;
  document.body.appendChild(heart);

  // Movimento casuale
  const angle = Math.random() * 2 * Math.PI;
  const distance = 200 + Math.random() * 150;
  const targetX = distance * Math.cos(angle);
  const targetY = distance * Math.sin(angle) - 100; // verso l'alto

  setTimeout(() => {
    heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.5) rotate(${Math.random()*360}deg)`;
    heart.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
    heart.style.opacity = 0;
  }, 50);

  setTimeout(() => heart.remove(), 1300);
}

// Funzione NO con sfuggimento
function no() {
  if (noAttempts < 5) {
    // Shake container
    container.style.transition = "transform 0.05s";
    container.style.transform = `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)`;
    setTimeout(() => { container.style.transform = "translate(0,0)"; }, 50);

    // Movimento NO dentro container, non sopra SÌ
    const maxX = container.clientWidth - noButton.offsetWidth;
    const maxY = container.clientHeight - noButton.offsetHeight;

    let randomX, randomY;
    do {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
    } while (
      randomX + noButton.offsetWidth > yesButton.offsetLeft &&
      randomX < yesButton.offsetLeft + yesButton.offsetWidth &&
      randomY + noButton.offsetHeight > yesButton.offsetTop &&
      randomY < yesButton.offsetTop + yesButton.offsetHeight
    );

    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    noAttempts++;
  } else {
    // Al quinto click funziona normalmente
    textDiv.textContent =
`Va bene ce l'hai fatta a cliccarlo 🙄
Ma tanto so che è una Bugia 😌
Lo sapevo che avresti detto di sì per prima cosa.

Buon San Valentino ❤️`;

    yesButton.style.display = "none";
    noButton.style.display = "none";
    backBtn.style.display = "inline-block";

    // Riporta NO alla posizione iniziale
    noButton.style.left = noInitPos.left + "px";
    noButton.style.top = noInitPos.top + "px";
    noButton.style.position = "static";

    container.style.transform = "translate(0,0)";
  }
}

// RESET alla scritta lunga quando clicchi INDIETRO
function goBack() {
  // Ripristina la scritta lunga
  textDiv.textContent = letter;

  // Mostra pulsanti SÌ e NO
  yesButton.style.display = "inline-block";
  noButton.style.display = "inline-block";

  // Riporta NO alla posizione iniziale
  noButton.style.left = noInitPos.left + "px";
  noButton.style.top = noInitPos.top + "px";
  noButton.style.position = "static";

  // Nascondi pulsante INDIETRO
  backBtn.style.display = "none";

  // Azzeramento tentativi NO
  noAttempts = 0;

  // Reset shake
  container.style.transform = "translate(0,0)";
}

// ❤️ Cuori di sfondo casuali
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 25) + "px";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

// ❤️ Cuori che esplodono dal bottone
function createHeartFromButton(button) {
  const heart = document.createElement("div");
  heart.className = "text-heart";
  heart.textContent = "💖";

  const rect = button.getBoundingClientRect();
  heart.style.left = rect.left + rect.width / 2 + "px";
  heart.style.top = rect.top + rect.height / 2 + "px";

  document.body.appendChild(heart);

  // Movimento casuale verso l’alto
  const angle = Math.random() * Math.PI * 2;
  const distance = 150 + Math.random() * 100;
  const targetX = distance * Math.cos(angle);
  const targetY = -Math.abs(distance * Math.sin(angle));

  setTimeout(() => {
    heart.style.opacity = 1;
    heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.5)`;
  }, 50);

  setTimeout(() => heart.remove(), 2000);
}

// ❤️ Avvio cuori di sfondo
document.addEventListener("DOMContentLoaded", function () {
  setInterval(createHeart, 500);
});


// Effetto scuotimento periodico per far capire che la busta è cliccabile
const envelope = document.querySelector(".envelope");
let shakeInterval;

function startEnvelopeAttention() {
  // ogni 3 secondi aggiunge classe per scuotere
  shakeInterval = setInterval(() => {
    envelope.classList.add("attention");
    setTimeout(() => envelope.classList.remove("attention"), 600); // durata anima
  }, 3000);
}

function stopEnvelopeAttention() {
  clearInterval(shakeInterval);
  envelope.classList.remove("attention");
}

// Avvia effetto solo quando la lettera è aperta
document.addEventListener("DOMContentLoaded", () => {
  startEnvelopeAttention();
});




