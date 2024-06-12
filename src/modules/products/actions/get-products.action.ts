import { tesloApi } from '@/api/tesloApi'

import type { Product } from '../interfaces/productsInterface'
import { getProductsImage } from './get-product-image.action'

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`
    )

    return data.map((p) => ({
      ...p,
      images: p.images.map(getProductsImage)
    }))
  } catch (error) {
    console.log(error)
    throw new Error('error al obtener productos')
  }
}
