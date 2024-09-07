import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { firebaseConfig } from '@/constants/api';

const app = initializeApp(firebaseConfig); // Firebase 초기화
const db = getFirestore(app); // Firestore 인스턴스 가져오기
const storage = getStorage(app); // Storage 인스턴스 가져오기
const auth = getAuth(app); // Auth 인스턴스 가져오기

export { app, db, storage, auth };
