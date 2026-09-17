import { getCategoriesFromDB, removeCategoryFromDB, addNewCategoryToDB, updateCategoryDB, changeCategoryOrderDB } from "@/api/categories"
import { showNotification } from "@/store/notification"

export const categories = ref([])

export const getCategoriesList = async () => {
  const response = await getCategoriesFromDB()

  if (response.is) {
    categories.value = response.data
  } else {
    return showNotification(response.text, 'ERROR')
  }
}
getCategoriesList()

export const createCategory = async (obj, categoryID, msg) => {
  const id = Date.now()

  const data = {
    id: id.toString(),
    position: id,
    translations: obj
  }

  const response = await addNewCategoryToDB(data)

  if (response.is) {
    addNewCategoryToList(data)
    showNotification(msg, 'SUCCESS')
  } else {
    showNotification(response.text, 'ERROR')
  }
}

export const editCategory = async (obj, categoryID, msg) => {
  const response = await updateCategoryDB(obj, categoryID)

  if (response.is) {
    changeCategoryData(obj, categoryID)
    showNotification(msg, 'SUCCESS')
  } else {
    showNotification(response.text, 'ERROR')
  }
}

export const removeCategory = async (id, msg) => {
  const response = await removeCategoryFromDB(id)

  if (response.is) {
    removeCategoryFromList(id)
    return showNotification(msg, 'SUCCESS')
  } else {
    return showNotification(response.text, 'ERROR')
  }
}

export const moveCategory = async (current, neighbor) => {
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

  const response = await changeCategoryOrderDB(updates)

  if (!response.is) return showNotification(response.text, 'ERROR')

  changeCategoryOrderInList(updates)
}

// For page render
const addNewCategoryToList = (data) => {
  categories.value.push(data)
}

const changeCategoryData = (data, id) => {
  const item = categories.value.find(item => item.id === id)

  if (item) {
    item.translations = data
  }
}

const removeCategoryFromList = (id) => {
  categories.value = categories.value.filter(
    item => item.id !== id
  )
}

const changeCategoryOrderInList = (updates) => {
  categories.value.forEach(category => {
    const id = category.id
    if (updates.hasOwnProperty(id)) {
      category.position = updates[id].position
    }
  })
}