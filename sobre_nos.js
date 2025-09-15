// Dados dos membros: nome, contribuição e história
const membrosInfo = {
    "Brenno Sena": {
      nome: "Brenno Sena",
      texto: "Brenno é apaixonado por biologia marinha e foi o principal responsável pela pesquisa científica do site. Seu objetivo é inspirar mais pessoas a conhecerem e cuidarem da vida marinha."
    },
    "Daniel Landim": {
      nome: "Daniel Landim",
      texto: "Daniel colaborou com o design e a usabilidade do site, tornando o conteúdo acessível e visualmente atraente para os usuários."
    },
    "Gustavo Santos": {
      nome: "Gustavo Santos",
      texto: "Gustavo cuidou da parte técnica do desenvolvimento, garantindo que o site funcione bem em diferentes dispositivos e navegadores."
    },
    "Pedro Xavier": {
      nome: "Pedro Xavier",
      texto: "Pedro contribuiu com os textos e a revisão do conteúdo, assegurando a qualidade e a clareza das informações apresentadas."
    },
    "Luan Ferreira": {
      nome: "Luan Ferreira",
      texto: "Luan foi responsável pela coordenação geral do projeto, garantindo que todas as partes trabalhassem em sintonia e cumprissem os prazos."
    }
  };
  
  // Seleciona todos os elementos de membros
  const membros = document.querySelectorAll('.membro');
  
  // Seleciona os elementos da biografia para atualizar
  const biografiaNome = document.querySelector('.biografia h3');
  const biografiaTexto = document.querySelector('.biografia p');
  
  // Função para atualizar a biografia
  function atualizarBiografia(nome) {
    if (membrosInfo[nome]) {
      biografiaNome.textContent = membrosInfo[nome].nome;
      biografiaTexto.textContent = membrosInfo[nome].texto;
    }
  }
  
  // Adiciona evento de clique a cada membro
  membros.forEach(membro => {
    membro.addEventListener('click', () => {
      const nome = membro.querySelector('p').textContent.trim();
      atualizarBiografia(nome);
  
      // Remove a classe 'hover-active' de todas as imagens
      membros.forEach(m => m.querySelector('img').classList.remove('hover-active'));
  
      // Adiciona a classe 'hover-active' na imagem clicada
      membro.querySelector('img').classList.add('hover-active');
    });
  });
  