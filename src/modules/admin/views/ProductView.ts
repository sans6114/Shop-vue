import { defineComponent, watchEffect } from 'vue'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { getProductById } from '@/modules/products/actions/get-product-by-id.action'
import router from '@/router'
import { useQuery } from '@tanstack/vue-query'

const validationSchema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid'])
})

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    console.log(props)

    const {
      data: product,
      isError,
      isLoading
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false
    })

    //valores del formulario
    const { values, defineField, errors } = useForm({
      validationSchema
    })

    const [title, titleAttrs] = defineField('title')

    const [slug, slugAttrs] = defineField('slug')

    const [description, descriptionAttrs] = defineField('description')

    const [price, priceAttrs] = defineField('price')

    const [stock, stockAttrs] = defineField('stock')

    const [gender, genderAttrs] = defineField('gender')
    //si esta mal la url:
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products')
        alert('bad request in URL')
      }
    })

    return {
      //properties
      values,
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']

      //actions
    }
  }
})
