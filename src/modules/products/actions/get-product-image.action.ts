export const getProductsImage = (imageName: string): string => {
  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`
}
