import create from 'zustand';
import { persist } from "zustand/middleware";

const useAuthProvider = create(persist((set) => ({
  token: null,
  isAuth: false,
  client: null,
  user: null,

  login: (token) => set({ token, isAuth: true }),
  logout: () => set(state => ({
     token: null, 
     isAuth: false
     })),
  newClient: (client) => set((state) => ({
    client
  })),
  addUser: (user) => set((state) => ({
    user
  }))   
}),
  {
    name: "auth",
  }
));

export default useAuthProvider;