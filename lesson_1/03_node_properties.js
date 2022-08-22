// Selection
let p = document.querySelector("p");

// Traversing
console.log(document.childNodes);   // NodeList [html]
console.log(document.firstChild);   // html
console.log(document.lastChild);    // html

let html = document.firstChild;
console.log(html.parentNode);       // #document
console.log(html.nextSibling);      // null
console.log(html.previousSibling);  // null

// Walking the tree
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

let t;
walk(document, (node) => {
  if (node.nodeName === '#text' && t === undefined) t = node;
});

// Node properties
console.log('p nodeName', p.nodeName);
console.log('t nodeName', t.nodeName);

console.log('p tagName', p.tagName);
console.log('t tagName', t.tagName); // text nodes don't have a tag

console.log('p nodeType', p.nodeType);
console.log('t nodeType', t.nodeType);
console.log('p ELEMENT_NODE', p.nodeType === Node.ELEMENT_NODE);
console.log('t TEXT_NODE', t.nodeType === Node.TEXT_NODE);

console.log('p nodeValue', p.nodeValue); // element nodes don't have a value
console.log('t nodeValue', t.nodeValue);

console.log('p textContent', p.textContent); // let's you see textual content for elements
console.log('t textContent', t.textContent);

console.log('p toString', p.toString());
console.log('t toString', t.toString());

// Attributes
console.log('p getAttribute id', p.getAttribute('id')); // 'intro'
p.setAttribute('id', 'outro');
console.log('p id', p.id);                              // 'outro'

console.log('p getAttribute class', p.getAttribute('class')); // 'paragraph content'
console.log('p className', p.className);                      // 'paragraph content'
console.log('p classList', p.classList);                      // DOMTokenList
p.classList.add('para');
p.classList.remove('paragraph');
console.log('p className', p.className);                      // 'paragraph content'

// Style
console.log(p.style); // CSSStyleDeclaration
p.style.color = 'blue';
p.style.lineHeight = '3em';