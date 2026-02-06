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

let userID=null;
let userEmail=null;

/* LOGIN */

export async function jarvisLogin(){

let result = await signInWithPopup(auth,provider);

userID = result.user.uid;
userEmail = result.user.email;

syncAllCloud();

}

/* EMAIL */

export function getUserEmail(){
return userEmail;
}

/* FULL SYNC */

function syncAllCloud(){

if(!userID) return;

let refAll = ref(dbCloud,"jarvisUsers/"+userID);

onValue(refAll,snapshot=>{

let cloudData = snapshot.val();
if(!cloudData) return;

/* Merge chats */
if(cloudData.tabs){
db.tabs = {...db.tabs,...cloudData.tabs};
}

/* Merge memory */
if(cloudData.memory){
db.memory = {...db.memory,...cloudData.memory};
}

/* Merge vector */
if(cloudData.vector){
db.vector = cloudData.vector;
}

save();

});

}

/* SAVE ALL */

export function saveCloudMemory(q,a){

if(!userID) return;

set(ref(dbCloud,"jarvisUsers/"+userID),{

tabs: db.tabs,
memory: db.memory,
vector: db.vector

});

}
