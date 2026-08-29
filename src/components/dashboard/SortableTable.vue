<script setup lang="ts" generic="T extends Record<string, string | number>">
import { computed } from 'vue'

import StatusBadge from '@/components/shared/StatusBadge.vue'
import { useTableSort } from '@/composables/useTableSort'

const props = defineProps<{
  columns: { key: keyof T & string; label: string; sortable?: boolean }[]
  rows: T[]
  rowKey?: keyof T & string
}>()

const { sortedRows, toggleSort, sortDir, sortKey } = useTableSort<T>(
  computed(() => props.rows),
)

function sortIcon(key: keyof T & string) {
  if (sortKey.value !== key || !sortDir.value) {
    return 'bi-arrow-down-up'
  }

  return sortDir.value === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
}

function getRowKey(row: T, index: number) {
  const key = props.rowKey ?? props.columns[0]?.key
  if (!key) {
    return String(index)
  }

  return String(row[key] ?? index)
}
</script>

<template>
  <table class="table table-striped table-hover table-sm align-middle mb-0">
    <thead class="table-light">
      <tr>
        <th v-for="column in columns" :key="column.key" scope="col">
          <button
            type="button"
            class="btn btn-sm btn-link text-decoration-none text-secondary p-0"
            @click="column.sortable !== false && toggleSort(column.key)"
          >
            {{ column.label }}
            <i v-if="column.sortable !== false" class="bi ms-1" :class="sortIcon(column.key)" />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in sortedRows" :key="getRowKey(row, index)">
        <td v-for="column in columns" :key="column.key">
          <StatusBadge
            v-if="column.key === 'status'"
            :status="String(row[column.key])"
          />
          <span v-else-if="column.key === 'market'" class="text-uppercase">{{ row[column.key] }}</span>
          <template v-else>{{ row[column.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
