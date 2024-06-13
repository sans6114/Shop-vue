<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
  <form @submit.prevent="onRegister" action="#" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input
        ref="inputFullname"
        v-model="myForm.fullname"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        ref="inputEmail"
        v-model="myForm.email"
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
        ref="inputPassword"
        v-model="myForm.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidaste tu contraseña?</a>
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
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Entrá a tu cuenta aqui</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { useToast } from 'vue-toastification'

import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()
const toast = useToast()
// objeto que contiene los datos de mi formulario
const myForm = reactive({
  fullname: '',
  email: '',
  password: ''
})

const inputFullname = ref<HTMLInputElement | null>(null)
const inputEmail = ref<HTMLInputElement | null>(null)
const inputPassword = ref<HTMLInputElement | null>(null)

const onRegister = async () => {
  if (myForm.fullname.length < 3) {
    return inputFullname.value?.focus()
  }

  if (myForm.email === '') {
    return inputEmail.value?.focus()
  }

  if (myForm.password.length < 6) {
    return inputPassword.value?.focus()
  }

  const ok = await authStore.register(myForm.fullname, myForm.email, myForm.password)

  if (!ok) {
    toast.error('Petición no aceptada')
    // Reset fields
    myForm.fullname = ''
    myForm.email = ''
    myForm.password = ''
    inputFullname.value?.focus()
  } else {
    toast.success('Usario creado correctamente')
    myForm.email === null
    myForm.fullname = ''
    myForm.email = ''
    myForm.password = ''
  }
}
</script>
