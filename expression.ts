export abstract class Expression {
    static arity: number;

    public parent?: Expression;
    public size = 1;

    constructor(
        public children: Expression[] = [],
    ) {
        if (children.length != new.target.arity) {
            throw Error(`expected arity of ${new.target.arity}, got ${children.length}`);
        }
        for (const child of this.children) {
            child.parent = this;
            this.size += child.size;
        }
    }

    abstract evaluate(env: { [key: string]: any }): any;

    clone(): Expression {
        // @ts-ignore
        return new this.constructor(this.children.map(_ => _.clone()))
    }
}

