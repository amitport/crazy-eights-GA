import {chooseOne} from "../utils";
import {Expression, Tree} from "./tree";
import {BINARY_OPS, TERMINALS, UNARY_OPS, VARIABLES} from "./clause";
import {BOOL_BINARY_OPS, BOOL_UNARY_OPS} from "./boolean-expression";

export function randomTree(depth = 0): Expression | undefined {
  // actual solution:
  // return new OrOp(
  //   new IsEmptyOp(VARIABLES[0]),
  //   new OrOp(
  //     new EqOp(new RankOp(VARIABLES[1]), new Constant(EIGHT)),
  //     new OrOp(
  //       new EqOp(new RankOp(VARIABLES[0]), new RankOp(VARIABLES[1])),
  //       new EqOp(new SuitOp(VARIABLES[0]), new SuitOp(VARIABLES[1])),
  //     )
  //   ),
  // );

  // random tree below:
  if (Math.random() < 0.08 * (1 + depth / 5000)) {
    return chooseOne(TERMINALS)!;
  } else {
    const node = chooseOne([...UNARY_OPS, ...BOOL_UNARY_OPS,  ...BINARY_OPS, ...BOOL_BINARY_OPS])!;
    const nextDepth = depth + 1;
    if (node.type === 'UnaryOp') {
      if (node.opName === 'isEmpty') {
        return new node(VARIABLES[0]);
      }
      return new node(randomTree(nextDepth)!);
    }
    if (node.type === 'PropertyOp') {
      return new node(chooseOne(VARIABLES)!);
    }
    if (node.type === 'BinaryOp') {
      return new (node as any)(randomTree(nextDepth), randomTree(nextDepth));
    }
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
        oldParent.children.splice(oldParent.children.indexOf(oldBranch), 1, chooseOne(TERMINALS)!);

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


