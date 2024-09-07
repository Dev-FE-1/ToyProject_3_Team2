import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// import { resetFireStoreData, setUpFireStoreData } from '@/api/endpoints/resetAndSetupData';
import { firebaseConfig } from '@/constants/api';

const app = initializeApp(firebaseConfig); // Firebase 초기화
const db = getFirestore(app); // Firestore 인스턴스 가져오기
const storage = getStorage(app); // Storage 인스턴스 가져오기
const auth = getAuth(app); // Auth 인스턴스 가져오기

// // 파이어스토어 데이터 리셋 및 셋업 함수
// // 사용 시 주의!! 파이어스토어 할당량 소비량이 많음
// const initFireStore = async () => {
//   await resetFireStoreData();
//   await setUpFireStoreData();
// };
// // initFireStore();

export { app, db, storage, auth };
