<script setup lang="ts">
import { format, parseISO, parse } from 'date-fns';
type Props = {
  modelValue: Date | string
}
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue'])
const date = computed({
  get: () => {
    let v = unref(props.modelValue);
    try {
      if (typeof v === 'object')
        return format(v, "yyyy-MM-dd")
      else
        return format(parse(v.toString(), "yyyy-MM-dd", new Date()), "yyyy-MM-dd")
    } catch (e) {
      console.log(v, typeof v, e)
    }
  },

  set: (value) => value && emits('update:modelValue', format(parse(value.toString(), "yyyy-MM-dd", new Date()), "yyyy-MM-dd")),
})
</script>

<template>
  <input type="date" v-model="date">
</template>
