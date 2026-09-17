<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()

// for navliks active state
const route = useRoute()
const isActive = (path) => route.path === path
</script>

<template>
  <header class="header">
    <div class="section">
      <div class="header__top">
        <AuthUser />

        <LangSwitcher />
      </div>
      
      <div class="header__inner">
        <NuxtLink to="/" class="logo">MealGo</NuxtLink>

        <nav class="nav">
          <li
            :class="{ active: isActive('/menu') }"
            v-if="!route.meta.isHomePage"
          >
            <NuxtLink to="/menu" class="nav__link">
              {{ t?.nav?.menu }}
            </NuxtLink>
          </li>
          <li :class="{ active: isActive('/how-it-works') }">
            <NuxtLink to="/how-it-works" class="nav__link">
              {{ t?.nav?.howItWorks }}
            </NuxtLink>
          </li>
          <li :class="{ active: isActive('/contact-us') }">
            <NuxtLink to="/contact-us" class="nav__link">
              {{ t?.nav?.contacts }}
            </NuxtLink>
          </li>
          <li
            :class="{ active: isActive('/orders') }"
            v-if="!route.meta.isHomePage"
          >
            <NuxtLink to="/orders" class="nav__link">
              {{ t?.nav?.orders }}
            </NuxtLink>
          </li>
        </nav>
        
      </div>
    </div>
  </header>
</template>