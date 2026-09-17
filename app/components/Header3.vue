<script setup>
import { useLocalization } from '~~/localization'
const { t } = useLocalization()

const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <header class="header header--3">
    <div class="section">
      <div class="header__top">
        <AuthUser />
        
        <LangSwitcher />
      </div>
      
      <div class="header__inner">
        <NuxtLink
          :to="type === 'checkout' ? '/menu' : '/'"
          class="btn-secondary back-home"
        >
          ❮ {{ type === 'checkout' ? t?.backToMenu : t?.backToHome }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>