let lastScroll = 0;
const header = document.querySelector("header");
const tolerance = 10;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove("hide");
        lastScroll = 0;
        return;
    }

    if (currentScroll > lastScroll + tolerance) {
        // Rolando para baixo
        header.classList.add("hide");
    } else if (currentScroll < lastScroll - tolerance) {
        // Rolando para cima
        header.classList.remove("hide");
    }

    lastScroll = currentScroll;
});