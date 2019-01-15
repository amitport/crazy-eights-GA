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

  clone(): any {
    return new Tree(this.content, this.children.map(_ => _.clone()))
  }
}

// todo make this a tree
export abstract class Expression extends Tree {
    abstract evaluate(env: {[key: string]: any}): any;
}

abstract class Op extends Expression {
    protected static opName: string;
    ['constructor']: typeof Op;
}

export abstract class UnaryOp extends Op {
    get expr() {return this.children[0] as Expression;}

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(expr: Expression) {
        super(new.target, [expr]);
    }

    toString() {
        return `${this.constructor.opName}(${this.expr})`;
    }

    clone() {
        return new this.content(this.expr.clone());
    }
}

export abstract class BinaryOp extends Op {
    static readonly type = 'BinaryOp';

    get expr1() {return this.children[0] as Expression;}
    get expr2() {return this.children[1] as Expression;}

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(expr1: Expression, expr2: Expression) {
        super(new.target, [expr1, expr2]);
    }

    toString() {
        return `(${this.expr1} ${this.constructor.opName} ${this.expr2})`;
    }

    clone() {
        return new this.content(this.expr1.clone(), this.expr2.clone());
    }
}
