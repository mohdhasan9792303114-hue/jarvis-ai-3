let jarvisMemory = {};

function remember(key,value){
jarvisMemory[key] = value;
}

function recall(key){
return jarvisMemory[key];
}
