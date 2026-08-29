<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useHoverDropdown } from '@/composables/useHoverDropdown'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import BrandLogo from '@/components/shared/BrandLogo.vue'

const route = useRoute()

const transactionMenu = ref<HTMLElement>()
const accountMenu = ref<HTMLElement>()

const transactionHover = useHoverDropdown(transactionMenu)
const accountHover = useHoverDropdown(accountMenu)

const isTransactionActive = computed(() =>
  ['/deposit', '/withdraw', '/withdraw-history'].includes(route.path),
)
</script>

<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="container-fluid">
        <BrandLogo to="/exchange" />

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/exchange">Exchange</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/markets">Markets</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/balance">Balance</RouterLink>
            </li>
            <li
              ref="transactionMenu"
              class="nav-item dropdown"
              @mouseenter="transactionHover.onPointerEnter"
              @mouseleave="transactionHover.onPointerLeave"
            >
              <a
                id="transactionDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                :class="{ active: isTransactionActive }"
              >
                Transaction
              </a>
              <ul class="dropdown-menu" aria-labelledby="transactionDropdown">
                <li><RouterLink class="dropdown-item" to="/deposit">Deposit</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/withdraw">Withdraw</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/withdraw-history">Withdraw History</RouterLink></li>
              </ul>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/trade-history">Trade History</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/reports">Reports</RouterLink>
            </li>
          </ul>

          <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
            <li class="nav-item">
              <ThemeToggle />
            </li>
            <li
              ref="accountMenu"
              class="nav-item dropdown"
              @mouseenter="accountHover.onPointerEnter"
              @mouseleave="accountHover.onPointerLeave"
            >
              <a
                id="accountDropdown"
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Account menu"
              >
                <i class="bi bi-person-circle fs-5" />
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li><RouterLink class="dropdown-item" to="/profile">Profile</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/security">Security</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/last-ten-login">Last 10 Login</RouterLink></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item d-flex align-items-center gap-2" to="/logout">
                    <i class="bi bi-box-arrow-right" />
                    Logout
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <RouterLink class="btn btn-primary" to="/get-tic-token">Get TIC Token</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@media (min-width: 992px) {
  .dropdown:hover > .dropdown-toggle {
    color: var(--bs-primary);
  }

  .dropdown-menu {
    margin-top: 0;
  }
}
</style>
