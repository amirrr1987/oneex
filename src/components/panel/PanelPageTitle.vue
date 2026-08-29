<script setup lang="ts">
import Divider from 'ant-design-vue/es/divider'
import Flex from 'ant-design-vue/es/flex'
import Typography from 'ant-design-vue/es/typography'

defineProps<{
  title: string
  icon?: object
  subtitle?: string
}>()

const { Title, Text } = Typography
</script>

<template>
  <Flex vertical align="center" class="my-6 w-full px-4">
    <Title :level="3" class="mb-1 uppercase">
      <Flex align="center" gap="small" justify="center">
        <component :is="icon" v-if="icon" aria-hidden="true" />
        {{ title }}
      </Flex>
    </Title>
    <Text v-if="subtitle" type="secondary">{{ subtitle }}</Text>
    <Divider class="mb-0 mt-4 w-full max-w-md" />
  </Flex>
</template>
