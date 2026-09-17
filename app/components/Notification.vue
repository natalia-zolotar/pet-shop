<script setup>
import { dataNotification } from '@/store/notification.js'
</script>

<template >
  <div class="notification" :class="[dataNotification?.type, dataNotification?.is ? 'open': 'close']">{{ dataNotification?.message }}</div>
</template>