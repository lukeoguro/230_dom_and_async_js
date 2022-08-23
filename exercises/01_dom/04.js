function sliceTree(startId, endId) {
  let startEl = document.getElementById(startId);
  let endEl = document.getElementById(endId);
  if (startEl === null || endEl === null) return undefined;

  let tree = [];
  let node = endEl;
  do {
    tree.unshift(node.tagName);
    if (node === startEl) return tree;

    node = node.parentElement;
  } while (node.tagName !== 'BODY');

  return undefined;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));