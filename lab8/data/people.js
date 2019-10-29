const axios = require("axios");

let exportedMethods = {
  async getAllPeople() {
    //Notice! can not change the name "data"
    let  {data}  = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    // console.log(typeof data);
    return data;
  },
  async getPeopleByName(personName) {
    if (!personName)
      throw `personName:${personName} is not exist`;
    if(typeof personName !== 'string')
      throw `pleas provide a string type personName`;
      personName = personName.toLowerCase();
    const allPeople = await this.getAllPeople();
    const peopleMatch = [];
    for (const person in allPeople) {//loop through each person, if id not sorted;
      if (allPeople[person].firstName.toLowerCase().includes(personName) || allPeople[person].lastName.toLowerCase().includes(personName)){
        // console.log(allPeople[person]);
        peopleMatch.push(allPeople[person]);
      }
    }
    return peopleMatch;
  },
  async getPersonById(personId) {
    if (!personId)
      throw `personId:${personId} is not exist`;
    if(typeof personId !== 'string')
      throw `pleas provide a string type personId`;

    const allPeople = await this.getAllPeople();
    for (const person in allPeople) {//loop through each person, if id not sorted;
      if (allPeople[person].id === personId)
        return allPeople[person];
    }
      return `person in personId:${personId} is not found!`;
  },

};

module.exports = exportedMethods;