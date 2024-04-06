const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count: number) {
  return Array(count).fill(null).map(() => chars[Math.round(Math.random() * chars.length)]).join("");
}

type OverrideIfFunction<T> = T extends (...args: any[]) => any ? jest.Mock<ReturnType<T>, Parameters<T>> : T

type MockedObject<T> = {
  [key in keyof T]: OverrideIfFunction<T[key]>;
}

export function mock<T extends {}>(overrideProps?: { [key in keyof T]?: T[key] }): T & MockedObject<T> {
  return inner<T>(overrideProps);
}

function inner<T extends { [key: string]: (...args: any) => any }>(overrideProps?: { [key in keyof T]?: T[key] }) {
  const inner: { [key in string | number]: jest.Mock } = {};
  const id = random(5);
  return new Proxy({ __id__: id } as unknown as (T & MockedObject<T>), {
    get(_, key) {
      if (key === "__id__") return `#${id}`;
      if (key === "then") return;
      if (typeof key === "symbol") return;
      if (key === "toString") return () => `mock#${id}`;
      if (key === "toJSON") return () => ({ id: `#${id}` });
      if (key === "_isAllArgsFunctionMatcher") return false;
      if (overrideProps?.[key] != null) return overrideProps?.[key];
      return inner[key] = inner[key] ?? jest.fn();
    }
  });
}
