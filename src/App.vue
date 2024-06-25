<template>
  <router-view></router-view>

  <vue-query-devtools />
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import { AuthStatus } from './modules/auth/interfaces'
import { useAuthStore } from './modules/auth/stores/auth.store'

//import { Loader } from './modules/common/components'

const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

authStore.$subscribe(
  (mutation, state) => {
    console.log(state.authStatus)
    if (state.authStatus === AuthStatus.Checking) {
      authStore.statusCheck()
      return
    }
    //if en que ruta me encuentro
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Autenticado) {
      console.log('true')
      router.push({ name: 'home' })
      return
    }
  },
  { immediate: true }
)
</script>
