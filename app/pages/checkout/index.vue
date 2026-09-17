<script setup>
import { useLocalization } from '~~/localization'
import { addOrderToDB } from "@/api/orders"
import { updateCartItems, cartItems, setCartItemsToLocalStorage } from "@/store/cart"
import { showNotification } from "@/store/notification"
const { locale, t } = useLocalization()

const deliveryName = 'delivery'
const deliveryInfo = ref({
  name: '',
  phone: '',
  address: '',
  note: ''
})
const phoneError = ref(false)

const getDeliveryInfoFromLocal = () => {
  const dataJSON = localStorage.getItem(deliveryName)
  if (!dataJSON) return {}
  return JSON.parse(dataJSON)
}

Object.assign(
  deliveryInfo.value,
  getDeliveryInfoFromLocal()
)

const clearCart = () => {
  cartItems.value = {}
  setCartItemsToLocalStorage(cartItems.value)
}

const getAllSum = computed(() => {
  return Number(
    Object.values(cartItems.value)
      .reduce((sum, item) => sum + item.total, 0)
      .toFixed(2)
  )
})

const validateDeliveryInfo = () => {
  const phoneRegex = /^[+]?[0-9\s()-]{10,20}$/
  return phoneRegex.test(deliveryInfo.value.phone)
}

const placeOrder = async () => {
  phoneError.value = !validateDeliveryInfo()
  if (phoneError.value) return showNotification(t.value?.delivery?.invalidPhoneNumber, 'ERROR')

  localStorage.setItem(
    deliveryName,
    JSON.stringify(deliveryInfo.value)
  )

  const data = {
    delivery: deliveryInfo.value,
    items: Object.values(cartItems.value),
    total: getAllSum.value
  }

  const response = await addOrderToDB(data)

  if (response.is) {
    clearCart()
    return showNotification(t.value?.checkout?.orderAdded, 'SUCCESS')
  } else {
    return showNotification(response.text, 'ERROR')
  }
}
</script>

<template>
  <Header3 type="checkout" />

  <main class="main">
    <div class="section">
      <div v-if="cartItems && Object.keys(cartItems).length" class="checkout">

        <div class="cart">
          <div class="cart__header">
            <h2>{{ t?.checkout?.cartTitle }}</h2>
            <button
              type="button"
              class="btn-default"
              @click="clearCart"
            >
              {{ t?.checkout?.btn?.clearCart }}
            </button>
          </div>

          <div
            v-for="product in Object.values(cartItems)"
            :key="product.id"
            class="cart__item"
          >
            <div class="cart__info">
              <h3>{{ product.translations?.[locale]?.title }}</h3>
              <p>
                {{ product.price }} zł × {{ product.amount }}
              </p>
              <ProductAmount
                :item="product"
                :amount="product.amount"
              />
            </div>

            <div class="cart__actions">
              <strong class="cart__price">
                {{ product.total }} zł
              </strong>
              <button
                type="button"
                class="btn-ghost btn-ghost--dark btn-ghost--small"
                @click="updateCartItems(product, 0)"
              >
                {{ t?.checkout?.btn?.removeItem }}
              </button>
            </div>
          </div>

          <div class="cart__total">
            <span class="total">{{ t?.checkout?.total }}</span>
            <strong>
              {{ getAllSum }} zł
            </strong>
          </div>
        </div>
        
        <div class="delivery-form">
          <h2>{{ t?.delivery?.title }}</h2>

          <div class="form-group">
            <label for="name">{{ t?.delivery?.label?.name }}</label>
            <input
              id="name"
              type="text"
              v-model="deliveryInfo.name"
              :placeholder="t?.delivery?.label?.namePlaceholder"
            >
          </div>

          <div class="form-group">
            <label for="phone">{{ t?.delivery?.label?.phone }} *</label>
            <input
              id="phone"
              type="tel"
              v-model="deliveryInfo.phone"
              :class="{ 'input-error': phoneError }"
              placeholder="+48 123 456 789"
            >
          </div>

          <div class="form-group">
            <label for="address">{{ t?.delivery?.label?.address }}</label>
            <input
              id="address"
              type="text"
              v-model="deliveryInfo.address"
              :placeholder="t?.delivery?.label?.addressPlaceholder"
            >
          </div>

          <div class="form-group">
            <label for="notes">{{ t?.delivery?.label?.note }}</label>
            <textarea
              id="notes"
              v-model="deliveryInfo.note"
              :placeholder="t?.delivery?.label?.notePlaceholder"
            />
          </div>

          <button
            type="button"
            class="btn-primary w-full"
            @click="placeOrder"
          >
            {{ t?.checkout?.btn?.placeOrder }}
          </button>
        </div>
      </div>

      <p v-else>
        {{ t?.checkout?.emptyCart }} <br />
        <NuxtLink
          to="/orders"
        >
          {{ t?.nav?.orders }}
        </NuxtLink>
      </p>
    </div>
  </main>
  <Notification />
</template>