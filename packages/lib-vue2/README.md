# Vue 2 Compat Build Package

This package is the Vue 2 version of your library. It can

- test
- build
- publish

the code symlinked from `/lib-vue3/src` as a Vue 2 plugin library.

## Things to be aware of.

- The src folder is just a symlink to `/lib-vue3/src`. So both packages share the same source.
- You need to synchronize the dependencies between both packages. if you add a new dependency to `/lib-vue3`, you likely also want to install it here. pnpm can help doing that in a single command: running i.e. `pnpm add lodash-es --filter="example-*"` in the project root will add the package `lodash-es` as a dependencies to both `/lib-vue2` and `/lib-vue3` packages, as their package names both start with `example-*`.

## Alternative Publishing Strategy

This template is preconfigured to publish the Vue 2 and Vue 3 versions in individual packages. This is generally the recommended approach so you don't have to mix dependencies for Vue 2 and Vue 3 in package.json.

However, you can alternatively decide to publish just one package, including both the Vue 2 and Vue 3 bundles. Just be aware that you might encounter trouble if you need different versions of a dependency for each version.

Here's what you would have to change for that:

### `/lib-vue2/package.json`

- give a distinct name
- make it private so it won't be published.
- Optionally remove module exports & entry points

```diff
{
 "name": "some-name-different-from-lib-vue3",
+ "private": "false",
 "type": "module",
- "main": "dist/index.cjs.cjs",
- "module": "dist/index.es.js",
- "typings": "index.vue2.d.ts",
-  "exports": {
-    ".": {
--      "script": "dist/index.iife.js",
-      "import": "dist/index.es.js",
-      "require": "dist/index.cjs.cjs"
-    },
-  },
-  "files": [
-    "dist",
-    "src",
-    "index.vue2.d.ts",
-    "README.md",
-  ]
}
```

### `/lib-vue2/vite.config.ts`

change build output to `../lib-vue3/dist`:

```diff
// ...
  build: buildConfig({
-    outDir: "./dist",
+    outDir: "../lib-vue3/dist-vue2",
  }),
//...
```

### Setup src folder

Right now, `/lib-vue2` is a symlink to `/lib-vue3/src`. For types, we need to publish the src folder with out package, not just a symlink. so instead, we need an actual copy of the source folder

1. Remove symlink - just delete the `/lib-vue2/src` folder.
2. install `rimraf` && `cpy-cli`

```bash
# in /lib-vue2
pnpm add -D cpy-cli
```

3. Adjust these scripts in package.json - we don't need the copy script anymore:

```diff
"script": {
  "dev": "vite build --watch",
-  "build": "pnpm prepare-src && copy-src",
+  "build": "vite build",
-  "copy-src: "cpy ../lib-vue3/src/* ./dist/src/"
   # ....
}
```

### `index.vue2.d.ts`

Move `/lib-vue2/index.d.ts` to `/lib-vue3/index.vue2.d.ts` and make it export the src directory there.

## module exports in `/lib-vue3`

```json
{
  "main": "dist/index.cjs.cjs",
  "module": "dist/index.es.js",
  "jsdelivr": "dist/index.iife.js",
  "unpkg": "dist/index.iife.js",
  "typings": "./typings/main.d.ts",
  "exports": {
    ".": {
      "types": "./typings/main.d.ts",
      "script": "./dist/index.iife.js",
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.cjs",
      "default": "./dist/index.es.js"
    },
    "./vue3": {
      "types": "./typings/main.d.ts",
      "script": "./dist/index.iife.js",
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.cjs",
      "default": "./dist/index.es.js"
    },
    "./vue2": {
      "types": "./index.vue2.d.ts",
      "script": "./dist-vue2/index.iife.js",
      "import": "./dist-vue2/index.es.js",
      "require": "./dist-vue2/index.cjs.cjs",
      "default": "./dist-vue2/index.es.js"
    },
    "./style.css": "./dist/style.css",
    "./src/": "./src/",
    "./package.json": "./package.json"
  }
}
```

### That's it!

Now you can run `pnpm release` and pnpm will test, build and publish both version in one package!
