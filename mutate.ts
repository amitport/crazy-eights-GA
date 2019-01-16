import {BinaryOp, Expression, Terminal, UnaryOp} from "./expression";
import {Literal} from "./clause";
import {chooseOne, getRandomExpression, getRandomTerminal} from "./random";
import {BINARY_OPS, UNARY_OPS} from "./node-types";
import {AndOp, OrOp} from "./boolean-expression";

export function alternateLeaf(expr: Expression) {
    if (expr instanceof Terminal) {
        return getRandomTerminal()
    }

    expr = expr.clone();

    const terminal = expr.findRandomTerminalDescendant();

    const idx = terminal.parent!.children.indexOf(terminal);
    const newLeaf = getRandomTerminal();
    newLeaf.parent = terminal.parent;
    terminal.parent!.children.splice(idx, 1, newLeaf);

    return expr;
}

export function alternateOperator(expr: Expression) {
    if (expr instanceof Terminal) {
        return expr;
    }
    expr = expr.clone();

    const oldBranch = expr.findRandomBranchDescendant();

    const opTypes: (typeof Expression)[] = oldBranch instanceof BinaryOp ?
        BINARY_OPS :
        UNARY_OPS;

    const idx = opTypes.indexOf(oldBranch.constructor);
    const Op = chooseOne([...opTypes.slice(0, idx), ...opTypes.slice(idx + 1)])!;

    const newBranch = new (Op as any)(oldBranch.children);
    if (oldBranch.parent) {
        newBranch.parent = oldBranch.parent;
        const idx = oldBranch.parent.children.indexOf(oldBranch);
        oldBranch.parent.children.splice(idx, 1, newBranch);
        return expr;
    } else {
        return newBranch;
    }
}

export function growOrSplitLeaf(bexpr: Expression) {
    if (bexpr instanceof Terminal) {
        return bexpr;
    }

    bexpr = bexpr.clone();
    const subTree = bexpr.findRandomSubExpression();
    const Op = chooseOne([...BINARY_OPS, ...UNARY_OPS])!;

    let newBranch;
    let parent: Expression | undefined = subTree.parent;

    if (Op.arity === 2) {
        const children = [subTree];
        const randomChild = getRandomExpression(10 /* give more chance to terminals */);
        if (Math.random() < 0.5) {
            children.push(randomChild);
        } else {
            children.unshift(randomChild);
        }
        newBranch = new Op(children);
    } else { // if (Op.arity === 1)
        newBranch = new Op([subTree]);
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
    if (bexpr instanceof Terminal) {
        return bexpr;
    }

    bexpr = bexpr.clone();
    const branch = bexpr.findRandomBranchDescendant();
    const child = chooseOne(branch.children)!;

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

export function mutate2(bexpr: Expression) {
    return chooseOne([
        alternateLeaf,
        alternateOperator,
        growOrSplitLeaf,
        pruneBranchOrDeleteLeaf
        ]
    )!(bexpr);
}

export function mutate1(expr: Expression) {
    const newEntity = expr.clone();
    const oldBranch = expr.findRandomSubExpression();

    if (Math.random() < 0.05 && oldBranch instanceof UnaryOp) {
        if (oldBranch.parent) {
            oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, oldBranch.children[0]);

            oldBranch.children[0].parent = oldBranch.parent;

            let newRoot = oldBranch as Expression;
            while (newRoot.parent) {
                newRoot = newRoot.parent as Expression;
                newRoot.size -= 1;
            }
            return newRoot;
        } else {
            oldBranch.children[0]
        }
    }
    if (Math.random() < 0.2 && oldBranch instanceof BinaryOp) {
        if (Math.random() < 0.3) {
            // replace with one of the children
            const newChild = chooseOne(oldBranch.children)!;
            if (oldBranch.parent) {
                newChild.parent = oldBranch.parent;

                oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, newChild);
                const sizeDelta = newChild.size - oldBranch.size;
                let newRoot = oldBranch as Expression;
                while (newRoot.parent) {
                    newRoot = newRoot.parent as Expression;
                    newRoot.size += sizeDelta;
                }
                return newEntity;
            } else {
                return newChild;
            }
        }
        // replace with another binary op
        const idx = BINARY_OPS.indexOf(oldBranch.constructor as any);
        const Op = chooseOne([...BINARY_OPS.slice(0, idx), ...BINARY_OPS.slice(idx + 1)])!;

        const newOp = new (Op as any)(oldBranch.children);
        if (oldBranch.parent) {
            newOp.parent = oldBranch.parent;
            oldBranch.parent.children.splice(oldBranch.parent.children.indexOf(oldBranch), 1, newOp);
            return newEntity;
        } else {
            return newOp;
        }
    }

    const newBranch = getRandomExpression(10 /* give more chance to terminals */)!;

    const parent = oldBranch.parent;
    newBranch.parent = parent;

    if (parent) {
        // replace the children of the old parent
        parent.children.splice(parent.children.indexOf(oldBranch), 1, newBranch);
    }

    // propagate size change and find root;
    const sizeDelta = newBranch.size - oldBranch.size;
    let newRoot = newBranch;
    while (newRoot.parent) {
        newRoot = newRoot.parent as Expression;
        newRoot.size += sizeDelta;
    }
    return newRoot;
}