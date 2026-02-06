import { auth, provider, dbCloud } from "./firebase.js";

import {
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

let userID = null;


/* ================= LOGIN ================= */

export async function jarvisLogin() {

  let result = await signInWithPopup(auth, provider);

  userID = result.user.uid;

  console.log("Jarvis Cloud Login:", userID);

  loadCloudMemory();

  return result.user.email;   // ✅ Email return
}


/* ================= LOGOUT ================= */

export async function jarvisLogout() {

  await signOut(auth);
  userID = null;

}


/* ================= GET USER EMAIL ================= */

export function getUserEmail() {

  return auth.currentUser?.email || null;

}


/* ================= SAVE MEMORY ================= */

export async function saveCloudMemory(q, a) {

  if (!userID) return;

  await set(
    ref(dbCloud, "jarvisMemory/" + userID + "/" + q),
    a
  );

}


/* ================= LOAD MEMORY ================= */

function loadCloudMemory() {

  if (!userID) return;

  const memoryRef = ref(dbCloud, "jarvisMemory/" + userID);

  onValue(memoryRef, (snapshot) => {

    let cloudData = snapshot.val();
    if (!cloudData) return;

    /* Merge cloud memory */
    window.db.memory = {
      ...window.db.memory,
      ...cloudData
    };

    window.save();

    console.log("Cloud Memory Synced");

  });

}
