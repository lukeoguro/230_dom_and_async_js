document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('grocery-list');
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let item = Object.fromEntries(new FormData(form));
    if (item.name === '') return;
    item.quantity = item.quantity || '1';

    let li = document.querySelector(`li[data-name="${item.name}"]`);
    if (li === null) {
      li = document.createElement('li');
      li.dataset.name = item.name;
      list.appendChild(li);
    }

    li.textContent = `${item.quantity} ${item.name}`;
  });
});