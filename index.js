"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = void 0;
const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count) {
    return Array(count).fill(null).map(() => chars[Math.round(Math.random() * chars.length)]).join("");
}
function mock(overrideProps) {
    return inner(overrideProps);
}
exports.mock = mock;
function inner(overrideProps) {
    const inner = {};
    const id = random(5);
    return new Proxy({ __id__: id }, {
        get(_, key) {
            if (key === "__id__")
                return `#${id}`;
            if (key === "then")
                return;
            if (typeof key === "symbol")
                return;
            if (key === "toString")
                return () => `mock#${id}`;
            if (key === "toJSON")
                return () => ({ id: `#${id}` });
            if (key === "_isAllArgsFunctionMatcher")
                return false;
            if (overrideProps?.[key] != null)
                return overrideProps?.[key];
            return inner[key] = inner[key] ?? jest.fn();
        }
    });
}
//# sourceMappingURL=index.js.map