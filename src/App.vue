<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style scoped>

img {
  margin: 0 auto; /* Center the image horizontally */
}

.Large-grid-item {
  grid-column: span 4;
  align-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
