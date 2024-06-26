<template>
  <div>
    <input
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      :type="type"
      :value="modelValue"
      id="title"
      :class="[
        'form-control',
        {
          'border-red-500': error
        }
      ]"
    />
    <span class="text-red-500 font-semibold" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | Number
  error?: string
  type?: 'text' | 'Number'
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})

defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
