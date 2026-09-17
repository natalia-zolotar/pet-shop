import { AUTH_FIREBASE } from "@/api/config"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { isUserAdmin } from '@/api/authorization'

const initiatilUser = {
  email : null,
  uid : null,
  name: null,
  isLogin : false,
  isAdmin: false
}

export const user = ref(initiatilUser)

export const autorisationUser = (email, uid, name) => {
  user.value.email = email
  user.value.uid = uid
  user.value.name = name
  user.value.isLogin = true
  user.value.isAdmin = false
}

export const logoutUser = async () => {
  try {
    await signOut(AUTH_FIREBASE)

    // reset user state
    user.value = { ...initiatilUser }

    return { is: true }
  } catch (e) {
    return { text : e.message, is : false }
  }
}

onAuthStateChanged(AUTH_FIREBASE, async (responseUser) => {
  if (responseUser) {
    autorisationUser(responseUser.email, responseUser.uid, responseUser.displayName)

    const response = await isUserAdmin(responseUser.uid)

    if (response.is) {
      user.value.isAdmin = response.isAdmin
    }

  } else {
    user.value = { ...initiatilUser }
  }
})