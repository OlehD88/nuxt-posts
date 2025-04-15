<script lang="ts" setup>
const sum = (a: number, b: number) => a + b;
const result = sum(1, 2)
const str = "123"
const str2 = 'qwe'
console.log(result, str, str2); // 3
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
