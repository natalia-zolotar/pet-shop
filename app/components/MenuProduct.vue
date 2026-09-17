<script setup>
import { useLocalization } from '~~/localization'
import { updateCartItems, cartItems } from "@/store/cart"

const { locale, t } = useLocalization()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const amount = computed(() =>
  cartItems.value?.[props.product.id]?.amount || 0
)

const addToCart = () => {
  updateCartItems(props.product, 1)
}
</script>

<template>
  <div class="menu__card">
    <div class="menu-card__content">
      <img
        v-if="product.img"
        :src="product.img"
        :alt="product.translations?.[locale]?.title"
        style="aspect-ratio: 16 / 10"
      >

      <h3>{{ product.translations?.[locale]?.title }}</h3>

      <p v-if="product.translations?.[locale]?.desc">
        {{ product.translations?.[locale]?.desc }}
      </p>

      <div class="menu-card__bottom">
        <div class="menu-card__info">
          <span>{{ product.price }} zł</span>

          <button
            v-if="!amount"
            class="menu-card__buy"
            type="button"
            :title="t?.menu?.btn?.buy"
            @click="addToCart"
          >+</button>
        </div>

        <div
          v-if="amount"
          class="menu-card__order"
        >
          <ProductAmount
            :item="product"
            :amount="amount"
          />
        </div>
      </div>
      
    </div>
  </div>
</template>