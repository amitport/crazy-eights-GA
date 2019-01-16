import {BinaryOp, Terminal, UnaryOp} from './expression';
import * as util from 'util';

export class Literal extends Terminal {
    constructor(public value: any) {
        super();
    }

    evaluate(env: { [key: string]: any }) {
        return this.value;
    }

    toString() {
        return this.value.hasOwnProperty('id') ? this.value.id : this.value.toString();
    }

    [util.inspect.custom]() {
        return `Literal[${this.value.toString()}]`;
    }

    clone() {
        return new Literal(this.value);
    }
}

export class Variable extends Terminal {

    constructor(public key: any) {
        super()
    }

    evaluate(env: { [key: string]: any }) {
        return env[this.key];
    }

    toString() {
        return this.key;
    }

    [util.inspect.custom]() {
        return `Var[${this.key}]`;
    }

    clone() {
        return new Variable(this.key);
    }
}

// accessors
abstract class AccessorOp extends UnaryOp {
    static readonly type = 'PropertyOp';

    static readonly opName: string;
    ['constructor']: typeof AccessorOp;

    evaluate(env: { [key: string]: any }) {
        const targetOpt = this.children[0].evaluate(env);
        if (targetOpt) {
            return targetOpt[this.constructor.opName];
        }
    }

    toString() {
        return `${this.children[0]}.${this.constructor.opName}`;
    }
}

export class RankOp extends AccessorOp {
    static readonly opName = 'rank';
}

export class SuitOp extends AccessorOp {
    static readonly opName = 'suit';
}

export class ColorOp extends AccessorOp {
    static readonly opName = 'color';
}


// predicates
export class IsEmptyOp extends UnaryOp {
    static readonly opName = 'isEmpty';

    evaluate(env: { [key: string]: any }) {
        const arr = this.children[0].evaluate(env);
        if (Array.isArray(arr)) { // todo enough to check (arr)
            return arr.length === 0;
        }
    }
}

export class IsNotEmptyOp extends UnaryOp {
    static readonly opName = 'isNotEmpty';

    evaluate(env: { [key: string]: any }) {
        const arr = this.children[0].evaluate(env);
        if (Array.isArray(arr)) {
            return arr.length !== 0;
        }
    }
}


// comparisons
export class EqOp extends BinaryOp {
    static readonly opName = '=';

    evaluate(env: { [key: string]: any }) {
        return this.children[0].evaluate(env) === this.children[1].evaluate(env);
    }
}

export class NotEqOp extends BinaryOp {
    static readonly opName = '≠';

    evaluate(env: { [key: string]: any }) {
        return this.children[0].evaluate(env) !== this.children[1].evaluate(env);
    }
}
