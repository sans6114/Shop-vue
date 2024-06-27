import { tesloApi } from '@/api/tesloApi'

import type { Product } from '../interfaces/productsInterface'

export const updateProductAction = async (product: Partial<Product>) => {
  if (product.id && product.id !== '') {
    //actualizar producto
    return await updateProduct(product)
  }

  //crear producto
  throw new Error('no implementado')
}

//update product
const updateProduct = async (productLike: Partial<Product>) => {
  const images: string[] =
    productLike.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop()
        return imageName ? image : ''
      }

      return image
    }) ?? []

  const productId = productLike.id
  delete productLike.id
  delete productLike.user

  productLike.images = images

  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, productLike)
    return data
  } catch (error) {
    console.log(error)
    alert(error)
  }
}
