import { Expression } from './expression';
import { randomClause } from './clause';

class NotOp extends Expression {
    static readonly arity = 1;

    evaluate(env: {[key: string]: any}) {
        return !this.children[0].evaluate(env);
    }

    toString() {
        return `¬(${this.children[0]})`;
    }
}

class AndOp extends Expression {
    static readonly arity = 2;

    evaluate(env: {[key: string]: any}) {
        return !!(this.children[0].evaluate(env) && this.children[1].evaluate(env));
    }

    toString() {
        return `(${this.children[0]} ∧ ${this.children[1]})`;
    }
}

class OrOp extends Expression {
    static readonly arity = 2;

    evaluate(env: {[key: string]: any}) {
        return !!(this.children[0].evaluate(env) || this.children[1].evaluate(env));
    }

    toString() {
        return `(${this.children[0]} ∨ ${this.children[1]})`;
    }
}


const x = new OrOp([randomClause(), randomClause()])
console.log(x, x.toString());