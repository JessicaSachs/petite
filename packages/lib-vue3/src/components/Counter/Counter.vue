<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  max: number
  min: number
}>(), { max: 10, min: 0 })

const emit = defineEmits<{
  (e: 'change', newValue: number): void
}>()

const counter = ref(0)

const increment = () => {
  if (counter.value >= props.max)
    return

  counter.value++
  emit('change', counter.value)
}

const decrement = () => {
  if (counter.value <= props.min)
    return
  counter.value--
  emit('change', counter.value)
}
</script>

<template>
  <div>
    <button @click="increment">
      +
    </button>
    <button @click="decrement">
      -
    </button>
    {{ counter }}
  </div>
</template>
