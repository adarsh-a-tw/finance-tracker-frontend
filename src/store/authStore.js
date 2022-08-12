import create from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, refreshTokenAPI } from '../api/auth'

const initialState = {
    loggedIn: false,
    token: null,
    refreshToken: null
}

const authStore = create(persist((set, get) => ({
    ...initialState,
    login: async (username, password) => {
        try {
            let { token, refresh_token } = await authAPI(username, password);
            set({ loggedIn: true, token: token, refreshToken: refresh_token })
        } catch {
            set(initialState)
        }
    },
    logout: () => set(initialState),
    refreshAuth: async () => {
        if (get().refreshToken) {
            try {
                let { token, refresh_token } = await refreshTokenAPI(get().refreshToken);
                set({ loggedIn: true, token: token, refreshToken: refresh_token })
            } catch {
                set(initialState)
            }
        }
    }
}), { name: 'user-storage' }))

export default authStore;