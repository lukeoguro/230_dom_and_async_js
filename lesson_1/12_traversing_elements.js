// Copy to Polar bear Wikipedia page
// Q1
let headings = document.getElementsByTagName('h2');
for (let heading of headings) {
  console.log(`${heading.textContent} (${(heading.textContent || '').match(/\S+/g).length})`)
}

// Q2
let toc1 = document.getElementById('toc');
let toc2 = document.getElementsByClassName('toc')[0];
let toc3 = document.querySelector('#toc.toc');
let tocSet = new Set([toc1, toc2, toc3]);
console.log(tocSet.size);

// Q3
let links = document.querySelectorAll('#toc a');
Array.prototype.forEach.call(links, (link, index) => {
  if (index % 2 === 1) {
    link.style.color = 'green';
  }
});

// Q4
let captionDivs = document.getElementsByClassName('thumbcaption');
let captions = Array.prototype.map.call(captionDivs, div => div.textContent.trim());
console.log(captions);

// Q5
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.children.length; i += 1) {
    walk(node.children[i], callback);
  }
}

let table = document.querySelector('table.infobox');

let ranks = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus'];
let classification = {};
ranks.forEach(rank => {
  walk(table, node => {
    if (node.textContent === `${rank}:`) {
      classification[rank] = node.nextElementSibling.textContent;
    }
  });
});

console.log(classification);