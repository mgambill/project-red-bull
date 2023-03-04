<script setup lang="ts">
import type { User } from '@/types';
import { format, add, getWeek, differenceInCalendarWeeks, startOfWeek as fn_startOfWeek, endOfWeek as fn_endOfWeek, differenceInBusinessDays } from 'date-fns';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize()
const options = {
  startDate: null,
  endDate: null
}
const defaults = {
  startDate: new Date(),
  endDateOffset: { months: 2 }
}
const startDate = ref(options.startDate ?? defaults.startDate)
const startOfWeek = computed(() => fn_startOfWeek(startDate.value))
const endOfWeek = computed(() => fn_endOfWeek(startDate.value))
const endDate = ref(options.endDate ?? add(startDate.value, defaults.endDateOffset))
const startWeek = computed(() => getWeek(startDate.value))
const totalWeeks = computed(() => differenceInCalendarWeeks(endDate.value, startDate.value))
const totalDays = computed(() => differenceInBusinessDays(endDate.value, startDate.value))

const users: User[] = [
  {
    id: 100,
    rate: 70,
    name: "Matt",
    role: "Lead"
  },
  {
    id: 101,
    rate: 70,
    name: "Charles",
    role: "Frontend"
  },
  {
    id: 102,
    rate: 70,
    name: "Antoine",
    role: "Backend"
  }
]

const tasks = [
  { id: 100, type: "Feature", label: "4 Service Provider Organization Module" },
  { id: 101, type: "Feature", label: "1. Provider Origin Module" },
  { id: 102, type: "Feature", label: "3 Care Management/Community Health Worker Module" },
  { id: 103, type: "User Story", label: "Patients List Page" },
  { id: 104, type: "User Story", label: "Patient Details" },
  { id: 105, type: "Feature", label: "Shared Module Features" },
  { id: 106, type: "User Story", label: "Authentication and Roles" },
  { id: 107, type: "User Story", label: "Patient Editor" },
  { id: 108, type: "User Story", label: "Home Page - Provider Origin" },
  { id: 109, type: "User Story", label: "Settings Page" },
  { id: 110, type: "User Story", label: "Notifications Page" },
  { id: 111, type: "User Story", label: "Referrals List Page - Provider Origin" },
  { id: 112, type: "User Story", label: "Referral Details" },
  { id: 113, type: "User Story", label: "Referral Editor" },
  { id: 114, type: "User Story", label: "Document Viewer" },
  { id: 115, type: "Feature", label: "7. Dashboard and Analytics" },
  { id: 116, type: "Feature", label: "8. Cross Domain Admin Function" },
  { id: 117, type: "User Story", label: "Home Page - CMHW" },
  { id: 118, type: "User Story", label: "Referrals List Page - CMHW" },
  { id: 119, type: "User Story", label: "Referral Details - CMHW" },
  { id: 120, type: "User Story", label: "Pathways List Page" },
  { id: 121, type: "User Story", label: "Pathway Details Page" },
  { id: 122, type: "User Story", label: "Pathway Editor" },
  { id: 123, type: "User Story", label: "In-app messaging" },
  { id: 124, type: "Feature", label: "9. Service Directory" },
  { id: 125, type: "Task", label: "Review referral resources Aadli provided and determine the critical info of a referral to show" },
  { id: 126, type: "Task", label: "Iron out notification trigger logic with Aadli" },
  { id: 127, type: "User Story", label: "Patients Page - Service Provider" },
  { id: 128, type: "User Story", label: "Patient Details - Service Provider" },
  { id: 129, type: "User Story", label: "Referral Editor - Service Provider" },
  { id: 130, type: "User Story", label: "Full Design in Figma" },


] as const

type Task = { id: number, label: string }

const page = 0, size = 1

const estimate = ref([
  { taskId: 101, duration: 7, resourceId: 100, startDate: '2023-03-01' },
  { taskId: 102, duration: 7, resourceId: 100, startDate: '2023-03-05' },
  { taskId: 103, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 104, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 105, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 106, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 107, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 108, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 109, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 110, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 111, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 112, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 113, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 114, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 115, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 116, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 117, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 118, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 119, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 120, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 121, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 122, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 123, duration: 7, resourceId: 101, startDate: '2023-03-06' },
  { taskId: 124, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 125, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 126, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 127, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 128, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 129, duration: 7, resourceId: 101, startDate: '2023-03-16' },
  { taskId: 130, duration: 7, resourceId: 101, startDate: '2023-03-16' },
])

type Estimate = { taskId: number, duration: number, resourceId: number, startDate: string }

const timeline = computed(() => {
  let d = startOfWeek.value
  const headings = new Array(totalWeeks.value * 7).fill(null).map((_, i) => {
    let date = add(d, { days: i })
    return {
      i,
      date,
      dow: format(date, "eeeee"),
      week: getWeek(date) - startWeek.value + 1,
      day: +format(date, "d"),
      month: format(date, "MMMM")

    }
  })

  const _users = users.map(u => {
    return {
      ...u,
      totalWeeks: new Array(totalWeeks.value * 7).fill(null).map((_, i) => {

        return {
          i


        }
      })

    }
  })

  return {
    headings,
    users: _users
  }
})
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
const isVisible = ref(false)

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function as<T>(item: any): T {
  return item as T
}
const mapEstimate = (t: Estimate) => {


  let task = tasks.find(x => x.id === t.taskId)!
  let r = users.find(x => x.id === t.resourceId)!
  return {
    id: t.taskId,
    duration: t.duration,
    resourceId: t.resourceId,
    startDateLabel: t.startDate,
    startDate: new Date(t.startDate),
    label: task.label,
    resourceName: r.name,
    endDate: add(new Date(t.startDate), { days: t.duration - 1 })
  }

}

const rows = computed(() => Math.floor(height.value / 32) - 1)
const resolveDate = (i: number, j: number) => {
  const d = add(startOfWeek.value, { days: i * 7 + j })
  return [
    d,
    format(d, "yyyy-MM-dd")
  ]
}
</script>

<template>
  <section class="flex h-full flex-col">

    <header class=" bg-pink-100"></header>

    <main class="flex-1 bg-orange-50 w-full flex">
       <div class="flex flex-col gap-4 h-full max-w-xs w-96 rounded top-0 p-2 bg-slate-200">
          <div class="flex flex-col gap-1">

            <label for="startDate">Start Date</label>
            <DateInput name="startDate" id="startDate" v-model="startDate" class="" />
          </div>

          <div class="flex flex-col gap-1">
            <label for="endDate">End Date</label>
            <DateInput name="endDate" id="endDate" v-model="endDate" class="" />
          </div>

          <div class="flex flex-col gap-1">
            <label for="weeks">Weeks</label>
            <input type="number" name="weeks" id="weeks" v-model="totalWeeks" class="" />
          </div>

          <div class="grid grid-cols-2 gap-1" v-if="startOfWeek">
            <label>Start of Week</label>
            <span> {{ format(new Date(startOfWeek), "MM/dd/yyyy") }}</span>

            <label>Total Days</label>
            <span> {{ totalDays }}</span>
          </div>
        </div>
       <div class="relative bg-slate-800 flex-1">
          <article class="absolute inset-0 overflow-auto" v-if="true">

            <table class="w-max bg-white border-spacing-0 border-separate">
              <thead class="[&_td:first-child]:border-l [&_td:first-child]:bg-white">
                <tr class="children:p-1 children:border-gray-300 children:border-b children:border-t children:border-r children:sticky children:top-0 children:bg-white">
                  <th scope="col"
                    class="left-0 z-20  w-100  bg-white text-left text-sm font-semibold text-gray-900">
                    <div class="p-2">Task</div>
                  </th>
                  <th scope="col"
                    class="left-100 z-20  w-32  border-gray-300 bg-white text-center text-sm font-semibold text-gray-900">
                    Start</th>
                  <th scope="col"
                    class="left-104 z-20  border-gray-300 w-20 bg-white text-center text-sm font-semibold text-gray-900">
                    Duration</th>
                  <th scope="col"
                    class="z-10  border-gray-300 w-48 bg-white text-left text-sm font-semibold text-gray-900">
                    Resource</th>

                  <template v-for="(w, i) in totalWeeks">
                    <th colspan="7"
                      class="z-10 w-60 !p-0 text-left text-sm font-semibold text-gray-900">
                      <div class="grid grid-row-3 grid-cols-7">
                        <div class="col-span-7 border-b p-2 text-center border-l">Week {{ w }}</div>
                        <div class="col-span-7 border-b p-2 text-center border-l">
                          {{ format(add(startOfWeek, { days: i * 7 }), "MMM dd") }} - {{ format(add(startOfWeek, {
                            days: i * 7
                              + 6
                          }), "MMM dd") }}
                        </div>
                        <template v-for="(_, j) in 7">
                          <div :class="['text-center', 'border-l']">{{ weekdays[j][0] }}</div>
                        </template>
                        <template v-for="(_, j) in 7">
                          <div :class="['text-center', 'border-l']">{{ timeline.headings[j + i * 7].day }}</div>
                        </template>
                      </div>
                    </th>
                  </template>

                </tr>
              </thead>
              <tbody class="[&_td:first-child]:border-l [&_td:first-child]:bg-white">
                <template v-for="e in estimate" :key="e.taskId">
                  <template v-for="(item) in [mapEstimate(e)]" :key="item.taskId">

                    <tr class="children children:border-r children:border-b children:border-gray-300">
                      <td
                        class="border-b p-1 w-100 border-x border-gray-200 sticky left-0 z-10 whitespace-nowrap  bg-white text-sm font-medium text-gray-900 px-3">
                        <span class="block truncate w-96">

                          {{ item.label }}
                        </span>

                      </td>
                      <td class="border-b border-r sticky left-100  bg-white text-sm text-gray-500">
                        <DateInput v-model="e.startDate" class="border-0 text-sm p-1 w-full min-w-0" />
                      </td>
                      <td class="border-b  border-r sticky left-104  bg-white text-sm text-gray-500">
                        <input type="number" class="border-0 text-sm w-full p-1" v-model="e.duration" />
                      </td>
                      <td class="border-b border-r  bg-white text-sm text-gray-500">
                        <select name="" id="" v-model="e.resourceId" class="p-1 px-2 w-full border-transparent text-sm">
                          <template v-for="user in users">
                            <option :value="user.id">{{ user.name }}</option>
                          </template>
                        </select>
                      </td>

                      <template v-for="(_, i) in totalWeeks">
                        <template v-for="(_, j) in 7">
                          <template v-for="[date, label] in [resolveDate(i, j)]">
                            <template v-if="label === item.startDateLabel">
                              <td :colspan="item.duration" class="border-b border-l">
                                <div class="bg-blue-300 w-full h-6"></div>
                              </td>
                            </template>
                            <template v-else-if="date > item.startDate && date <= item.endDate"></template>
                            <template v-else>
                              <td class="border-b border-l"></td>
                            </template>
                          </template>
                        </template>
                      </template>
                    </tr>


                  </template>
                </template>

                <tr class="children:whitespace-nowrap children:text-sm children:text-gray-500 children:border-gray-300">
                  <td
                    class="border-b border-x border-gray-200 sticky left-0 z-10 whitespace-nowrap  bg-zinc-50 text-sm font-medium text-gray-800 px-3">

                    <input type="text" placeholder="Add Task..."
                      class="border-0 text-sm p-0 w-full min-w-0 bg-transparent placeholder:text-gray-400" />

                  </td>
                  <td class="border-b border-r sticky left-100  bg-zinc-50 text-sm text-gray-500">
                    <DateInput class="border-0 text-sm p-0 w-full min-w-0 bg-transparent" />
                  </td>
                  <td class="border-b  border-r sticky left-104  bg-zinc-50 text-sm text-gray-500">
                    <input type="number" class="border-0 text-sm w-full py-0 bg-transparent" />
                  </td>
                  <td class="border-b border-r  bg-zinc-50 text-sm text-gray-500">
                    <select name="" id="" class="py-1 px-2 w-full border-transparent text-sm bg-transparent">
                      <template v-for="user in users">
                        <option :value="user.id">{{ user.name }}</option>
                      </template>
                    </select>
                  </td>
                  <td :colspan="totalWeeks * 7" class="p-0 border-b border-l border-gray-200"></td>
                </tr>

                <template v-if="estimate.length < rows">
                  <template v-for="i in (rows - estimate.length - 1)">

                    <tr class="bg-white h-8 children:border-gray-200">
                      <td class="border" colspan="4"></td>
                      <td class="border" :colspan="totalWeeks * 7">&nbsp;</td>
                    </tr>
                  </template>
                </template>

              </tbody>
            </table>

          </article>
        </div>
    </main>

    <footer class=""></footer>

  </section>
</template>