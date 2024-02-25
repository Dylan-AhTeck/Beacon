// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY47HELUi3iSJGf_k9Q2L84rpUEjBvLqo",
  authDomain: "beacon-7b8cc.firebaseapp.com",
  projectId: "beacon-7b8cc",
  storageBucket: "beacon-7b8cc.appspot.com",
  messagingSenderId: "126866777903",
  appId: "1:126866777903:web:c7b8c9bf1bd0353544e3da",
  measurementId: "G-9WN05C108M",
};

// Initialize Firebase

app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// const analytics = getAnalytics(app);

export { auth };
