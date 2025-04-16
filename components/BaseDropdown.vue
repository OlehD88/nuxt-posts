<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)

const { options, selectedOption, placeholderText } = defineProps<{
  name: string
  options: { label: string; value: string }[]
  placeholderText?: string
  selectedOption?: string | null
}>()
const emit = defineEmits<{
  (e: 'update:selectedOption', value: string): void
}>()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value: string) => {
  isOpen.value = false
  emit('update:selectedOption', value)
}

const dropdownRef = useTemplateRef<HTMLElement>('dropdown')
onClickOutside(dropdownRef, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="dropdown" class="relative inline-block">
    <button
      class="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer"
      @click="toggleDropdown"
    >
      {{ selectedOption || placeholderText || 'Select an option' }}
      <span class="ml-2 text-gray-500">&#9662;</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
    >
      <div class="py-1">
        <div
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
