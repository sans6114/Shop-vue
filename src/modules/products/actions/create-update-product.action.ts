import { tesloApi } from '@/api/tesloApi';

import type { Product } from '../interfaces/productsInterface';

export const updateProductAction = async (productLike: Partial<Product>) => {
  const productId = productLike.id

  const imagesNew = await uploadImage(productLike.images ?? [])

  productLike.images = imagesNew

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
  try {
    const { data } = await tesloApi.post<Product>(`/products/`, productLike)
    return data
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

//upload new image

const uploadImage = async (ImageFile: (string | File)[]) => {
  const filesToUpload = ImageFile.filter((image) => image instanceof File) as File[]

  const imagesString = ImageFile.filter((image) => typeof image === 'string') as string[]

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData()

      formData.append('file', file)

      const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData)

      return data.secureUrl
    } catch (error) {
      alert(error)
      return ''
    }
  })

  const uploadedImages = await Promise.all(uploadPromises)

  return [...imagesString, ...uploadedImages]
}
