<script setup>
import { useLocalization } from '~~/localization'
import { user, logoutUser } from '@/store/user'
const { t } = useLocalization()
const route = useRoute()
</script>

<template>
  <div class="auth-user">
    <div v-if="user.isLogin" class="auth-user__inner">
      <nav class="auth-user__nav">
        <NuxtLink to="/manage-products">{{ t?.nav?.manageProducts }}</NuxtLink>
        <NuxtLink to="/orders-board">{{ t?.nav?.ordersBoard }}</NuxtLink>
      </nav>

      <span class="auth-user__name">
        {{ user.name }}
      </span>

      <button
        class="auth-user__logout"
        type="button"
        @click="logoutUser()"
      >
        {{ t?.login?.logout }}
      </button>
    </div>

    <NuxtLink
      v-else
      :to="`/login?redirect=${route.fullPath}`"
    >
      {{ t?.login?.login }}
    </NuxtLink>
  </div>
</template>