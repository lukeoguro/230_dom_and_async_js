console.log(1, document.head.childNodes.length); // 3
console.log(2, document.head.children[0].tagName); // 'TITLE'
console.log(3, document.head.textContent); // "\n  Title\n"
console.log(4, document.body.children.length); // 3
console.log(5, document.body.childNodes.length); // 7
console.log(6, document.querySelector('div').parentNode.parentNode.tagName); // 'BODY'
console.log(7, document.querySelector('div section').children[2].nextElementSibling); // null
console.log(8, document.querySelectorAll('div').length); // 1

let nodeA = document.body.firstElementChild;
console.log(9, document.querySelector('footer').children.length); // 1
console.log(10, document.querySelector('body').replaceChild(
  document.querySelector('footer'),
  document.body.firstElementChild
).tagName); // 'HEADER'
console.log(11, document.body.appendChild(nodeA)); // <header>Header<header>

console.log(12, document.querySelector('section').textContent.split("\n").map(function (text) {
  return text.trim();
}).filter(function (text) {
  return text.length > 0;
})); // ["H1", "Hello", "World"]

console.log(13, document.querySelector('section').children); // HTMLCollection(3) [h1, p, p]
console.log(14, document.querySelector('section').textContent); // '\n      H1\n      Hello\n      World\n    '
console.log(15, document.querySelector('span.emphasis').parentNode.tagName); // 'FOOTER'