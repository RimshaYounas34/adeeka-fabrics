import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBnMHvWKFGBEGOasNCbnZgP4oHUoLzjjk",
  authDomain: "adeeka-fabrics.firebaseapp.com",
  projectId: "adeeka-fabrics",
  storageBucket: "adeeka-fabrics.firebasestorage.app",
  messagingSenderId: "1095794493873",
  appId: "1:1095794493873:web:e90a6e09339f39c07dd590",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();