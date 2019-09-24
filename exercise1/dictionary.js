const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}

function checkInput(input){
    if(typeof input !== "string")
        throw `${input} is not a String`;
    return input;        
}

function lookupDefinition (word) {
    checkInput(word);
    if (words[word] == undefined)
        throw `we can not find this word:${word}`;
    return words[word];
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getWord(definition) {
    checkInput(definition);
    var word = getKeyByValue(words,definition);
    if (word == undefined)
        throw `no such word in definition:${definition}`;
    return word; 
}

module.exports = {lookupDefinition, getWord}