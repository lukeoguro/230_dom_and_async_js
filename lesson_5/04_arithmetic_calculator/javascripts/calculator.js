document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  const form = document.querySelector('form');

  const operations = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let num1 = Number(document.getElementById('first-number').value);
    let num2 = Number(document.getElementById('second-number').value);
    let operator = document.getElementById('operator').value;

    let operation = operations[operator];
    result.textContent = operation(num1, num2).toString();
  });
});