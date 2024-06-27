import { defineComponent, watch, watchEffect } from 'vue'

import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'

import CustomInput from '@/modules/common/components/CustomInput.vue'
import CustomSelect from '@/modules/common/components/CustomSelect.vue'
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue'
import { updateProductAction } from '@/modules/products/actions'
import { getProductById } from '@/modules/products/actions/get-product-by-id.action'
import router from '@/router'
import { useMutation, useQuery } from '@tanstack/vue-query'

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid'])
})

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
    CustomSelect
  },

  props: {
    productId: {
      type: String,
      required: true
    }
  },

  async setup(props) {
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

    //mutations

    const { mutate, isPending, isSuccess, data } = useMutation({
      mutationFn: updateProductAction
    })

    //valores del formulario
    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema
      //initialValues: product.value
    })

    const [title, titleAttrs] = defineField('title')

    const [slug, slugAttrs] = defineField('slug')

    const [description, descriptionAttrs] = defineField('description')

    const [price, priceAttrs] = defineField('price')

    const [stock, stockAttrs] = defineField('stock')

    const [gender, genderAttrs] = defineField('gender')

    const { fields: imagesField } = useFieldArray<string>('images')
    const {
      fields: sizesField,
      remove: removeSize,
      push: pushSize
    } = useFieldArray<string>('sizes')

    const onSubmit = handleSubmit((values) => {
      mutate(values)
    })
    const toggleSize = (size: string) => {
      const currentSizes = sizesField.value.map((size) => size.value)

      const hasSize = currentSizes.includes(size)

      if (hasSize) {
        removeSize(currentSizes.indexOf(size))
      } else {
        pushSize(size)
      }
    }
    //si esta mal la url:
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products')
        alert('bad request in URL')
      }
    })

    watch(
      product,
      () => {
        if (!product) return
        resetForm({
          values: product.value
        })
      },
      {
        deep: true,
        immediate: true
      }
    )
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
      imagesField,
      sizesField,
      meta,
      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
      onSubmit,
      toggleSize,

      hasSize: (size: string) => {
        const currentSize = sizesField.value.map((size) => size.value)
        return currentSize.includes(size)
      }
    }
  }
})
