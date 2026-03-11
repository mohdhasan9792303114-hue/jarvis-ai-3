function sendMessage(){

let inputBox = document.getElementById("input");

let chatBox = document.getElementById("chat");

let userText = inputBox.value;

if(userText.trim() === "") return;

chatBox.innerHTML += "<p><b>You:</b> " + userText + "</p>";

let response = jarvisBrain(userText);

chatBox.innerHTML += "<p><b>Jarvis:</b> " + response + "</p>";

inputBox.value = "";

chatBox.scrollTop = chatBox.scrollHeight;
}
