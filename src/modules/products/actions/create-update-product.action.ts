import { tesloApi } from '@/api/tesloApi'

import type { Product } from '../interfaces/productsInterface'

export const updateProductAction = async (productLike: Partial<Product>) => {
  const productId = productLike.id

  productLike = cleanProductForCreateUpdated(productLike)

  if (productId && productId !== '') {
    //actualizar producto
    return await updateProduct(productId, productLike)
  }

  //crear producto
  return await createProduct(productLike)
}

const cleanProductForCreateUpdated = (productLike: Partial<Product>) => {
  const images: string[] =
    productLike.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop()
        return imageName ? image : ''
      }

      return image
    }) ?? []

  delete productLike.id
  delete productLike.user

  productLike.images = images

  return productLike
}

//update product
const updateProduct = async (productId: string, productLike: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, productLike)
    return data
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

//create new product
const createProduct = async (productLike: Partial<Product>) => {
  const images: string[] =
    productLike.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop()
        return imageName ? image : ''
      }

      return image
    }) ?? []

  delete productLike.id
  delete productLike.user

  productLike.images = images

  try {
    const { data } = await tesloApi.post<Product>(`/products/`, productLike)
    return data
  } catch (error) {
    console.log(error)
    alert(error)
  }
}
