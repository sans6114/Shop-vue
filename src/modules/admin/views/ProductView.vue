<script src="./ProductView.ts" lang="ts"></script>
<template>
  <div class="bg-white px-5 py-2 rounded max-w-3/4 mx-auto">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500 mx-2">{{ values.title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
        <!--
          <input
            v-model="title"
            v-bind="titleAttrs"
            type="text"
            id="title"
            :class="[
              'form-control',
              {
                'border-red-500': errors.title
              }
            ]"
          />
          <span class="text-red-500 font-semibold" v-if="errors.title">{{ errors.title }}</span>
          -->
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" />
        </div>
      </div>

      <div class="m-4 w-full">
        <label for="sizes" class="form-label font-bold">Tallas:</label>
        <button
          v-for="size in allSizes"
          :key="size"
          @click="toggleSize(size)"
          type="button"
          :class="[
            'p-2 rounded w-14 mr-2 flex-1',
            {
              'bg-blue-500 text-white': hasSize(size),
              'bg-blue-100': !hasSize(size)
            }
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image of imagesField" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] rounded-xl" />
        </div>

        <div v-for="imageNew of imagesFile" :key="imageNew.name" class="flex-shrink-0">
          <img
            :src="temporalImageUrl(imageNew)"
            :alt="title"
            class="w-full h-full rounded-xl object-cover"
          />
        </div>
      </div>

      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <input
          multiple
          type="file"
          id="image"
          class="form-control"
          accept="image/*"
          @change="onFileChange"
        />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <CustomSelect v-model="gender" v-bind="genderAttrs" :error="errors.gender" />
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="disabled:bg-gray-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
