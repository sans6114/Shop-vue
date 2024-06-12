<template>
  <div class="flex flex-col items-center pb-10 bg-white">
    <div v-if="hasMoreData" role="alert" class="alert alert-error w-2/4">
      <span class="loading loading-spinner"></span>
      <span>Error! Ya no hay productos para mostrar.</span>
      <button
        @click="$router.push({ query: { page: page - 1 } })"
        class="btn btn-ghost w-96 border border-solid border-gray-300"
      >
        Anteriores
      </button>
    </div>
    <div v-else class="flex gap-6 py-5">
      <button v-if="isFirstPage" :disabled="isFirstPage" class="btn btn-outline btn-success w-96">
        Página 1, Pasa a la siguiente página para acceder a mas opciones
      </button>
      <button
        v-else
        @click="$router.push({ query: { page: page - 1 } })"
        class="btn btn-outline btn-success w-96"
      >
        Anteriores
      </button>

      <button
        :disabled="hasMoreData"
        @click="$router.push({ query: { page: page + 1 } })"
        class="btn btn-outline btn-success w-96"
      >
        Siguiente
      </button>
    </div>
    <NextPreviousIcon />
  </div>
</template>

<script setup lang="ts">
import { NextPreviousIcon } from '../icons'

interface Props {
  page: number
  isFirstPage: boolean
  hasMoreData: boolean
}

defineProps<Props>()
</script>
