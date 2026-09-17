<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()
</script>

<template>
  <Header />

  <div class="heading">
    <div class="section">
      <h1>{{ t?.howItWorksPage?.title }}</h1>
    </div>
  </div>

  <main class="main">
    <div class="section">
      <picture>
        <source media="(min-width: 576px)" srcSet="/how-it-works.webp" />
        <img
          src="/how-it-works-mobile.webp"
          :alt="t?.howItWorksPage?.title"
          class="full-width-image"
        />
      </picture>
      <p
        v-for="(paragraph, index) in t?.howItWorksPage?.text"
        :key="index"
        v-html="paragraph"
      >
      </p>
    </div>
  </main>
</template>