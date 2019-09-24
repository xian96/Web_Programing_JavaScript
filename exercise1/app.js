const dic = require('./dictionary.js');

try{
    console.log(dic.lookupDefinition("banana"))
}catch(e){
    console.log(e);
}
try{
    console.log(dic.lookupDefinition("programming"))
}catch(e){
    console.log(e);
}
try{
    console.log(dic.lookupDefinition(1))
}catch(e){
    console.log(e);
}

try{
    console.log(dic.getWord("eatable tropical fruit"))
}catch(e){
    console.log(e);
}
try{
    console.log(dic.getWord("The action or process of writing computer programs."))
}catch(e){
    console.log(e);
}
try{
    console.log(dic.getWord(1))
}catch(e){
    console.log(e);
}