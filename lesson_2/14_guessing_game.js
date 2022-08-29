document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#guess');
  const form = document.querySelector('form');
  const paragraph = document.querySelector('p');
  const link = document.querySelector('a');
  const guessBtn = document.querySelector('[type="submit"]');

  let answer;
  let guesses;

  function newGame() {
    guessBtn.disabled = false;
    form.reset();
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let guess = Number.parseInt(input.value, 10);
    guesses += 1;

    let message;
    if (Number.isNaN(guess)) {
      message = 'Please enter a valid number';
    } else if (guess === answer) {
      message = `You guessed it! It took you ${guesses} guesses.`;
      guessBtn.disabled = true;
    } else if (guess > answer) {
      message = `My number is lower than ${guess}`;
    } else if (guess < answer) {
      message = `My number is higher than ${guess}`;
    }

    paragraph.textContent = message;
  });

  link.addEventListener('click', (event) => {
    event.preventDefault();
    newGame();
  });

  newGame();
});