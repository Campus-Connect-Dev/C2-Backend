import * as functions from 'firebase-functions';

export interface EnvConfig {
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
  fb?: {
    project_id: string;
    private_key: string;
    client_email: string;
  };
}

// Helper function to safely get nested object properties
function getNestedValue(obj: any, path: string, defaultValue: any = ''): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
}

// Check if running in Firebase Functions environment
const isFirebaseFunction = process.env['FUNCTION_NAME'] || process.env['FUNCTIONS_EMULATOR'];

let config: EnvConfig;

if (isFirebaseFunction) {
  // Running in Firebase Functions - use functions.config()
  const fb = functions.config() as any;
  
  // Debug: Log the entire config structure
  console.log('Firebase Functions Config Structure:', JSON.stringify(fb, null, 2));
  
  config = {
    NODE_ENV: getNestedValue(fb, 'app.node_env') || 'production',
    PORT: parseInt(getNestedValue(fb, 'app.port') || '3001', 10),
    API_VERSION: getNestedValue(fb, 'app.api_version') || 'v1',
    
    // Firebase Admin SDK - read from fb namespace
    FIREBASE_PROJECT_ID: getNestedValue(fb, 'fb.project_id') || '',
    FIREBASE_PRIVATE_KEY: (getNestedValue(fb, 'fb.private_key') || '').replace(/\\n/g, '\n'),
    FIREBASE_CLIENT_EMAIL: getNestedValue(fb, 'fb.client_email') || '',
    
    // Firebase Web SDK - read from fb namespace
    FIREBASE_API_KEY: getNestedValue(fb, 'fb.web_api_key') || '',
    FIREBASE_AUTH_DOMAIN: getNestedValue(fb, 'fb.auth_domain') || '',
    FIREBASE_STORAGE_BUCKET: getNestedValue(fb, 'fb.storage_bucket') || '',
    FIREBASE_MESSAGING_SENDER_ID: getNestedValue(fb, 'fb.messaging_sender_id') || '',
    FIREBASE_APP_ID: getNestedValue(fb, 'fb.app_id') || '',
    FIREBASE_MEASUREMENT_ID: getNestedValue(fb, 'fb.measurement_id') || '',
    
    fb: {
      project_id: getNestedValue(fb, 'fb.project_id') || '',
      private_key: (getNestedValue(fb, 'fb.private_key') || '').replace(/\\n/g, '\n'),
      client_email: getNestedValue(fb, 'fb.client_email') || '',
    },
  };

  // Debug logging
  console.log('Extracted Config:', {
    ...config,
    FIREBASE_PRIVATE_KEY: config.FIREBASE_PRIVATE_KEY ? '[REDACTED]' : 'MISSING',
    fb: {
      ...config.fb,
      private_key: config.fb?.private_key ? '[REDACTED]' : 'MISSING'
    }
  });
  
  console.log('functions.config():', JSON.stringify(functions.config(), null, 2));
  console.log('Extracted Config:', {
    FIREBASE_PROJECT_ID: process.env['FB_PROJECT_ID'] || '',
    FIREBASE_PRIVATE_KEY: process.env['FB_PRIVATE_KEY'] ? '[REDACTED]' : 'MISSING',
    FIREBASE_CLIENT_EMAIL: process.env['FB_CLIENT_EMAIL'] || 'MISSING',
  });
  
} else {
  // Running locally - use dotenv
  if (typeof require !== 'undefined') {
    require('dotenv').config();
  }
  
  config = {
    NODE_ENV: process.env['NODE_ENV'] || 'development',
    PORT: parseInt(process.env['PORT'] || '3001', 10),
    API_VERSION: process.env['API_VERSION'] || 'v1',
    FIREBASE_PROJECT_ID: process.env['FB_PROJECT_ID'] || '',
    FIREBASE_PRIVATE_KEY: (process.env['FB_PRIVATE_KEY'] || '').replace(/\\n/g, '\n'),
    FIREBASE_CLIENT_EMAIL: process.env['FB_CLIENT_EMAIL'] || '',
    FIREBASE_API_KEY: process.env['FB_API_KEY'] || '',
    FIREBASE_AUTH_DOMAIN: process.env['FB_AUTH_DOMAIN'] || '',
    FIREBASE_STORAGE_BUCKET: process.env['FB_STORAGE_BUCKET'] || '',
    FIREBASE_MESSAGING_SENDER_ID: process.env['FB_MESSAGING_SENDER_ID'] || '',
    FIREBASE_APP_ID: process.env['FB_APP_ID'] || '',
    FIREBASE_MEASUREMENT_ID: process.env['FB_MEASUREMENT_ID'] || '',
    
    fb: {
      project_id: process.env['FB_PROJECT_ID'] || '',
      private_key: (process.env['FB_PRIVATE_KEY'] || '').replace(/\\n/g, '\n'),
      client_email: process.env['FB_CLIENT_EMAIL'] || '',
    },
  };
}

export { config };