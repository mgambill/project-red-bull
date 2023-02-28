import { useLocalStorage } from "@vueuse/core"



export const useCounterStore = defineStore('counter', () => {
  const state = useLocalStorage('tasks-board', { tasks: [], assignees: [], statuses: [] })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
