function colorGeneration(targetGen) {
  if (targetGen <= 0) return;
  color(document.body, 0, targetGen);
}

function color(node, currGen, targetGen) {
  for (let childNode of node.children) {
    if (currGen + 1 < targetGen) {
      color(childNode, currGen + 1, targetGen);
    } else {
      childNode.classList.add('generation-color');
    }
  }
}

colorGeneration(1);
colorGeneration(3);
colorGeneration(5);
colorGeneration(7);