<template>
  <div class="nav-bar">
    <div class="title" @click="routeTo('/')">My App</div>
    <div class="pages-link-wrapper">
      <div @click="routeTo('/')">HOME</div>
      <div @click="routeTo('/about')">ABOUT</div>
      <div @click="downloadSampleXl">ABOUT</div>
    </div>
    <div v-if="route.path !=='/login'" class="logout-button" @click="onLogoutButtonClick">
      Logout
    </div>
  </div>
</template>

<script setup>
import {useRouter, useRoute} from 'vue-router'
import { useUser } from '../stores/user.store'

const useUserStore = useUser()
const router = useRouter()
const route = useRoute()

console.log(route)
function routeTo(path) {
  router.push(path)
}

function onLogoutButtonClick() {
  localStorage.removeItem("Authorization")
  router.push('/login')
}

function downloadSampleXl() {
  useUserStore.downloadXL({id: 1, type: "xls_file"})
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: max-content 1fr max-content;
  padding: 1rem;
  .title {
    justify-self: start;
  }
  .pages-link-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .logout-button {
    padding: 0.5rem 1rem;
    background: black;
    color: goldenrod;
    font-weight: 700;
    border-radius: 0.25rem;
    cursor: pointer;
  }
}
</style>