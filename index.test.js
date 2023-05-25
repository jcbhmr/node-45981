import test from "node:test";
import assert from "node:assert";
import "./index.js";

test("explicit this listen and dispatch", () => {
  let i = 0;
  const f = () => i++;
  globalThis.addEventListener("test", f);
  globalThis.dispatchEvent(new Event("test"));
  globalThis.removeEventListener("test", f);
  assert.strictEqual(i, 1);
});

test("implicit this listen and dispatch", () => {
  let i = 0;
  const f = () => i++;
  addEventListener("test", f);
  dispatchEvent(new Event("test"));
  removeEventListener("test", f);
  assert.strictEqual(i, 1);
});
