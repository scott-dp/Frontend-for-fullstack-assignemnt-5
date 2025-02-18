import { defineStore } from 'pinia'

export const useUsernameStore = defineStore('token', {
  state: () => ({
    username: '',
  }),

  actions: {
    saveUsernameInStore(username: string) {
      try {
        this.username = username;
      } catch (err) {
        console.log(err)
      }
    },
  },
})
