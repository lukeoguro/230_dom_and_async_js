function domTreeTracker(id) {
  let node = document.getElementById(id);
  if (node === null) return 'Invalid id.';

  let tree = [];
  let parent = node.parentNode;
  do {
    let siblings = Array.prototype.map.call(parent.children, n => n.nodeName);
    tree.push(siblings);
    parent = parent.parentNode;
  } while (parent.tagName !== 'HTML');

  return tree;
}

console.log(domTreeTracker(1));
console.log(domTreeTracker(2));
console.log(domTreeTracker(22));