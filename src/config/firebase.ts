import admin from 'firebase-admin';
import { config } from './environment';

const firebaseConfig = {
  projectId: config.FIREBASE_PROJECT_ID || '',
  privateKey: config.FIREBASE_PRIVATE_KEY || '',
  clientEmail: config.FIREBASE_CLIENT_EMAIL || ''
};

if (!firebaseConfig.projectId || !firebaseConfig.privateKey || !firebaseConfig.clientEmail) {
  console.log('Firebase Config:', firebaseConfig);
  throw new Error('Missing required Firebase configuration values.');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: firebaseConfig.projectId,
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
