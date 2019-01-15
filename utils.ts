export function chooseOne<T>(a: T[] | ReadonlyArray<T>): T  {
    return a.length === 1 ? a[0] : a[Math.floor(Math.random() * a.length)];
}
