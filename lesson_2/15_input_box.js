document.addEventListener('DOMContentLoaded', () => {
  const textField = document.querySelector('div.text-field');
  const content = document.querySelector('div.content');

  let cursorIntervalId;

  textField.addEventListener('click', (event) => {
    event.stopPropagation();
    textField.classList.add('focused');

    if (!cursorIntervalId) {
      cursorIntervalId = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (textField.classList.contains('focused')) {
      let key = event.key;
      if (key === 'Backspace') {
        content.textContent = content.textContent.slice(0, -1);
      } else if (key.length === 1) {
        content.textContent += key;
      }
    }
  });

  document.addEventListener('click', (event) => {
    clearInterval(cursorIntervalId);
    cursorIntervalId = null;
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
  });
});