import {BinaryOp, UnaryOp} from "./tree";

class NotOp extends UnaryOp {
    static readonly type = 'UnaryOp';

    static readonly opName = 'not';

    evaluate(env: {[key: string]: any}) {
        return !this.expr.evaluate(env);
    }

    toString() {
        return `!(${this.expr})`;
    }
}

class AndOp extends BinaryOp {
    static readonly opName = 'and';

    evaluate(env: {[key: string]: any}) {
        return !!(this.expr1.evaluate(env) && this.expr2.evaluate(env));
    }
}

class OrOp extends BinaryOp {
    static readonly opName = 'or';

    evaluate(env: {[key: string]: any}) {
        return !!(this.expr1.evaluate(env) || this.expr2.evaluate(env));
    }
}

export const BOOL_UNARY_OPS = [NotOp];
export const BOOL_BINARY_OPS: typeof BinaryOp[] = [AndOp, OrOp];


