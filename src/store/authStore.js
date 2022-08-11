import create from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = create(persist((set) => ({
    loggedIn: false,
    token: null,
    login: (token) => set({ loggedIn: true, token: token }),
    logout: () => set({ loggedIn: false, token: null })
}), { name: 'user-storage' }))

export default authStore;