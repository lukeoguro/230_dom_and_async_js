document.addEventListener('DOMContentLoaded', () => {
  const applesEl = document.getElementById("apples");
  const messageEl = document.getElementById("message");
  const replayLink = document.getElementById("replay");
  const spacesEl = document.getElementById("spaces");
  const guessesEl = document.getElementById("guesses");

  class Game {
    static #wordBank = ['apple', 'banana', 'orange', 'pear'];

    static #randomWord() {
      let randomIndex = Math.floor(Math.random() * this.#wordBank.length);
      let word = this.#wordBank[randomIndex];
      this.#wordBank.splice(randomIndex, 1);
      return word;
    }

    #MAX_INCORRECT_GUESSES = 6;

    constructor() {
      this.incorrectGuesses = 0;
      this.correctGuesses = 0;
      this.guessedLetters = new Set();
      this.word = Game.#randomWord() || '';

      this.setupDOM();
    }

    setupDOM() {
      this.resetBody();
      this.resetApples();
      this.resetMessage();
      this.resetSpaces();
      this.resetGuesses();

      this.word ? this.bind() : this.gameOutOfWords();
    }

    resetBody() {
      document.body.classList.remove(...document.body.classList);
    }

    colorBody(className) {
      document.body.classList.add(className);
    }

    resetApples() {
      applesEl.classList.remove(...applesEl.classList);
      applesEl.classList.add("guess_0");
    }

    setApples() {
      applesEl.classList.remove(...applesEl.classList);
      applesEl.classList.add("guess_" + this.incorrectGuesses);
    }

    resetMessage() {
      messageEl.textContent = '';
    }

    displayMessage(message) {
      messageEl.textContent = message;
    }

    showReplay() {
      replayLink.classList.add("visible");
    }

    hideReplay() {
      replayLink.classList.remove("visible");
    }

    resetSpaces() {
      let spans = spacesEl.querySelectorAll('span') || [];
      spans.forEach(span => span.remove());

      for (let i = 0; i < this.word.length; i += 1) {
        spacesEl.append(document.createElement('span'));
      }
    }

    fillSpaces(letter) {
      let spaces = spacesEl.querySelectorAll('span');
      [...this.word].forEach((l, i) => {
        if (l === letter) spaces[i].textContent = letter;
      });
    }

    resetGuesses() {
      let spans = guessesEl.querySelectorAll('span');
      spans.forEach(span => span.remove());
    }

    fillGuesses(letter) {
      let span = document.createElement('span');
      span.textContent = letter;
      guessesEl.append(span);
    }

    keyupListener(event) {
      let letter = event.key;
      if (!(letter >= 'a' && letter <= 'z')) return;
      if (this.guessedLetters.has(letter)) return;
      this.guessedLetters.add(letter);
      this.fillGuesses(letter);

      if (this.word.includes(letter)) {
        this.correctGuesses += 1;
        this.fillSpaces(letter);
        if (this.correctGuesses === new Set([...this.word]).size) this.gameWon();
      } else {
        this.incorrectGuesses += 1;
        this.setApples();
        if (this.incorrectGuesses === this.#MAX_INCORRECT_GUESSES) this.gameLost();
      }
    }

    bind() {
      this.currentKeyupListener = (event) => { this.keyupListener(event) };
      document.addEventListener('keyup', this.currentKeyupListener);
    }

    unbind() {
      document.removeEventListener('keyup', this.currentKeyupListener);
    }

    gameOutOfWords() {
      this.displayMessage("Sorry, I've run out of words!");
      this.hideReplay();
    }

    gameOver() {
      this.unbind();
      this.showReplay();
    }

    gameLost() {
      this.gameOver();
      this.displayMessage("Sorry! You're out of guesses.");
      this.colorBody('lose');
    }

    gameWon() {
      this.gameOver();
      this.displayMessage("You won!");
      this.colorBody('win');
    }
  }

  new Game();

  replayLink.addEventListener('click', (event) => {
    event.preventDefault();
    new Game();
  });
});
