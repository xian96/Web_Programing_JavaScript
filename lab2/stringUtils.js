const au = require("./arrayUtils.js");

function checkString(string) {
    if (string == undefined)
        throw `${string} not exists`;
    else if (typeof string !== "string")
        throw `${string} is not an string`;
    return string;
}

function captitalize(string) {
    checkString(string);
    string = string.toLowerCase();
    string = string[0].toUpperCase() + string.slice(1);
    // string.charAt(0).toUpperCase()
    return string;
}

function checkPositive(num) {
    if (num == undefined)
        throw `${num} not exists`;
    else if (!Number.isInteger(num))
        throw `${num} is not an num`;
    else if (num < 0)
        throw `${num} is not a positive number`;
    return num;
}

function repeat(string, num) {
    checkString(string);
    checkPositive(num);
    let newString = "";
    for (let i = 0; i < num; i++)
        newString += string;
    return newString;
}

function countChars(string) {
    checkString(string);
    let chars = string.split('');
    return au.countElements(chars);
}

module.exports = { captitalize, repeat, countChars }