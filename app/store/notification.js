export const dataNotification = ref(null)

export const showNotification = (message, type) => {
  dataNotification.value = {
    message,
    type,
    is: true, // : 'ERROR' WARNING
  }
  
  setTimeout(() => {
    if (dataNotification.value) {
      dataNotification.value.is = false

      dataNotification.value = null
    }
  }, 3000)
}