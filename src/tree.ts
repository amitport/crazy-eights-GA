import {chooseOne} from "./utils";
import {TERMINALS} from "./ast-tree";

export class Tree {
  public parent?: Tree;
  public size = 1;

  constructor(
    public content: any,
    public children: Tree[] = [],
  ) {
    for (const child of this.children) {
      child.parent = this;
      this.size += child.size;
    }
  }

  clone() {
    return new Tree(this.content, this.children.map(_ => _.clone()))
  }
}

// select subtree at a given index (post-order)
export function getSubTreeAtIndex(tree: Tree, index: number): any {
  if (index === tree.size - 1) {
    return tree;
  }
  let accSize = 0;
  for (const child of tree.children) {
    if (index < accSize + child.size) {
      return getSubTreeAtIndex(child, index - accSize);
    }
    accSize += child.size;
  }
}

export function chooseRandomSubtree(tree: Tree): any {
  return getSubTreeAtIndex(tree, Math.floor(Math.random() * tree.size));
}

export function crossover(parent1: Tree, parent2: Tree) {
  return switchSubTrees(chooseRandomSubtree(parent1.clone()), chooseRandomSubtree(parent2.clone()));
}

export function replaceBranch(oldParent: any, oldBranch: any, newBranch: any) {
  let sizeDelta;
  newBranch.parent = oldParent;

  if (newBranch.size >= 100 && oldParent) {
    // just prune when other branch is too big
    oldParent.children.splice(oldParent.children.indexOf(oldBranch), 1, chooseOne(TERMINALS));

    sizeDelta = 1 - oldBranch.size;
  } else {

    if (oldParent) {
      // replace the children of the old parent
      oldParent.children.splice(oldParent.children.indexOf(oldBranch), 1, newBranch);
    }
    sizeDelta = newBranch.size - oldBranch.size;
    // propagate size change and find root;
  }
  let newRoot = newBranch;
  while (newRoot.parent) {
    newRoot = newRoot.parent;
    newRoot.size += sizeDelta;
  }
  return newRoot;
}

export function switchSubTrees(tree1: Tree, tree2: Tree) {
  const parent1 = tree1.parent;
  const parent2 = tree2.parent;

  return [replaceBranch(parent1, tree1, tree2), replaceBranch(parent2, tree2, tree1)];
}

export function removeParent(tree: Tree): any {
  return {
    parent: tree.parent ? tree.parent.content : 'none',
    content: tree.content,
    children: tree.children ? tree.children.map(removeParent) : 'none',
  };
}