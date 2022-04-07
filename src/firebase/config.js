import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBTkSWhUR4Du-9RdocRmgBgwwY2R8B8e7Q",
  authDomain: "lucion-nexgen.firebaseapp.com",
  projectId: "lucion-nexgen",
  storageBucket: "lucion-nexgen.appspot.com",
  messagingSenderId: "1039435142889",
  appId: "1:1039435142889:web:eac9ecc9ad667fd2344278",
  measurementId: "G-1J91GDSXD9",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
