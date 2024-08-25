// Zustand 이해를 위한 Test 파일입니다.

// 상태를 만들기 위한 create 함수
import { create } from 'zustand';
// zustand에서도 devtool를 사용하기 위함
import { devtools } from 'zustand/middleware';

// useBearStore 타입 지정
export interface useBearStore {
  bears: number;
  setBear: (qty: number) => void;
}

const useBearStore = create<useBearStore>()(
  devtools(
    (set) => ({
      // 상태 bears
      bears: 0,
      // 상태 업데이트 함수 setBear, qty(quantity): 상태 수량
      setBear: (qty) => set((state) => ({ bears: state.bears + qty })),
    }),
    {
      // devtool에 표시할 스토어 이름
      name: 'bear-store',
    }
  )
);

// 외부에서 해당 스토어를 사용할 수 있게 하기 위한 export
export default useBearStore;
