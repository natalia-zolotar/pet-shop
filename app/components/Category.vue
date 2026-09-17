<script setup>
import { useLocalization } from '~~/localization'
import { sortedProducts } from "@/store/products"
import { moveCategory } from "@/store/categories"
import { openModal } from "@/store/modal"

const { t, locale } = useLocalization()

const props = defineProps({
  item: Object,
  index: Number
})

// open/close category content
const openedCategoryContent = ref(false)
const toggleCategoryContent = () => {
  openedCategoryContent.value = !openedCategoryContent.value
}
</script>

<template>
  <div class="products-category__head">
    <div class="products-category__head-left">

      <div class="products-category__sort">
        <button
          :title="t?.manageProducts?.btn?.moveCategoryPrev"
          :disabled="index === 0"
          @click="moveCategory(item, sortedProducts[index - 1])"
        >⬆️</button>
        <button
          :title="t?.manageProducts?.btn?.moveCategoryNext"
          :disabled="index === sortedProducts.length - 1"
          @click="moveCategory(item, sortedProducts[index + 1])"
        >⬇️</button>
      </div>

      <div class="products-category__info">
        <h2>{{ item.translations?.[locale]?.title }}</h2>
      </div>
    </div>

    <div class="products-category__actions">
      <button
        class="btn-default"
        @click="openModal('addProduct', null, item)"
      >
        ➕ {{ t?.manageProducts?.btn?.addProduct }}
      </button>
      <button
        class="btn-default"
        @click="openModal('editCategory', 'sm', item)"
      >
        {{ t?.manageProducts?.btn?.editCategory }}
      </button>
      <button
        class="btn-default"
        @click="openModal('removeCategory', 'sm', item)"
      >
        {{ t?.manageProducts?.btn?.removeCategory }}
      </button>
      <button
        :title="
          openedCategoryContent
            ? t?.manageProducts?.btn?.closeContent
            : t?.manageProducts?.btn?.openContent
        "
        class="btn-default"
        @click="toggleCategoryContent()"
      >
        {{ openedCategoryContent ? '▲' : '▼' }}
      </button>
    </div>
  </div>

  <div v-if="openedCategoryContent" class="products-category__content">
    <div class="products-grid">
      <ProductCard
        v-for="(product, index) in item.products"
        :key="product.id"
        :categoryItem="item"
        :product="product"
        :index="index"
      />

      <article class="product-card product-card--add">
        <button @click="openModal('addProduct', null, item)">
          ➕ {{ t?.manageProducts?.btn?.addProduct }}
        </button>
      </article>
    </div>
  </div>
</template>