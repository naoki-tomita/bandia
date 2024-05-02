import { mock } from "..";

describe("#mock", () => {
  class A {
    constructor(readonly prop: number, readonly child: A) {}
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

  it("should get overrided value", async () => {
    const b = mock<A>({ prop: 40 });
    const a = mock<A>({ prop: 30, child: b });
    expect(a.prop).toBe(30);
    expect(a.child).toBe(b);
  });

  it("should mock function that named as 'get'", () => {
    class B {
      get(): string { throw Error() }
    }
    const b = mock<B>();
    b.get.mockReturnValue("foo");
    expect(b.get()).toBe("foo");
  });
});
