<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from '~/utils/general'

const emit = defineEmits<{
  (e: 'update:query', query: string): void
}>()

const searchQuery = ref('')

const emitSearch = debounce((query: string) => {
  emit('update:query', query)
}, 500)

const onInput = () => {
  emitSearch(searchQuery.value)
}
</script>

<template>
  <div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      class="w-full md:max-w-md px-4 py-2 rounded-md outline-none border-1 border-(--secondary-color)"
      @input="onInput"
    />
  </div>
</template>
