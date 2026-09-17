import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection } from "firebase/firestore"
import { DB_FIREBASE } from "./config"

export const addNewProductToDB = async (data) => {
  try {
    const productRef = doc(DB_FIREBASE, "mealGo-products", data.id)
    await setDoc(productRef, data)

    return { is: true, data}
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const getProdustFromDB = async () => {
  try {
    const collectionRef = collection(DB_FIREBASE, 'mealGo-products')

    const response = await getDocs(collectionRef)

    if (response.empty) {
      return { is: true, data: [] }
    }

    const data = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return { is: true, data }
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const updateProductDB = async (data, prodID) => {
  try {
    const productRef = doc(DB_FIREBASE, "mealGo-products", prodID)

    const updateData = {
      price: data.price,
      translations: data.translations
    }

    if (data.img !== undefined) {
      updateData.img = data.img
    }

    await updateDoc(productRef, updateData)

    return { is: true, data}
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const removeProductFromDB = async (id) => {
  try {
    const productRef = doc(DB_FIREBASE, 'mealGo-products', id)

    await deleteDoc(productRef)
    
    return { is: true }
  } catch (e) {
    return { text: e.message, is: false }
  }
}

export const changeProductOrderDB = async (data) => {
  try {
    for (const [id, updateData] of Object.entries(data)) {
      const productRef = doc(
        DB_FIREBASE,
        'mealGo-products',
        id
      )

      await updateDoc(productRef, updateData)
    }

    return { is: true }
  } catch (e) {
    return { text : e.message, is : false }
  }
}