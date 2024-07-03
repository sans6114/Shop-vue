<template>
  <div class="navbar bg-white border border-b-blue-500 rounded-b fixed">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center flex flex-col">
      <Logo />
    </div>
    <template v-if="!authStore.siAutenticado">
      <div class="navbar-end flex gap-3">
        <router-link :to="{ name: 'login' }" class="btn btn-outline btn-secondary">
          Ingresas a mi usuario
        </router-link>
        <router-link :to="{ name: 'register' }" class="btn btn-outline btn-secondary">
          Registrarme
        </router-link>
      </div>
    </template>
    <template v-if="authStore.siAutenticado">
      <div class="navbar-end flex gap-3">
        <router-link
          v-if="authStore.isAdmin"
          :to="{ name: 'admin' }"
          class="btn btn-outline btn-secondary"
        >
          admin
        </router-link>
        <button @click="authStore.logOut" class="btn btn-outline btn-secondary">
          Cerrar sesion
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../auth/stores/auth.store'
import { Logo } from '../icons'

const authStore = useAuthStore()
</script>
