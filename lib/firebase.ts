'use client';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';

/**
 * Firebase web config for project kathryn-chew. These values identify the project to the browser and are
 * public by design; access is controlled by firestore.rules and Firebase Auth, not by keeping this secret.
 * Admin sign-in details never belong in this repo.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyAhi3_k-rxPArUGuMHqe24BfpdnzoHhavA',
  authDomain: 'kathryn-chew.firebaseapp.com',
  projectId: 'kathryn-chew',
  storageBucket: 'kathryn-chew.firebasestorage.app',
  messagingSenderId: '699795812590',
  appId: '1:699795812590:web:7e41b0d62e0bb401c543ff',
  measurementId: 'G-S99N2VDSCS',
};

export function firebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

/** Google Analytics through Firebase. Loads only in the browser, and only where it is supported. */
export async function track(event: string, params: Record<string, string> = {}): Promise<void> {
  try {
    const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');
    if (!(await isSupported())) return;
    logEvent(getAnalytics(firebaseApp()), event, params);
  } catch {
    // Analytics must never break the page.
  }
}
