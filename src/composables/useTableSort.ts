import { computed, ref, type Ref } from 'vue'

export type SortDirection = 'asc' | 'desc' | null

export function useTableSort<T extends Record<string, string | number>>(
  rows: Ref<T[]>,
  defaultKey?: keyof T & string,
) {
  const sortKey = ref<(keyof T & string) | null>(defaultKey ?? null)
  const sortDir = ref<SortDirection>(defaultKey ? 'asc' : null)

  const sortedRows = computed(() => {
    if (!sortKey.value || !sortDir.value) {
      return rows.value
    }

    const key = sortKey.value
    const direction = sortDir.value === 'asc' ? 1 : -1

    return [...rows.value].sort((left, right) => {
      const leftValue = left[key]
      const rightValue = right[key]

      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return (leftValue - rightValue) * direction
      }

      return String(leftValue).localeCompare(String(rightValue)) * direction
    })
  })

  function toggleSort(key: keyof T & string) {
    if (sortKey.value !== key) {
      sortKey.value = key
      sortDir.value = 'asc'
      return
    }

    sortDir.value =
      sortDir.value === 'asc' ? 'desc' : sortDir.value === 'desc' ? null : 'asc'

    if (!sortDir.value) {
      sortKey.value = null
    }
  }

  function sortClass(key: keyof T & string) {
    if (sortKey.value !== key || !sortDir.value) {
      return ''
    }

    return sortDir.value === 'desc' ? 'sort-rotate' : ''
  }

  return {
    sortedRows,
    sortKey,
    sortDir,
    toggleSort,
    sortClass,
  }
}
