import type { ComputedRef } from 'vue'

export type Project = {
  name: string
  startDate: Date,
  endDate: Date,
  weeks: ComputedRef<number>
  contractors: User[]
}

export type Status = ''

export type Classification =
 { id: 10, label: 'Partial Development' } |
 { id: 20, label: 'Full Development' }|
 { id: 30, label: 'Testing' } |
 { id: 40, label: 'Cleanup' }

export type User = {
  id: number
  name: string
  rate: number
  role: string
}

export type Task = {
  task: string
  startWeek: number
  endWeek: number
  classification: Classification
}

export type Estimate = {

}