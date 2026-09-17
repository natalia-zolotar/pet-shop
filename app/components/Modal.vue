<script setup>
import { useLocalization } from '~~/localization'
import { modal } from "@/store/modal"
import { createCategory, editCategory, removeCategory } from "@/store/categories"
import { createProduct, editProduct, removeProduct } from "@/store/products"

const { t } = useLocalization()
</script>

<template>
  <div
    v-if="modal.isOpen"
    class="modal"
    :class="{
    'modal--sm': modal.size === 'sm'
  }"
  >
    <div class="modal__content">
      <div class="modal__inner">
        <CategoryForm
          v-if="modal.type === 'addCategory'"
          :saveItem="createCategory"
          :msg="t?.categoryForm?.categoryAddedMessage"
        />
        <CategoryForm
          v-else-if="modal.type === 'editCategory'"
          :edit="true"
          :item="modal.item"
          :saveItem="editCategory"
          :msg="t?.categoryForm?.categoryChangedMessage"
        />
        <ProductForm
          v-else-if="modal.type === 'addProduct'"
          :item="modal.item"
          :saveItem="createProduct"
          :msg="t?.productForm?.productAddedMessage"
        />
        <ProductForm
          v-else-if="modal.type === 'editProduct'"
          :edit="true"
          :item="modal.item"
          :saveItem="editProduct"
          :msg="t?.productForm?.productUpdatedMessage"
        />
        <ConfirmDelete
          v-else-if="modal.type === 'removeCategory'"
          :item="modal.item"
          :removeItem="removeCategory"
          :msg="t?.categoryForm?.categoryRemovedMessage"
        />
        <ConfirmDelete
          v-else-if="modal.type === 'removeProduct'"
          :item="modal.item"
          :removeItem="removeProduct"
          :msg="t?.productForm?.productRemovedMessage"
        />
      </div>
    </div>
  </div>
</template>