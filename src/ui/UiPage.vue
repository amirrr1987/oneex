<script setup lang="ts">
import Breadcrumb from 'ant-design-vue/es/breadcrumb'
import Divider from 'ant-design-vue/es/divider'
import Flex from 'ant-design-vue/es/flex'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import { RouterLink } from 'vue-router'

import type { UiBreadcrumb } from '@/ui/navigation'

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    icon?: object
    badge?: string
    badgeColor?: string
    breadcrumbs?: UiBreadcrumb[]
    compact?: boolean
  }>(),
  {
    badgeColor: 'blue',
    compact: false,
  },
)

const { Title, Text } = Typography
</script>

<template>
  <Flex vertical class="w-full" :class="compact ? 'py-4' : 'py-6'">
    <Flex vertical class="mx-auto w-full max-w-7xl px-4" gap="large">
      <Breadcrumb v-if="breadcrumbs?.length">
        <Breadcrumb.Item v-for="item in breadcrumbs" :key="item.label">
          <RouterLink v-if="item.to" :to="item.to">{{ item.label }}</RouterLink>
          <span v-else>{{ item.label }}</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Flex v-if="!compact" align="start" justify="space-between" wrap="wrap" gap="middle">
        <Flex vertical gap="small">
          <Title :level="2" class="mb-0">
            <Space align="center">
              <component :is="icon" v-if="icon" aria-hidden="true" />
              {{ title }}
              <Tag v-if="badge" :color="badgeColor">{{ badge }}</Tag>
            </Space>
          </Title>
          <Text v-if="subtitle" type="secondary" class="text-base">{{ subtitle }}</Text>
        </Flex>
        <slot name="actions" />
      </Flex>

      <Flex v-else align="center" justify="space-between" wrap="wrap" gap="small">
        <Space align="center">
          <component :is="icon" v-if="icon" aria-hidden="true" />
          <Title :level="4" class="mb-0">{{ title }}</Title>
          <Tag v-if="badge" :color="badgeColor">{{ badge }}</Tag>
        </Space>
        <slot name="actions" />
      </Flex>

      <Divider class="my-0" />

      <slot name="toolbar" />

      <Flex vertical gap="large">
        <slot />
      </Flex>
    </Flex>
  </Flex>
</template>
