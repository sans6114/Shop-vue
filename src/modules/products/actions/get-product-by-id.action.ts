import { tesloApi } from '@/api/tesloApi'

import type { Product } from '../interfaces/productsInterface'
import { getProductsImage } from './get-product-image.action'

export const getProductById = async (productId: string): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      gender: '' as any,
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      user: {} as any,
      sizes: []
    }
  }
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
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      gender: '' as any,
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      user: {} as any,
      sizes: []
    }
  }
}
