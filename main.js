
  const cards = document.querySelectorAll('#vida .card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove 'selected' de todos
      cards.forEach(c => c.classList.remove('selected'));

      // Adiciona 'selected' ao clicado
      card.classList.add('selected');
    });
  });

