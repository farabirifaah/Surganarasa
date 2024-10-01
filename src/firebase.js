import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
 apiKey: "AIzaSyAy0qo08fR-7S3P93Uw7gzs1iKR6ns6Occ",
 authDomain: "surganarasa-36192.firebaseapp.com",
 projectId: "surganarasa-36192",
 storageBucket: "surganarasa-36192.appspot.com",
 messagingSenderId: "537796076596",
 appId: "1:537796076596:web:5cab02fa75065279155661",
 measurementId: "G-TTCQYR0NNR"
};

//live production
// const firebaseConfig = {
//  apiKey: "AIzaSyB-Ua-2vMH-iihQd68ti8_4u9Plx2X-xD8",
//  authDomain: "surganarasa-b202d.firebaseapp.com",
//  projectId: "surganarasa-b202d",
//  storageBucket: "surganarasa-b202d.appspot.com",
//  messagingSenderId: "1034942965633",
//  appId: "1:1034942965633:web:9902316db518af3f876a80",
//  measurementId: "G-8REV2KYPLZ"
// };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, addDoc, collection, getDocs, doc, deleteDoc, updateDoc, storage, auth };
