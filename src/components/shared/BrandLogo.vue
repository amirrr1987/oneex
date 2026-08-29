<script setup lang="ts">
import Avatar from 'ant-design-vue/es/avatar'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import { AppstoreFilled } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string
    showText?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    to: '/',
    showText: true,
    size: 'md',
  },
)

const { Text } = Typography

const avatarSize = {
  sm: 32,
  md: 36,
  lg: 48,
} as const

const textClass = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
} as const
</script>

<template>
  <RouterLink :to="to" class="inline-flex no-underline">
    <Space align="center" :size="10">
      <Avatar :size="avatarSize[size]" shape="square" class="bg-indigo-500">
        <template #icon>
          <AppstoreFilled />
        </template>
      </Avatar>
      <Text v-if="showText" strong :class="textClass[size]" class="uppercase tracking-wide">
        ONEEX
      </Text>
    </Space>
  </RouterLink>
</template>
