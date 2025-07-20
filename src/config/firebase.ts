import admin from 'firebase-admin';

// Get Firebase config from environment variables
// These are set in apphosting.yaml for production and can be set locally
const firebaseConfig = {
  projectId: process.env['FIREBASE_PROJECT_ID']!,
  privateKey: process.env['FIREBASE_PRIVATE_KEY']!.replace(/\\n/g, '\n'),
  clientEmail: process.env['FIREBASE_CLIENT_EMAIL']!,
};

// Log configuration details for debugging
console.log('Firebase Admin Config - Project ID:', firebaseConfig.projectId);
console.log('Firebase Admin Config - Client Email:', firebaseConfig.clientEmail);

// Initialize Firebase Admin SDK immediately (not in onInit callback)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: firebaseConfig.projectId,
  });
  console.log('✅ Firebase Admin SDK initialized successfully');
} else {
  console.log('✅ Firebase Admin SDK already initialized');
}

// Export auth and firestore instances
export const auth = admin.auth();
export const firestore = admin.firestore();
