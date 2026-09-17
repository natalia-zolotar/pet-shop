import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { DB_FIREBASE } from "./config"

export const addOrderToDB = async(data) => {
  try {
    const orderID = Date.now().toString()

    const orderRef = doc(DB_FIREBASE, "mealGo-orders", orderID)

    await setDoc(orderRef, {
      status: 'new',
      orderID,
      ...data
    })

    return { is: true }
  } catch (e) {
    return { text : e.message, is : false }
  }
}

export const removeOrderFromDB = async (orderID) => {
  try {
    const orderRef = doc(DB_FIREBASE, "mealGo-orders", orderID)

    await deleteDoc(orderRef)

    return { is: true }
  } catch (e) {
    return { text: e.message, is: false }
  }
}

export const updateOrderStatusDB = async (orderID, status) => {
  try {
    const orderRef = doc(DB_FIREBASE, "mealGo-orders", orderID)

    await updateDoc(orderRef, { status })

    return { is: true }
  } catch (e) {
    return { text : e.message, is : false }
  }
}