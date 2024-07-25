import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Replace with the path to your service account key
import serviceAccount from './health-care-a29e2-firebase-adminsdk-yh5tl-dad953e437.json'assert {type:'json'};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

export { db };