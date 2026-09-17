export const modal = ref({
  isOpen: false,
  type: null,
  size: null,
  item: null
})

export const openModal = (type, size, item) => {
  modal.value.isOpen = true
  modal.value.type = type
  modal.value.size = size
  modal.value.item = item
  document.body.style.overflow = 'hidden'
}

export const closeModal = () => {
  modal.value.isOpen = false
  modal.value.type = null
  modal.value.size = null
  modal.value.item = null
  document.body.style.overflow = ''
}