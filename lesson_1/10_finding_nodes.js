let intros = document.getElementsByClassName('intro');
for (let intro of intros) {
  let paragraphs = intro.getElementsByTagName('p');
  for (let paragraph of paragraphs) {
    paragraph.classList.add('article-text');
  }
}

let targetParagraphs = document.querySelectorAll('div.intro p');
console.log(targetParagraphs)
for (let paragraph of targetParagraphs) {
  paragraph.classList.add('alternative');
}