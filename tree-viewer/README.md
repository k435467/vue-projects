## Get Started

First, install deps.

```shell
npm i
# or
yarn
```

Starts the dev server.

```shell
npm run dev
# or
yarn dev
```

Then see the result on browser. [open](http://127.0.0.1:5173/)

## My Notes

1. Q: Recursive component. A: Directly use the named component. [stackoverflow](https://stackoverflow.com/questions/73219106/recursion-in-single-file-components-vue-js-3)
2. Q: Key-value pair don't have a unique key for `:key`. A: Use uuid lib. [uuid](https://www.npmjs.com/package/uuid)
3. Q: Conversion from key-value pairs to an object. A: Set the keys on an empty object, then set the values.
