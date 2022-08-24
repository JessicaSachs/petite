import Counter from './Counter.vue'

describe('<Counter />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(() => (<Counter/>))
  })
})