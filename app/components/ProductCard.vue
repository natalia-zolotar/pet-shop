<script setup>
import { useLocalization } from '~~/localization'
import { moveProduct } from "@/store/products"
import { openModal } from "@/store/modal"

const { t, locale } = useLocalization()

defineProps({
  categoryItem: Object,
  product: Object,
  index: Number
})
</script>

<template>
  <article class="product-card">
    <img
      :src="product?.img || 'https://placehold.co/300x200'"
      :alt="product.translations?.[locale]?.title || 'Product image'"
      style="aspect-ratio: 16 / 10"
    >

    <h3>{{ product.translations?.[locale]?.title }}</h3>

    <p>{{ product.translations?.[locale]?.desc }}</p>

    <div class="product-card__footer">
      <span>
        {{ product.price }} zł
      </span>

      <div class="product-card__actions">
        <button
          :title="t?.manageProducts?.btn?.editProduct"
          @click="openModal('editProduct', null, product)"
        >
          📝
        </button>

        <button
          :title="t?.manageProducts?.btn?.removeProduct"
          @click="openModal('removeProduct', 'sm', product)"
        >
          🗑
        </button>
      </div>
    </div>

    <div class="product-card__sort">
      <button
        :disabled="index === 0"
        class="btn-default"
        :title="t?.manageProducts?.btn?.moveProductPrev"
        @click="moveProduct(product, categoryItem.products[index - 1])"
      >
        🢀
      </button>

      <button
        :disabled="index === categoryItem.products.length - 1"
        class="btn-default"
        :title="t?.manageProducts?.btn?.moveProductNext"
        @click="moveProduct(product, categoryItem.products[index + 1])"
      >
        🢂
      </button>
    </div>
  </article>
</template>