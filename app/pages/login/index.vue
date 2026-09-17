<script setup>
import { useLocalization } from '~~/localization'
import { createUserAPI, loginUserAPI } from '@/api/authorization'
import { user, autorisationUser } from '@/store/user'
import { showNotification } from "@/store/notification"

const { t } = useLocalization()
const route = useRoute()

const isLoginMode = ref(user.value.isLogin)
const data = ref({
  name: '',
  email: '',
  password: '',
  emailError: false,
  passwordError: false
})

const submit = async () => {
  data.value.emailError = false
  data.value.passwordError = false

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value.email)) {
    data.value.emailError = true
    return showNotification(t.value?.login?.invalidEmail, 'ERROR')
  }

  if ( data.value.password.length < 6) {
    data.value.passwordError = true
    return showNotification(t.value?.login?.invalidPassword, 'ERROR')
  }

  const response = isLoginMode.value
    ? await loginUserAPI(data.value.email, data.value.password)
    : await createUserAPI(data.value.email, data.value.password, data.value.name)

  if (response.is) {
    autorisationUser(response.data.email, response.data.uid, response.data.displayName)

    navigateTo(route.query.redirect || '/')
  } else {
    showNotification(response.text, 'ERROR')
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__form">
      <h1>
        {{ isLoginMode ? t?.login?.login : t?.login?.register }}
      </h1>

      <input
        v-if="!isLoginMode"
        v-model="data.name"
        class="auth__input"
        type="name"
        :placeholder='t?.login?.label?.name'
      >

      <input
        v-model="data.email"
        class="auth__input"
        type="email"
        :class="{ 'input-error': data.emailError }"
        :placeholder='t?.login?.label?.email'
      >

      <input
        v-model="data.password"
        class="auth__input"
        type="password"
        :class="{ 'input-error': data.passwordError }"
        :placeholder='t?.login?.label?.password'
      >

      <button
        class="auth__button"
        type="submit"
        @click="submit()"
      >
        {{ isLoginMode ? t?.login?.login : t?.login?.register }}
      </button>

      <button
        type="button"
        class="auth__switch"
        @click="isLoginMode = !isLoginMode"
      >
        {{ isLoginMode
          ? t?.login?.createAccount
          : t?.login?.loginAccount
        }}
      </button>
    </div>
  </div>

  <Notification />
</template>