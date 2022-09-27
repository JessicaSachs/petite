/**
 * Set up any app code that should run once per file for the
 * Vue 3 app. For example, the mount command for Cypress is different
 * because it imports a Vue 3-only version of Vue Test Utils.
 *
 * Common code should be imported from the root of the project.
 */

import { mount } from 'cypress/vue'
import '../../../../cypress/support/component.shared'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: (renderFn: () => JSX.Element) => Cypress.Chainable<AUTWindow>
    }
  }
}

/**
 * Example usage of cy.mount can be found at https://on.cypress.io/component
 * We prefer to use JSX syntax which looks like this:
 *
 * cy.mount(() => <MyComponent myProp={someVariable}/>)
 */

Cypress.Commands.add('mount', (renderFn) => {
  return mount(renderFn)
})
