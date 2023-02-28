import type { Project } from "@/types";
import type { Ref } from "vue";
import { add, getWeek, differenceInCalendarWeeks } from "date-fns";

export function defineProject(options?: Partial<Project>) {
  options ??= {}
  let defaults = {
    startDate : new Date(),
    endDateOffset : { months: 9 }
  }

  const startDate = ref(options.startDate ?? defaults.startDate)
  const endDate = ref(options.endDate ?? add(startDate.value, defaults.endDateOffset))
  const startWeek = computed(()=> getWeek(startDate.value))
  const totalWeeks = computed(() => differenceInCalendarWeeks (endDate.value, startDate.value))

  return {
    startDate,
    endDate,
    startWeek,
    totalWeeks
  }
}