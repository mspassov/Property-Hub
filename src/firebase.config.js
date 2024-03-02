import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi4qE6mLaEOPv3f8rBC9sBRFm2UovL0xw",
  authDomain: "house-marketplace-react-3d126.firebaseapp.com",
  projectId: "house-marketplace-react-3d126",
  storageBucket: "house-marketplace-react-3d126.appspot.com",
  messagingSenderId: "653655494639",
  appId: "1:653655494639:web:696ce926720030de91b01a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();