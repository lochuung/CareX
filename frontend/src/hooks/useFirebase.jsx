// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDpfWLBajUvRZz_tzAbwkW6o7DnAeX21I",
  authDomain: "carex-46493.firebaseapp.com",
  projectId: "carex-46493",
  storageBucket: "carex-46493.appspot.com",
  messagingSenderId: "67677756534",
  appId: "1:67677756534:web:4f5b3f2ff7c2e99d24d357",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
