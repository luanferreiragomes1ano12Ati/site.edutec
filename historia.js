// Dados da linha do tempo da biologia marinha no Brasil
const eventosBrasil = [
  {
    id: 1,
    ano: "1955",
    titulo: "Fundação do Instituto de Biologia Marinha",
    descricao: "Paulo Sawaya fundou o Instituto de Biologia Marinha (IBM) em São Sebastião, SP.",
  },
  {
    id: 2,
    ano: "1962",
    titulo: "Criação do CEBIMar",
    descricao: "O IBM foi incorporado à USP como o Centro de Biologia Marinha (CEBIMar).",
  },
  {
    id: 3,
    ano: "1980",
    titulo: "Expansão dos estudos marinhos",
    descricao: "Diversas universidades brasileiras começaram a investir em pesquisas marinhas.",
  },
  {
    id: 4,
    ano: "2000",
    titulo: "Conservação e sustentabilidade",
    descricao: "Projetos de conservação marinha e áreas protegidas ganharam força no Brasil.",
  },
  {
    id: 5,
    ano: "Atualidade",
    titulo: "Tecnologia e pesquisa avançada",
    descricao: "Uso de tecnologias modernas para monitoramento e estudo dos ecossistemas marinhos brasileiros.",
  },
];

const timeline = document.getElementById("timeline");
const cardTitle = document.getElementById("card-title");
const cardText = document.getElementById("card-text");

// Criar eventos na linha do tempo
function criarEventos() {
  eventosBrasil.forEach((evento, index) => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("timeline-item");
    eventDiv.dataset.id = evento.id;
    eventDiv.dataset.year = evento.ano;

    eventDiv.textContent = evento.titulo;

    eventDiv.addEventListener("click", () => {
      mostrarDetalhes(evento);
      setActive(eventDiv);
    });

    timeline.appendChild(eventDiv);

    // Seleciona o primeiro evento por padrão
    if (index === 0) {
      mostrarDetalhes(evento);
      setActive(eventDiv);
    }
  });
}

// Mostrar detalhes no card
function mostrarDetalhes(evento) {
  cardTitle.textContent = evento.titulo;
  cardText.innerHTML = `<strong>Ano:</strong> ${evento.ano}<br />${evento.descricao}`;
}

// Destacar evento ativo
function setActive(element) {
  document.querySelectorAll(".timeline-item").forEach((el) => {
    el.classList.remove("active");
  });
  element.classList.add("active");
}

// Inicializa
criarEventos();

// Bolhas animadas (seu código original)
const container = document.getElementById("bolhas-container");

function criarBolha() {
  const bolha = document.createElement("div");
  bolha.classList.add("bolha");

  const size = Math.random() * 20 + 10;
  bolha.style.width = `${size}px`;
  bolha.style.height = `${size}px`;

  bolha.style.left = `${Math.random() * 100}%`;
  bolha.style.animationDuration = `${Math.random() * 5 + 3}s`;

  container.appendChild(bolha);

  setTimeout(() => {
    bolha.remove();
  }, 8000);
}

setInterval(criarBolha, 300);


