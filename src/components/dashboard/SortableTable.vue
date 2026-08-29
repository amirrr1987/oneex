<script setup lang="ts" generic="T extends Record<string, string | number>">
import Table from 'ant-design-vue/es/table'
import { computed } from 'vue'

import StatusBadge from '@/components/shared/StatusBadge.vue'
import { useTableSort } from '@/composables/useTableSort'

const props = defineProps<{
  columns: { key: keyof T & string; label: string; sortable?: boolean }[]
  rows: T[]
  rowKey?: keyof T & string
}>()

const { sortedRows, toggleSort } = useTableSort<T>(computed(() => props.rows))

const tableColumns = computed(() =>
  props.columns.map((column) => ({
    title: column.label,
    dataIndex: column.key,
    key: column.key,
    customHeaderCell: () => ({
      class: column.sortable !== false ? 'cursor-pointer' : undefined,
      onClick: () => {
        if (column.sortable !== false) toggleSort(column.key)
      },
    }),
  })),
)

function getRowKey(row: T, index?: number) {
  const key = props.rowKey ?? props.columns[0]?.key
  if (!key) return String(index ?? 0)
  return String(row[key] ?? index ?? 0)
}
</script>

<template>
  <Table
    :columns="tableColumns"
    :data-source="sortedRows"
    :row-key="(row, index) => getRowKey(row as T, index)"
    size="small"
    :pagination="false"
    :scroll="{ x: 'max-content' }"
  >
    <template #bodyCell="{ column, text }">
      <StatusBadge v-if="column.key === 'status'" :status="String(text)" />
      <span v-else-if="column.key === 'market'" class="uppercase">{{ text }}</span>
      <template v-else>{{ text }}</template>
    </template>
  </Table>
</template>
