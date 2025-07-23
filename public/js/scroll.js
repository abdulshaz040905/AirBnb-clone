document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.scroll-items');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  const scrollAmount = 200; // amount to scroll in pixels

  leftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    updateButtons();
  });

  rightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    updateButtons();
  });

  // update button state on scroll
  scrollContainer.addEventListener('scroll', updateButtons);

  function updateButtons() {
    // disable left button if fully scrolled to left
    if (scrollContainer.scrollLeft <= 0) {
      leftBtn.style.visibility = 'hidden';
    } else {
      leftBtn.style.visibility = 'visible';
    }

    // disable right button if fully scrolled to right
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
      rightBtn.style.visibility = 'hidden';
    } else {
      rightBtn.style.visibility = 'visible';
    }
  }

  // run once initially
  updateButtons();
});
