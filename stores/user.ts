import { defineStore } from 'pinia'

export const useMyAuthStore = defineStore('user',() => {
  const defaultuser0 ={
    id: '00000000-0000-0000-0000-000000000000',
    username:"NULL",
    displayName:"DISPLAY NULL",
    avatar:"NULL00000000000000",
    
  };
  const user = reactive({...defaultuser0});
  async function refreshUser(authToken:string,csrf:string) {
    const res = await $fetch('/api/user',{
      method:"GET",
      headers:{
        'csrf-token':csrf
      }
    })
  }
})
