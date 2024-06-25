import { tesloApi } from '@/api/tesloApi'

import type { Product } from '../interfaces/productsInterface'
import { getProductsImage } from './get-product-image.action'

export const getProductById = async (productId: string) => {
  // HACER CREACION DE NUEVO PRODUCTO

  try {
    //peticion para obetener producto
    const { data } = await tesloApi.get<Product>(`/products/${productId}`)

    console.log(data)
    //si encuentro el producto:
    return {
      ...data,
      images: data.images.map(getProductsImage)
    }
  } catch (error) {
    console.log(error)
  }
}
