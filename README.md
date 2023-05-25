# Make `globalThis` an `EventTarget`

⏰ Make the global object an `EventTarget`

<div align="center">

![](https://user-images.githubusercontent.com/61068799/240809272-045a38d6-4c79-4306-b19f-03fe6ac8ce2b.png)

</div>

📜 Implements [nodejs/node#45993] in userland \
🗣️ Discuss in [nodejs/node#45981] \
⛔ **Doesn't** add any event listeners or emitters \
🛑 Only works in Node.js

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)

You can install this package using npm, [Yarn], [pnpm], or any other Node.js
package manager that supports npm packages:

```sh
npm install @jcbhmr/node-45993
```

🛑 This package **only works in Node.js**! Other export conditions will result
in a non-existent file error:

```sh
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '***/node_modules/@jcbhmr/node-45993/DNE'
    at ... {
  code: 'ERR_MODULE_NOT_FOUND'
}
```

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)

All you need to do is import this polyfill in your app, and you're good to go!
😊 You can also use the [`--import=module`] CLI flag if you want to keep it out
of you main app code and apply it manually at runtime.

⚠️ Be warned that this is an **unconditional polyfill** that will **always**
reset the prototype of `globalThis` to `EventTarget`, even if it already is!

```js
// Make sure you gate it behind a conditional!
if (!(globalThis instanceof EventTarget) && typeof process !== "undefined") {
  await import("@jcbhmr/node-45993");
}

globalThis.addEventListener("hello", (event) => {
  console.log(event.detail);
});

const event = new CustomEvent("hello", { detail: "world" });
globalThis.dispatchEvent(event);
//=> 'world'
```

This polyfill reimplements the native code from [nodejs/node#45993] in userland
code. It's not a very large module, but it's a module designed to compose well
with other spec-related polyfills that need to emit global events.

## Development

![JavaScript](https://img.shields.io/static/v1?style=for-the-badge&message=JavaScript&color=222222&logo=JavaScript&logoColor=F7DF1E&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)

This package uses plain JavaScript with a `.d.ts` file to attempt to conform as
much as possible to [nodejs/node#45993]. We don't even typecheck! 😨

You can get started by cloning this repo and running `npm install`. From there,
just run `npm start` or `npm test` and you're on your way! 🚀

```sh
npm start
```

**What's in the name?** This is an as-close-as-possible implementation of
[nodejs/node#45993], so it made sense to follow the `${spec}-${section}` style
naming convention, just with "node" being a spec now. 😁

❤️ Make sure to deprecate this package if [nodejs/node#45993] is ever merged!

[Yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[nodejs/node#45981]: https://github.com/nodejs/node/issues/45981
[nodejs/node#45993]: https://github.com/nodejs/node/pull/45993
[`--import=module`]: https://nodejs.org/api/cli.html#--importmodule
