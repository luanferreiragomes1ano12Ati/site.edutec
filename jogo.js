// Elementos
const tartaruga = document.getElementById("tartaruga");
const gameContainer = document.getElementById("gameContainer");
const pontuacaoEl = document.getElementById("pontuacao");
const quizModal = document.getElementById("quizModal");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const gameOverEl = document.getElementById("gameOver");
const reiniciarBtn = document.getElementById("reiniciar");
const pausarBtn = document.getElementById("pausarBtn");

// Novos elementos para o modal de pausa
const pauseModal = document.getElementById("pauseModal");
const continuarBtn = document.getElementById("continuarBtn");
const sairBtn = document.getElementById("sairBtn");
const pontuacaoPause = document.getElementById("pontuacaoPause");

let pontuacao = 0;
let pulando = false;
let jogoAtivo = true;
let obstaculoInterval;
let pontuacaoInterval;

// Obstáculos
const ASSETS = {
  obstacles: [
    "./images/garrafa_pet.png",
    "./images/sacola.png",
    "./images/canudo.png"
  ]
};

// Perguntas
const perguntas = [
  { q: "Quanto tempo leva para uma garrafa PET se decompor?", opcoes: ["10 anos", "450 anos", "50 anos", "5 anos"], correta: 1 },
  { q: "Qual principal ameaça das sacolas plásticas às tartarugas?", opcoes: ["Bloqueiam a luz solar", "São confundidas com águas-vivas", "Liberam oxigênio tóxico", "Não causam ameaça"], correta: 1 },
  { q: "O que podemos fazer para reduzir o plástico nos oceanos?", opcoes: ["Reciclar", "Usar menos descartáveis", "Participar de limpezas", "Todas as anteriores"], correta: 3 },
  { q: "Qual é o maior poluente marinho que afeta tartarugas?", opcoes: ["Algas", "Plástico", "Areia", "Pedras"], correta: 1 },
  { q: "Por que tartarugas confundem plásticos com alimento?", opcoes: ["Cheiro semelhante", "Tamanho semelhante a águas-vivas", "Brilho do sol", "Não confundem"], correta: 1 },
  { q: "Como podemos ajudar a vida marinha?", opcoes: ["Jogando lixo no mar", "Participando de limpezas de praias", "Ignorando poluição", "Usando mais plástico"], correta: 1 }
];

// Função pular
function pular() {
  if (pulando || !jogoAtivo) return;
  pulando = true;
  let posicao = 40;
  let up = true;
  const intervalo = setInterval(() => {
    if (up) {
      posicao += 8;
      if (posicao >= 220) up = false;
    } else {
      posicao -= 8;
      if (posicao <= 40) {
        posicao = 40;
        clearInterval(intervalo);
        pulando = false;
      }
    }
    tartaruga.style.bottom = posicao + "px";
  }, 20);
}

// Criar obstáculos
function criarObstaculo() {
  if (!jogoAtivo) return;

  const obstaculo = document.createElement("div");
  obstaculo.classList.add("obstaculo");
  obstaculo.style.backgroundImage = `url(${ASSETS.obstacles[Math.floor(Math.random() * ASSETS.obstacles.length)]})`;
  gameContainer.appendChild(obstaculo);

  let posicao = gameContainer.offsetWidth;
  obstaculo.style.left = posicao + "px";

  const movimento = setInterval(() => {
    if (!jogoAtivo) {
      clearInterval(movimento);
      obstaculo.remove();
      return;
    }

    posicao -= 5;
    obstaculo.style.left = posicao + "px";

    const tartarugaRect = tartaruga.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    if (
      tartarugaRect.left < obstaculoRect.right &&
      tartarugaRect.right > obstaculoRect.left &&
      tartarugaRect.bottom > obstaculoRect.top
    ) {
      clearInterval(movimento);
      obstaculo.remove();
      abrirQuiz();
    }

    if (posicao < -60) obstaculo.remove();
  }, 20);
}

// Sistema de pontuação
function iniciarPontuacao() {
  clearInterval(pontuacaoInterval);
  pontuacaoInterval = setInterval(() => {
    if (jogoAtivo) {
      pontuacao++;
      pontuacaoEl.textContent = pontuacao;
    }
  }, 200);
}

// Quiz
function abrirQuiz() {
  jogoAtivo = false;
  clearInterval(obstaculoInterval);
  const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
  perguntaEl.textContent = pergunta.q;
  opcoesEl.innerHTML = "";

  pergunta.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => {
      if (i === pergunta.correta) {
        quizModal.classList.add("hidden");
        jogoAtivo = true;
        iniciar();
      } else {
        fimDeJogo();
      }
    };
    opcoesEl.appendChild(btn);
  });

  quizModal.classList.remove("hidden");
}

// Fim de jogo - REDIRECIONA PARA OUTRA PÁGINA
function fimDeJogo() {
  jogoAtivo = false;
  clearInterval(pontuacaoInterval);
  clearInterval(obstaculoInterval);
  quizModal.classList.add("hidden");

  // Salva a pontuação final no localStorage
  localStorage.setItem("pontuacaoFinal", pontuacao);

  // Redireciona para a tela de Game Over
  window.location.href = "gameover.html";
}

// Reiniciar
reiniciarBtn.addEventListener("click", () => {
  pontuacao = 0;
  pontuacaoEl.textContent = pontuacao;
  jogoAtivo = true;
  tartaruga.style.bottom = "40px";
  document.querySelectorAll(".obstaculo").forEach(obs => obs.remove());
  quizModal.classList.add("hidden");
  gameOverEl.classList.add("hidden");
  clearInterval(obstaculoInterval);
  obstaculoInterval = setInterval(criarObstaculo, 2000);
  iniciarPontuacao();
});

// Iniciar jogo
function iniciar() {
  quizModal.classList.add("hidden");
  gameOverEl.classList.add("hidden");
  clearInterval(obstaculoInterval);
  obstaculoInterval = setInterval(criarObstaculo, 2000);
}

iniciarPontuacao();
iniciar();

// Controles
document.addEventListener("keydown", e => {
  if (["Space", "ArrowUp"].includes(e.code)) {
    e.preventDefault();
    pular();
  }
});

document.addEventListener("touchstart", () => {
  pular();
});

// Botão Pausar com Popup
if (pausarBtn) {
  pausarBtn.addEventListener("click", () => {
    jogoAtivo = false;
    clearInterval(pontuacaoInterval);
    clearInterval(obstaculoInterval);
    pontuacaoPause.textContent = pontuacao;
    pauseModal.classList.remove("hidden");
  });
}

// Botão Continuar
if (continuarBtn) {
  continuarBtn.addEventListener("click", () => {
    jogoAtivo = true;
    iniciarPontuacao();
    obstaculoInterval = setInterval(criarObstaculo, 2000);
    pauseModal.classList.add("hidden");
  });
}

// Botão Sair
if (sairBtn) {
  sairBtn.addEventListener("click", () => {
    window.location.href = "home.html"; // ou a página desejada
  });
}


function fimDeJogo() {
  jogoAtivo = false;
  quizModal.classList.add("hidden");
  clearInterval(pontuacaoInterval);
  clearInterval(obstaculoInterval);

  // Salva a pontuação no localStorage
  localStorage.setItem("pontuacaoFinal", pontuacao);

  // Redireciona para a tela de game over
  window.location.href = "gameover.html";
}
