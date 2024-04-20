import { defineStore } from 'pinia'
import axios from 'axios';

export const useUser = defineStore('poject', {
  state: () => ({
    user: {},
    isUserLogggedIn: false,
    userAuthToken: ""
  }),
  getters: {},
  actions: {
    login(data) {
      return axios.post("http://localhost:8000/auth/login", data).then((res) => {
        if(res.data) {
          console.log("login api",res.data)
          this.setUserData({userData:data, res:res})
        }
        return res
      })
    },
    
    async downloadXL(payload) {
      
      // payload.responseType = "blob"

        try {

          const formData = new FormData();
          formData.append('id', 1);
          formData.append('type', 'xls_file');
            // Make API request to fetch Excel sheet data
            const response = await axios.post("https://sample-videos.com/query/download.php", formData);
            const blob = await response.blob();

            // Create Blob URL
            const blobUrl = URL.createObjectURL(blob);
            
            // Create anchor element
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'existing_customers.xlsx'; // Set desired filename
            
            // Programmatically trigger download
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading Excel:', error);
        }

    },
    setUserData({userData, res}) {
      const token = res.data.access_token
      console.log("token", token)
      this.user = userData
      localStorage.setItem("Authorization", token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    setUserLoggedIn(data) {
      this.isUserLogggedIn = data
    }
  },
  
})
