<template>
  <button @click="count++">Count: {{ count }}</button>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from "vue";

const count = ref(0);

onMounted(() => {
  console.log("Mounted: DOM available");
});

onUpdated(() => {
  console.log("Updated: DOM re-rendered");
});

onUnmounted(() => {
  console.log("Unmounted: component destroyed");
});
</script>
