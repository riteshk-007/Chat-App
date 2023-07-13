import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZqU1wTOtxqakZ2D448_hzLGBRjosmZQA",
  authDomain: "react-chat-app-200b2.firebaseapp.com",
  projectId: "react-chat-app-200b2",
  storageBucket: "react-chat-app-200b2.appspot.com",
  messagingSenderId: "532103056019",
  appId: "1:532103056019:web:d98720273cd4cbc1951b66",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
