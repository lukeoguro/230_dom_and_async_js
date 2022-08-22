// Q1
let html = document.lastChild;
let body = html.lastChild;
let h1 = Array.prototype.find.call(body.childNodes, (node) => {
  return node.nodeName === 'H1';
});

h1 === document.querySelector('h1'); // true
h1.style.color = 'red';
h1.style.fontSize = '48px';
console.log(h1.getAttribute('style')); // color: red; font-size: 48px;

// Q2
let paragraphs = Array.prototype.filter.call(body.childNodes, (node) => {
  return node.nodeName === 'P';
});
console.log(`Paragraphs on page: ${paragraphs.length}`);

// Q3
let firstWords = paragraphs.map(paragraph => {
  return paragraph.textContent.match(/\S+/g)[0];
});

firstWords.forEach(word => console.log(word));

// Q4
paragraphs.slice(1).forEach(paragraph => {
  paragraph.classList.add('stanza');
});

// Copy to Polar bear Wikipedia page
// Q5
let images = document.querySelectorAll('img');
let pngImages = Array.prototype.filter.call(images, image => {
  return /\.png$/.test((image.getAttribute('src') || ''));
});

console.log(`Total images: ${images.length}`);
console.log(`PNG images: ${pngImages.length}`);

// Q6
let links = document.querySelectorAll('a');
Array.prototype.forEach.call(links, link => {
  link.style.color = 'red';
});