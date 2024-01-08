import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',() => {
  const defaultuser0 ={
    id: '00000000-0000-0000-0000-000000000000',
    username:"NULL",
    displayName:"DISPLAY NULL",
    avatar:"NULL00000000000000",
    
  };
  const user = reactive({...defaultuser0});
});
