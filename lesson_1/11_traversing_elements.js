// 'children' extracts elements only
let html = document.querySelector('html');

console.log(html.childNodes); // NodeList(3) [head, text, body]
console.log(html.children);   // HTMLCollection(2) [head, body]

// Use 'nextElementSibling' to traverse
let head = document.getElementsByTagName('head')[0];
console.log(head.nextElementSibling);   // body
console.log(head.nextSibling);          // #text

// Elements don't have a 'nodeValue'. Use `textContent` to access and replace text
let p = document.querySelector('p');

console.log(p.nodeValue);   // null (it's #text that holds value)
console.log(p.childNodes);  // NodeList(5) [text, a, text, a, text]
console.log(p.textContent); // 'You can go back or continue.'

p.textContent = 'Continue!';
console.log(p.childNodes);  // NodeList [text]
console.log(p.textContent); // 'You can go back or continue.'
