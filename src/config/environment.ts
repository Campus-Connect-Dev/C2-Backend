import { defineString, defineInt } from 'firebase-functions/params';

console.log('process.env.FIREBASE_PROJECT_ID:', process.env['FIREBASE_PROJECT_ID']);
console.log('process.env.FIREBASE_PRIVATE_KEY:', process.env['FIREBASE_PRIVATE_KEY']);    
console.log('process.env.FIREBASE_CLIENT_EMAIL:', process.env['FIREBASE_CLIENT_EMAIL']);
console.log('process.env.FIREBASE_API_KEY:', process.env['FIREBASE_API_KEY']);
console.log('process.env.FIREBASE_AUTH_DOMAIN:', process.env['FIREBASE_AUTH_DOMAIN']);
console.log('process.env.FIREBASE_STORAGE_BUCKET:', process.env['FIREBASE_STORAGE_BUCKET']);
console.log('process.env.FIREBASE_MESSAGING_SENDER_ID:', process.env['FIREBASE_MESSAGING_SENDER_ID']);
console.log('process.env.FIREBASE_APP_ID:', process.env['FIREBASE_APP_ID']);
console.log('process.env.FIREBASE_MEASUREMENT_ID:', process.env['FIREBASE_MEASUREMENT_ID']);
console.log('process.env.NODE_ENV:', process.env['NODE_ENV']);
console.log('process.env.PORT:', process.env['PORT']);

export type ConfigType = {
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
};

// Define parameters
const nodeEnv = defineString('NODE_ENV', { default: 'production' });
const port = defineInt('PORT', { default: 3001 });
const apiVersion = defineString('API_VERSION', { default: 'v1' });

// Firebase Admin SDK Parameters
const fbProjectId = defineString('FIREBASE_PROJECT_ID');
const fbPrivateKey = defineString('FIREBASE_PRIVATE_KEY');
const fbClientEmail = defineString('FIREBASE_CLIENT_EMAIL');

// Firebase Web SDK Parameters
const fbApiKey = defineString('FIREBASE_API_KEY');
const fbAuthDomain = defineString('FIREBASE_AUTH_DOMAIN');
const fbStorageBucket = defineString('FIREBASE_STORAGE_BUCKET');
const fbMessagingSenderId = defineString('FIREBASE_MESSAGING_SENDER_ID');
const fbAppId = defineString('FIREBASE_APP_ID');
const fbMeasurementId = defineString('FIREBASE_MEASUREMENT_ID');

export const config: ConfigType = {
  NODE_ENV: nodeEnv.value(),
  PORT: port.value(),
  API_VERSION: apiVersion.value(),
  FIREBASE_PROJECT_ID: fbProjectId.value(),
  FIREBASE_PRIVATE_KEY: fbPrivateKey.value().replace(/\\n/g, '\n'),
  FIREBASE_CLIENT_EMAIL: fbClientEmail.value(),
  FIREBASE_API_KEY: fbApiKey.value(),
  FIREBASE_AUTH_DOMAIN: fbAuthDomain.value(),
  FIREBASE_STORAGE_BUCKET: fbStorageBucket.value(),
  FIREBASE_MESSAGING_SENDER_ID: fbMessagingSenderId.value(),
  FIREBASE_APP_ID: fbAppId.value(),
  FIREBASE_MEASUREMENT_ID: fbMeasurementId.value(),
} as const;

console.log('process.env.FIREBASE_PROJECT_ID:', process.env['FIREBASE_PROJECT_ID']);
console.log('process.env.FIREBASE_PRIVATE_KEY:', process.env['FIREBASE_PRIVATE_KEY']);    
console.log('process.env.FIREBASE_CLIENT_EMAIL:', process.env['FIREBASE_CLIENT_EMAIL']);
console.log('process.env.FIREBASE_API_KEY:', process.env['FIREBASE_API_KEY']);
console.log('process.env.FIREBASE_AUTH_DOMAIN:', process.env['FIREBASE_AUTH_DOMAIN']);
console.log('process.env.FIREBASE_STORAGE_BUCKET:', process.env['FIREBASE_STORAGE_BUCKET']);
console.log('process.env.FIREBASE_MESSAGING_SENDER_ID:', process.env['FIREBASE_MESSAGING_SENDER_ID']);
console.log('process.env.FIREBASE_APP_ID:', process.env['FIREBASE_APP_ID']);
console.log('process.env.FIREBASE_MEASUREMENT_ID:', process.env['FIREBASE_MEASUREMENT_ID']);
console.log('process.env.NODE_ENV:', process.env['NODE_ENV']);
console.log('process.env.PORT:', process.env['PORT']);
console.log('Config loaded: 1', config);