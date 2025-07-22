import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isLoggedIn: false,
      user: null,
      userType: null, // 'patient' or 'doctor'
      
      // Actions
      login: (userData) => {
        set({
          isLoggedIn: true,
          user: userData,
          userType: 'patient'
        });
      },
      
      doctorLogin: (doctorData) => {
        set({
          isLoggedIn: true,
          user: doctorData,
          userType: 'doctor'
        });
      },
      
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          userType: null
        });
      },
      
      // Helper functions
      isAuthenticated: () => get().isLoggedIn,
      isDoctor: () => get().userType === 'doctor',
      isPatient: () => get().userType === 'patient',
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        userType: state.userType
      })
    }
  )
);

export default useAuthStore;
