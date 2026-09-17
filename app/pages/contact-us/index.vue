<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()
</script>

<template>
  <div class="wrapper">
    <Header />

    <div class="heading">
      <div class="section">
        <h1>{{ t?.contactUsPage?.title }}</h1>
      </div>
    </div>

    <main class="main">
      <div class="section">
        <p
          v-for="(paragraph, index) in t?.contactUsPage?.text || []"
          :key="index"
          v-html="paragraph"
        >
        </p>
      </div>
    </main>
  </div>
</template>