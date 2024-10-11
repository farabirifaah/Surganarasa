import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//  apiKey: "AIzaSyAy0qo08fR-7S3P93Uw7gzs1iKR6ns6Occ",
//  authDomain: "surganarasa-36192.firebaseapp.com",
//  projectId: "surganarasa-36192",
//  storageBucket: "surganarasa-36192.appspot.com",
//  messagingSenderId: "537796076596",
//  appId: "1:537796076596:web:5cab02fa75065279155661",
//  measurementId: "G-TTCQYR0NNR"
// };

 //live production
const firebaseConfig = {
 apiKey: "AIzaSyC8D58uiFSAaj8oj0Sdhjdqd2AP5zyrSeo",
 authDomain: "surganarasa-6464d.firebaseapp.com",
 projectId: "surganarasa-6464d",
 storageBucket: "surganarasa-6464d.appspot.com",
 messagingSenderId: "525337089139",
 appId: "1:525337089139:web:ce2ebe235028d85261c606",
 measurementId: "G-HFKDS0GHC8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, addDoc, collection, getDocs, doc, deleteDoc, updateDoc, storage, auth };
