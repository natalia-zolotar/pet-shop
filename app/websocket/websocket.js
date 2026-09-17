import { collection, onSnapshot } from "firebase/firestore"
import { DB_FIREBASE } from "@/api/config"
import { showNotification } from "@/store/notification"

export const orders = ref([])
let unsubscribe = null

export const connectOrdersSocket = () => {
  try {
    const q = collection(DB_FIREBASE, "mealGo-orders")

    unsubscribe = onSnapshot(q, (snapshot) => {
      orders.value = snapshot.docs.map(doc => ({
        ...doc.data()
      }))
    })
  } catch (error) {
    showNotification(error.message, 'ERROR')
  }
}

export const disconnectOrdersSocket = () => {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
}