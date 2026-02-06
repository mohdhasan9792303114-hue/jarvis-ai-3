import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCMBjrcyVZdhpQaSXJyQoq89_sBT9OeE-c",
  authDomain: "jarvis-ai-cloud-eb3ed.firebaseapp.com",
  databaseURL: "https://jarvis-ai-cloud-eb3ed-default-rtdb.firebaseio.com",
  projectId: "jarvis-ai-cloud-eb3ed",
  storageBucket: "jarvis-ai-cloud-eb3ed.firebasestorage.app",
  messagingSenderId: "10312125153",
  appId: "1:10312125153:web:5cadb172fa95af6228c5a0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const dbCloud = getDatabase(app);
