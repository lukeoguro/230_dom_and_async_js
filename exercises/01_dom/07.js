function nodesToArr(node = document.body) {
  let arr = [node.nodeName];

  if (node.children.length === 0) {
    arr.push([]);
  } else {
    let children = Array.prototype.map.call(node.children, nodesToArr);
    arr.push(children);
  }

  return arr;
}

console.log(nodesToArr());