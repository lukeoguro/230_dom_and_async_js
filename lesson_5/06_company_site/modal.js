const sampleText = "Fusce feugiat ut nisi at pulvinar. Quisque sagittis augue \
sit amet hendrerit pellentesque. Maecenas pellentesque tincidunt commodo. \
Phasellus et justo pharetra, imperdiet dui eu, dapibus velit. Suspendisse \
finibus ante maximus bibendum rhoncus. Etiam sit amet faucibus urna. Nulla dui \
turpis, interdum non sodales quis, tempus quis mi. Aenean vel ante lacinia, \
laoreet arcu placerat, convallis justo. Aenean sit amet fringilla nisl. \
Phasellus vestibulum lorem et pretium aliquam.";

document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById('modal');
  const modalTitle = modal.querySelector('h3');
  const modalImg = modal.querySelector('img');
  const modalText = modal.querySelector('p');

  const modalLayer = document.getElementById('modal-layer');

  function showModal(event) {
    event.preventDefault();

    let link = event.target.closest('a.modal-link');
    modalTitle.textContent = link.dataset.title;
    modalImg.src = link.dataset.imageSource;
    modalText.textContent = sampleText;

    modal.classList.replace('hide', 'show');
    modalLayer.classList.replace('hide', 'show');
  }

  function hideModal(event) {
    event.preventDefault();

    modal.classList.replace('show', 'hide');
    modalLayer.classList.replace('show', 'hide');

    modalTitle.textContent = '';
    modalImg.src = '';
    modalText.textContent = '';
  }

  const modalLinks = document.querySelectorAll('a.modal-link');
  modalLinks.forEach(modalLink => modalLink.onclick = showModal);

  const closeBtn = document.querySelector('a.close');
  [closeBtn, modalLayer].forEach(el => el.onclick = hideModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeBtn.dispatchEvent(new Event('click'));
    }
  })
});

