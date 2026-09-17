<script setup>
import { updateCartItems } from "@/store/cart"

const props = defineProps({
  item: Object,
  amount: Number
})

const newAmount = ref(props.amount)

const decrease = () => {
  newAmount.value--
  updateCartItems(props.item, newAmount.value)
}

const increase = () => {
  newAmount.value++
  updateCartItems(props.item, newAmount.value)
}

const change = (num) => {
  newAmount.value = Number.isFinite(num) ? num : 0
  updateCartItems(props.item, newAmount.value)
}
const onlyNumbers = (event) => {
  if (!/[0-9]/.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="amount-box">
    <button
      type="button"
      @click="decrease"
    >
      −
    </button>

    <input
      v-model="newAmount"
      type="number"
      min="0"
      step="1"
      @keydown="onlyNumbers"
      @input="change($event.target.valueAsNumber)"
    >

    <button
      type="button"
      @click="increase"
    >
      +
    </button>
  </div>
</template>