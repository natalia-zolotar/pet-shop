<script setup>
import { useLocalization, locales } from '~~/localization'
import { showNotification } from "@/store/notification"
import { categories } from "@/store/categories"
import { closeModal } from "@/store/modal"

const { t } = useLocalization()

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  item: Object,
  saveItem: Function,
  msg: String
})

const formFields = ref({
  en: {
    title: '',
    placeholder: 'Pizza',
    error: false
  },
  ua: {
    title: '',
    placeholder: 'Піца',
    error: false
  },
  pl: {
    title: '',
    placeholder: 'Pizza',
    error: false
  }
})

// for changes
watch(
  () => props.item,
  (item) => {
    if (!props.edit || !item) return

    locales.forEach(lang => {
      formFields.value[lang].title = item.translations?.[lang]?.title || ''
    })
  },
  { immediate: true }
)

// Check if at least one field is filled
const hasTitle = () => {
  return Object.values(formFields.value)
    .some(field => field.title.trim())
}

const hasDuplicateCategory = () => {
  // Reset all field errors before checking for duplicates
  locales.forEach(lang => {
    formFields.value[lang].error = false
  })

  let hasDuplicate = false

  categories.value.forEach(category => {
    // Skip current category when editing
    if (props.edit && category.id === props.item.id) {
      return
    }

    locales.forEach(lang => {
      if (
        category.translations?.[lang]?.title === formFields.value[lang].title.trim()
      ) {
        formFields.value[lang].error = true
        hasDuplicate = true
      }
    })
  })

  return hasDuplicate
}

// Fill empty fields with the first filled value
const fillEmptyFields = () => {
  const defaultTitle = Object.values(formFields.value)
    .find(field => field.title.trim())
    ?.title.trim()

  Object.values(formFields.value).forEach(field => {
    if (!field.title.trim()) {
      field.title = defaultTitle
    }
  })
}

const prepareCategoryData = async () => {
  if (!hasTitle()) {
    return showNotification(t.value?.categoryForm?.missingFieldsMessage, 'ERROR')
  }

  if (hasDuplicateCategory()) {
    return showNotification(t.value?.categoryForm?.duplicatedFieldsMessage, 'ERROR')
  }

  fillEmptyFields()

  const data = {}

  Object.keys(formFields.value).forEach(key => {
    data[key] = {
      title: formFields.value[key].title
    }
  })

  props.saveItem(data, props.item?.id, props.msg)

  closeModal()
}
</script>

<template>
  <div class="category-form">
    <h3>
      {{ edit
        ? t?.categoryForm?.titleEdit
        : t?.categoryForm?.titleAdd
      }}
    </h3>

    <div
      v-for="lang in locales"
      :key="lang"
      class="category-form__row"
    >
      <label>{{ lang.toUpperCase() }}</label>

      <input
        v-model="formFields[lang].title"
        type="text"
        :class="{ 'input-error': formFields[lang].error }"
        :placeholder="formFields[lang].placeholder"
      >
    </div>

    <div class="category-form__actions">
      <button
        class="btn-secondary btn-secondary--small"
        @click="prepareCategoryData"
      >
        {{ edit
          ? t?.categoryForm?.btn?.saveChangedCategory
          : t?.categoryForm?.btn?.saveNewCategory
        }}
      </button>

      <button
        class="btn-default"
        @click="closeModal"
      >
        {{ t?.categoryForm?.btn?.cancel }}
      </button>
    </div>
  </div>
</template>