<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Layout from 'ant-design-vue/es/layout'
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

const { Footer } = Layout
const { Text } = Typography
</script>

<template>
  <Footer class="mt-5 p-0">
    <div class="py-5">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="text-center md:text-right">
            <Space direction="vertical" :size="4">
              <span class="flex items-center justify-center gap-2 md:justify-end">
                <InfoCircleOutlined />About
              </span>
              <span class="flex items-center justify-center gap-2 md:justify-end">
                <SafetyCertificateOutlined />Security
              </span>
              <span class="flex items-center justify-center gap-2 md:justify-end">
                <PercentageOutlined />Fee Structure
              </span>
              <span class="flex items-center justify-center gap-2 md:justify-end">
                <ApiOutlined />API docs
              </span>
              <span class="flex items-center justify-center gap-2 md:justify-end">
                <PhoneOutlined />Support
              </span>
            </Space>
          </div>

          <div class="hidden items-start justify-center gap-2 md:flex">
            <Button shape="circle" href="#" aria-label="Telegram">
              <template #icon><SendOutlined /></template>
            </Button>
            <Button shape="circle" href="#" aria-label="WhatsApp">
              <template #icon><PhoneOutlined /></template>
            </Button>
            <Button shape="circle" href="#" aria-label="Instagram">
              <template #icon><InstagramOutlined /></template>
            </Button>
          </div>

          <div class="text-center md:text-left">
            <Space direction="vertical" :size="4">
              <span class="flex items-center justify-center gap-2 md:justify-start">
                <FileTextOutlined />Cookie policy
              </span>
              <RouterLink to="/terms" class="flex items-center justify-center gap-2 md:justify-start">
                <FileTextOutlined />Terms of use
              </RouterLink>
              <span class="flex items-center justify-center gap-2 md:justify-start">
                <BankOutlined />CDX
              </span>
              <span class="flex items-center justify-center gap-2 md:justify-start">
                <BookOutlined />Blog
              </span>
              <RouterLink to="/privacy" class="flex items-center justify-center gap-2 md:justify-start">
                <LockOutlined />Privacy
              </RouterLink>
            </Space>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="w-full max-w-3xl text-center">
            <address class="mb-2 not-italic">
              <EnvironmentOutlined class="mr-2" />
              #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran - P.O.Box 12345-67890
            </address>
            <span class="block"><PhoneOutlined class="mr-2" />+9821 88 77 66 55</span>
            <span class="block"><MailOutlined class="mr-2" />support@oneex.com</span>
          </div>
        </div>
      </div>
    </div>

    <div class="py-3 md:hidden">
      <Space class="flex w-full justify-center">
        <Button type="text" href="#" aria-label="Telegram">
          <template #icon><SendOutlined class="text-xl" /></template>
        </Button>
        <Button type="text" href="#" aria-label="WhatsApp">
          <template #icon><PhoneOutlined class="text-xl" /></template>
        </Button>
        <Button type="text" href="#" aria-label="Instagram">
          <template #icon><InstagramOutlined class="text-xl" /></template>
        </Button>
      </Space>
    </div>

    <div class="py-2 text-center">
      <Text class="text-sm">
        <CopyrightOutlined class="mr-1" />Copyright 2018. oneex. All Rights Reserved
      </Text>
    </div>
  </Footer>
</template>
