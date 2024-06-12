<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1
      class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center"
    >
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-400"
        >Tienda online</span
      >
      Santi
    </h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center px-2">
      Este es un proyecto de prueba en el que utilizamos tecnologias como: .
    </p>
  </div>
  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Architecto</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Corrupti</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <span>Excepturi</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
      <span>Consectetur</span>
    </a>
  </div>

  <div v-if="!products">
    <h1>Loading...</h1>
  </div>
  <!-- Product List  -->
  <ProductList v-else :products="products" />
  <!-- Pagination component  -->

  <Pagination
    :has-more-data="!!products && products.length < 10"
    :page="page"
    :is-first-page="page === 1"
  />
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

import { useRoute } from 'vue-router'

//my components common
import { Pagination } from '@/modules/common/components'
import { getProductsAction } from '@/modules/products/actions'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

//my components
import { ProductList } from '../../products/components'

const route = useRoute()
const page = ref(Number(route.query.page || 1))
const clientQuery = useQueryClient()
console.log(page.value)

const { data: products = [] } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value)
})

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)

watchEffect(() => {
  clientQuery.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1)
  })
})
</script>
