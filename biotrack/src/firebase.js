import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8hk0pPY32FnPXqT_0q501eIQENAynKVo",
  authDomain: "biotrack-28c06.firebaseapp.com",
  projectId: "biotrack-28c06",
  storageBucket: "biotrack-28c06.firebasestorage.app",
  messagingSenderId: "1081810038289",
  appId: "1:1081810038289:web:c27843e57bcc82fdae4bb0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);