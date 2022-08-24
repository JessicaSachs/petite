<script lang="ts" setup>
import { isVue3, ref } from 'vue-demi'

const props = withDefaults(defineProps<{
  initial?: number
}>(), { initial: 0 })

const counter = ref(props.initial)
</script>

<template>
  <div>
    IsVue3 {{ isVue3 }}
    {{ counter }}
    <button @click="counter++">
      Increment
    </button>
    <button @click="counter--">
      Decrement
    </button>
  </div>
</template>
