import admin from 'firebase-admin';
import { defineString } from 'firebase-functions/params';
import { onInit } from 'firebase-functions/v2/core';

// Define Firebase Admin SDK parameters as secrets
const projectId = defineString('FIREBASE_PROJECT_ID');
const privateKey = defineString('FIREBASE_PRIVATE_KEY');
const clientEmail = defineString('FIREBASE_CLIENT_EMAIL');

let auth: admin.auth.Auth;
let firestore: admin.firestore.Firestore;

// Initialize Firebase Admin SDK in the onInit callback
onInit(() => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId.value(),
        privateKey: privateKey.value().replace(/\\n/g, '\n'),
        clientEmail: clientEmail.value()
      }),
      projectId: projectId.value(),
    });
  }

  auth = admin.auth();
  firestore = admin.firestore();
});

export { auth, firestore };
