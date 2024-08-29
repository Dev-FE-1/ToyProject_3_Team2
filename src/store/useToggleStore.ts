import { create } from 'zustand';

interface ToggleProps {
  isToggled: boolean;
  toggle: () => void;
}

const useToggleStore = create<ToggleProps>((set) => ({
  isToggled: false,
  toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));

export default useToggleStore;
