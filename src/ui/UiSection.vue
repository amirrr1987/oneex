<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Flex from 'ant-design-vue/es/flex'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    bordered?: boolean
    loading?: boolean
  }>(),
  {
    bordered: true,
    loading: false,
  },
)

const { Text, Paragraph } = Typography
</script>

<template>
  <Card hoverable :bordered="bordered" :loading="loading">
    <template v-if="title || $slots.extra" #title>
      <Flex vertical gap="small">
        <Space>
          <slot name="icon" />
          <Text v-if="title" strong class="text-base">{{ title }}</Text>
        </Space>
        <Paragraph v-if="subtitle" type="secondary" class="mb-0">
          {{ subtitle }}
        </Paragraph>
      </Flex>
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <slot />
  </Card>
</template>
