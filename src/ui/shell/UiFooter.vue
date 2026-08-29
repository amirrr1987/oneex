<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Col from 'ant-design-vue/es/col'
import Divider from 'ant-design-vue/es/divider'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import {
  ApiOutlined,
  BankOutlined,
  BookOutlined,
  CopyrightOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  InstagramOutlined,
  LockOutlined,
  MailOutlined,
  PercentageOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
import { footerLinks } from '@/ui/navigation'

const { Footer } = Layout
const { Title, Text, Paragraph, Link } = Typography

const productIconMap = {
  info: InfoCircleOutlined,
  security: SafetyCertificateOutlined,
  fee: PercentageOutlined,
  api: ApiOutlined,
  support: PhoneOutlined,
} as const

const legalIconMap = {
  terms: FileTextOutlined,
  privacy: LockOutlined,
  cookie: FileTextOutlined,
} as const

const companyIconMap = {
  bank: BankOutlined,
  blog: BookOutlined,
} as const

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <Footer class="mt-8">
    <div class="mx-auto max-w-7xl px-4 pt-8">
      <Flex vertical align="center" gap="middle" class="pb-6 text-center">
        <BrandLogo to="/" />
        <Space wrap class="justify-center">
          <Tag color="blue">Licensed Exchange</Tag>
          <Tag color="green">0.05% Fee</Tag>
          <Tag color="purple">Trade Mining</Tag>
        </Space>
        <Paragraph type="secondary" class="mb-0 max-w-2xl">
          ONEEX — secure crypto trading with institutional tools, transparent fees, and TIC rewards.
        </Paragraph>
      </Flex>

      <Divider />

      <Row :gutter="[32, 32]">
        <Col :xs="24" :md="8">
          <Title :level="5" class="uppercase">Platform</Title>
          <Space direction="vertical" :size="4" class="mt-3 w-full">
            <Link v-for="item in footerLinks.product" :key="item.label">
              <Space>
                <component :is="productIconMap[item.icon]" />
                {{ item.label }}
              </Space>
            </Link>
          </Space>
        </Col>

        <Col :xs="24" :md="8">
          <Title :level="5" class="text-center uppercase">Connect</Title>
          <Flex vertical align="center" gap="middle" class="mt-3">
            <Space>
              <Button shape="circle" type="primary" ghost href="#" aria-label="Telegram">
                <template #icon><SendOutlined /></template>
              </Button>
              <Button shape="circle" type="primary" ghost href="#" aria-label="WhatsApp">
                <template #icon><PhoneOutlined /></template>
              </Button>
              <Button shape="circle" type="primary" ghost href="#" aria-label="Instagram">
                <template #icon><InstagramOutlined /></template>
              </Button>
            </Space>
            <Space direction="vertical" :size="4" align="center">
              <Text><PhoneOutlined class="mr-2" />+9821 88 77 66 55</Text>
              <Link href="mailto:support@oneex.com">
                <MailOutlined class="mr-2" />
                support@oneex.com
              </Link>
            </Space>
          </Flex>
        </Col>

        <Col :xs="24" :md="8">
          <Title :level="5" class="uppercase">Legal</Title>
          <Space direction="vertical" :size="4" class="mt-3 w-full">
            <RouterLink v-for="item in footerLinks.legal" :key="item.label" :to="item.to">
              <Link>
                <Space>
                  <component :is="legalIconMap[item.icon]" />
                  {{ item.label }}
                </Space>
              </Link>
            </RouterLink>
            <Link v-for="item in footerLinks.company" :key="item.label">
              <Space>
                <component :is="companyIconMap[item.icon]" />
                {{ item.label }}
              </Space>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Flex vertical align="center" gap="small" class="pb-4">
        <Paragraph class="mb-0 text-center">
          <EnvironmentOutlined class="mr-2" />
          #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran — P.O.Box 12345-67890
        </Paragraph>
        <Text type="secondary">
          <CopyrightOutlined class="mr-1" />
          Copyright {{ year }}. ONEEX. All Rights Reserved.
        </Text>
      </Flex>
    </div>
  </Footer>
</template>
