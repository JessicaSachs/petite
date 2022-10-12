<script setup lang="ts">
const props = defineModel<{
  modelValue: number
  min: number
  max: number
}>()

const modelValue = props.modelValue

const increment = () => {
  if (modelValue.value >= props.max)
    return

  modelValue.value++
}

const decrement = () => {
  if (modelValue.value <= props.min)
    return
  modelValue.value--
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
    {{ modelValue }}
  </div>
</template>
