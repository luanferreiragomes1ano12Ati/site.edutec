// Seleciona os elementos do DOM usados no jogo
const peixe = document.querySelector('.peixe'); // Peixe que o jogador controla
const pipe = document.querySelector('.pipe'); // Obstáculo do jogo
const clouds = document.querySelector('.clouds'); // Nuvens de fundo
const scoreDisplay = document.querySelector('.score'); // Elemento que exibe a pontuação

// Variáveis do estado do jogo
let score = 0; // Pontuação atual
let gameOver = false; // Indica se o jogo terminou
let perguntaAtiva = false; // Indica se uma pergunta está ativa na tela

// Lista de perguntas, respostas e índice da correta
const perguntas = [
  { pergunta: "Onde vivem os peixes?", respostas: ["No deserto", "No oceano", "Na montanha", "No espaço"], correta: 1 },
  { pergunta: "Qual é o principal alimento dos peixes?", respostas: ["Plantas", "Insetos", "Outros peixes", "Carne"], correta: 2 },
  { pergunta: "O que é um coral?", respostas: ["Animal", "Planta", "Pedra", "Peixe"], correta: 0 },
  { pergunta: "O que os peixes usam para respirar?", respostas: ["Pulmões", "Brânquias", "Nariz", "Pele"], correta: 1 },
  { pergunta: "Qual desses é um mamífero marinho?", respostas: ["Golfinho", "Tubarao", "Polvo", "Caranguejo"], correta: 0 },
  { pergunta: "O que é o plankton?", respostas: ["Um peixe grande", "Microrganismos", "Plantas", "Pedras"], correta: 1 },
  { pergunta: "Qual é o maior oceano do mundo?", respostas: ["Atlântico", "Pacífico", "Índico", "Ártico"], correta: 1 },
  { pergunta: "O que é um tubarão?", respostas: ["Peixe ósseo", "Peixe cartilaginoso", "Mamífero", "Réptil"], correta: 1 },
  { pergunta: "Qual animal é conhecido como o rei dos mares?", respostas: ["Baleia", "Tubarão branco", "Polvo", "Camarão"], correta: 1 },
  { pergunta: "O que é uma estrela do mar?", respostas: ["Peixe", "Molusco", "Equinoderme", "Crustáceo"], correta: 2 },
  { pergunta: "Qual animal vive em uma concha?", respostas: ["Estrela do mar", "Polvo", "Caracol marinho", "Golfinho"], correta: 2 },
  { pergunta: "O que é maré?", respostas: ["Ondas", "Subida e descida da água", "Peixes", "Água doce"], correta: 1 },
  { pergunta: "Como se chama a casa dos peixes?", respostas: ["Aquário", "Rio", "Oceano", "Recife de coral"], correta: 3 },
  { pergunta: "O que é a água salgada?", respostas: ["Água doce", "Água do mar", "Água de rio", "Água contaminada"], correta: 1 },
  { pergunta: "Qual animal tem tentáculos?", respostas: ["Tubarão", "Polvo", "Golfinho", "Caranguejo"], correta: 1 },
  { pergunta: "O que as algas produzem?", respostas: ["Oxigênio", "Fumaça", "Fogo", "Lixo"], correta: 0 },
  { pergunta: "Qual desses vive na água doce?", respostas: ["Siri", "Piranha", "Tubarão", "Polvo"], correta: 1 },
  { pergunta: "O que é o recife de coral?", respostas: ["Montanha", "Planta", "Habitat marinho", "Peixe"], correta: 2 },
  { pergunta: "O que os peixes usam para nadar?", respostas: ["Patas", "Nadadeiras", "Asas", "Cauda de cavalo"], correta: 1 },
  { pergunta: "Qual destes animais é um crustáceo?", respostas: ["Camarão", "Tubarão", "Polvo", "Estrela do mar"], correta: 0 },
];

// Conjunto para armazenar quais perguntas já foram exibidas
let perguntasRespondidas = new Set();

// Controla se o peixe pode pular
let canJump = true;

// Função que faz o peixe pular
const jump = () => {
  if (!gameOver && !perguntaAtiva && canJump) { // Só permite pular se o jogo não acabou e não há pergunta ativa
    canJump = false; // Bloqueia o próximo pulo
    peixe.classList.remove('jump'); 
    void peixe.offsetWidth; // Reinicia animação
    peixe.classList.add('jump');

    peixe.style.transition = 'transform 0.4s ease-out';
    peixe.style.transform = 'translateY(-2.5rem)'; // Define altura do pulo

    setTimeout(() => {
      peixe.style.transition = 'transform 0.4s ease-in';
      peixe.style.transform = 'translateY(0rem)'; // Volta ao chão

      setTimeout(() => {
        canJump = true; // Permite novo pulo
      }, 0.4 * 1000);
    }, 0.4 * 1000);
  }
};

// Função que cria o modal de pergunta
function criarModalPergunta(perguntaObj, posPeixe) {
  perguntaAtiva = true; // Sinaliza que pergunta está ativa
  canJump = false; // Desativa pulo

  // Cria o modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.6)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // Caixa interna do modal
  const box = document.createElement('div');
  box.style.backgroundColor = '#f0f8ff';
  box.style.padding = '1.875rem 1.25rem';
  box.style.borderRadius = '0.75rem';
  box.style.width = '25rem';
  box.style.boxShadow = '0 0 0.9375rem rgba(0,0,0,0.3)';
  box.style.textAlign = 'center';
  box.style.fontFamily = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif';

  // Título da pergunta
  const titulo = document.createElement('h2');
  titulo.innerText = perguntaObj.pergunta;
  titulo.style.marginBottom = '1.25rem';
  titulo.style.color = '#003366';
  box.appendChild(titulo);

  // Container dos botões de respostas
  const botoesContainer = document.createElement('div');
  botoesContainer.style.display = 'flex';
  botoesContainer.style.flexWrap = 'wrap';
  botoesContainer.style.justifyContent = 'space-between';
  botoesContainer.style.gap = '0.75rem';

  // Cria os botões de resposta
  perguntaObj.respostas.forEach((resposta, index) => {
    const btn = document.createElement('button');
    btn.innerText = resposta;
    btn.style.flex = '1 1 calc(50% - 0.75rem)';
    btn.style.minWidth = '7.5rem';
    btn.style.height = '2.8125rem';
    btn.style.backgroundColor = '#0077cc';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '0.5rem';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1rem';
    btn.style.transition = 'background-color 0.3s ease';
    btn.onmouseover = () => btn.style.backgroundColor = '#005fa3';
    btn.onmouseout = () => btn.style.backgroundColor = '#0077cc';

    // Ao clicar na resposta
    btn.onclick = () => {
      if (index === perguntaObj.correta) { // Se correta
        perguntaAtiva = false; // Fecha a pergunta
        document.body.removeChild(modal);
        peixe.style.bottom = '0rem';
        pipe.style.animation = '';
        clouds.style.animation = '';
        peixe.style.animation = '';
        pipePos = pipe.parentElement.offsetWidth;
        pipe.style.left = `${pipePos}px`;
        requestAnimationFrame(animate);
        canJump = true;
      } else { // Se errada
        gameOver = true; 
        localStorage.setItem("pontuacaoFinal", score);
        window.location.href = 'gameover.html';
      }
    };
    botoesContainer.appendChild(btn);
  });

  box.appendChild(botoesContainer);
  modal.appendChild(box);
  document.body.appendChild(modal);

  // Congela animações e posição do peixe
  peixe.style.bottom = `${posPeixe}px`;
  peixe.style.animation = 'none';
  pipe.style.animation = 'none';
  clouds.style.animation = 'none';
}

// Seleciona uma pergunta aleatória
function pegarPerguntaAleatoria() {
  if (perguntasRespondidas.size === perguntas.length) perguntasRespondidas.clear();
  let idx;
  do {
    idx = Math.floor(Math.random() * perguntas.length);
  } while (perguntasRespondidas.has(idx));
  perguntasRespondidas.add(idx);
  return perguntas[idx];
}

// Velocidade inicial dos obstáculos
let pipeSpeed = 4;
let cloudsSpeed = 1;
let pipePos = pipe.offsetLeft;
let cloudsPos = parseFloat(window.getComputedStyle(clouds).right);

// Atualiza a pontuação periodicamente
const updateScore = () => {
  if (!gameOver && !perguntaAtiva) {
    score++;
    scoreDisplay.innerText = `Pontuação: ${score}`;
    if (score % 50 === 0) { // Aumenta a dificuldade
      pipeSpeed += 1;
      cloudsSpeed += 0.2;
    }
  }
  setTimeout(updateScore, 300);
};
updateScore();

// Função principal de animação do jogo
const animate = () => {
  if (gameOver || perguntaAtiva) return;

  const peixePosition = +window.getComputedStyle(peixe).bottom.replace('px', '');
  pipePos -= pipeSpeed;

  if (pipePos + pipe.offsetWidth < 0) pipePos = pipe.parentElement.offsetWidth;
  pipe.style.left = `${pipePos}px`;

  cloudsPos += cloudsSpeed;
  if (cloudsPos > clouds.parentElement.offsetWidth) cloudsPos = -clouds.offsetWidth;
  clouds.style.right = `${cloudsPos}px`;

  // Detecta colisão entre peixe e pipe
  if (pipePos <= 90 && pipePos > 0 && peixePosition < 80) {
    perguntaAtiva = true;
    pipe.style.animation = 'none';
    peixe.style.animation = 'none';
    clouds.style.animation = 'none';
    criarModalPergunta(pegarPerguntaAleatoria(), peixePosition);
    return;
  }

  requestAnimationFrame(animate); // Continua animação
};

requestAnimationFrame(animate); // Inicia animação
document.addEventListener('keydown', jump); // Permite pular com qualquer tecla
