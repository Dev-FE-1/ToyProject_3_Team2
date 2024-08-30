import { useAuthStore } from '@/store/authStore';

export const useAuthStatus = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userEmail = useAuthStore((state) => state.userEmail);

  return { isLoggedIn, userEmail };
};
