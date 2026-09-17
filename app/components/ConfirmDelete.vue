<script setup>
import { useLocalization } from '~~/localization'
import { closeModal } from "@/store/modal"

const { t } = useLocalization()

const props = defineProps({
  item: Object,
  removeItem: Function,
  msg: String
})

const removeObj = async () => {
  props.removeItem(props.item?.id, props.msg, props.item?.imgKey)

  closeModal()
}
</script>

<template>
  <div class="modal__confirm">
    <p
      v-if="item?.products?.length"
      class="alert-message"
    >
      ⚠️ {{ t?.confirmAction?.categoryNotEmpty }}
    </p>
    <h3 v-else>{{ t?.confirmAction?.title }}</h3>
    <div class="modal__confirm-actions">
      <button
        v-if="!item?.products?.length"
        class="btn-secondary"
        @click="removeObj"
      >
        {{ t?.confirmAction?.yes }}
      </button>
      <button
        class="btn-secondary"
        @click="closeModal"
      >
        {{ item?.products?.length
          ? t?.confirmAction?.close
          : t?.confirmAction?.no
        }}
      </button>
    </div>
  </div>
</template>