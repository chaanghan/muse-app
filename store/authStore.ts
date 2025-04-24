import { create } from 'zustand';

interface AuthToken {
  token: string | null; // 액세트 토큰
  setToken: (token: string) => void; // 토큰을 저장하는 함수
}

// store 생성
export const useTokenStore = create<AuthToken>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
