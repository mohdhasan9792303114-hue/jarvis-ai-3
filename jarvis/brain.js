function jarvisBrain(input){

input = input.toLowerCase();

if(input.includes("hello")){
return "Hello Hasan, Jarvis online.";
}

if(input.includes("time")){
return "Current time is " + new Date().toLocaleTimeString();
}

if(input.includes("date")){
return "Today is " + new Date().toDateString();
}

if(input.includes("who are you")){
return "I am Jarvis, your AI assistant.";
}

if(input.includes("how are you")){
return "I am functioning normally.";
}

return "I am still learning.";
}
