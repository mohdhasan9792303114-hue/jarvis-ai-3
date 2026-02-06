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
let userEmail = null;


/* ===== LOGIN ===== */

export async function jarvisLogin(){

 try{

   let result = await signInWithPopup(auth,provider);

   userID = result.user.uid;
   userEmail = result.user.email;

   console.log("Jarvis Cloud Login:", userEmail);

   syncAllCloud();

   return result.user;

 }catch(e){
   console.error("Login Error",e);
   return null;
 }

}


/* ===== LOGOUT ===== */

export async function jarvisLogout(){

 if(!userID) return;

 await signOut(auth);

 userID=null;
 userEmail=null;

}


/* ===== GET EMAIL ===== */

export function getUserEmail(){
 return userEmail;
}


/* ===== LIVE FULL SYNC ===== */

function syncAllCloud(){

 if(!userID) return;

 const refAll = ref(dbCloud,"jarvisUsers/"+userID);

 onValue(refAll,(snapshot)=>{

   let cloudData = snapshot.val();

   if(!cloudData) return;

   /* SAFE CHECK db */
   if(typeof db === "undefined") return;

   /* ===== MERGE CHATS ===== */
   if(cloudData.tabs){
     db.tabs = {...db.tabs,...cloudData.tabs};
   }

   /* ===== MERGE MEMORY ===== */
   if(cloudData.memory){
     db.memory = {...db.memory,...cloudData.memory};
   }

   /* ===== MERGE VECTOR ===== */
   if(cloudData.vector){
     db.vector = cloudData.vector;
   }

   if(typeof save === "function"){
     save();
   }

   console.log("Cloud Sync Updated");

 });

}


/* ===== SAVE FULL CLOUD DATA ===== */

export function saveCloudMemory(){

 if(!userID) return;

 if(typeof db === "undefined") return;

 set(ref(dbCloud,"jarvisUsers/"+userID),{

   tabs: db.tabs || {},
   memory: db.memory || {},
   vector: db.vector || []

 });

}
