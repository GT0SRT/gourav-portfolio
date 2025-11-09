// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase AI imports
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf1r0UhrkVS5UUCR3gGezt2aSY2497f8Q",
  authDomain: "portfolio-zu.firebaseapp.com",
  projectId: "portfolio-zu",
  storageBucket: "portfolio-zu.firebasestorage.app",
  messagingSenderId: "946792888725",
  appId: "1:946792888725:web:7a197288de780762d9de9c",
  measurementId: "G-MVPVCB0R70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase AI
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create Generative Model instance
const model = getGenerativeModel(ai, { model: "gemini-pro-latest" });

// Export services for use across the app
export { app, analytics, ai, model };