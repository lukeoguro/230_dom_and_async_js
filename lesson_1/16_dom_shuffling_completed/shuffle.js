const body = document.body;

// Header
const header = document.querySelector('body > header');
body.insertAdjacentElement('afterbegin', header);
header.insertAdjacentElement('afterbegin', document.querySelector('main > h1'));

const [babyFigure, chinFigure] = document.querySelectorAll('figure');
const [chinCaption, babyCaption] = document.querySelectorAll('figcaption');

babyFigure.insertAdjacentElement('beforeend', babyCaption);
chinFigure.insertAdjacentElement('beforeend', chinCaption);

const article = document.querySelector('article');
article.insertAdjacentElement('beforeend', chinFigure);
article.insertAdjacentElement('beforeend', babyFigure);