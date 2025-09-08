let lastScroll = 0;
const header = document.querySelector("header");
const tolerance = 10; // quantos pixels precisa rolar para cima antes de mostrar

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("hide"); // sempre mostra no topo
    lastScroll = 0;
    return;
  }

  if (currentScroll > lastScroll) {
    // rolando para baixo
    header.classList.add("hide");
  } else if (lastScroll - currentScroll > tolerance) {
    // só aparece se subir mais do que "tolerance"
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
