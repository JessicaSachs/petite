# Petite ✌️

Petite is an opinionated GitHub template built for Vue component authors. It sets up the tooling required to develop, document, and test **Universal SFC Components** that are backwards-compatible with the Vue 2.7 runtime.

This is accomplished with some runtime helpers and a very opinionated monorepo structure.

Petite sets up [Vite](https://vitejs.dev), Volar, Linting, Vitepress, TypeScript, and Testing so that you can choose to write Vue 3-style code while easily maintaining backwards compatibility for your Vue 2.x users. 👏👏

## Why Petite?

It is possible to write universal Vue SFC components that work for Vue 2 and Vue 3; however, setting up the tooling required to develop, lint, compile, test, and deploy these libraries can be painful and there are often conflicts between versions.

Most Vue library authors:

1. Use vue-demi for headless components
2. Only choose Vue 3 when writing renderable components
3. Painstakingly backport Vue 3 features to Vue 2 user

Petite gives you a GitHub template that works out-of-the-box with all of the modern tooling you'd like to use, and asks you to make few concessions on how you write your code.

## Getting Started

1. Grab Petite, either via GitHub's "Use Template" button or `degit`.

```sh
npx degit JessicaSachs/petite your-project-name
```

2. Install pnpm if you don't have it.
3. `pnpm install`
4. Change all references to `@petite/lib-vue2` and `@petite/lib-vue3` to your library's name.
5. Optionally rename the folders, as well.

## Development

I recommend you develop in Vue 3, because HMR is less likely to have issues. Periodically use Volar, linting, or Cypress to check that you're not breaking Vue 2.

```sh
pnpm dev:3
```

Vite suggests that library authors re-use their `index.html` as a sort of playground and ship that as a website. This can be helpful for getting started, but it's sometimes not enough.

Petite has a couple of tools that it ships with that can help library authors develop quickly and deliver well-tested libraries.

1. [Component-driven development](https://on.cypress.io/component) with Cypress.
1. Docs-driven development with Vitepress.
1. Vite's own `index.html`, which can then be [End-to-end](#end-to-end-testing) tested.

### Reactivity Caveats

When writing Universal SFC Components, any reactivity caveats to objects and arrays will still apply. Please ensure that you abide by the rules in the [Reactivity section](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) of the Vue 2 docs.

## Linting

Petite ships with Antfu's eslint config (no-semis, trailing commas) and prettier.

- Lints on save (VSCode)
- Lints markdown, tsx, vue, ts, and more.
- Lints before commit using `lint-staged` and `simple-git-hooks`

## Package Deployment

Rather than break on a major version to support Vue 2 or Vue 3, you will ship two versions of your package on npm.

The downside of this is that your users will need to install a new version when they upgrade and change their imports. The upside is that it is much easier for you to write backwards compatible code and provide regular upgrades for your users. Additionally, you are able to split out your Vue 2-only and Vue 3-only dependencies.

If you use `lodash` in your universal code, you'll want to

After you run `pnpm build` in the workspace root, each package (`lib-vue3`, `lib-vue2`) should be deployed independently.

## Styles

Petite supports both Atomic CSS frameworks such as UnoCSS, Tailwind, and WindiCSS. It comes with UnoCSS and a style reset.

### Vanilla CSS

Petite comes with `sass` installed and will export your styles, minified, to `dist/styles.css` for your users to manually install at the top of their `main.ts`.

### Atomic CSS

If you prefer an atomic style framework, such as [UnoCSS](https://github.com/unocss/unocss) or [Tailwind](https://tailwindcss.com/docs/guides/vite)... you're in luck!

Petite supports these as normal Vite plugins. Just add their relevant configurations to `vite.config.shared.ts` at the root of the workspace using `pnpm install unocss -D -w` (or the Tailwind equivalent) and then follow the setup instructions.

#### Style Limitations

Petite provides no ability to extend the themes of your Atomic CSS libraries. This is out-of-scope for Petite, whose purpose is to give you a build configuration that will give you an environment to build + test + publish Vue 2 + Vue 3 compatible libraries.

If you would like to provide your users with the ability to extend your CSS either at runtime or build time, consider using vanilla CSS variables or other runtime solutions.

## Testing

Petite ships with Unit Testing via Vitest and Component Testing via Cypress. Both of them re-use your Vite config and Vite dev server.

### Unit Testing

In any of the libraries, or the workspace root you are able to run a test command. Simply append `--watch` if you'd like to re-run your tests on change.

```sh
pnpm test:unit
```

Unit testing support is provided by [Vitest](https://vitest.dev) and, like Cypress, will re-use each application's build configuration. This means that if you do something that would break Vue 2 or Vue 3 only, your tests will catch it.

### Component Testing

Petite's development ethos is centered around the belief that library code should be developed in the environment that users will consume it in. For components that render, Petite uses Cypress Component Testing.

Cypress is a thorough way to accomplish component testing and isolated component development in one tool.

**TODO:** Petite aspires to use [Histoire](https://histoire.dev) which you could use as an isolated sandbox and then point an end-to-end testing tool at. Histoire is a Vite-based Storybook replacement and is developed by Vue Core Team Member, [Akyrum](https://github.com/akryum).

### End-to-end Testing

This is not implemented. If your library requires a lot of app-level dependencies or setup before users can use your library, you may consider writing End-to-end tests that test the integration of your user's JS, any HTML, and any styles you expect them to write before loading and using your library code.

Cypress is already installed and has linting and types already set up, however you'll have to start and run an example playground app yourself.

Here are some approaches to end-to-end testing your library code.

#### Quick: Sanity check one version of Vue

1. Run `pnpm build`
1. Use Vite's `index.html` and import the files directly using module syntax
1. Run Cypress to test the example usage

```html
<!-- index.html -->
<html>
  <body>
    <div id="vue3" />
  </body>
  <script type="module">
    // import Vue@2.6, Vue@2.7, or Vue@3 from jsdelivr or your own local dependencies
    // Alias Vue 3, Vue 2.6, and Vue 2.7 in your root package.json
    import { createApp } from "vue3";

    import "./packages/lib-vue3/dist/style.css";

    const Petite = await import("./packages/lib-vue3/dist/main.ts");
    const { Counter } = Petite;
    createApp(Counter).mount("#app");
  </script>
</html>
```

#### Robust: Scaffold user applications and test against them

A more complex integration testing architecture allows you to test that any integrated Vite changes are working as expected. E.g. if you're writing a Vite plugin with virtual modules, etc... this is a viable strategy.

**Create the test applications**

1. Create test workspaces with their own Vite config files
1. Create fully-formed applications within them
1. Use [pnpm's `workspace` notation](https://pnpm.io/workspaces) to import the package's dist'd files.

**Run your E2E tests**
At the workspace root...

1. Run `pnpm build` at the workspace root
1. Start up each workspace's Vite server (`vite preview` or `vite dev`)
1. Once the server is started, begin executing your End-to-end tests.

## Docs

Petite uses [Vitepress](https://vitepress.vuejs.org/) for its documentation. All good libraries have documentation.

```sh
pnpm dev:docs
```

## Thanks

Inspired by the following repositories:

- [Vitesse](https://github.com/antfu/vitesse)
- [VueUse](https://github.com/vueuse/vueuse)
- [Vue Bridge](https://github.com/vue-bridge/vue-bridge)

Big thanks to Anthony Fu ([@antfu](https://github.com/antfu)) for the templates and resources and Thorsten Lünborg ([@LinusBorg](https://github.com/linusborg)) for answering questions and walking me through [Vue Bridge](https://github.com/vue-bridge/vue-bridge).
