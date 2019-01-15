import {Expression} from "./expression";
import {Literal, randomClause} from "./clause";
import {chooseOne} from "./utils";
import {AndOp, BOOLEAN_OPS, OrOp, randomBooleanExpression} from "./boolean-expression";

export function getSubTreeAtIndex(bexpr: Expression, index: number): any {
    if (index === bexpr.size - 1) {
        return bexpr;
    }
    let accSize = 0;
    for (const child of bexpr.children) {
        if (index < accSize + child.size) {
            return getSubTreeAtIndex(child, index - accSize);
        }
        accSize += child.size;
    }
}

export function chooseBranch(bexpr: Expression): Expression {
    let branch;
    do {
        branch = getSubTreeAtIndex(bexpr, Math.floor(Math.random() * bexpr.size));
    } while (branch instanceof Literal);
    return branch;
}

export function chooseRandomSubtree(bexpr: Expression): Expression {
    return getSubTreeAtIndex(bexpr, Math.floor(Math.random() * bexpr.size));
}


export function chooseRandomLeaf(bexpr: Expression): Literal {
    do {
        bexpr = getSubTreeAtIndex(bexpr, Math.floor(Math.random() * bexpr.size));
    } while (!(bexpr instanceof Literal));
    return bexpr;
}

export function alternateLeaf(bexpr: Expression) {
    if (bexpr instanceof Literal) {
        return new Literal(randomClause())
    }

    bexpr = bexpr.clone();

    const leaf = chooseRandomLeaf(bexpr);

    const idx = leaf.parent!.children.indexOf(leaf);
    const newLeaf = new Literal(randomClause());
    newLeaf.parent = leaf.parent;
    leaf.parent!.children.splice(idx, 1, newLeaf);

    return bexpr;
}

export function alternateOperator(bexpr: Expression) {
    if (bexpr instanceof Literal) {
        return bexpr;
    }

    bexpr = bexpr.clone();
    const branch = chooseBranch(bexpr);
    let newBranch;
    if (branch instanceof OrOp) {
        newBranch = new AndOp(branch.children);
    } else if (branch instanceof AndOp) {
        newBranch = new OrOp(branch.children);
    } else {
        return bexpr;
    }

    if (branch.parent) {
        const idx = branch.parent.children.indexOf(branch);
        branch.parent.children.splice(idx, 1, newBranch);

        return bexpr;
    } else {
        return newBranch;
    }
}

export function growOrSplitLeaf(bexpr: Expression) {
    if (bexpr instanceof Literal) {
        return bexpr;
    }

    bexpr = bexpr.clone();
    const subTree = chooseRandomSubtree(bexpr);
    const Op = chooseOne(BOOLEAN_OPS);

    let newBranch;
    let parent: Expression | undefined = subTree.parent;
    if (Op.arity === 1) {
        newBranch = new Op([subTree]);
    } else { // if (Op.arity === 2)
        const children = [subTree];
        const randomChild = randomBooleanExpression(bexpr.size);
        if (Math.random() < 0.5) {
            children.push(randomChild);
        } else {
            children.unshift(randomChild);
        }
        newBranch = new Op(children);
    }

    if (parent) {
        const idx = parent.children.indexOf(subTree);

        newBranch.parent = parent;
        parent.children.splice(idx, 1, newBranch);
        const delta = newBranch.size - subTree.size;

        do {
            parent.size += delta;
            parent = parent.parent;
        } while (parent);

        return bexpr;
    } else {
        return newBranch;
    }
}

export function pruneBranchOrDeleteLeaf(bexpr: Expression) {
    if (bexpr instanceof Literal) {
        return bexpr;
    }

    bexpr = bexpr.clone();
    const branch = chooseBranch(bexpr);
    const child = chooseOne(branch.children);

    if (branch.parent) {
        const idx = branch.parent.children.indexOf(branch);
        let parent: Expression | undefined = branch.parent;

        child.parent = parent;
        parent.children.splice(idx, 1, child);
        const delta = child.size - branch.size;

        do {
            parent.size += delta;
            parent = parent.parent;
        } while (parent);

        return bexpr;
    } else {
        return child;
    }
}

export function mutate(bexpr: Expression) {
    return chooseOne([
        alternateLeaf,
        // alternateOperator,
        // growOrSplitLeaf,
        // pruneBranchOrDeleteLeaf
        ]
    )(bexpr);
}

export function replaceBranch(oldParent: any, oldBranch: any, newBranch: any) {
    let sizeDelta;
    newBranch.parent = oldParent;

    if (newBranch.size >= 100 && oldParent) {
        // just prune when other branch is too big
        oldParent.children.splice(oldParent.children.indexOf(oldBranch), 1, new Literal(randomClause()));

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
    return switchSubTrees(chooseRandomSubtree(parent1.clone()), chooseRandomSubtree(parent2.clone()));
}