"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = void 0;
var chars = "abcdefghijklmnopqrstuvwxyz";
function random(count) {
    return Array(count).fill(null).map(function () { return chars[Math.round(Math.random() * chars.length)]; }).join("");
}
function mock() {
    return inner();
}
exports.mock = mock;
function inner() {
    var inner = {};
    var id = random(5);
    return new Proxy({ __id__: id }, {
        get: function (_, key) {
            var _a;
            if (key === "__id__")
                return "#" + id;
            if (key === "then")
                return;
            if (typeof key === "symbol")
                return;
            if (key === "toString")
                return function () { return "mock#" + id; };
            if (key === "toJSON")
                return function () { return JSON.stringify({ id: "#" + id }); };
            return inner[key] = (_a = inner[key]) !== null && _a !== void 0 ? _a : jest.fn();
        }
    });
}
//# sourceMappingURL=index.js.map