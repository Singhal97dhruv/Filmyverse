import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCQvEWYkwxyFSp_L_61Gqwelj6-OuO5Kw8",
  authDomain: "filmyverse-5c811.firebaseapp.com",
  projectId: "filmyverse-5c811",
  storageBucket: "filmyverse-5c811.appspot.com",
  messagingSenderId: "141918018375",
  appId: "1:141918018375:web:14a643069c8d4a6db88a62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");


export default app;