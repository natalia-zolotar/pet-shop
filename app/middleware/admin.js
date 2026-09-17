import { user } from '@/store/user'

export default defineNuxtRouteMiddleware(() => {
  if (!user.value.isLogin || !user.value.isAdmin) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }
})