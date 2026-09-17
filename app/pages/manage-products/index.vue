<script setup>
import { useLocalization } from '~~/localization'
import { sortedProducts } from "@/store/products"
import { openModal } from "@/store/modal"
const { t } = useLocalization()

definePageMeta({
  middleware: 'admin'
})
</script>

<template>
  <div class="manage-products">
    <Header3 />

    <main class="main">
      <div class="section">
        <div class="manage-products__header">
          <h1>{{ t?.manageProducts?.title }}</h1>
          <button
            class="btn-primary"
            @click="openModal('addCategory', 'sm')"
          >
            ✚ {{ t?.manageProducts?.btn?.addCategory }}
          </button>
        </div>

        <div
          v-if="sortedProducts.length"
          v-for="(item, index) in sortedProducts"
          :key="item.id"
          class="products-category"
        >
          <Category
            :item="item"
            :index="index"
          />
        </div>
        <div v-else>
          <p>{{ t?.manageProducts?.noCategoryText }}</p>
        </div>

      </div>
    </main>

    <Modal />

  </div>

  <Notification />
  
</template>