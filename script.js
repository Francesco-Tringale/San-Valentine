const letter = 
`Mi hai detto che sono la cosa più bella che la vita potesse regalarti,
ma sei sicura che tu non lo sia?
Resta sempre quella che sei: una persona speciale e semplice allo stesso tempo,
perché se mi sono innamorato è perché sei così, unica e rara.
Vuoi essere la mia Valentina? ❤️
`;

let index = 0;
let opened = false;
let musicStarted = false;



function openLetter() {
  
  if (!musicStarted) {
    const music = document.getElementById("bgMusic");
    music.volume = 0.3; // volume dolce
    music.play();
    musicStarted = true;
  }

  if (opened) return;
  opened = true;
  document.querySelector(".envelope").textContent = "💌";

  // ✅ Scompare completamente la scritta hint
  const hint = document.querySelector(".hint");
  if (hint) {
    //hint.style.transition = "opacity 0.5s ease"; // opzionale, dissolvenza
    //hint.style.opacity = 0;
      hint.style.display = "none"; // rimuove dallo spazio del layout
  }

  document.getElementById("pageTitle").classList.add("show");

  const textDiv = document.getElementById("text");
  let index = 0;

  const interval = setInterval(() => {
    textDiv.textContent += letter[index];
    index++;
    if (index >= letter.length) {
      clearInterval(interval);
      document.getElementById("choices").style.display = "block";
    }
  }, 45);
}


function yes() {
  document.getElementById("text").textContent =
`Perché con te
qualunque cosa può diventare speciale.

Ti amo ❤️`;
  document.getElementById("choices").style.display = "none";
}

function no() {
  document.getElementById("text").textContent =
`Bugia 😌
Lo sapevo che avresti detto sì.

Buon San Valentino ❤️`;
  document.getElementById("choices").style.display = "none";
}

// ELEMENTO TASTO INDIETRO
const backBtn = document.getElementById("backBtn");

// Nascondi Indietro all'inizio
backBtn.style.display = "none";

// Sovrascrivi le funzioni yes() e no() solo per mostrare Indietro
const originalYes = yes;
const originalNo = no;

yes = function() {
  originalYes(); // chiama la tua funzione originale
  backBtn.style.display = "inline-block"; // mostra Indietro
}

no = function() {
  originalNo(); // chiama la tua funzione originale
  backBtn.style.display = "inline-block"; // mostra Indietro
}


// CLICK SU INDIETRO
backBtn.addEventListener("click", () => {
  // Torna allo stato iniziale
  document.getElementById("text").textContent = letter;

  // Nascondi Indietro
  backBtn.style.display = "none";

  // Mostra Sì/No di nuovo
  const buttons = document.getElementById("choices").querySelectorAll("button");
  buttons.forEach(btn => {
    if (btn.id !== "backBtn") btn.style.display = "inline-block";
  });
});

function heart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "❤";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (4 + Math.random() * 3) + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}

setInterval(heart, 350);
