import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface useBearStore {
  bears: number;
  setBear: (qty: number) => void;
}

const useBearStore = create<useBearStore>()(
  devtools(
    (set) => ({
      bears: 0,
      setBear: (qty) => set((state) => ({ bears: state.bears + qty })),
    }),
    {
      name: 'bear-store',
    }
  )
);

export default useBearStore;
