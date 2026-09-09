import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  type Firestore,
} from 'firebase/firestore';
import {
  getStorage,
  type FirebaseStorage,
} from 'firebase/storage';
import {
  getAnalytics,
  type Analytics,
  isSupported,
} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

export const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const db: Firestore | null =
  app && isFirebaseConfigured
    ? getFirestore(app)
    : null;

export const storage: FirebaseStorage | null =
  app && isFirebaseConfigured
    ? getStorage(app)
    : null;

export let analytics: Analytics | null = null;

if (typeof window !== 'undefined' && app) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string) ||
  '918696607292';