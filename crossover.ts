import {Expression} from "./expression";
import {getRandomTerminal} from "./random";

export function replaceBranch(oldParent: any, oldBranch: any, newBranch: any) {
    let sizeDelta;
    newBranch.parent = oldParent;

    if (newBranch.size >= 100 && oldParent) {
        // just prune when other branch is too big
        oldParent.children.splice(oldParent.children.indexOf(oldBranch), 1, getRandomTerminal());

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

export function switchSubTrees(tree1: Expression, tree2: Expression) {
    const parent1 = tree1.parent;
    const parent2 = tree2.parent;

    return [replaceBranch(parent1, tree1, tree2), replaceBranch(parent2, tree2, tree1)];
}

export function crossover(parent1: Expression, parent2: Expression) {
    return switchSubTrees(parent1.clone().getRandomSubExpression(), parent2.clone().getRandomSubExpression());
}