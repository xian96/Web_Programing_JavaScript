const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  getAllBands() {
    const bandCollection = await bands();

    const allBand = await bandCollection.find().toArray();//.find({}) what is this mean? what's diif from find() which is find all;

    return allBand;
  },
  getBandByName(id) {
    if (!id)
      throw "You must provide an id to search for";
    if (typeof id !== 'string') {// you'll have to convert into ObjectID 
      throw `id:${id} type is Type:${typeof id}. Need string`;
    }
    const bandCollection = await bands();
    const bandGet = await bandCollection.findOne({ _id: ObjectId.createFromHexString(id) });//Here convert into ObjectID
    if (bandGet === null)
      throw "No animal with that id";

    return bandGet;
  },
  addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
    // ex object:
    // {
    //   bandName: "Pink Floyd",
    //     bandMembers: [
    //       { firstName: "Roger", lastName: "Waters" },
    //       { firstName: "David", lastName: "Gilmour" },
    //       { firstName: "Nick", lastName: "Mason" },
    //       { firstName: "Richard", lastName: "Wright" },
    //       { firstName: "Syd", lastName: "Barrett" }
    //     ],
    //       yearFormed: 1965,
    //         genre: ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
    //           recordLabel: "EMI"
    // }
    if (!bandName)
      throw `bandName:${bandName} is not exist`;
    else if (typeof bandName !== 'string' || bandName instanceof String)
      throw `bandName:${bandName} is not an string`;

    //bandMembers (can't be empty, undefined, null etc.. MUST have at least one band member) 
    if (!bandMembers)
      throw `bandMembers:${bandMembers} is not exist`;
    else if (!Array.isArray(bandMembers))
      throw `bandMembers:${bandMembers} is not array`;
    else if (bandMembers.length < 1)
      throw `bandMembers:${bandMembers} MUST have at least one band member`;
    bandMembers.forEach(function (bandMember) {
      if (typeof bandMember !== "object")
        throw `bandMember:${bandMember} is not an object`;
      else if (!bandMember.hasOwnProperty('firstName') || !bandMember.hasOwnProperty('lastName')) {//neither
        throw `bandMember:${bandMember} is lack of firstName or lastName or both`;
      }
      else {
        if (typeof bandMember["firstName"] !== 'string' || bandMember["firstName"] instanceof String)
          throw `bandMember["firstName"]:${bandMember["firstName"]} is not an string`;
        if (typeof bandMember["lastName"] !== 'string' || bandMember["lastName"] instanceof String)
          throw `bandMember["lastName"]:${bandMember["lastName"]} is not an string`;
      }
    });

    // yearFormed = number year the band formed//(can't be empty, undefined, null, must be greater than or equal to 1900 less than 2019)
    if (!yearFormed)
      throw `yearFormed:${yearFormed} is not exist`;
    else if (!Number.isInteger(yearFormed))
      throw `yearFormed:${yearFormed} is not an integer`;
    else if (yearFormed > 2019 | id < 1900)
      throw `yearFormed:${yearFormed} is out of bounds must be greater than or equal to 1900 less than 2019`;

    // genres = array with at LEAST one element//(can't be empty, undefined, null etc..) 
    if (!genres)
      throw `genres:${genres} is not exist`;
    else if (!Array.isArray(genres))
      throw `genres:${genres} is not array`;
    else if (genres.length < 1)
      throw `genres:${genres} LEAST one element`;

    // recordLabel = string of the name of their record label//(can't be empty, undefined, null etc..) 
    if (!recordLabel)
      throw `recordLabel:${recordLabel} is not exist`;
    else if (typeof recordLabel !== 'string' || recordLabel instanceof String)
      throw `recordLabel:${recordLabel} is not an string`;

    // The function will return the newly inserted band, throw an error if the document cannot be inserted. 
    const bandCollection = await bands();

    let newBand = {
      // _id: "", 
      bandName: "Pink Floyd",
      bandMembers: [
        { firstName: "Roger", lastName: "Waters" },
        { firstName: "David", lastName: "Gilmour" },
        { firstName: "Nick", lastName: "Mason" },
        { firstName: "Richard", lastName: "Wright" },
        { firstName: "Syd", lastName: "Barrett" }
      ],
      yearFormed: 1965,
      genre: ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      recordLabel: "EMI"
    }

    const insertInfo = await bandCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0)
      throw "Could not create animal";

    const newId = insertInfo.insertedId;
    // console.log(typeof newId);
    const band = await bandCollection.findOne({ _id: newId });
    return band;
  },
  removeBand(id) {
    // TODO: Removes a band from the DB, return the list of all bands once band has been deleted (call getAllBands())
    // id is a string/object ID, it cannot be blank, cannot be null, cannot be undefined, must be present
    //If not found or not removed, throw an error.
  },
  searchBandByName(bandName) {
    /*  
      bandName = string, can't be blank, null, undefined, a number.. etc...
      TODO: You will search the band name for the name supplied.  You will return wildcard matches..
      for example:  searchBandByName("Pink") would return "Pink Floyd", "Pink" or any band that had pink in it's name
     
      You will need to use a RegEx for this.  like so:
      let regex = new RegExp([".*", bandName, ".*"].join(""), "i");
      and then in your find query use the regex.  {"bandName": regex}
       If there are no bands found with that member then throw an error.
    */
  },
  searchBandMemberFullName(firstName, lastName) {
    /*  
      TODO: You will search bands by band members for the input supplied.
      This needs to be an exact match so YOU WILL NEED TO USE AN LOGICAL AND for this. .  
      
      You will return a list of bands where that person is a band member.
      for example:  Corey Taylor is the singer for Slipknot and for Stone Sour.  If both of those bands exist in your DB
      and Corey Taylor is supplied then both bands would be returned. 
      If there are no bands found with that member then throw an error.
    */
  },
  searchBandMember(name) {
    /*  
      TODO: You will search bands by band members for the input supplied.  You will return wildcard matches..
      YOU WILL NEED TO USE AN LOGICAL OR for this. 
      for example:  searchBandMember("David") would return the band objects Pink Floyd (David Gilmour is a member), Van Halen (David Lee Roth is a member) 
      or any band that had David in their first or last name.  supplying "dav" should also return
      You will need to use a RegEx for this.  like so:
      let regex = new RegExp([".*", name, ".*"].join(""), "i");
      and then in your find query use the regex.  {"bandName": regex}
      .find({  $or: [{ "firstName": regex },{ "lastName": regex } }] }).toArray();
      
      You will return a list of bands where that person is a band member.
      for example:  David would return the objects Pink Floyd and Van Halen (if those bands were in your DB)
    */
  },
  searchBandByGenre(genre) {
    /*  
      TODO: This will return an array of objects of bands where the genre passed in matches one of the genres
      YOU WILL NEED TO USE MONGO's $in for the query... 
      Throw an error if no bands found
    */
  },
  searchBandByYear(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed in the year supplied
      Throw an error if no bands found
    */
  },
  searchBandFormedBefore(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed before in the year supplied $lt in mongo
      Throw an error if no bands found
    */
  },
  searchBandFormedOnOrBefore(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed on or before in the year supplied $lte in mongo
      Throw an error if no bands found
    */
  },
  searchBandFormedAfter(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed After in the year supplied $gt in mongo
      Throw an error if no bands found
    */
  },
  searchBandFormedOnOrAfter(year) {
    /*  
      TODO: This will return an array of objects of bands that were formed on or after in the year supplied $gte in mongo
      Throw an error if no bands found
    */
  },
  addBandMember(bandId, firstName, lastName) {
    /*  
      TODO: This will add a new band member object to the bandMember array
      it will return the band with the newly added member.  DO NOT ALLOW duplicates! $addToSet in Mongo...
      Throw an error if the member cannot be added
    */
  },
  removeBandMember(bandId, firstName, lastName) {
    /*  
      TODO: This will remove a band member object to the bandMember array
      it will return the band with the newly removed member.
      Throw an error if the member cannot be removed
    */
  }
};

module.exports = exportedMethods;