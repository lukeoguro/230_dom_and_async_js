function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);
  if (!node1 || !node2 || !notIntersectingPaths(node1, node2)) return false;

  let temp = document.createComment('Temp');
  node2.replaceWith(temp);
  node1.replaceWith(node2);
  temp.replaceWith(node1);

  return true;
}

function notIntersectingPaths(node1, node2) {
  let current = node1;
  while (current !== document.body) {
    if (current === node2) return false;
    current = current.parentNode;
  }

  current = node2;
  while (current !== document.body) {
    if (current === node1) return false;
    current = current.parentNode;
  }

  return true;
}

console.log(nodeSwap(1, 20));
console.log(nodeSwap(1, 4));
console.log(nodeSwap(9, 3));

console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));