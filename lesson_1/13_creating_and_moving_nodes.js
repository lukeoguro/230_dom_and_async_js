let p = document.createElement('p');
p.textContent = "Testing 'createElement' and 'appendChild'.";
document.body.appendChild(p);

let div1 = document.createElement('div');
let text = document.createTextNode("Now we're testing 'createTextNode' and 'insertBefore'.");
div1.appendChild(text);
document.body.insertBefore(div1, p);

// div1.remove();