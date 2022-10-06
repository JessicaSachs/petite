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
  <div class="font-sans border-1 rounded m-2 items-center justify-center gap-12px text-gray-800 children:text-2xl text-2xl inline-flex min-w-120px">
    <button class="i-carbon-add icon-btn" @click="increment" />
    {{ counter }}
    <button class="i-carbon-subtract icon-btn" @click="decrement" />
  </div>
</template>
