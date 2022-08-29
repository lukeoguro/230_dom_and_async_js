document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const articles = document.querySelectorAll('article');

  function addHighlight(el) {
    let highlightedEl = document.querySelector('.highlight');
    if (highlightedEl) highlightedEl.classList.remove('highlight');

    el.classList.add('highlight');
  }

  document.addEventListener('click', (event) => {
    let t = event.target;
    if (t.tagName === 'A') {
      let article = document.querySelector(t.getAttribute('href'));
      addHighlight(article);
    } else if (t.tagName === 'ARTICLE') {
      addHighlight(t);
    } else if (t.parentElement.tagName === 'ARTICLE') {
      addHighlight(t.parentElement);
    } else {
      addHighlight(main);
    }
  }
  );
});


// cons