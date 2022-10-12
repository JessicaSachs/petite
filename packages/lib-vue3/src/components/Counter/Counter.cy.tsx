import { ref } from 'vue'
import Counter from './Counter.vue'

describe('<Counter />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    const myCounter = ref(0)
    cy.mount(() => <div>{ myCounter.value }<Counter max={3} min={-1} modelValue={myCounter}></Counter></div>)
  })
})
