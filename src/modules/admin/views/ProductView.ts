import {
  defineComponent,
  ref,
  watch,
  watchEffect,
} from 'vue';

import {
  useFieldArray,
  useForm,
} from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomSelect from '@/modules/common/components/CustomSelect.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import {
  getProductById,
} from '@/modules/products/actions/get-product-by-id.action';
import router from '@/router';
import {
  useMutation,
  useQuery,
} from '@tanstack/vue-query';

import {
  updateProductAction,
} from '../../products/actions/create-update-product.action';

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

  setup(props) {
    const toast = useToast()
    const {
      data: product,
      isError,
      isLoading,
      refetch
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false
    })

    //mutations

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updateProduct
    } = useMutation({
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

    const imagesFile = ref<File[]>([])

    const onSubmit = handleSubmit(async (values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imagesFile.value]
      }

      mutate(formValues)
    })

    const onFileChange = (event: Event) => {
      const inputValue = event.target as HTMLInputElement

      const filesOfInput = inputValue.files

      if (!filesOfInput) return
      if (filesOfInput.length === 0) return

      for (const imageFile of filesOfInput) {
        imagesFile.value.push(imageFile)
      }
    }

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
        imagesFile.value = []
      },
      {
        deep: true,
        immediate: true
      }
    )

    //que el usuaroio vea que la actualizacion del producto fue correcta
    watch(isUpdateSuccess, (value) => {
      //si value es false no hago nada

      if (!value) return

      toast.success('¡Cambio en el producto realizado correctamente!')
      router.replace(`/admin/products/${updateProduct.value!.id}`)
      //TODO: redirección cuando se crea

      resetForm({
        values: updateProduct.value
      })
    })

    //que pasa si toco 'neuvo' en product view
    watch(
      () => props.productId,
      () => {
        refetch()
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
      isPending,
      imagesFile,
      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
      onSubmit,
      toggleSize,
      onFileChange,

      hasSize: (size: string) => {
        const currentSize = sizesField.value.map((size) => size.value)
        return currentSize.includes(size)
      },
      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile)
      }
    }
  }
})
