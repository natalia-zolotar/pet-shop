<script setup>
import { useLocalization } from '~~/localization'
import { orders, connectOrdersSocket, disconnectOrdersSocket } from "@/websocket/websocket"

const { locale, t } = useLocalization()
const route = useRoute()
const orderID = route.params.id

const order = computed(() => {
  return orders.value.find(
    item => item.orderID === orderID
  )
})

onMounted(() => {
  connectOrdersSocket()
})

onUnmounted(() => {
  disconnectOrdersSocket()
})
</script>

<template>
  <div class="wrapper">
    <Header />

    <main class="main">
      <div class="section">

        <div v-if="order" class="full-order-card">
          <div class="full-order-card__header">
            <div>
              <span class="full-order-card__label">{{ t?.orders?.order }}</span>
              <h1>#{{ orderID }}</h1>
            </div>

            <div class="full-order-card__status">
              <span>{{ t?.orders?.status }}</span>
              <strong>{{ t?.orders?.statusLabel[order.status] }}</strong>
            </div>
          </div>

          <div v-if="order" class="full-order-card__content">

            <section class="full-order-card__section">
              <h2>{{ t?.orders?.orderItems }}</h2>

              <ul class="full-order-card__items">
                <li
                  v-for="item in order.items"
                  :key="item.id"
                  class="full-order-card__item"
                >
                  <div class="full-order-card__item-info">
                    <h3>
                      {{ item.translations?.[locale]?.title }}
                    </h3>

                    <p v-if="item.translations?.[locale]?.desc">
                      {{ item.translations?.[locale]?.desc }}
                    </p>

                    <span>
                      {{ item.price }} zł × {{ item.amount }}
                    </span>
                  </div>

                  <strong class="full-order-card__item-total">
                    {{ item.total }} zł
                  </strong>
                </li>
              </ul>
            </section>

            <section class="full-order-card__section">
              <h2>{{ t?.delivery?.title }}</h2>

              <dl class="full-order-card__details">
                <div>
                  <dt>{{ t?.delivery?.label?.name }}</dt>
                  <dd>{{ order.delivery?.name || '—' }}</dd>
                </div>

                <div>
                  <dt>{{ t?.delivery?.label?.phone }}</dt>
                  <dd>{{ order.delivery?.phone || '—' }}</dd>
                </div>

                <div>
                  <dt>{{ t?.delivery?.label?.address }}</dt>
                  <dd>{{ order.delivery?.address || '—' }}</dd>
                </div>

                <div>
                  <dt>{{ t?.delivery?.label?.note }}</dt>
                  <dd>{{ order.delivery?.note || '—' }}</dd>
                </div>
              </dl>
            </section>

          </div>

          <div class="full-order-card__footer">
            <span>{{ t?.checkout?.total }}</span>
            <strong>{{ order?.total }} zł</strong>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>