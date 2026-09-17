import { AUTH_FIREBASE, DB_FIREBASE } from "./config"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from 'firebase/firestore'

export const createUserAPI = async (email, password, name) => {
  try {
    const response = await createUserWithEmailAndPassword(AUTH_FIREBASE, email, password)
    const user = response.user

    if (name) {
      await updateProfile(user, { displayName: name })
    }

    return { data : user, is : true }

  } catch(e) {
    return { text : e.message, is : false }
  }
}

export const loginUserAPI = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(AUTH_FIREBASE, email, password)
    const user = response.user
    return {is : true, data : user}
  } catch(e) {
    return {is : false, text : e.message}
  }
}

export const isUserAdmin = async (uid) => {
  try {
    const response = await getDoc(
      doc(DB_FIREBASE, 'users', uid)
    )

    if (response.exists()) {
      const data = response.data()

      return {
        is: true,
        isAdmin: data.isAdmin === true
      }
    } else {
      return {
        is: true,
        isAdmin: false
      }
    }
  } catch (e) {
    return {is : false, text : e.message}
  }
}