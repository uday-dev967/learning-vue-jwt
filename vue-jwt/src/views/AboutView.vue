<template>
  <div class="about">
    <FabricComponent />
  </div>
</template>

<script setup>
import FabricComponent from '@/components/fabricComponent.vue';
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
