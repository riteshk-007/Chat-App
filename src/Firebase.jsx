import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYvPqKqxw0kJav4gScRzctEcrThSoYG_A",
  authDomain: "react-chat-app-e344b.firebaseapp.com",
  projectId: "react-chat-app-e344b",
  storageBucket: "react-chat-app-e344b.appspot.com",
  messagingSenderId: "330223164697",
  appId: "1:330223164697:web:a9ac980e012e8802223988",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
