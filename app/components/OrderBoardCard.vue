<script setup>
const props = defineProps({
  order: Object
})
</script>

<template>
  <div
    class="order-board__item"
  >
    <NuxtLink
      :to="`/orders/${order.orderID}`"
      class="order-board__link"
    >
      {{ order.orderID }}
    </NuxtLink>
  </div>
</template>