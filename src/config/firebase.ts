import admin from 'firebase-admin';
import { config } from './environment';

const firebaseConfig = {
  projectId: process.env['FIREBASE_CONFIG_PROJECT_ID'] || config.fb?.project_id || '',
  privateKey: (process.env['FIREBASE_CONFIG_PRIVATE_KEY'] || config.fb?.private_key || '').replace(/\\n/g, '\n'),
  clientEmail: process.env['FIREBASE_CONFIG_CLIENT_EMAIL'] || config.fb?.client_email || '',
};

if (!firebaseConfig.projectId || !firebaseConfig.privateKey || !firebaseConfig.clientEmail) {
  throw new Error('Missing required Firebase configuration values.');
}

console.log('Firebase Config:', firebaseConfig);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: config.FIREBASE_PROJECT_ID,
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
