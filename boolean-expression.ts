import {BinaryOp, UnaryOp} from './expression';

export class NotOp extends UnaryOp {
    static readonly opName = '¬';

    evaluate(env: { [key: string]: any }) {
        return !this.children[0].evaluate(env);
    }
}

export class AndOp extends BinaryOp {
    static readonly opName = '∧';

    evaluate(env: { [key: string]: any }) {
        return !!(this.children[0].evaluate(env) && this.children[1].evaluate(env));
    }
}

export class OrOp extends BinaryOp {
    static readonly opName = '∨';

    evaluate(env: {[key: string]: any}) {
        return !!(this.children[0].evaluate(env) || this.children[1].evaluate(env));
    }
}

