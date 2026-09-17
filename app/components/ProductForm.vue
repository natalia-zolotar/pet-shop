<script setup>
import { useLocalization, locales } from '~~/localization'
import { showNotification } from "@/store/notification"
import { closeModal } from '@/store/modal'

const { t, locale } = useLocalization()

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  item: Object,
  saveItem: Function,
  msg: String
})

const activeLocale = ref(locale.value)
const imageUrl = ref('')
const imageKey = ref('')
const price = ref('')
const isImgLoading = ref(false)

const formFields = ref({
  en: {
    title: '',
    desc: '',
    titlePlaceholder: 'Margherita Pizza',
    descPlaceholder: 'Classic pizza with tomato sauce and mozzarella cheese',
    error: false,
    tabError: false
  },
  ua: {
    title: '',
    desc: '',
    titlePlaceholder: 'Піца Маргарита',
    descPlaceholder: 'Класична піца з томатним соусом та сиром моцарела',
    error: false,
    tabError: false
  },
  pl: {
    title: '',
    desc: '',
    titlePlaceholder: 'Pizza Margherita',
    descPlaceholder: 'Klasyczna pizza z sosem pomidorowym i serem mozzarella',
    error: false,
    tabError: false
  }
})

const handleImage = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  // show loader
  isImgLoading.value = true

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })

    imageUrl.value = response.url
    imageKey.value = response.key
  } catch (error) {
    console.error('Image upload error:', error)
  } finally {
    isImgLoading.value = false
  }
}

// for changes
watch(
  () => props.item,
  (item) => {
    if (!props.edit || !item) return

    locales.forEach(lang => {
      formFields.value[lang].title = item.translations?.[lang]?.title || ''
      formFields.value[lang].desc = item.translations?.[lang]?.desc || ''
    })

    price.value = item.price
    imageUrl.value = item.img || ''
    imageKey.value = item.imgKey || ''
  },
  { immediate: true }
)

const hasPrice = () => {
  return price.value !== '' && Number(price.value) > 0
}

// Check if at least one field is filled
const hasTitle = () => {
  locales.forEach(lang => {
    formFields.value[lang].error = false
  })

  const hasValue = Object.values(formFields.value)
    .some(field => field.title.trim())

  if (!hasValue) {
    locales.forEach(lang => {
      formFields.value[lang].error = true
    })
  }

  return hasValue
}

// Fill empty fields with the first filled value
const fillEmptyFields = () => {
  const defaultTitle = Object.values(formFields.value)
    .find(field => field.title.trim())
    ?.title.trim()

  if (!defaultTitle) return

  Object.values(formFields.value).forEach(field => {
    if (!field.title.trim()) {
      field.title = defaultTitle
    }
  })
}

const prepareProductData = async () => {
  if (!hasPrice()) {
    return showNotification(t.value?.productForm?.missingPriceMessage, 'ERROR')
  }

  if (!hasTitle()) {
    return showNotification(t.value?.productForm?.missingTitleFieldsMessage, 'ERROR')
  }
  
  fillEmptyFields()

  const normalizedPrice = Number(
    String(price.value).replace(',', '.')
  )

  const data = {
    price: normalizedPrice,
    translations: {}
  }

  if (imageUrl.value) {
    data.img = imageUrl.value
    data.imgKey = imageKey.value
  }

  Object.keys(formFields.value).forEach(lang => {
    data.translations[lang] = {
      title: formFields.value[lang].title.trim()
    }

    if (formFields.value[lang].desc.trim()) {
      data.translations[lang].desc = formFields.value[lang].desc.trim()
    }
  })

  props.saveItem(data, props.item?.id, props.msg)

  closeModal()
}
</script>

<template>
  <div class="product-form">
    <div class="product-form__columns">
      <div class="product-form__column-left">
        <h3>
          {{ edit
            ? t?.productForm?.titleEdit
            : t?.productForm?.titleAdd
          }}
        </h3>

        <div class="product-form__price">
          <label for="price">
            {{ t?.productForm?.labels?.price }}, ZŁ *
          </label>

          <input
            id="price"
            v-model="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="12.99"
            inputmode="decimal"
          >
        </div>

        <div class="product-image-upload">
          <label
            for="product-image"
          >
            {{ t?.productForm?.btn?.chooseImage }}
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            @change="handleImage"
          >
          <div class="image-upload__preview">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              style="aspect-ratio: 16 / 10"
            >
          </div>
        </div>
      </div>
      
      <div class="product-form__column-right">
        <div class="product-form__tabs">
          <button
            v-for="lang in locales"
            :key="lang"
            type="button"
            :class="{
              active: activeLocale === lang,
              error: formFields[lang]?.tabError
            }"
            @click="activeLocale = lang"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>

        <div class="product-form__tab-content">
          <div class="product-form__row">
            <label>
              {{ t?.productForm?.labels?.title }}*
            </label>
            <input
              v-model="formFields[activeLocale].title"
              type="text"
              :class="{
                'input-error': formFields[activeLocale].error
              }"
              :placeholder="formFields[activeLocale].titlePlaceholder"
            >
          </div>

          <div class="product-form__row">
            <label>
              {{ t?.productForm?.labels?.desc }}
            </label>
            <textarea
              v-model="formFields[activeLocale].desc"
              rows="5"
              :placeholder="formFields[activeLocale].descPlaceholder"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="product-form__actions">
      <button
        class="btn-secondary btn-secondary--small"
        @click="prepareProductData"
      >
        {{
          edit
            ? t?.productForm?.btn?.saveChangedProduct
            : t?.productForm?.btn?.saveNewProduct
        }}
      </button>

      <button
        class="btn-default"
        @click="closeModal"
      >
        {{ t?.productForm?.btn?.cancel }}
      </button>
    </div>
  </div>
  <div v-if="isImgLoading" class="product-form__loader">
    <div class="loader"></div>
  </div>
</template>

