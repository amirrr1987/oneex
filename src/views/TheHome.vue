<script setup lang="ts">
import { reactive, ref } from 'vue'
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

const market = useMarketStore()
const { rows, platformStats } = storeToRefs(market)

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

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'max24' as const, label: '24 Max Price' },
  { key: 'min24' as const, label: '24 Min Price' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const features = [
  { title: 'Official Licenses', icon: 'bi-shield-check', text: 'ONEEX acquired all necessary official licenses for providing exchange services.' },
  { title: 'ECC API', icon: 'bi-key', text: 'We store only the public key using EdDSA — no API secrets on our servers.' },
  { title: 'Trade Mining', icon: 'bi-gem', text: 'Earn TIC tokens simply for trading on the platform every day.' },
  { title: 'Lowest Fees', icon: 'bi-percent', text: '0% deposit fee and up to 0.05% maker/taker trading fee.' },
  { title: 'Loyalty Program', icon: 'bi-gift', text: 'Hold TIC tokens and receive daily bounties in various cryptocurrencies.' },
  { title: 'Media Object', icon: 'bi-newspaper', text: 'Stay informed with integrated market news and updates.' },
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
    <div class="container">
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-6">
          <h1 class="text-uppercase fw-bold d-inline-flex align-items-center justify-content-center gap-3 flex-wrap">
            <BrandLogo to="/" :show-text="false" size="lg" />
            ONEEX
            <br class="d-sm-none" />
            Exchange of Tomorrow
          </h1>
        </div>
      </div>
      <div class="row justify-content-center text-center mb-4">
        <div class="col-lg-7">
          <p class="text-muted mb-0">
            ONEEX is a licensed trading platform for cryptocurrencies and assets, built on vanguard
            security infrastructure and a revolutionary reward system.
          </p>
        </div>
      </div>
      <div class="row justify-content-center d-none d-sm-flex">
        <div class="col-lg-6">
          <form class="row g-2" @submit.prevent="onNewsletterSubmit">
            <div class="col-md-7">
              <input
                v-model="newsletterForm.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': newsletterErrors?.email?.length }"
                placeholder="Enter Email Address"
              />
              <div v-if="newsletterErrors?.email?.length" class="invalid-feedback d-block">
                {{ newsletterErrors.email[0]?.message }}
              </div>
            </div>
            <div class="col-md-5">
              <button type="submit" class="btn btn-primary w-100" :disabled="!newsletterForm.email">
                Create Account
              </button>
            </div>
          </form>
          <p v-if="newsletterMessage" class="small text-success mt-2 mb-0">{{ newsletterMessage }}</p>
        </div>
      </div>
      <div class="row justify-content-center d-sm-none g-2">
        <div class="col-8">
          <RouterLink class="btn btn-outline-primary w-100 mb-2" to="/sign-in">Sign in ONEEX</RouterLink>
          <RouterLink class="btn btn-primary w-100" to="/sign-up">Create Account</RouterLink>
        </div>
      </div>
      <div class="row justify-content-center mt-5 d-none d-md-block">
        <div class="col-lg-10">
          <CoinTabs v-model="activeCoin" />
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light pb-5">
    <div class="container">
      <div class="row justify-content-center d-none d-md-flex">
        <div class="col-lg-10">
          <div class="card shadow-sm">
            <div class="card-body p-0">
              <div class="table-responsive">
                <SortableTable :columns="columns" :rows="rows" row-key="market" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-md-none">
        <SwipeCarousel v-model="featureSlide" :length="rows.length">
          <div v-for="row in rows" :key="row.market" class="px-1">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="mb-3">{{ row.market }}</h5>
                <dl class="row small mb-0">
                  <dt class="col-5 text-muted">Last Price</dt>
                  <dd class="col-7">{{ row.lastPrice }}</dd>
                  <dt class="col-5 text-muted">24 Change</dt>
                  <dd class="col-7">{{ row.change24 }}</dd>
                  <dt class="col-5 text-muted">Volume</dt>
                  <dd class="col-7">{{ row.volume24 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </SwipeCarousel>
        <p class="text-center text-muted small mt-2 mb-0">Swipe markets left or right</p>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row g-4 text-center">
        <div
          v-for="(stat, index) in platformStats"
          :key="stat.id"
          v-motion
          class="col-md-4"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 500 } }"
        >
          <div class="card h-100 border-0 shadow-sm position-relative">
            <div class="card-body">
              <AppTooltip text="Refresh live stat">
                <button
                  type="button"
                  class="btn btn-link position-absolute top-0 end-0 text-secondary"
                  aria-label="Refresh"
                  @click="refreshStat(stat.id)"
                >
                  <span v-if="refreshing[stat.id]" class="spinner-border spinner-border-sm" role="status" />
                  <i v-else class="bi bi-arrow-clockwise" />
                </button>
              </AppTooltip>
              <i :class="['bi', stat.icon, 'display-4', 'text-primary', 'mb-3']" />
              <h4>
                <AnimatedCounter
                  :value="stat.numericValue"
                  :prefix="stat.prefix"
                  :suffix="stat.suffix"
                />
              </h4>
              <p class="text-muted mb-0">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light py-5">
    <div class="container">
      <h3
        v-motion
        class="text-center text-uppercase mb-5"
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 500 } }"
      >
        Our Features and Benefits
      </h3>

      <div class="row g-4 d-none d-md-flex">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          v-motion
          class="col-md-6 col-lg-4"
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: index * 80, duration: 450 } }"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <i :class="['bi', feature.icon, 'fs-1', 'text-primary', 'mb-3']" />
              <h5 class="text-uppercase">{{ feature.title }}</h5>
              <p class="text-muted small mb-0">{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="d-md-none">
        <SwipeCarousel :length="features.length">
          <div v-for="feature in features" :key="feature.title" class="px-1">
            <div class="card shadow-sm h-100">
              <div class="card-body text-center">
                <i :class="['bi', feature.icon, 'fs-1', 'text-primary', 'mb-3']" />
                <h5 class="text-uppercase">{{ feature.title }}</h5>
                <p class="text-muted small mb-0">{{ feature.text }}</p>
              </div>
            </div>
          </div>
        </SwipeCarousel>
      </div>
    </div>
  </section>

  <section
    v-motion
    class="bg-secondary text-white py-5"
    :initial="{ opacity: 0 }"
    :visible-once="{ opacity: 1, transition: { duration: 600 } }"
  >
    <div class="container">
      <h3 class="text-center text-uppercase mb-4">TIC Token</h3>
      <div class="row g-4 align-items-start">
        <div class="col-lg-6">
          <p class="mb-0">
            ONEEX created the TIC token to stimulate platform growth, serve users, and reward loyalty.
          </p>
        </div>
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li v-for="benefit in tokenBenefits" :key="benefit" class="mb-2">
              <i class="bi bi-check-circle me-2" />
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-center mt-5">
        <RouterLink class="btn btn-primary btn-lg px-5" to="/get-tic-token">Get TIC Token</RouterLink>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container text-center">
      <h3 class="text-uppercase mb-4">Customize Your Interface</h3>
      <p class="text-muted col-lg-8 mx-auto mb-4">
        Switch between day and night mode to make your ONEEX trading experience more comfortable.
        We believe our customers deserve better conditions and more custom settings.
      </p>
      <ThemeToggle />
    </div>
  </section>
</template>
