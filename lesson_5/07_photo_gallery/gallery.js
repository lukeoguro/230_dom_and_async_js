document.addEventListener('DOMContentLoaded', () => {
  const thumbnailLinks = document.querySelectorAll('ul.thumbnails a');
  const figures = document.querySelectorAll('div.figures figure');

  function displayImage(event) {
    event.preventDefault();

    let link = event.target.closest('a');
    let figure = figures[link.dataset.figureId];

    if (figure.classList.contains('show')) return;
    document.querySelector('figure.show').classList.replace('show', 'hide');
    document.querySelector('a.active').classList.remove('active');

    figure.classList.replace('hide', 'show');
    link.classList.add('active');
  }

  thumbnailLinks.forEach(link => link.onclick = displayImage);
});