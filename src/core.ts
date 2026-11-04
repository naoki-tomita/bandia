const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count: number) {
  return Array(count).fill(null).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export type AnyFunction = (...args: any[]) => any;

export type FunctionExcluded<T> = { [key in keyof T]?: T[key] extends AnyFunction ? never : T[key] };

/**
 * Creates a mock object whose function properties are created lazily by `createFn`.
 * Test-runner specific entry points (jest / vitest) pass their own mock function factory.
 */
export function createMock(createFn: () => AnyFunction, overrideProps?: { [key: string]: unknown }): any {
  const fns: { [key: string]: AnyFunction } = {};
  const id = random(5);
  return new Proxy({ __id__: id }, {
    get(_, key) {
      if (key === "__id__") return `#${id}`;
      if (key === "then") return;
      if (typeof key === "symbol") return;
      if (key === "toString") return () => `mock#${id}`;
      if (key === "toJSON") return () => ({ id: `#${id}` });
      if (key === "_isAllArgsFunctionMatcher") return false;
      if (overrideProps?.[key] != null) return overrideProps[key];
      return fns[key] = fns[key] ?? createFn();
    }
  });
}
