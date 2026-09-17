import { getProdustFromDB, removeProductFromDB, addNewProductToDB, updateProductDB, changeProductOrderDB } from "@/api/products"
import { categories } from "@/store/categories"
import { showNotification } from "@/store/notification"

const allProducts = ref([])

// get all products from DB once
const getProductsList = async () => {
  const response = await getProdustFromDB()

  if (response.is) {
    allProducts.value = response.data
  } else {
    return showNotification(response.text, 'ERROR')
  }
}
getProductsList()

export const sortedProducts = computed(() => {
  // sort categories position
  const sortedCategories = [...categories.value]
    .sort((a, b) => a.position - b.position)

  // sort by category
  return sortedCategories.map(category => {

    // filter products by category
    const data = allProducts.value.filter(
      product => product.categoryID === category.id
    )

    // sort by positions
    data.sort((a, b) => a.position - b.position)

    return {
      ...category,
      products: data
    }
  })
})

export const createProduct = async (obj, categoryID, msg) => {
  const id = Date.now()

  const data = {
    id: id.toString(),
    position: id,
    categoryID,
    ...obj
  }

  const response = await addNewProductToDB(data)

  if (response.is) {
    addNewProductToList(data)
    showNotification(msg, 'SUCCESS')
  } else {
    showNotification(response.text, 'ERROR')
  }
}

export const editProduct = async (obj, prodID, msg) => {
  const response = await updateProductDB(obj, prodID)

  if (response.is) {
    updateProductInList(obj, prodID)
    showNotification(msg, 'SUCCESS')
  } else {
    showNotification(response.text, 'ERROR')
  }
}

export const removeProduct = async (id, msg, imgKey) => {
  try {
    if (imgKey) {
      await $fetch('/api/delete-image', {
        method: 'POST',
        body: {
          key: imgKey
        }
      })
    }

    const response = await removeProductFromDB(id)

    if (response.is) {
      removeProductFromList(id)
      return showNotification(msg, 'SUCCESS')
    } else {
      return showNotification(response.text, 'ERROR')
    }
  } catch (e) {
    return showNotification(e.message, 'ERROR')
  }
}

export const moveProduct = async (current, neighbor) => {
  if (!neighbor) return

  const currentPosition = current.position
  const neighborPosition = neighbor.position

  const updates = {
    [current.id]: {
      position: neighborPosition
    },
    [neighbor.id]: {
      position: currentPosition
    }
  }

  const response = await changeProductOrderDB(updates)

  if (!response.is) return showNotification(response.text, 'ERROR')

  changeProductOrderInList(updates)
}

// Page render
const addNewProductToList = (data) => {
  allProducts.value.push(data)
}

const removeProductFromList = (id) => {
  allProducts.value = allProducts.value.filter(
    item => item.id !== id
  )
}

const updateProductInList = (data, id) => {
  const product = allProducts.value.find(item => item.id === id)

  if (!product) return

  product.price = data.price
  product.translations = data.translations
  product.img = data.img
}

const changeProductOrderInList = (updates) => {
  allProducts.value.forEach(product => {
    const id = product.id
    if (updates.hasOwnProperty(id)) {
      product.position = updates[id].position
    }
  })
}