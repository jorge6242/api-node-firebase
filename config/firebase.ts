import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "./api-node-192e5-firebase-adminsdk-n6ddr-249044ab1c.json";
import { config } from "./config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();

// Initialize Firebase
initializeApp(firebaseConfig);
