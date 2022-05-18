// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfSNU1Y0ysHgbm1U3mRDZt8hgoJlJog1Q",
    authDomain: "todo-ctafsiras.firebaseapp.com",
    projectId: "todo-ctafsiras",
    storageBucket: "todo-ctafsiras.appspot.com",
    messagingSenderId: "387937834257",
    appId: "1:387937834257:web:2c5f9008e24ce910b428b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;