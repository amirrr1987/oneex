<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Col from 'ant-design-vue/es/col'
import Divider from 'ant-design-vue/es/divider'
import Layout from 'ant-design-vue/es/layout'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
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
import { RouterLink } from 'vue-router'

import { footerLinks } from '@/ui/navigation'

const { Footer } = Layout
const { Text, Paragraph } = Typography
</script>

<template>
  <Footer class="mt-8">
    <Divider />

    <div class="mx-auto max-w-7xl px-4 py-6">
      <Row :gutter="[24, 24]" justify="center">
        <Col :xs="24" :md="8">
          <Space direction="vertical" :size="8" class="w-full">
            <Text v-for="item in footerLinks.product" :key="item">
              <InfoCircleOutlined v-if="item === 'About'" class="mr-2" />
              <SafetyCertificateOutlined v-else-if="item === 'Security'" class="mr-2" />
              <PercentageOutlined v-else-if="item === 'Fee Structure'" class="mr-2" />
              <ApiOutlined v-else-if="item === 'API docs'" class="mr-2" />
              <PhoneOutlined v-else-if="item === 'Support'" class="mr-2" />
              {{ item }}
            </Text>
          </Space>
        </Col>

        <Col :xs="24" :md="8" class="text-center">
          <Space class="hidden md:inline-flex">
            <Button shape="circle" href="#" aria-label="Telegram">
              <template #icon><SendOutlined /></template>
            </Button>
            <Button shape="circle" href="#" aria-label="WhatsApp">
              <template #icon><PhoneOutlined /></template>
            </Button>
            <Button shape="circle" href="#" aria-label="Instagram">
              <template #icon><InstagramOutlined /></template>
            </Button>
          </Space>
        </Col>

        <Col :xs="24" :md="8">
          <Space direction="vertical" :size="8" class="w-full">
            <Text><FileTextOutlined class="mr-2" />Cookie policy</Text>
            <RouterLink v-for="link in footerLinks.legal.filter((l) => l.to)" :key="link.label" :to="link.to!">
              <Text>
                <LockOutlined v-if="link.label === 'Privacy'" class="mr-2" />
                <FileTextOutlined v-else class="mr-2" />
                {{ link.label }}
              </Text>
            </RouterLink>
            <Text><BankOutlined class="mr-2" />CDX</Text>
            <Text><BookOutlined class="mr-2" />Blog</Text>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Space direction="vertical" class="w-full" align="center" :size="4">
        <Paragraph class="mb-0 text-center">
          <EnvironmentOutlined class="mr-2" />
          #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran - P.O.Box 12345-67890
        </Paragraph>
        <Text><PhoneOutlined class="mr-2" />+9821 88 77 66 55</Text>
        <Text><MailOutlined class="mr-2" />support@oneex.com</Text>
      </Space>
    </div>

    <Divider class="md:hidden" />

    <Space class="flex w-full justify-center py-4 md:hidden">
      <Button type="text" href="#" aria-label="Telegram">
        <template #icon><SendOutlined /></template>
      </Button>
      <Button type="text" href="#" aria-label="WhatsApp">
        <template #icon><PhoneOutlined /></template>
      </Button>
      <Button type="text" href="#" aria-label="Instagram">
        <template #icon><InstagramOutlined /></template>
      </Button>
    </Space>

    <Divider />

    <Text class="block py-4 text-center">
      <CopyrightOutlined class="mr-1" />
      Copyright 2018. oneex. All Rights Reserved
    </Text>
  </Footer>
</template>
