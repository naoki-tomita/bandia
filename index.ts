const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count: number) {
  return Array(count).fill(null).map(() => chars[Math.round(Math.random() * chars.length)]).join("");
}

export function mock<T extends {}>() {
  return inner<T>();
}

function inner<T extends { [key: string]: (...args: any) => any }>() {
  const inner: { [key in string | number]: jest.Mock } = {};
  const id = random(5)
  return new Proxy({ __id__: id } as unknown as T & {[key in keyof T]: jest.Mock<ReturnType<T[key]>, Parameters<T[key]>>}, {
    get(_, key) {
      if (key === "__id__") return `#${id}`;
      if (key === "then") return;
      if (typeof key === "symbol") return;
      if (key === "toString") return () => `mock#${id}`;
      if (key === "toJSON") return () => JSON.stringify({ id: `#${id}` });
      return inner[key] = inner[key] ?? jest.fn();
    }
  });
}
