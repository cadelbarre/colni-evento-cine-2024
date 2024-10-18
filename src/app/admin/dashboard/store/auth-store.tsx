import { create } from 'zustand'

interface IAuthStore {
  isAuth: boolean
  available: (isAvailable: boolean) => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  available: (isAvailable) => set((state) => ({ isAuth: isAvailable ? !state.isAuth : state.isAuth }))
}))
