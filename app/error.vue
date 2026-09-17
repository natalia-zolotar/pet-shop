<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <div class="error-page__code">404</div>

      <h1 class="error-page__title">{{ t?.error404?.title }}</h1>
      <p class="error-page__text">{{ t?.error404?.text }}</p>

      <NuxtLink
        to="/"
        class="btn-primary"
      >
        {{ t?.backToHome }}
      </NuxtLink>
    </div>
  </div>
</template>