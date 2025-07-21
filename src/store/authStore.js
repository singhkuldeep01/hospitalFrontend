import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isLoggedIn: false,
      user: null,
      
      // Actions
      login: (userData) => {
        set({
          isLoggedIn: true,
          user: userData
        });
      },
      
      logout: () => {
        set({
          isLoggedIn: false,
          user: null
        });
      },
      
      // Helper to check if user is authenticated
      isAuthenticated: () => get().isLoggedIn,
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user
      })
    }
  )
);

export default useAuthStore;
