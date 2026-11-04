[![Node.js CI](https://github.com/naoki-tomita/bandia/actions/workflows/node.js.yml/badge.svg)](https://github.com/naoki-tomita/bandia/actions/workflows/node.js.yml)

# bandia
Create mock object for Jest and Vitest.

## install

```sh
npm install -D @kojiro.ueda/bandia
```

`jest` or `vitest` is an optional peer dependency. Install the one you use.

## how to use

### Jest

```typescript
import { mock } from "@kojiro.ueda/bandia";
// or explicitly
// import { mock } from "@kojiro.ueda/bandia/jest";

class Test {
  method1() {
    return true;
  }
}

describe("test", () => {
  it("should mocked", () => {
    const instance = mock<Test>();
    instance.method1.mockReturnValueOnce(false);

    expect(instance.method1()).toBe(false);
  });
});
```

### Vitest

```typescript
import { describe, it, expect } from "vitest";
import { mock } from "@kojiro.ueda/bandia/vitest";

class Test {
  method1() {
    return true;
  }
}

describe("test", () => {
  it("should mocked", () => {
    const instance = mock<Test>();
    instance.method1.mockReturnValueOnce(false);

    expect(instance.method1()).toBe(false);
  });
});
```

`@kojiro.ueda/bandia/vitest` is ESM only (as Vitest itself is).

### Override properties

Non-function properties can be overridden.

```typescript
const instance = mock<Test>({ prop: 42 });
expect(instance.prop).toBe(42);
```
