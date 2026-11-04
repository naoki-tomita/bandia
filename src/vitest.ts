import { vi, type Mock } from "vitest";
import { AnyFunction, FunctionExcluded, createMock } from "./core.js";

type OverrideIfFunction<T> = T extends AnyFunction ? Mock<(...args: Parameters<T>) => ReturnType<T>> : T;

export type MockedObject<T> = {
  [key in keyof T]: OverrideIfFunction<T[key]>;
};

export function mock<T extends {}>(overrideProps?: FunctionExcluded<T>): T & MockedObject<T> {
  return createMock(() => vi.fn(), overrideProps);
}
