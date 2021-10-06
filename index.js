"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = void 0;
const chars = "abcdefghijklmnopqrstuvwxyz";
function random(count) {
    return Array(count).fill(null).map(() => chars[Math.round(Math.random() * chars.length)]).join("");
}
function mock() {
    return inner();
}
exports.mock = mock;
function inner() {
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
            return inner[key] = inner[key] ?? jest.fn();
        }
    });
}
//# sourceMappingURL=index.js.map