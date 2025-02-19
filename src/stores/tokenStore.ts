import { defineStore } from 'pinia'
import { getJwtToken } from '@/utils/calculatorUtils';

export const useTokenStore = defineStore('token', {
  state: () => ({
    username: "",
    jwtToken: ""
  }),
  persist: {
    storage: sessionStorage, // note that data in sessionStorage is cleared when the page session ends
  },


  actions: {
    async getTokenAndSaveInStore(username:string, password:string) {
      this.username = "";
      this.jwtToken = "";
      try {
        let response = await getJwtToken(username, password);
        let data = response.data;
        if (data != null && data != undefined && data != "" ) {
          //data is valid
          console.log(data);
          this.jwtToken = data;
          this.username = username; 
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
})
