import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDQfBBhlcl7Eqh6pR106UlaUk8uxo_dnng",
    authDomain: "vuex-app-fea02.firebaseapp.com",
    projectId: "vuex-app-fea02",
    storageBucket: "vuex-app-fea02.appspot.com",
    messagingSenderId: "893892345789",
    appId: "1:893892345789:web:7c88d9012acdbbdf4ddcd4",
    measurementId: "G-T093W8MZSF"
  };

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const tarih = serverTimestamp();
export { auth, db, storage, tarih };
