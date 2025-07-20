import admin from 'firebase-admin';

// Initialize Firebase Admin SDK directly (not using firebase-functions onInit)
if (!admin.apps.length) {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || '';
  const clientEmail = process.env['FIREBASE_CLIENT_EMAIL'] || '';
  const privateKey = process.env['FIREBASE_PRIVATE_KEY']
    ? process.env['FIREBASE_PRIVATE_KEY'].replace(/\\n/g, '\n')
    : '';

  console.log('Initializing Firebase Admin with:');
  console.log('Project ID:', projectId);
  console.log('Client Email:', clientEmail);
  console.log('Private Key Length:', privateKey.length);

  // Validate required credentials
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials. Please check environment variables.');
  }

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
  });

  console.log('✅ Firebase Admin initialized successfully');
}

// Export Firebase services
export const auth = admin.auth();
export const firestore = admin.firestore();
