<script setup lang="ts">
import Badge from 'ant-design-vue/es/badge'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Col from 'ant-design-vue/es/col'
import Flex from 'ant-design-vue/es/flex'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Statistic from 'ant-design-vue/es/statistic'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import type { Component } from 'vue'

export type HeroStat = {
  label: string
  value: number | string
  suffix?: string
  icon?: Component
}

defineProps<{
  badge?: string
  title: string
  subtitle: string
  stats?: HeroStat[]
}>()

const { Title, Paragraph } = Typography
</script>

<template>
  <Badge.Ribbon v-if="badge" :text="badge" color="blue">
    <Card hoverable class="overflow-hidden">
      <Flex vertical align="center" gap="large" class="py-4 text-center md:py-8">
        <Space wrap class="justify-center">
          <Tag color="blue">Licensed</Tag>
          <Tag color="green">0.05% Trading Fee</Tag>
          <Tag color="purple">Trade Mining</Tag>
        </Space>

        <Flex vertical align="center" gap="middle" class="max-w-3xl">
          <Title :level="1" class="mb-0 uppercase">
            {{ title }}
          </Title>
          <Paragraph class="mb-0 text-lg">{{ subtitle }}</Paragraph>
        </Flex>

        <Space wrap class="justify-center">
          <slot name="actions" />
        </Space>

        <Row v-if="stats?.length" :gutter="[16, 16]" class="w-full pt-2">
          <Col v-for="stat in stats" :key="stat.label" :xs="12" :md="8" :lg="6">
            <Card size="small" hoverable>
              <Statistic
                :title="stat.label"
                :value="stat.value"
                :suffix="stat.suffix"
                :value-style="{ fontFamily: 'JetBrains Mono, ui-monospace, monospace' }"
              >
                <template v-if="stat.icon" #prefix>
                  <component :is="stat.icon" />
                </template>
              </Statistic>
            </Card>
          </Col>
        </Row>
      </Flex>
    </Card>
  </Badge.Ribbon>

  <Card v-else hoverable class="overflow-hidden">
    <Flex vertical align="center" gap="large" class="py-4 text-center md:py-8">
      <Flex vertical align="center" gap="middle" class="max-w-3xl">
        <Title :level="1" class="mb-0 uppercase">{{ title }}</Title>
        <Paragraph class="mb-0 text-lg">{{ subtitle }}</Paragraph>
      </Flex>
      <Space wrap class="justify-center">
        <slot name="actions" />
      </Space>
    </Flex>
  </Card>
</template>
