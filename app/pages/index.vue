<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()

definePageMeta({
  isHomePage: true
})
</script>

<template>
  <div class="wrapper homepage">
    <Header />

    <main class="main">
      <div class="section">
        <div class="content">
          <h1>
            <b>{{ t?.homePage?.title }}</b>
            <span>{{ t?.homePage?.subtitle }}</span>
          </h1>
          <p>{{ t?.homePage?.text }}</p>
          <div class="buttons">
            <NuxtLink to="/menu" class="btn-primary">
              {{ t?.homePage?.link1 }} ➜
            </NuxtLink>
            <NuxtLink to="/orders" class="btn-primary">
              {{ t?.homePage?.link2 }} ⚲
            </NuxtLink>
          </div>
          <ul class="features">
            <li
              v-for="feature in t?.homePage?.features"
              :key="feature.extraClass"
              :class="feature.extraClass"
            >
              <span>{{ feature.title }}</span>
              {{ feature.caption }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>