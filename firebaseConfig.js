
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAeAXd0kLhv3vBbtRK8uvRGwlxIMkaa8GM",
    authDomain: "vezzeta-3f5f9.firebaseapp.com",
    projectId: "vezzeta-3f5f9",
    storageBucket: "vezzeta-3f5f9.appspot.com",
    messagingSenderId: "236970156041",
    appId: "1:236970156041:web:75fd405482371334dd18d8"
};

const app = initializeApp(firebaseConfig);

// Export Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app); 
