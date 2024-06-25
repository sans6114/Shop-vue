<template>
  <div class="bg-white px-5 rounded-xl py-2 text-center">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >Productos</span
      >
      Dashboard
    </h1>
    <!-- component -->
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
              <th class="w-28 text-left py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Talle</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{
                'bg-gray-300': index % 2 === 0
                //si el indice del producto es par entonces se aplicara el bg
              }"
            >
              <td class="text-left py-3 px-4">
                <img class="h-10 w-10 object-cover" :src="product.images[0]" :alt="product.title" />
              </td>
              <td class="text-left py-3 px-4">
                <router-link
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  :to="`/admin/products/${product.id}`"
                >
                  {{ product.title }}
                </router-link>
              </td>
              <td class="font-medium text-blue-600">
                <span>
                  {{ product.price }}
                </span>
              </td>
              <td class="text-left py-3 px-4">
                <span class="hover:text-blue-500 rounded-full">{{ product.sizes.join(',') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Pagination
    :has-more-data="!!products && products.length < 10"
    :page="page"
    :is-first-page="page === 1"
  />
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'


//my components common
import { Pagination } from '@/modules/common/components'
import { usePagination } from '@/modules/common/composable/usePagination'
import { getProductsAction } from '@/modules/products/actions'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const { page } = usePagination()

const clientQuery = useQueryClient()
console.log(page.value)

const { data: products = [] } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value)
})

watchEffect(() => {
  clientQuery.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1)
  })
})
</script>

<style lang="scss" scoped></style>
