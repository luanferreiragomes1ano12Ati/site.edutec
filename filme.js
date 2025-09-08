const movies = [
    {
      title: "Mega Tubarão",
      desc: "Um grupo de cientistas explora uma área desconhecida do oceano e acidentalmente libera um megalodonte, um tubarão pré-histórico gigante. A criatura sobe à superfície, ameaçando embarcações e cidades costeiras. Para impedir o desastre, chamam Jonas Taylor, um mergulhador especialista em resgates no mar profundo, que já enfrentou o monstro antes.",
      bg: "url('./images/megatubarao.jpg')",
      btnColor: "#ff4136",
      link: "https://www.primevideo.com/-/pt/detail/Megatubar%C3%A3o/0KAF3T3G87FC0NGWAAE3DGZC2R"
    },
    {
      title: "Procurando Nemo",
      desc: "Quando Nemo é levado para longe de casa e acaba em um aquário no consultório de um dentista, Marlin, com a ajuda de Dory, uma blue tang desmemoriada, embarca em uma perigosa jornada. Ele se torna o herói de um esforço épico para salvar seu filho, que também cria planos ousados para voltar para casa.",
      bg: "url('./images/procurando-nemo.jpg')",
      btnColor: "#2ECC40",
      link: "https://www.disneyplus.com/pt-br/browse/entity-37b62808-2368-4688-9410-2dcf7461e258"
    },
    {
      title: "Procurando Dory",
      desc: "Um ano após ajudar Marlin (Albert Brooks) a reencontrar seu filho Nemo, Dory (Ellen DeGeneres) tem um insight e lembra de sua amada família. Com saudades, ela decide fazer de tudo para reencontrá-los e na desenfreada busca esbarra com amigos do passado e vai parar nas perigosas mãos de humanos.",
      bg: "url('./images/dory.jpg')",
      btnColor: "#FFDC00",
      link: "https://www.disneyplus.com/pt-br/browse/entity-1898d521-c10f-46ca-b253-432a9eb5416f"
    },
    {
      title: "Bob Esponja: O Filme",
      desc: "As aventuras de Bob Esponja, uma esponja amarela que vive na cidade subaquática de Fenda do Biquíni. Ele trabalha como cozinheiro no Siri Cascudo, famoso pelo hambúrguer de siri, e se diverte com seu melhor amigo, Patrick Estrela. Também convive com o mal-humorado Lula Molusco, a cientista Sandy Bochechas e o ganancioso Sr. Siriguejo. Com muito otimismo.",
      bg: "url('./images/bob.jpeg')",
      btnColor: "#7FDBFF",
      link: "https://www.primevideo.com/-/pt/detail/Bob-Esponja---O-Filme/0OSAJR3Y1EYH7FNMGCTANN81QG"
    },
    {
      title: "Sea Beast",
      desc: "Durante a aventura ele se depara com um intrigante monstro marinho que, surpreendentemente, acaba se tornando um aliado essencial no enfrentamento das tormentas.  A vida do lendário caçador de monstros marinhos é virada de cabeça para baixo a partir dessa amizade - com a fera mais perigosa de todas.",
      bg: "url('./images/sea.jpeg')",
      btnColor: "#B10DC9",
      link: "https://www.netflix.com/br/title/81018682"
    },
    {
      title: "Aquaman",
      desc: "O filme Aquaman (2018) conta a história de Arthur Curry, um homem de dois mundos: filho de um faroleiro humano e da rainha de Atlântida. Vivendo na superfície, ele é forçado a confrontar seu destino quando seu meio-irmão, Orm, o atual rei de Atlântida, ameaça iniciar uma guerra contra o mundo da superfície devido à poluição dos oceanos.",
      bg: "url('./images/aquamen1.jpg')",
      btnColor: "#01FF70",
      link: "https://www.primevideo.com/-/pt/detail/Aquaman/0LH39FTDGV5DRWWD7HRVLHHDZZ"
    },
    {
      title: "Aquaman 2",
      desc: "Após falhar em derrotar o rei dos mares, Arraia Negra usa o Tridente Negro e liberta uma força antiga e maligna, que ameaça Atlântida e o mundo da superfície. Com o caos se espalhando, Aquaman precisa deixar de lado rivalidades e se unir a um aliado inesperado: seu meio-irmão Orm, o ex-rei de Atlântida. Juntos, enfrentam batalhas e segredos do passado para salvar seu povo.",
      bg: "url('./images/aquaman.jpg')",
      btnColor: "#FF851B",
      link: "https://www.primevideo.com/-/pt/detail/Aquaman-2-O-Reino-Perdido/0F8EG0MIVUCIBBM2UNR9MHKOSL"
    },
  ];
  
  const posters = document.querySelectorAll(".posters img");
  const title = document.getElementById("movie-title");
  const desc = document.getElementById("movie-desc");
  const btn = document.getElementById("movie-btn");
  const hero = document.getElementById("hero");
  
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.classList.add("carousel-indicators");
  document.querySelector(".carousel").appendChild(indicatorsContainer);
  
  const indicators = [];
  
  movies.forEach((_, index) => {
    const dot = document.createElement("span");
    if(index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => changeMovie(index));
    indicatorsContainer.appendChild(dot);
    indicators.push(dot);
  });
  
  function changeMovie(index) {
    // Atualizar informações do filme
    title.textContent = movies[index].title;
    desc.textContent = movies[index].desc;
    btn.style.background = movies[index].btnColor;
    hero.style.backgroundImage = movies[index].bg;
  
    // Atualizar ação do botão
    btn.onclick = () => window.open(movies[index].link, "_blank");
  
    // Atualizar pôster ativo
    posters.forEach(p => p.classList.remove("active"));
    posters[index].classList.add("active");
  
    // Atualizar indicador ativo
    indicators.forEach(dot => dot.classList.remove("active"));
    indicators[index].classList.add("active");
  }
  
  // Clique nos pôsteres
  posters.forEach((poster, i) => {
    poster.addEventListener("click", () => changeMovie(i));
  });
  
  // Inicializar com o primeiro filme
  changeMovie(0);
  