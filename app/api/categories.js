import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, orderBy } from "firebase/firestore"
import { DB_FIREBASE } from "./config"

export const addNewCategoryToDB = async (data) => {
  try {
    const categoryRef = doc(DB_FIREBASE, "mealGo-categories", data.id)
    await setDoc(categoryRef, data)

    return { is: true, data}
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const getCategoriesFromDB = async () => {
  try {
    const collectionRef = query(
      collection(DB_FIREBASE, 'mealGo-categories'),
      orderBy('position', 'asc')
    )

    const response = await getDocs(collectionRef)

    if (response.empty) {
      return { is: true, data: [] }
    }

    const data = response.docs.map(doc => doc.data())

    return { is: true, data }
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const removeCategoryFromDB = async (id) => {
  try {
    const categoryRef = doc(DB_FIREBASE, 'mealGo-categories', id)

    await deleteDoc(categoryRef)
    
    return { is: true }
  } catch (e) {
    return { text: e.message, is: false }
  }
}

export const updateCategoryDB = async (data, id) => {
  try {
    const categoryRef = doc(DB_FIREBASE, "mealGo-categories", id)
    await updateDoc(categoryRef, {
      translations: data
    })

    return { is: true, data}
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const changeCategoryOrderDB = async (data) => {
  try {
    for (const [id, updateData] of Object.entries(data)) {
      const categoryRef = doc(
        DB_FIREBASE,
        'mealGo-categories',
        id
      )

      await updateDoc(categoryRef, updateData)
    }

    return { is: true }
  } catch (e) {
    return { text : e.message, is : false }
  }
}