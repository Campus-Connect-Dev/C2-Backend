import admin from 'firebase-admin';
import { defineString } from 'firebase-functions/params';
import { onInit } from 'firebase-functions/v2/core';

// Define Firebase Admin SDK parameters as secrets
const projectId = defineString('FIREBASE_PROJECT_ID');
const privateKey = defineString('FIREBASE_PRIVATE_KEY');
const clientEmail = defineString('FIREBASE_CLIENT_EMAIL');

console.log('Firebase Admin Config:', projectId,privateKey,clientEmail);

let auth: admin.auth.Auth;
let firestore: admin.firestore.Firestore;

// Initialize Firebase Admin SDK in the onInit callback
onInit(() => {
  if (!admin.apps.length) {
    const pid = projectId.value();
    const email = clientEmail.value();
    const key = privateKey.value().replace(/\\n/g, '\n');
  
    console.log('Initializing Firebase Admin with:');
    console.log('Project ID:', pid);
    console.log('Client Email:', email);
  
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: pid,
        privateKey: key,
        clientEmail: email,
      }),
      projectId: pid,
    });
  }
  
  auth = admin.auth();
  firestore = admin.firestore();
});

export { auth, firestore };
