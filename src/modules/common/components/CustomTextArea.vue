<template>
  <div>
    <textarea
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      :value="modelValue"
      id="description"
      :class="[
        'form-control',
        {
          'border-red-500': error
        }
      ]"
    ></textarea>
    <span class="text-red-500 font-semibold" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  error?: string
}

defineProps<Props>()

defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
