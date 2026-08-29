<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import Spin from 'ant-design-vue/es/spin'
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
  SafetyCertificateOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import type { Component } from 'vue'
import { reactive, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { useRouteQuery } from '@vueuse/router'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import CoinTabs from '@/components/panel/CoinTabs.vue'
import AnimatedCounter from '@/components/shared/AnimatedCounter.vue'
import AppTooltip from '@/components/shared/AppTooltip.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import BrandLogo from '@/components/shared/BrandLogo.vue'
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

const features = [
  {
    title: 'Official Licenses',
    icon: SafetyCertificateOutlined,
    text: 'ONEEX acquired all necessary official licenses for providing exchange services.',
  },
  {
    title: 'ECC API',
    icon: KeyOutlined,
    text: 'We store only the public key using EdDSA — no API secrets on our servers.',
  },
  {
    title: 'Trade Mining',
    icon: StarOutlined,
    text: 'Earn TIC tokens simply for trading on the platform every day.',
  },
  {
    title: 'Lowest Fees',
    icon: PercentageOutlined,
    text: '0% deposit fee and up to 0.05% maker/taker trading fee.',
  },
  {
    title: 'Loyalty Program',
    icon: GiftOutlined,
    text: 'Hold TIC tokens and receive daily bounties in various cryptocurrencies.',
  },
  {
    title: 'Media Object',
    icon: ReadOutlined,
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
  <section
    v-motion
    class="py-5"
    :initial="{ opacity: 0, y: 24 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
  >
    <div class="mx-auto max-w-7xl px-4">
      <div class="mb-4 flex justify-center text-center">
        <div class="max-w-2xl">
          <Title :level="1" class="inline-flex flex-wrap items-center justify-center gap-3 uppercase">
            <BrandLogo to="/" :show-text="false" size="lg" />
            ONEEX
            <br class="sm:hidden" />
            Exchange of Tomorrow
          </Title>
        </div>
      </div>
      <div class="mb-4 flex justify-center text-center">
        <div class="max-w-3xl">
          <Paragraph class="mb-0">
            ONEEX is a licensed trading platform for cryptocurrencies and assets, built on vanguard
            security infrastructure and a revolutionary reward system.
          </Paragraph>
        </div>
      </div>
      <div class="hidden justify-center sm:flex">
        <div class="w-full max-w-2xl">
          <Form @submit.prevent="onNewsletterSubmit">
            <div class="grid grid-cols-1 gap-2 md:grid-cols-12">
              <FormItem
                class="md:col-span-7"
                :validate-status="newsletterErrors?.email?.length ? 'error' : undefined"
                :help="newsletterErrors?.email?.[0]?.message"
              >
                <Input
                  v-model:value="newsletterForm.email"
                  type="email"
                  placeholder="Enter Email Address"
                />
              </FormItem>
              <div class="md:col-span-5">
                <Button type="primary" html-type="submit" block :disabled="!newsletterForm.email">
                  Create Account
                </Button>
              </div>
            </div>
          </Form>
          <Alert
            v-if="newsletterMessage"
            type="success"
            :message="newsletterMessage"
            show-icon
            class="mt-2"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 justify-center gap-2 sm:hidden">
        <div class="mx-auto w-2/3">
          <RouterLink to="/sign-in" class="mb-2 block">
            <Button block>Sign in ONEEX</Button>
          </RouterLink>
          <RouterLink to="/sign-up" class="block">
            <Button type="primary" block>Create Account</Button>
          </RouterLink>
        </div>
      </div>
      <div class="mt-5 hidden justify-center md:flex">
        <div class="w-full max-w-5xl">
          <CoinTabs v-model="activeCoin" />
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="mx-auto max-w-7xl px-4">
      <div class="hidden justify-center md:flex">
        <div class="w-full max-w-5xl">
          <Card>
            <SortableTable :columns="columns" :rows="rows" row-key="market" />
          </Card>
        </div>
      </div>

      <div class="md:hidden">
        <SwipeCarousel v-model="featureSlide" :length="rows.length">
          <div v-for="row in rows" :key="row.market" class="px-1">
            <Card>
              <Title :level="5" class="mb-3">{{ row.market }}</Title>
              <dl class="mb-0 grid grid-cols-12 gap-y-1 text-sm">
                <dt class="col-span-5">Last Price</dt>
                <dd class="col-span-7">{{ row.lastPrice }}</dd>
                <dt class="col-span-5">24 Change</dt>
                <dd class="col-span-7">{{ row.change24 }}</dd>
                <dt class="col-span-5">Volume</dt>
                <dd class="col-span-7">{{ row.volume24 }}</dd>
              </dl>
            </Card>
          </div>
        </SwipeCarousel>
        <Paragraph class="mt-2 text-center text-sm">Swipe markets left or right</Paragraph>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="mx-auto max-w-7xl px-4">
      <div class="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
        <Card
          v-for="(stat, index) in platformStats"
          :key="stat.id"
          v-motion
          class="relative h-full"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 500 } }"
        >
          <AppTooltip text="Refresh live stat">
            <Button
              type="text"
              class="absolute right-0 top-0"
              aria-label="Refresh"
              @click="refreshStat(stat.id)"
            >
              <Spin v-if="refreshing[stat.id]" size="small" />
              <ReloadOutlined v-else />
            </Button>
          </AppTooltip>
          <component :is="statIconMap[stat.icon] ?? BarChartOutlined" class="mb-3 text-5xl" />
          <Title :level="4">
            <AnimatedCounter
              :value="stat.numericValue"
              :prefix="stat.prefix"
              :suffix="stat.suffix"
            />
          </Title>
          <Paragraph class="mb-0">{{ stat.label }}</Paragraph>
        </Card>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="mx-auto max-w-7xl px-4">
      <Title
        v-motion
        :level="3"
        class="mb-5 text-center uppercase"
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 500 } }"
      >
        Our Features and Benefits
      </Title>

      <div class="hidden grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(feature, index) in features"
          :key="feature.title"
          v-motion
          class="h-full"
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: index * 80, duration: 450 } }"
        >
          <component :is="feature.icon" class="mb-3 text-4xl" />
          <Title :level="5" class="uppercase">{{ feature.title }}</Title>
          <Paragraph class="mb-0 text-sm">{{ feature.text }}</Paragraph>
        </Card>
      </div>

      <div class="md:hidden">
        <SwipeCarousel :length="features.length">
          <div v-for="feature in features" :key="feature.title" class="px-1">
            <Card class="h-full">
              <div class="text-center">
                <component :is="feature.icon" class="mb-3 text-4xl" />
                <Title :level="5" class="uppercase">{{ feature.title }}</Title>
                <Paragraph class="mb-0 text-sm">{{ feature.text }}</Paragraph>
              </div>
            </Card>
          </div>
        </SwipeCarousel>
      </div>
    </div>
  </section>

  <section
    v-motion
    class="py-5"
    :initial="{ opacity: 0 }"
    :visible-once="{ opacity: 1, transition: { duration: 600 } }"
  >
    <div class="mx-auto max-w-7xl px-4">
      <Title :level="3" class="mb-4 text-center uppercase">TIC Token</Title>
      <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <Paragraph class="mb-0">
          ONEEX created the TIC token to stimulate platform growth, serve users, and reward loyalty.
        </Paragraph>
        <ul class="mb-0 list-none pl-0">
          <li v-for="benefit in tokenBenefits" :key="benefit" class="mb-2">
            <CheckCircleOutlined class="mr-2" />
            {{ benefit }}
          </li>
        </ul>
      </div>
      <div class="mt-5 text-center">
        <RouterLink to="/get-tic-token">
          <Button type="primary" size="large" class="px-12">Get TIC Token</Button>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <Title :level="3" class="mb-4 uppercase">Customize Your Interface</Title>
      <Paragraph class="mx-auto mb-4 max-w-3xl">
        Switch between day and night mode to make your ONEEX trading experience more comfortable.
        We believe our customers deserve better conditions and more custom settings.
      </Paragraph>
      <ThemeToggle />
    </div>
  </section>
</template>
