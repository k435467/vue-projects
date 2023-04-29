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

## My Note

1. Q: Url alias. A: Modify the `vite.config.ts`, `tsconfig.json`. [article](https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo)
2. Q: Data normailzation. A: Use the lib recommended by redux. [redux doc](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape#normalizing-nested-data). [normalizr](https://github.com/paularmstrong/normalizr/tree/master/docs)
3. Q: Import interface. A: Use the Type-Only Imports and Export syntax. [vite doc](https://vitejs.dev/guide/features.html#transpile-only)
4. Q: Type annotation on event handler. A: Type casting. [stackoverflow](https://stackoverflow.com/questions/67434135/vue-3-typescript-warning-on-vue-emit-and-event-object-is-possibly-null)
5. Q: Preserve display settings on page reload. A: Use query string.
6. Q: Pass a reactive variable as a prop to a child, then use it with v-model to a custom component in child. Needs toRefs() and revise custom v-model. Or gets a type error. A: Use provide/inject.
7. Q: Router catch all. A: Using a parameter with a custom regex. [vue router doc](https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes)
8. Q: Tell if the device is mobile or not. A: use vue-screen. [vue screen](https://reegodev.github.io/vue-screen/guide/getting-started.html#composition-api)
9. Q: The `route.query` is async updated. May gets an incorrect value and triggers a unwanted request when the initial load. Requests triggered too close together can also cause problems. A: If the previous request is not completed and a new request comes, cancel the previous request. [stackoverflow about route.query](https://stackoverflow.com/questions/66683113/route-query-is-undefined-when-using-useroute-in-setup-for-vue3-and-vue-route). [axios cancellation](https://axios-http.com/docs/cancellation).
