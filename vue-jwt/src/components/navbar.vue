<template>
  <div class="nav-bar">
    <div @click="routeTo('/')">HOME</div>
    <div @click="routeTo('/about')">ABOUT</div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()

function routeTo(path) {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
</style>