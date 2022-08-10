import create from 'zustand'

const alertStore = create((set) => ({
    type: 'error',
    message: '',
    shouldAlertOpen: false,
    setAlert: (type, message) => set({ type: type, message: message, shouldAlertOpen: true }),
    clearAlert: () => {
        set({ shouldAlertOpen: false });
    }
}))

export default alertStore;