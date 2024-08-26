import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  //   apiKey: 'YOUR_API_KEY',
  //   authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  //   projectId: 'YOUR_PROJECT_ID',
  //   storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  //   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  //   appId: 'YOUR_APP_ID',
  apiKey: 'AIzaSyD_Ooy4NfJ-AxAAEZJMiLxsvO139YehWa4',
  authDomain: 'bomvi-a1b35.firebaseapp.com',
  projectId: 'bomvi-a1b35',
  storageBucket: 'bomvi-a1b35.appspot.com',
  messagingSenderId: '634382883738',
  appId: '1:634382883738:web:7b35d6297cbc67c1fb3823',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
export const db = getFirestore(app);

// Auth 인스턴스 가져오기
export const auth = getAuth(app);
