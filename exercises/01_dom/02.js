function childNodes(id) {
  let node = document.getElementById(id);
  if (node === null) return "Invalid id.";

  let allNodes = nodeCounter(node);
  let directChildNodes = node.childNodes.length;
  let indirectChildNodes = allNodes - directChildNodes - 1;

  return [directChildNodes, indirectChildNodes];
}

function nodeCounter(node) {
  let count = 1;

  for (let i = 0; i < node.childNodes.length; i += 1) {
    count += nodeCounter(node.childNodes[i]);
  }

  return count;
}

for (let id = 1; id <= 10; id += 1) {
  console.log(childNodes(id));
}