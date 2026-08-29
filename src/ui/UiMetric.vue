<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Flex from 'ant-design-vue/es/flex'
import Statistic from 'ant-design-vue/es/statistic'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    title: string
    value: number | string
    suffix?: string
    prefix?: string
    precision?: number
    icon?: Component
    trend?: string
    trendColor?: 'success' | 'error' | 'warning' | 'default'
    loading?: boolean
  }>(),
  {
    trendColor: 'default',
  },
)

const { Text } = Typography
</script>

<template>
  <Card hoverable class="h-full" :loading="loading">
    <Flex vertical gap="small">
      <Flex align="center" justify="space-between">
        <Text type="secondary">{{ title }}</Text>
        <Space>
          <slot name="extra" />
          <component :is="icon" v-if="icon" aria-hidden="true" />
        </Space>
      </Flex>
      <Statistic
        :value="value"
        :suffix="suffix"
        :prefix="prefix"
        :precision="precision"
        :value-style="{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontWeight: 600 }"
      />
      <Tag v-if="trend" :color="trendColor === 'default' ? undefined : trendColor">
        {{ trend }}
      </Tag>
    </Flex>
  </Card>
</template>
