import {Expression} from "./expression";

export function fitness1(this: any, entity: any, samples = this.userData.samples) {
    let score = 0;

    for (let sample of samples) {
        score += (entity.evaluate({
            cardToPlay: sample.cardToPlay,
            discardPile: sample.discardPile
        }) === sample.playable) ? 1 : 0;
    }
    if (score / samples.length < 0.5) {
        // todo maybe sigmoid?
        score = 0.5 * samples.length; // don't give negative predicate a score that is too low
    }
    score -= (entity.size) * 0.5;
    score /= samples.length;
    return score;
}

export function fitness2(this: any, entity: Expression, samples = this.userData.samples) {
    let score = 0;

    for (let sample of samples) {
        const res = entity.evaluate({cardToPlay: sample.cardToPlay, discardPile: sample.discardPile});
        if (typeof res === 'boolean') {
            // (only score boolean results)
            score += sample.playable === res ? 1 : -1;
        }
    }

    score /= samples.length;
    if (score < 0.05) {
        score = (-score) - 0.05 // fine for being in the opposite direction (can easily be reversed with NotOp)
    }
    score -= entity.size * 0.0001; // fine for being too big
    if (score > 1) {
        debugger;
    }
    return score;
}