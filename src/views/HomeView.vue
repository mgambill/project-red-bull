<script setup lang="ts">
import { defineProject } from '@/composables/useProject';
import type { User } from '@/types';
import { format, add, getWeek, differenceInCalendarWeeks, startOfWeek as fn_startOfWeek, endOfWeek as fn_endOfWeek, differenceInBusinessDays } from 'date-fns';

import { vIntersectionObserver } from '@vueuse/components'
import { el } from 'date-fns/locale';
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
const gridStyle = computed(() => `grid-template-columns: repeat(${(totalWeeks.value * 7)}, 2rem);`)

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
  {
    id: 1,
    label: "Login Page"
  },
  {
    id: 2,
    label: "Home Page"
  },
  {
    id: 3,
    label: "Login Page"
  },
] as const

type Task = typeof tasks[number]

const page = 0, size = 1

const estimate = {
  tasks: [
    {
      taskId: 1,
      duration: 7,
      resourceId: 100,
      startDate: '2023-03-01'
    },
    {
      taskId: 2,
      duration: 7,
      resourceId: 100,
      startDate: '2023-03-05'
    },
    {
      taskId: 3,
      duration: 7,
      resourceId: 101,
      startDate: '2023-03-06'
    }
  ]
}

type Estimate = typeof estimate

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
function onIntersectionObserver([context]) {
  console.log(context)
  let { isIntersecting } = context
  isVisible.value = isIntersecting
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function as<T>(item: any): T {
  return item as T
}
function mapEstimate(estimate: Estimate) {
  return estimate.tasks.map(t => {
    let task = tasks.find(x => x.id === t.taskId)!
    let r = users.find(x => x.id === t.resourceId)!
    return {
      ...t,
      label: task.label,
      resourceName: r.name
    }
  })
}

const rows = computed(() => Math.floor(height.value / 75) - 1)

</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-36 bg-slate-50 p-4 border" v-if="false">
    <pre>{{ isVisible }}</pre>
  </div>
  <div class="grid grid-cols-[320px_auto] flex-nowrap">
    <section class="max-w-xs bg-slate-100 rounded">
      <div class="flex flex-col gap-4 w-full max-w-xs rounded top-0 p-2">
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
    </section>

    <section class="bg-slate-50">

      <div class="flow-root min-h-screen">

        <table class="min-w-full w-[200rem] border-separate border-spacing-0 h-full">
          <thead>
            <tr>
              <th scope="col"
                class="sticky top-0 left-0 z-40 border-b w-[360px] border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter8">
                Task</th>
              <th scope="col"
                class="sticky top-0 left-[360px] z-40 border-b border-r border-gray-300 w-48 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                Resource</th>
              <th scope="col"
                class="sticky top-0 z-10 border-b border-gray-300 bg-white w-20 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                Start</th>
              <th scope="col"
                class="sticky top-0 z-10 border-b border-gray-300 w-20 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                End</th>

              <template v-for="(w, i) in totalWeeks">
                <th colspan="7"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter outline">
                  <div class="grid grid-row-3 grid-cols-7">
                    <div class="col-span-7">Week {{ w }}</div>
                    <div class="col-span-7">
                      {{ format(add(startOfWeek, { days: i * 7 }), "MMM dd") }} - {{ format(add(startOfWeek, {
                        days: i * 7
                          + 6
                      }), "MMM dd") }}
                    </div>
                    <template v-for="(_, j) in 7">
                      <div class="text-center outline">{{ timeline.headings[j + i * 7].day }}</div>
                    </template>
                    <template v-for="(_, j) in 7">
                      <div class="text-center outline">{{ weekdays[j][0] }}</div>
                    </template>
                  </div>
                </th>
              </template>

            </tr>
          </thead>
          <tbody>
            <template v-for="(item, $rowIndex) in mapEstimate(estimate)" :key="item.taskId">

              <tr class="children:whitespace-nowrap children:text-sm children:text-gray-500">
                <td
                  class="border-b border-gray-200 sticky left-0 z-10 whitespace-nowrap bg-white py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  <div class="">
                    {{ item.label }}
                  </div>
                </td>
                <td
                  class="border-b border-r border-gray-200 sticky left-[360px] whitespace-nowrap bg-white px-3 py-4 text-sm text-gray-500">
                  <select name="" id="" v-model="item.resourceId" class="py-1 px-2 w-full border-gray-200">
                    <template v-for="user in users">
                      <option :value="user.id">{{ user.name }}</option>
                    </template>
                  </select>
                </td>
                <td class="border-b border-gray-200 whitespace-nowrap bg-white px-3 py-4 text-sm text-gray-500">{{
                  item.startDate }}</td>
                <td class="border-b border-gray-200 whitespace-nowrap bg-white px-3 py-4 text-sm text-gray-500">
                </td>

                <template v-for="i in totalWeeks">
                  <template v-for="j in 7">
                    <td :data-id="(i - 1) * 7 + j + (($rowIndex + 1) * 1000)">{{ (i - 1) * 7 + j + (($rowIndex + 1) * 1000)}}</td>
                  </template>
                </template>
              </tr>


            </template>

            <tr
              class="bg-white h-[75px] children:border-b children:border-gray-200 children:whitespace-nowrap children:px-3 children:py-4 children:text-sm children:text-gray-500">
              <td class="sticky left-0 z-20 bg-white">
                <a href="" class="italic">Add Task</a>
              </td>
              <td class="border-r sticky left-[360px] z-20 bg-white">
                <select name="" id="">
                  <template v-for="user in users">
                    <option :value="user.id">{{ user.name }}</option>
                  </template>
                </select>
              </td>
              <td>
                <input type="date" name="" id="">
              </td>
              <td :colspan="totalWeeks * 7" class="px-3 py-4 border-b border-gray-200">{{ i }}</td>
            </tr>

            <template v-if="estimate.tasks.length < rows">
              <template v-for="i in (rows - estimate.tasks.length - 1)">
                <tr class="bg-white h-[75px]">
                  <td :colspan="totalWeeks * 7 + 3" class="px-3 py-4 border-b border-gray-200">{{ i }}</td>
                </tr>
              </template>
            </template>

          </tbody>
        </table>
      </div>

     </section>
  </div>
  <pre v-if="false">{{ timeline }}</pre>
</template>
