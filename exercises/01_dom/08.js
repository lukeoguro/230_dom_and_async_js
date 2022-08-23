const arr = ["BODY", [["DIV", [["DIV", []], ["DIV", [["DIV", []]]]]], ["DIV", []], ["DIV", [["DIV", []], ["DIV", []], ["DIV", []]]]]];

function arrayToNodes([tagName, children]) {
  let node = document.createElement(tagName);
  for (let child of children) {
    node.insertAdjacentElement("beforeend", arrayToNodes(child));
  }
  return node;
}

let nodes = arrayToNodes(arr);
document.body.replaceWith(nodes);