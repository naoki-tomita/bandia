/// <reference types="jest" />
export declare function mock<T extends {}>(): T & { [key in keyof T]: jest.Mock<ReturnType<T[key]>, Parameters<T[key]>>; };
//# sourceMappingURL=index.d.ts.map