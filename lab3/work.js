// const bluebird = require("bluebird");
// const Promise = bluebird.Promise;

const axios = require("axios");
const pe = require("./people");
const we = require("./weather");
// async function getPeople() {
//     const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
//     return data; // this will be the array of people
// }
// async function checkName(name) {
//     if (name == undefined)
//         throw `name:${name} is not exist`;
//     else if (typeof name !== 'string' || name instanceof String)
//         throw `name:${name} is not an string`;
// }

async function getWork() {
    const { data } = await axios.get("https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json");
    return data; // this will be the array of people
}

async function findPersonSSN(firstName, lastName) {
    var people = await pe.getPeople();
    for (var person in people) {//loop through each person, if id not sorted;
        if (people[person].firstName == firstName && people[person].lastName == lastName)
            return people[person].ssn;
    }
    throw `${firstName} ${lastName} is not found`;
}

async function whereDoTheyWork(firstName, lastName) {
    await we.checkName(firstName);
    await we.checkName(lastName);
    var ssn = await findPersonSSN(firstName, lastName);
    var data = await getWork();
    for (var work in data) {
        if (data[work].ssn == ssn) {// Then, print their full name, company, job title and if they will be fired.
            if (data[work].willBeFired)
                return `${firstName} ${lastName} - ${data[work].jobTitle} at ${data[work].company}. They will be Fired!`;
            else
                return `${firstName} ${lastName} - ${data[work].jobTitle} at ${data[work].company}. They will not be fired.`;
        }
    }
    //no exceptions: You can assume that the data corresponding to a person's SSN always exists 
}

async function ValidateIPaddress(ip) {
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))
        throw `ip:${ip} is not a valid ip address`;
}

async function findworkSSN(ip) {
    var data = await getWork();
    for (var work in data) {
        if (data[work].ip == ip) {
            return data[work].ssn;
        }
    }
    throw `ssn has ip:${ip} is not found`;
}

async function findTheHacker(ip) {
    await ValidateIPaddress(ip);
    var ssn = await findworkSSN(ip);
    var peopledata = await pe.getPeople();
    for (var person in peopledata) {
        if (peopledata[person].ssn == ssn)
            return `${peopledata[person].firstName} ${peopledata[person].lastName} is the Hacker`;
    }
    return `hacker in ssn:${ssn} is Unknow!`;
}


module.exports = {
    whereDoTheyWork, findTheHacker
}