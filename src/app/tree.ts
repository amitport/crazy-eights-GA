export class Tree {
  size: number;
  parent?: Tree;
  children: Tree[];
  content: any;
}

function getSubTreeAtIndex(tree: Tree, index: number) {
  if (index === tree.size - 1) {
    return tree;
  }
  if (tree.children !== null) {
    let accSize = 0;
    for (const child of tree.children) {
      if (index < accSize + child.size) {
        return getSubTreeAtIndex(child, index - accSize);
      }
      accSize += child.size;
    }
  }
}

function chooseRandomSubtree(tree: Tree) {
  return getSubTreeAtIndex(tree, Math.floor(Math.random() * tree.size));
}
