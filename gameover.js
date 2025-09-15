// Exibe a pontuação final salva no localStorage
window.addEventListener('DOMContentLoaded', () => {
    const pontuacao = localStorage.getItem("pontuacaoFinal") || 0;
    document.getElementById("pontuacaoFinal").textContent = pontuacao;
  });
  