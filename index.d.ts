/// <reference types="jest" />
type OverrideIfFunction<T> = T extends (...args: any[]) => any ? jest.Mock<ReturnType<T>, Parameters<T>> : T;
type MockedObject<T> = {
    [key in keyof T]: OverrideIfFunction<T[key]>;
};
export declare function mock<T extends {}>(): T & MockedObject<T>;
export {};
//# sourceMappingURL=index.d.ts.map