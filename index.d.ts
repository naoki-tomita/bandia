/// <reference types="jest" />
type OverrideIfFunction<T> = T extends (...args: any[]) => any ? jest.Mock<ReturnType<T>, Parameters<T>> : T;
type FunctionExcluded<T> = {
    [key in keyof T]?: T[key] extends (...args: any[]) => any ? never : T[key];
};
type MockedObject<T> = {
    [key in keyof T]: OverrideIfFunction<T[key]>;
};
export declare function mock<T extends {}>(overrideProps?: FunctionExcluded<T>): T & MockedObject<T>;
export {};
//# sourceMappingURL=index.d.ts.map