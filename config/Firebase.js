// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {initializeAuth, getReactNativePersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC68A1OabFQw-jEsX_Hj_th5RioHev5bcQ",
    authDomain: "notes-mobile-app-d3525.firebaseapp.com",
    projectId: "notes-mobile-app-d3525",
    storageBucket: "notes-mobile-app-d3525.firebasestorage.app",
    messagingSenderId: "912141984009",
    appId: "1:912141984009:web:2aaec52e5f92c24b31b3d8"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };