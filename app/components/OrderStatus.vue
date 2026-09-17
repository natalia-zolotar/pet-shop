<script setup>
import { useLocalization } from '~~/localization'
import { orderStatusLabels } from "~/store/orders"
const { t } = useLocalization()

defineProps({
  order: Object
})

const getStatusIndex = (status) => {
  return orderStatusLabels.indexOf(status)
}
</script>

<template>
  <div class="order-card__status">
    <div
      v-for="status in orderStatusLabels"
      :key="status"
      class="order-step"
      :class="{
        active: getStatusIndex(order.status) >= getStatusIndex(status),
        current: order.status === status
      }"
    >
      <span class="order-step__dot" />

      <span class="order-step__label">
        {{ t?.orders?.statusLabel?.[status] }}
      </span>
    </div>
  </div>
</template>