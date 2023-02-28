<script setup lang="ts">
import { format } from 'date-fns';
type Props = {
  modelValue: Date
}
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue'])
const date = computed({
  get: () => format(unref(props.modelValue), "yyyy-MM-dd"),
  set: (value) => emits('update:modelValue', new Date(value)),
})
</script>

<template>
  <input type="date" v-model="date">
</template>
