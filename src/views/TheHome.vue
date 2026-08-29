<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Avatar from 'ant-design-vue/es/avatar'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Col from 'ant-design-vue/es/col'
import Descriptions from 'ant-design-vue/es/descriptions'
import Divider from 'ant-design-vue/es/divider'
import Flex from 'ant-design-vue/es/flex'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import List from 'ant-design-vue/es/list'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Spin from 'ant-design-vue/es/spin'
import Steps from 'ant-design-vue/es/steps'
import Typography from 'ant-design-vue/es/typography'
import {
  BarChartOutlined,
  CheckCircleOutlined,
  GiftOutlined,
  KeyOutlined,
  LineChartOutlined,
  PercentageOutlined,
  ReadOutlined,
  ReloadOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
} from '@ant-design/icons-vue'
import type { Component } from 'vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useRouteQuery } from '@vueuse/router'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import CoinTabs from '@/components/panel/CoinTabs.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { UiHero, UiMetric, UiSection } from '@/ui'
import { useMarketStore } from '@/stores/market'

const { Title, Text, Paragraph } = Typography

const market = useMarketStore()
const { rows, platformStats } = storeToRefs(market)

onMounted(() => {
  void market.refreshLandingData()
})

const activeCoin = useRouteQuery('coin', 'BTC')
const featureSlide = ref(0)
const refreshing = ref<Record<string, boolean>>({})

const newsletterForm = reactive({ email: '' })
const newsletterRules = {
  email: [{ required: true, type: 'email' as const, message: 'Enter a valid email address' }],
}
const { errorFields: newsletterErrors, execute: validateNewsletter } = useAsyncValidator(
  newsletterForm,
  newsletterRules,
  { manual: true },
)

const newsletterMessage = ref('')

const statIconMap: Record<string, Component> = {
  'line-chart': LineChartOutlined,
  team: TeamOutlined,
  'bar-chart': BarChartOutlined,
}

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'max24' as const, label: '24 Max Price' },
  { key: 'min24' as const, label: '24 Min Price' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const heroStats = computed(() =>
  platformStats.value.slice(0, 4).map((stat) => ({
    label: stat.label,
    value: stat.numericValue,
    suffix: stat.suffix,
    icon: statIconMap[stat.icon] ?? BarChartOutlined,
  })),
)

const features = [
  {
    title: 'Official Licenses',
    icon: SafetyCertificateOutlined,
    color: '#6366f1',
    text: 'ONEEX acquired all necessary official licenses for providing exchange services.',
  },
  {
    title: 'ECC API',
    icon: KeyOutlined,
    color: '#8b5cf6',
    text: 'We store only the public key using EdDSA — no API secrets on our servers.',
  },
  {
    title: 'Trade Mining',
    icon: StarOutlined,
    color: '#f59e0b',
    text: 'Earn TIC tokens simply for trading on the platform every day.',
  },
  {
    title: 'Lowest Fees',
    icon: PercentageOutlined,
    color: '#22c55e',
    text: '0% deposit fee and up to 0.05% maker/taker trading fee.',
  },
  {
    title: 'Loyalty Program',
    icon: GiftOutlined,
    color: '#ec4899',
    text: 'Hold TIC tokens and receive daily bounties in various cryptocurrencies.',
  },
  {
    title: 'Market News',
    icon: ReadOutlined,
    color: '#06b6d4',
    text: 'Stay informed with integrated market news and updates.',
  },
]

const tokenBenefits = [
  'Earn TIC by trading on ONEEX',
  'Hold TIC tokens to receive bounties and bonuses',
  'Get 50% off trading fees when paying in TIC',
  'Get more cashback from invited users',
]

async function refreshStat(id: string) {
  refreshing.value[id] = true
  market.bumpStat(id)
  await new Promise((resolve) => setTimeout(resolve, 600))
  refreshing.value[id] = false
}

async function onNewsletterSubmit() {
  newsletterMessage.value = ''
  const { pass } = await validateNewsletter()
  if (!pass) return
  newsletterMessage.value = 'Thanks! We will keep you posted (demo).'
  newsletterForm.email = ''
}
</script>

<template>
  <Flex vertical class="w-full py-8">
    <Flex vertical class="mx-auto w-full max-w-7xl px-4" gap="large">
      <UiHero
        badge="Exchange of Tomorrow"
        title="Trade Smarter with ONEEX"
        subtitle="Licensed crypto exchange with vanguard security, trade mining rewards, and institutional-grade market tools."
        :stats="heroStats"
      >
        <template #actions>
          <RouterLink to="/sign-up">
            <Button type="primary" size="large">
              <UserAddOutlined />
              Create Free Account
            </Button>
          </RouterLink>
          <RouterLink to="/exchange">
            <Button size="large">
              <ThunderboltOutlined />
              Launch Exchange
            </Button>
          </RouterLink>
        </template>
      </UiHero>

      <UiSection title="Start in 3 steps" subtitle="From signup to your first trade in minutes">
        <Steps
          :current="-1"
          :items="[
            { title: 'Create account', description: 'Verify email and secure your profile' },
            { title: 'Deposit crypto', description: 'Get a unique address with live confirmations' },
            { title: 'Trade & earn TIC', description: 'Buy, sell, and mine rewards on every trade' },
          ]"
        />
      </UiSection>

      <Card hoverable class="hidden sm:block">
        <Form layout="vertical" @submit.prevent="onNewsletterSubmit">
          <Row :gutter="16" align="bottom">
            <Col :xs="24" :md="14">
              <FormItem
                label="Get market updates"
                :validate-status="newsletterErrors?.email?.length ? 'error' : undefined"
                :help="newsletterErrors?.email?.[0]?.message"
              >
                <Input
                  v-model:value="newsletterForm.email"
                  type="email"
                  placeholder="Enter email address"
                  size="large"
                />
              </FormItem>
            </Col>
            <Col :xs="24" :md="10">
              <Button type="primary" html-type="submit" block size="large" :disabled="!newsletterForm.email">
                <RocketOutlined />
                Join ONEEX
              </Button>
            </Col>
          </Row>
        </Form>
        <Alert v-if="newsletterMessage" type="success" :message="newsletterMessage" show-icon class="mt-4" />
      </Card>

      <Space direction="vertical" class="w-full sm:hidden">
        <RouterLink to="/sign-in">
          <Button block size="large">Sign in ONEEX</Button>
        </RouterLink>
        <RouterLink to="/sign-up">
          <Button type="primary" block size="large">Create Account</Button>
        </RouterLink>
      </Space>

      <UiSection title="Live Markets" subtitle="Real-time prices across top trading pairs">
        <template #extra>
          <CoinTabs v-model="activeCoin" class="hidden md:block max-w-md" />
        </template>
        <Card hoverable class="hidden md:block">
          <SortableTable :columns="columns" :rows="rows" row-key="market" empty-description="Markets loading..." />
        </Card>
        <div class="md:hidden">
          <SwipeCarousel v-model="featureSlide" :length="rows.length">
            <Card v-for="row in rows" :key="row.market" hoverable>
              <Title :level="5">{{ row.market }}</Title>
              <Descriptions bordered size="small" :column="1">
                <Descriptions.Item label="Last Price">{{ row.lastPrice }}</Descriptions.Item>
                <Descriptions.Item label="24 Change">{{ row.change24 }}</Descriptions.Item>
                <Descriptions.Item label="Volume">{{ row.volume24 }}</Descriptions.Item>
              </Descriptions>
            </Card>
          </SwipeCarousel>
        </div>
      </UiSection>

      <Row :gutter="[16, 16]">
        <Col v-for="stat in platformStats" :key="stat.id" :xs="24" :md="8">
          <UiMetric
            :title="stat.label"
            :value="stat.numericValue"
            :suffix="stat.suffix"
            :prefix="stat.prefix"
            :icon="statIconMap[stat.icon] ?? BarChartOutlined"
            :loading="refreshing[stat.id]"
          >
            <template #extra>
              <Button type="text" size="small" aria-label="Refresh stat" @click="refreshStat(stat.id)">
                <Spin v-if="refreshing[stat.id]" size="small" />
                <ReloadOutlined v-else />
              </Button>
            </template>
          </UiMetric>
        </Col>
      </Row>

      <Divider />

      <Title :level="3" class="text-center uppercase">Features & Benefits</Title>

      <Row :gutter="[16, 16]" class="hidden md:flex">
        <Col v-for="feature in features" :key="feature.title" :xs="24" :md="12" :lg="8">
          <Card hoverable class="h-full">
            <Space direction="vertical" :size="12">
              <Avatar :size="48" :style="{ backgroundColor: feature.color }">
                <template #icon>
                  <component :is="feature.icon" />
                </template>
              </Avatar>
              <Title :level="5" class="mb-0 uppercase">{{ feature.title }}</Title>
              <Paragraph class="mb-0">{{ feature.text }}</Paragraph>
            </Space>
          </Card>
        </Col>
      </Row>

      <div class="md:hidden">
        <SwipeCarousel :length="features.length">
          <Card v-for="feature in features" :key="feature.title" hoverable>
            <Flex vertical align="center" gap="small">
              <Avatar :size="48" :style="{ backgroundColor: feature.color }">
                <template #icon>
                  <component :is="feature.icon" />
                </template>
              </Avatar>
              <Title :level="5" class="mb-0 uppercase">{{ feature.title }}</Title>
              <Paragraph class="mb-0 text-center">{{ feature.text }}</Paragraph>
            </Flex>
          </Card>
        </SwipeCarousel>
      </div>

      <UiSection title="TIC Token" subtitle="The loyalty engine powering ONEEX rewards">
        <Row :gutter="[24, 24]">
          <Col :xs="24" :lg="12">
            <Paragraph class="mb-0">
              ONEEX created the TIC token to stimulate platform growth, serve users, and reward loyalty.
            </Paragraph>
          </Col>
          <Col :xs="24" :lg="12">
            <List :data-source="tokenBenefits" size="small">
              <template #renderItem="{ item }">
                <List.Item>
                  <CheckCircleOutlined class="mr-2 text-green-500" />
                  {{ item }}
                </List.Item>
              </template>
            </List>
          </Col>
        </Row>
        <Divider />
        <Flex justify="center">
          <RouterLink to="/get-tic-token">
            <Button type="primary" size="large">Get TIC Token</Button>
          </RouterLink>
        </Flex>
      </UiSection>

      <Card hoverable>
        <Flex vertical align="center" gap="middle">
          <Title :level="4" class="mb-0 uppercase">Customize Your Interface</Title>
          <Paragraph class="mb-0 max-w-2xl text-center">
            Switch between day and night mode for a more comfortable trading experience.
          </Paragraph>
          <ThemeToggle />
        </Flex>
      </Card>
    </Flex>
  </Flex>
</template>
