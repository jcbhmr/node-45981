function safeThis(f) {
  function g() {
    return f.call(this ?? globalThis, ...arguments);
  }
  Object.defineProperty(g, "name", { value: f.name, configurable: true });
  Object.defineProperty(g, "length", { value: f.length, configurable: true });
  return g;
}

for (const key of Reflect.ownKeys(EventTarget.prototype)) {
  if (key === "constructor") {
    continue;
  }

  const d = Object.getOwnPropertyDescriptor(EventTarget.prototype, key);
  if ("value" in d) {
    d.value = safeThis(d.value);
  } else {
    if (d.get) {
      d.get = safeThis(d.get);
    }
    if (d.set) {
      d.set = safeThis(d.set);
    }
  }
  Object.defineProperty(EventTarget.prototype, key, d);
}

function initEventTarget(target) {
  Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(new EventTarget())
  );
}

function setGlobalThisPrototype() {
  initEventTarget(globalThis);
  Object.setPrototypeOf(globalThis, EventTarget.prototype);
}

setGlobalThisPrototype();

export {};
