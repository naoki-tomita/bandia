import { mock } from "..";

describe("#mock", () => {
  class A {
    method1(arg1: string, arg2: number): string { throw Error() }
    method2(): A { throw Error() }
    method3(): Promise<A> { throw Error() }
  }
  it("should create jest.fn", () => {
    const a = mock<A>();
    expect(a.method1.mockReturnValue).toBeDefined();
    expect(typeof a.method1.mockReturnValue).toBe("function");
  });

  it("should be callable", () => {
    const a = mock<A>();
    a.method1.mockReturnValue("foo");
    expect(a.method1("foo", 42)).toBe("foo");
  });

  it("should check same", () => {
    const a = mock<A>();
    const b = mock<A>();

    a.method2.mockReturnValue(b);

    const actual = a.method2();
    expect(actual).toBe(b);
    expect(actual).not.toBe(a);
    expect(actual).toEqual(b);
    expect(actual).not.toEqual(a);
  });

  it("should pass promise return value.", async () => {
    const a = mock<A>();
    const b = mock<A>();

    a.method3.mockResolvedValue(b);
    await expect(a.method3()).resolves.toEqual(b);
  });
});
