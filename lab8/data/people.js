const axios = require("axios");

let exportedMethods = {
  async getAllPeople() {
    let { allPeople } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return allPeople;
  },
  
};

module.exports = exportedMethods;