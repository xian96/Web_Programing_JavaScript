// const bluebird = require("bluebird");
// const Promise = bluebird.Promise;

const axios = require("axios");

const pe = require("./people");
// async function getPeople() {
//     const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
//     return data; // this will be the array of people
// }

async function getWeather() {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json');
    return data; // this will be the array of people
}

async function checkName(name) {
    if (name == undefined)
        throw `name:${name} is not exist`;
    else if (typeof name !== 'string' || name instanceof String)
        throw `name:${name} is not an string`;
}

async function findPersonZIP(firstName, lastName) {
    var people = await pe.getPeople();
    for (var person in people) {//loop through each person, if id not sorted;
        if (people[person].firstName == firstName && people[person].lastName == lastName)
            return people[person].zip;
    }
    throw `${firstName} ${lastName} is not found`;
}

async function shouldTheyGoOutside(firstName, lastName) {
    await checkName(firstName);
    await checkName(lastName);
    var zip = await findPersonZIP(firstName, lastName);
    var data = await getWeather();
    for (var weather in data) {
        if (data[weather].zip == zip) {
            if (data[weather].temp >= 34)
                return `Yes, ${firstName} should go outside.`;
            else
                return `No, ${firstName} should not go outside.`;
        }
    }
    //no exceptions: You can assume that the weather data for the zip codes exist.
}

module.exports = {
    shouldTheyGoOutside,checkName
}