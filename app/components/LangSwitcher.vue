<script setup>
import { useLocalization, locales } from '~~/localization'
const { locale, setLocale } = useLocalization()
</script>

<template>
  <ul class="language-list">
    <li
      v-for="code in locales"
      :key="code"
      :class="{ active: locale === code }"
      @click="setLocale(code)"
    >
      {{ code.toUpperCase() }}
    </li>
  </ul>
</template>