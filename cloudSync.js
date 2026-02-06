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


// LOGIN
export async function jarvisLogin() {

  let result = await signInWithPopup(auth, provider);
  userID = result.user.uid;

  console.log("Jarvis Cloud Login:", userID);

  loadCloudMemory();
}


// LOGOUT
export async function jarvisLogout() {
  await signOut(auth);
  userID = null;
}


// SAVE MEMORY
export async function saveCloudMemory(memory) {

  if (!userID) return;

  await set(ref(dbCloud, "jarvisMemory/" + userID), memory);
}


// LOAD MEMORY
function loadCloudMemory() {

  if (!userID) return;

  const memoryRef = ref(dbCloud, "jarvisMemory/" + userID);

  onValue(memoryRef, (snapshot) => {

    let cloudData = snapshot.val();
    if (!cloudData) return;

    db.memory = {
      ...db.memory,
      ...cloudData
    };

    save();

    console.log("Cloud Memory Synced");
  });
}
