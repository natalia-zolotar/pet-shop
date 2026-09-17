<script setup>
import { useLocalization } from '~~/localization'
import { orders, connectOrdersSocket, disconnectOrdersSocket } from "@/websocket/websocket"
import { updateOrderStatusDB } from "@/api/orders"
import { orderStatusLabels, board } from "@/store/orders"
import draggable from 'vuedraggable'
const { t } = useLocalization()

definePageMeta({
  middleware: 'admin'
})

onMounted(() => {
  connectOrdersSocket()
})

onUnmounted(() => {
  disconnectOrdersSocket()
})

watch(orders, (newOrders) => {
  Object.keys(board.value).forEach(status => {
    board.value[status] = newOrders.filter(
      order => order.status === status
    )
  })
}, { immediate: true })

async function onColumnAdd(event, status) {
  const order = board.value[status][event.newIndex]

  if (!order) return

  await updateOrderStatusDB(
    order.orderID,
    status
  )
}
</script>

<template>
  <div class="wrapper">
    <Header3 />

    <main class="main">
      <div class="orders-board">
        <div
          v-for="status in orderStatusLabels"
          :key="status"
          class="orders-column"
        >
          <h2 class="orders-column__title">
            {{ t?.orders?.statusLabel?.[status] }}
          </h2>

          <draggable
            v-model="board[status]"
            :group="{ name: 'orders' }"
            item-key="orderID"
            class="orders-column__list"
            @add="(event) => onColumnAdd(event, status)"
          >
            <template #item="{ element }">
              <OrderBoardCard :order="element" />
            </template>
          </draggable>
        </div>
      </div>
    </main>
  </div>
</template>