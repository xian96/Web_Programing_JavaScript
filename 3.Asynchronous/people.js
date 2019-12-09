// const bluebird = require("bluebird");
// const Promise = bluebird.Promise;

const axios = require("axios");

async function getPeople() {
    let { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    // console.log(typeof(data)); It's an Object not array;
    return data; // this will be the array of people
}

async function checkID(id) {
    if (id == undefined)
        throw `id:${id} is not exist`;
    else if (!Number.isInteger(id))
        throw `id:${id} is not an integer`;
    else if (id <= 0 | id > Object.keys(await getPeople()).length)
        throw `id:${id} is out of bounds`
}

async function getPersonById(id) {
    await checkID(id);
    var data = await getPeople();
    for (var person in data) {//loop through each person, if id not sorted;
        if (data[person].id == id)
            return data[person].firstName + " " + data[person].lastName;
    }
    return `person in id:${id} is Unknow!`;//incase id is not contanious
}

async function checkIndex(index) {
    if (index == undefined)
        throw `index:${index} is not exist`;
    else if (!Number.isInteger(index))
        throw `index:${index} is not an integer`;
    else if (index < 0 | index >= Object.keys(await getPeople()).length)
        throw `index:${index} is out of bounds`
}

async function lexIndex(index) {
    await checkIndex(index);
    var data = await getPeople();
    data.sort(function (a, b) {//site: https://stackoverflow.com/a/19326174/11412437
        var x = a.lastName.toLowerCase();
        var y = b.lastName.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return data[index].firstName + " " + data[index].lastName;
}

async function firstNameMetrics() {
    var data = await getPeople();
    // {
    //     totalLetters: sum of all the letters in all the firstNames,
    var sum = 0;
    //     totalVowels: sum of all the vowels in all the firstNames,
    var sumvowels = 0;
    //     totalConsonants: sum of all the consonants in all the firstNames,
    var sumconsonants = 0;
    //     longestName: the longest firstName in the list,
    var longestName = null;
    var longest = 0;
    //     shortestName: the shortest firstName in the list
    var shortestName = null;
    var shortest = data[Object.keys(data)[0]].firstName.length;
    //   }
    for (var person in data) {//loop through each person;
        for (var i in data[person].firstName) {
            sum++;
            if (/[aeiou]/.test(data[person].firstName[i]))
                sumvowels++;
            else if (/[b-df-hj-np-tv-z]/.test(data[person].firstName[i]))
                sumconsonants++;
        }
        if (data[person].firstName.length > longest) {
            longest = data[person].firstName.length;
            longestName = data[person].firstName;
        }
        if (data[person].firstName.length < shortest) {
            shortest = data[person].firstName.length;
            shortestName = data[person].firstName;
        }
    }
    return { sum, sumvowels, sumconsonants, longestName, shortestName };
}

module.exports = {
    getPersonById, lexIndex, firstNameMetrics, getPeople
}
