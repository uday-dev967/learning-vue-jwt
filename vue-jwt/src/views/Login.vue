<template>
  <div class="login-page">
    <div class="property-wrapper">
      <div class="">Email</div>
      <input type="text" v-model="email"/>
    </div>
    <div class="property-wrapper">
      <div class="">Password</div>
      <input type="text" v-model="password"/>
    </div>
    <div class="login-button" @click="onLoginButtonClick">Login</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { storeToRefs } from 'pinia'
import { useUser } from '../stores/user.store'

const useUserStore = useUser()
let email = ref("")
let password = ref("")

function onLoginButtonClick() {
  // console.log(email.value, password.value)
  useUserStore.login({email: email.value, password: password.value})
}
</script>

<style lang="scss" scoped>
.login-page {
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .property-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .login-button {
    padding: 0.25rem 1rem;
    background: green;
    color: white;
    font-weight: 700;
    width: 5rem;
  }
}
</style>