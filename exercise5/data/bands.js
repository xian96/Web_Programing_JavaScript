const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const ObjectId = require("mongodb").ObjectID;

let exportedMethods = {
  async getAllBands() {
    const bandCollection = await bands();

    const allBand = await bandCollection.find().toArray();//.find({}) what is this mean? what's diif from find() which is find all;

    return allBand;
  },
  async getBandById(id) {
    if (!id)
      throw `id:${id} is not exist`;
    else if (typeof id === 'string' || id instanceof String) {
      if (typeof id !== 'ObjectId') {
        id = ObjectId(id);//Here convert into ObjectID
        // console.log("after convert1: " + typeof id);
      }
    }
    else
      throw `id:${id} is not an ObjectId or String`; const bandCollection = await bands();
    // console.log("after convert2: " + typeof id);
    const bandGet = await bandCollection.findOne({ _id: ObjectId(id) });//Here convert into ObjectID
    if (bandGet === null)
      throw "No band with that id";

    return bandGet;
  },
  async addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
    if (!bandName)
      throw `bandName:${bandName} is not exist`;
    else if (typeof bandName !== 'string' )
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
        if (typeof bandMember["firstName"] !== 'string')
          throw `bandMember["firstName"]:${bandMember["firstName"]} is not an string`;
        if (typeof bandMember["lastName"] !== 'string')
          throw `bandMember["lastName"]:${bandMember["lastName"]} is not an string`;
      }
    });

    // yearFormed = number year the band formed//(can't be empty, undefined, null, must be greater than or equal to 1900 less than 2019)
    if (!yearFormed)
      throw `yearFormed:${yearFormed} is not exist`;
    else if (!Number.isInteger(yearFormed))
      throw `yearFormed:${yearFormed} is not an integer`;
    else if (yearFormed > 2019 | yearFormed < 1900)
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
    else if (typeof recordLabel !== 'string')
      throw `recordLabel:${recordLabel} is not an string`;

    // The function will return the newly inserted band, throw an error if the document cannot be inserted. 
    const bandCollection = await bands();
    // bandName, bandMembers, yearFormed, genres, recordLabel
    let newBand = {
      // _id: "", 
      bandName: bandName,
      bandMembers: [],
      yearFormed: yearFormed,
      genre: [],
      recordLabel: recordLabel
    }
    for (const bandMember of bandMembers) {
      newBand.bandMembers.push(
        {
          firstName: bandMember.firstName,
          lastName: bandMember["lastName"]
        }
      );
    }
    for (const genre of genres) {
      newBand.genre.push(genre);
    }

    const insertInfo = await bandCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0)
      throw "Could not create newBand";

    const newId = insertInfo.insertedId;
    const band = await bandCollection.findOne({ _id: newId });//ObjectId(newId);should not needed.
    return band;
  },
  async removeBand(id) {
    // Removes a band from the DB, return the list of all bands once band has been deleted (call getAllBands())
    // id is a string/object ID, it cannot be blank, cannot be null, cannot be undefined, must be present
    if (!id)
      throw `id:${id} is not exist`;
    else if (typeof id === 'string' || id instanceof String) {
      if (typeof id !== 'ObjectId') {
        id = ObjectId(id);
        // console.log("after convert: " + typeof id);
      }
    }
    else
    throw `id:${id} is not an ObjectId or String`;
    //If not found or not removed, throw an error.
    const bandCollection = await bands();
    const bandGet = await bandCollection.findOne({ _id: ObjectId(id) });//Here convert into ObjectID
    if (bandGet === null)
      throw "No band with that id";

    // console.log("before the removeOne: " + typeof id)
    const insertInfo = await bandCollection.removeOne({ _id: ObjectId(id) });//ObjectId(id);
    if (insertInfo.insertedCount === 0)
      throw "Could not create animal";

    const newId = insertInfo.insertedId;
    return this.getBandById(newId);
  },
  async searchBandByName(bandName) {
    // bandName = string, can't be blank, null, undefined, a number.. etc...
    if (!bandName)
      throw `bandName:${bandName} is not exist`;
    else if (typeof bandName !== 'string')
      throw `bandName:${bandName} is not an string`;
    // You will search the band name for the name supplied.  You will return wildcard matches..
    // for example:  searchBandByName("Pink") would return "Pink Floyd", "Pink" or any band that had pink in it's name
    // You will need to use a RegEx for this.  like so:
    let regex = new RegExp([".*", bandName, ".*"].join(""), "i");
    // and then in your find query use the regex.  {"bandName": regex}
    const bandCollection = await bands();
    const bandGet = await bandCollection.find({ "bandName": regex }).toArray();
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    //  If there are no bands found with that member then throw an error.

    return bandGet;
  },
  async searchBandMemberFullName(firstName, lastName) {
    if (!firstName)
      throw `firstName:${firstName} is not exist`;
    else if (typeof firstName !== 'string' )
      throw `firstName:${firstName} is not an string`;

    if (!lastName)
      throw `lastName:${lastName} is not exist`;
    else if (typeof lastName !== 'string' )
      throw `lastName:${lastName} is not an string`;
    // You will search bands by band members for the input supplied.
    // This needs to be an exact match so YOU WILL NEED TO USE AN LOGICAL AND for this. .  
    const bandCollection = await bands();

    const bandGet = await bandCollection.find({
      $and: [{ "bandMembers.firstName": firstName }, { "bandMembers.lastName": lastName }]//multiple bandMembers.firstName how to loop match? or it automaticaly do?
    }).toArray();

    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    // You will return a list of bands where that person is a band member.
    // for example:  Corey Taylor is the singer for Slipknot and for Stone Sour.  If both of those bands exist in your DB
    // and Corey Taylor is supplied then both bands would be returned. 
    // If there are no bands found with that member then throw an error.
    return bandGet;
  },
  async searchBandMember(name) {
    if (!name)
      throw `name:${name} is not exist`;
    else if (typeof name !== 'string' || name instanceof String)
      throw `name:${name} is not an string`;
    // You will search bands by band members for the input supplied.  You will return wildcard matches..
    // YOU WILL NEED TO USE AN LOGICAL OR for this. 
    // for example:  searchBandMember("David") would return the band objects Pink Floyd (David Gilmour is a member), Van Halen (David Lee Roth is a member) 
    // or any band that had David in their first or last name.  supplying "dav" should also return
    // You will need to use a RegEx for this.  like so:
    let regex = new RegExp([".*", name, ".*"].join(""), "i");//i: ignore case; if u flag is also enabled, use Unicode case folding
    // and then in your find query use the regex.  {"bandName": regex}
    // .find({  $or: [{ "firstName": regex },{ "lastName": regex } }] }).toArray();
    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ $or: [{ "bandMembers.firstName": regex }, { "bandMembers.lastName": regex }] }).toArray();

    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    // You will return a list of bands where that person is a band member.
    // for example:  David would return the objects Pink Floyd and Van Halen (if those bands were in your DB)
    return bandGet;

  },
  async searchBandByGenre(genre) {
    //  This will return an array of objects of bands where the genre passed in matches one of the genres
    if (!genre)
      throw `genre:${genre} is not exist`;
    else if (typeof genre !== 'string')
      throw `genre:${genre} is not an string`;
    // YOU WILL NEED TO USE MONGO's $in for the query... 
    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ genres: { $in: genre } }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;

    return bandGet;
  },
  async searchBandByYear(year) {
    // This will return an array of objects of bands that were formed in the year supplied
    if (!year)
      throw `year:${year} is not exist`;
    else if (!Number.isInteger(year))
      throw `year:${year} is not an Integer`;

    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ yearFormed: year }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    return bandGet;
  },
  async searchBandFormedBefore(year) {
    // This will return an array of objects of bands that were formed before in the year supplied $lt in mongo
    if (!year)
      throw `year:${year} is not exist`;
    else if (!Number.isInteger(year))
      throw `year:${year} is not an Integer`;

    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ yearFormed: { $lt: year } }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    return bandGet;
  },
  async searchBandFormedOnOrBefore(year) {
    if (!year)
      throw `year:${year} is not exist`;
    else if (!Number.isInteger(year))
      throw `year:${year} is not an Integer`;

    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ yearFormed: { $lte: year } }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    return bandGet;
  },
  async searchBandFormedAfter(year) {
    if (!year)
      throw `year:${year} is not exist`;
    else if (!Number.isInteger(year))
      throw `year:${year} is not an Integer`;

    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ yearFormed: { $gt: year } }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    return bandGet;
  },
  async searchBandFormedOnOrAfter(year) {
    if (!year)
      throw `year:${year} is not exist`;
    else if (!Number.isInteger(year))
      throw `year:${year} is not an Integer`;

    const bandCollection = await bands();

    const bandGet = await bandCollection.find({ yearFormed: { $gte: year } }).toArray();

    // Throw an error if no bands found
    if (bandGet === null)
      throw `No band have or contain that bandName:${bandName}`;
    return bandGet;
  },
  async addBandMember(bandId, firstName, lastName) {
    // TODO: This will add a new band member object to the bandMember array
    if (!bandId)
      throw `bandId:${bandId} is not exist`;
    else if (typeof bandId === 'string' || bandId instanceof String) {
      if (typeof bandId !== 'ObjectId') {
        bandId = ObjectId(bandId);//Here convert into ObjectID
        // console.log("after convert: " + typeof bandId);
      }
    }
    else
      throw `bandId:${bandId} is not an ObjectId or String`;
    if (!firstName)
      throw `firstName:${firstName} is not exist`;
    else if (typeof firstName !== 'string')
      throw `firstName:${firstName} is not an string`;

    if (!lastName)
      throw `lastName:${lastName} is not exist`;
    else if (typeof lastName !== 'string')
      throw `lastName:${lastName} is not an string`;

    // it will return the band with the newly added member.  DO NOT ALLOW duplicates! $addToSet in Mongo...
    const newMember = {
      firstName: firstName,
      lastName: lastName
    }
    const bandCollection = await bands();

    const updateInfo = await bandCollection.update({ $addToSet: { bandMembers: newMember } }).toArray();

    // Throw an error if no bands found
    if (updateInfo.modifiedCount === 0) {
      throw `could not update band with bandId:${bandId} successfully`;
    }

    return await this.getBandById(bandId);
    // Throw an error if the member cannot be added
  },
  async removeBandMember(bandId, firstName, lastName) {
    // TODO: This will remove a band member object to the bandMember array
    if (!bandId)
      throw `bandId:${bandId} is not exist`;
    else if (typeof bandId === 'string' || bandId instanceof String) {
      if (typeof bandId !== 'ObjectId') {
        bandId = ObjectId(bandId);//Here convert into ObjectID
      }
    }
    else
      throw `bandId:${bandId} is not an ObjectId or String`;
    if (!firstName)
      throw `firstName:${firstName} is not exist`;
    else if (typeof firstName !== 'string')
      throw `firstName:${firstName} is not an string`;

    if (!lastName)
      throw `lastName:${lastName} is not exist`;
    else if (typeof lastName !== 'string')
      throw `lastName:${lastName} is not an string`;

    //   it will return the band with the newly removed member.
    const Member = {
      firstName: firstName,
      lastName: lastName
    }
    const bandCollection = await bands();

    const updateInfo = await bandCollection.update({ $pull: { bandMembers: Member } }).toArray();

    // Throw an error if no bands found
    if (updateInfo.modifiedCount === 0) {
      throw `could not update band with bandId:${bandId} successfully`;
    }

    return await this.getBandById(bandId);
  }
};

module.exports = exportedMethods;