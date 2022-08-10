import create from 'zustand'

const authStore = create((set) => ({
    loggedIn: false,
    token: null,
    login: (token) => set({ loggedIn: true, token: token }),
    logout: () => set({ loggedIn: false, token: null })
}))

export default authStore;