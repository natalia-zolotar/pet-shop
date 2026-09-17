<script setup>
import { useLocalization } from '~~/localization'
import { removeOrderFromDB } from "@/api/orders"
import { orders, connectOrdersSocket, disconnectOrdersSocket } from "@/websocket/websocket"
const { locale, t } = useLocalization()

onMounted(() => {
  connectOrdersSocket()
})

onUnmounted(() => {
  disconnectOrdersSocket()
})

const sortedOrders = computed(() => {
  return [...orders.value].sort(
    (a, b) => Number(b.orderID) - Number(a.orderID)
  )
})
</script>

<template>
  <div class="wrapper">
    <Header />

    <div class="heading">
      <div class="section">
        <h1>{{ t?.orders?.title }}</h1>
      </div>
    </div>

    <main class="main">
      <div class="section">
        <div
          v-if="orders && orders.length"
          class="orders-list"
        >
          <div
            v-for="order in sortedOrders"
            :key="order.orderID"
            class="order-card"
          >
            <div class="order-card__info">
              <h2>{{ t?.orders?.order }} #{{ order.orderID }}</h2>

              <ul class="order-items">
                <li
                  v-for="item in order.items"
                  :key="item.id"
                >
                  {{ item.translations?.[locale]?.title }}
                </li>
              </ul>

              <strong class="order-total">{{ order.total }} zł</strong>
              <div class="order-actions">
                <NuxtLink
                  :to="`/orders/${order.orderID}`"
                  class="btn-secondary btn-secondary--small"
                >
                  {{ t?.orders?.btn?.viewOrder }}
                </NuxtLink>
                <button
                  class="btn-default"
                  @click="removeOrderFromDB(order.orderID)"
                >
                  {{ t?.orders?.btn?.removeOrder }}
                </button>
              </div>
            </div>
            
            <OrderStatus
              :order="order"
            />
          </div>
        </div>

        <p v-else>{{ t?.orders?.emptyOrder }}</p>
      </div>
    </main>
  </div>
</template>