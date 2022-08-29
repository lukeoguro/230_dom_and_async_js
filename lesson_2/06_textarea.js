document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea');
  const counter = document.querySelector('p.counter');
  const button = document.querySelector('button');
  const MAX_CHARS = 140;

  function updateCounter() {
    let remaining = MAX_CHARS - textarea.value.length;
    let message = `${remaining} characters remaining`;
    let invalidFlag = remaining < 0;

    counter.textContent = message;
    textarea.classList.toggle('invalid', invalidFlag);
    button.disabled = invalidFlag;
  }

  textarea.addEventListener('input', updateCounter);
  updateCounter();
});