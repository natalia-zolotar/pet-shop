<script setup>
import { useLocalization } from '~~/localization'
import { count } from "@/store/cart"
const { t } = useLocalization()
</script>

<template>
  <header class="header header--2">
    <div class="section">
      <div class="header__top">
        <AuthUser />
        
        <LangSwitcher />
      </div>
      
      <div class="header__inner">
        <NuxtLink to="/" class="logo">MealGo</NuxtLink>

        <NuxtLink to="/checkout" class="shopping-cart">
          <span class="icon">{{ t?.cart?.shoppingCartIconAlt }}</span>
          <span v-if="count" class="count">{{ count }}</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>