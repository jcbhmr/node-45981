declare global {
  // @ts-ignore
  var addEventListener: EventTarget["addEventListener"];
  // @ts-ignore
  var removeEventListener: EventTarget["removeEventListener"];
  // @ts-ignore
  var dispatchEvent: EventTarget["dispatchEvent"];
}

export {};
