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
            <Text><InfoCircleOutlined class="mr-2" />About</Text>
            <Text><SafetyCertificateOutlined class="mr-2" />Security</Text>
            <Text><PercentageOutlined class="mr-2" />Fee Structure</Text>
            <Text><ApiOutlined class="mr-2" />API docs</Text>
            <Text><PhoneOutlined class="mr-2" />Support</Text>
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
            <RouterLink to="/terms">
              <Text><FileTextOutlined class="mr-2" />Terms of use</Text>
            </RouterLink>
            <Text><BankOutlined class="mr-2" />CDX</Text>
            <Text><BookOutlined class="mr-2" />Blog</Text>
            <RouterLink to="/privacy">
              <Text><LockOutlined class="mr-2" />Privacy</Text>
            </RouterLink>
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
