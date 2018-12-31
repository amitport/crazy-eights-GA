export function times(max: number) {
  return {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < max; i++, yield) {
      }
    }
  };
}

export function shuffle<T>(a: ReadonlyArray<T>) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return Object.freeze(b);
}

export function chooseOne<T>(a: T[] | ReadonlyArray<T>): T | undefined {
  if (a.length !== 0) {
    return a.length === 1 ? a[0] : a[Math.floor(Math.random() * a.length)];
  }
}
