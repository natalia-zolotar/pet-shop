<script setup>
import { useLocalization } from '~~/localization'
import { sortedProducts } from "@/store/products"

const { locale, t } = useLocalization()
</script>

<template>
  <div class="wrapper menupage">
    <Header2 />

    <main class="main">
      <div class="section">
        <div class="menu__title">
          <h1>{{ t?.menu?.title }}</h1>
        </div>

        <div class="menu">
          <div
            v-for="category in sortedProducts"
            :key="category.id"
            class="menu__category"
          >
            <h2>{{ category.translations?.[locale]?.title }}</h2>

            <div class="menu__list">
              <MenuProduct
                v-for="product in category.products"
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>