// store/toastStore.ts
import { create } from 'zustand';

interface ToastProps {
  isVisible: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastProps>((set) => ({
  isVisible: false,
  message: '',
  showToast: (message: string) => {
    set({ isVisible: true, message });
  },
  hideToast: () => set({ isVisible: false, message: '' }),
}));
