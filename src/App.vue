<template>
  <router-view></router-view>
  <vue-query-devtools />
</template>
<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import { AuthStatus } from './modules/auth/interfaces'
import { useAuthStore } from './modules/auth/stores/auth.store'

const authStore = useAuthStore()

authStore.$subscribe(
  (mutation, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.statusCheck()
      return
    }
  },
  { immediate: true }
)
</script>
