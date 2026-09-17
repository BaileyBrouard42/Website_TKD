import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA96xSEGBztteutAOCKYDPONPU03sswpOs",
  authDomain: "tkd-power-ashford.firebaseapp.com",
  projectId: "tkd-power-ashford",
  storageBucket: "tkd-power-ashford.firebasestorage.app",
  messagingSenderId: "648489551644",
  appId: "1:648489551644:web:bafea340e15a77424d1cd9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const statusEl = document.getElementById("status");

document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    statusEl.textContent = "Please enter a username and password";
    return;
  }

  try {
    const userDoc = await getDoc(doc(db, "usernames", username));

    if (!userDoc.exists()) {
      statusEl.textContent = "Login failed: user not found";
      return;
    }

    const email = userDoc.data().email;
    await signInWithEmailAndPassword(auth, email, password);
    statusEl.textContent = `Logged in as ${username}`;
    // window.location.href = "TKDDashboard.html";

  } catch (error) {
    statusEl.textContent = "Login failed: incorrect username or password";
  }
});