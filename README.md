[![Node.js CI](https://github.com/naoki-tomita/bandia/actions/workflows/node.js.yml/badge.svg)](https://github.com/naoki-tomita/bandia/actions/workflows/node.js.yml)

# bandia
Create mock object for Jest.

## how to use

```typescript
import { mock } from "@kojiro.ueda/bandia";

class Test {
  method1() {
    return true;
  }
}

describe("test", () => {
  it("should mocked", () => {
    const instance = mock<Test>();
    instance.method1.mockReturnValueOnce(false);
    
    expect(instance.method()).toBe(false);
  });
});
```
