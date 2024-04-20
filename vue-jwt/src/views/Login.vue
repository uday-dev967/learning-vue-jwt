<template>
  <div class="login-page">
    <div class="">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { storeToRefs } from 'pinia'
import { useUser } from '../stores/user.store'
import { useRouter } from "vue-router";

const useUserStore = useUser()
let email = ref("")
let password = ref("")
let router = useRouter()
const token = localStorage.getItem('Authorization')
console.log(token)
if (token) {
  // If token available, redirect to home
  router.push('/')
}

function onLoginButtonClick() {
  // console.log(email.value, password.value)
  useUserStore.login({email: email.value, password: password.value}).then(res => {
    console.log("response form login", res)
    if(res.status === 200) {
      router.push("/")
    }
  })
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
    display: grid;
    align-items: center;
    gap: 1rem;
    grid-template-columns: 30% 70%;
  }
  .login-button {
    padding: 0.5rem 1rem;
    background: black;
    color: goldenrod;
    font-weight: 700;
    width: 5rem;
    border-radius: 0.25rem;
    margin-top: 1rem;
    cursor: pointer;
  }
}
</style>