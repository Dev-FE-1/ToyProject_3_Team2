import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/constants/api';

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
const db = getFirestore(app);

// getAuth의 용량이 크므로,
// 로그인/로그아웃 시 주석 비활성화하는 것이 좋아보임
// Auth 인스턴스 가져오기
export const auth = getAuth(app);

export { app, db };
