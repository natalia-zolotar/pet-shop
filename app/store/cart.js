const localName = 'cartItems'

const getCartItemsFromLocalStorage = () => {
  const dataJSON = localStorage.getItem(localName)
  if(!dataJSON) return {}
  return JSON.parse(dataJSON)
}

export const setCartItemsToLocalStorage = (data) => {
  localStorage.setItem(localName, JSON.stringify(data))
}

export const cartItems = ref(getCartItemsFromLocalStorage())

export const updateCartItems = (product, amount) => {
  const id = product.id

  const item = {
    id,
    categoryID: product.categoryID,
    translations: product.translations,
    price: product.price,
    amount,
    total: product.price*amount
  }

  if(amount <= 0) {
    delete cartItems.value[id]
  } else {
    cartItems.value[id] = {...item}
  }

  setCartItemsToLocalStorage(cartItems.value)
}

export const count = computed(() => Object.keys(cartItems.value).length)