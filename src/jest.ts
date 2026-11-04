/// <reference types="jest" />
import { AnyFunction, FunctionExcluded, createMock } from "./core.js";

type OverrideIfFunction<T> = T extends AnyFunction ? jest.Mock<ReturnType<T>, Parameters<T>> : T;

export type MockedObject<T> = {
  [key in keyof T]: OverrideIfFunction<T[key]>;
};

export function mock<T extends {}>(overrideProps?: FunctionExcluded<T>): T & MockedObject<T> {
  return createMock(() => jest.fn(), overrideProps);
}
