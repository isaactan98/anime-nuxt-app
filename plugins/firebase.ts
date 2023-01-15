import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAUfH0hiaNkb0L5izfuzXwK5Bqt_Y2fW6Y",
    authDomain: "shadow-graden-anime.firebaseapp.com",
    projectId: "shadow-graden-anime",
    storageBucket: "shadow-graden-anime.appspot.com",
    messagingSenderId: "677627459824",
    appId: "1:677627459824:web:c6b249a5e855f95e5eaa35",
    measurementId: "G-4C52XHMRFP",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
});
