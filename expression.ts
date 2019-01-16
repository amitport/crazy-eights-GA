export abstract class Expression {
    static arity: number;

    public parent?: Expression;
    public size = 1;
    ['constructor']: typeof Expression;

    constructor(
        public children: Expression[] = [],
        public t?: any,
    ) {
        if (Array.isArray(this.children[0])) {
            debugger;
        }
        if (!Array.isArray(this.children)) {
            debugger;
        }
        if (this.t != null) {
            debugger;
        }
        if (children.length != new.target.arity) {
            throw Error(`expected arity of ${new.target.arity}, got ${children.length}`);
        }
        for (const child of this.children) {
            if (child == null) {
                debugger;
            }
            child.parent = this;
            this.size += child.size;
        }
    }

    abstract evaluate(env: { [key: string]: any }): any;

    clone(): Expression {
        // debugger;

        // @ts-ignore
        return new this.constructor(this.children.map(_ => _.clone()))
    }

    // select subtree at a given index (post-order)
    // @ts-ignore
    getSubExpressionAtIndex(index: number): Expression {
        if (index === this.size - 1) {
            return this;
        }
        let accSize = 0;
        for (const child of this.children) {
            if (index < accSize + child.size) {
                return child.getSubExpressionAtIndex(index - accSize);
            }
            accSize += child.size;
        }
    }

    getRandomSubExpression(): any {
        return this.getSubExpressionAtIndex(Math.floor(Math.random() * this.size));
    }
}

abstract class Op extends Expression {
    protected static opName: string;
    ['constructor']: typeof Op;
}

export abstract class UnaryOp extends Op {
    static readonly type: string = 'UnaryOp';
    static readonly arity = 1;

    toString() {
        return `${this.constructor.opName}(${this.children[0]})`;
    }
}

export abstract class BinaryOp extends Op {
    static readonly arity = 2;
    static readonly type = 'BinaryOp';

    toString() {
        return `(${this.children[0]} ${this.constructor.opName} ${this.children[1]})`;
    }
}

export abstract class Terminal extends Expression {
    static readonly arity = 0;

    readonly type = 'Terminal';
}


