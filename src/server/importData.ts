import { readFile } from 'fs/promises';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

interface FirestoreData {
  [collection: string]: {
    [docId: string]: Record<string, any>;
  };
}

async function importData() {
  try {
    // JSON 파일을 비동기적으로 읽어옵니다.
    const serviceAccountJson = await readFile(
      new URL('../config/serviceAccountKey.json', import.meta.url),
      'utf8'
    );
    const serviceAccount = JSON.parse(serviceAccountJson);

    const sampleDataJson = await readFile(new URL('./sampleData.json', import.meta.url), 'utf8');
    const sampleData = JSON.parse(sampleDataJson) as FirestoreData;

    initializeApp({
      credential: cert(serviceAccount),
    });

    const db = getFirestore();

    for (const [collection, documents] of Object.entries(sampleData)) {
      for (const [docId, data] of Object.entries(documents)) {
        await db.collection(collection).doc(docId).set(data);
      }
    }
    console.log('Data import completed');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

importData().then(() => process.exit());
