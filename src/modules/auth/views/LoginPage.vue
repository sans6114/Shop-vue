<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin" action="#" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="myForm.email"
        ref="emailInput"
        type="email"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="myForm.password"
        ref="passwordInput"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        v-model="myForm.remember"
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2">Recuerdame</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Ingresar
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline"
      >Ingresa a tu cuenta aqui</RouterLink
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { useToast } from 'vue-toastification'

import { useAuthStore } from '../stores/auth.store'

const toast = useToast()

const authStore = useAuthStore()

// objeto que contiene los datos de mi formulario
const myForm = reactive({
  email: '',
  password: '',
  remember: false
})
//ref inputs
const emailInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const onLogin = async () => {
  if (myForm.email === '') {
    return emailInput.value?.focus()
  }

  if (myForm.password.length < 6) {
    return passwordInput.value?.focus()
  }

  if (myForm.remember) {
    localStorage.setItem('email', myForm.email)
  } else {
    localStorage.removeItem('email')
  }

  const ok = await authStore.login(myForm.email, myForm.password)

  if (ok) return

  toast.error('Usuario/Contraseña no son correctos')

  console.log(ok)
}
</script>
