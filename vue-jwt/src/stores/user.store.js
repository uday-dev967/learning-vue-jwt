import { defineStore } from 'pinia'
import axios from 'axios';

export const useUser = defineStore('poject', {
  state: () => ({
    user: {}
  }),
  getters: {},
  actions: {
    login(data) {
      return axios.post("http://localhost:8000/auth/login", data).then((res) => {
        if(res.data) {
          console.log("login api",res.data)
          this.setUserData({userData:data, res:res})
          return res
        }
      })
    },
    setUserData({userData, res}) {
      const token = res.data.access_token
      console.log("token", token)
      this.user = userData
      localStorage.setItem("Authorization", token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },
  
})
