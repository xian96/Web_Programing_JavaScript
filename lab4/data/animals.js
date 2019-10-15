const mongoCollections = require("./mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require('mongodb');
/*
The schema for animals is as followed:
{
    _id: "", 
    name: "",
    animalType: ""
}
*/
async function create(name, animalType) {
    if (!name || typeof name !== 'string')
        throw "You must provide a name for your animal";

    if (!animalType || typeof animalType !== 'string')
        throw "You must provide an animalType of animal";

    const animalCollection = await animals();

    let newAnimal = {
        // _id: "", 
        name: name,
        animalType: animalType
    }

    const insertInfo = await animalCollection.insertOne(newAnimal);
    if (insertInfo.insertedCount === 0)
        throw "Could not create animal";

    const newId = insertInfo.insertedId;
    // console.log(typeof newId);
    const animal = await animalCollection.findOne({ _id: newId });
    return animal;
}

async function getAll() {
    const animalCollection = await animals();

    const allAnimals = await animalCollection.find({}).toArray();//.find({}) what is this mean?

    return allAnimals;
}

async function get(id) {
    if (!id)
        throw "You must provide an id to search for";
    if (typeof id !== 'string') {// you'll have to convert into ObjectID 
        throw `id:${id} type is Type:${typeof id}. Need string`;
    }

    const animalCollection = await animals();
    const animalGet = await animalCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    if (animalGet === null)
        throw "No animal with that id";

    return animalGet;
}


async function remove(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== 'string') {// you'll have to convert into ObjectID 
        throw `id:${id} type is Type:${typeof id}. Need string`;
    }

    const animalCollection = await animals();

    const removed = await animalCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    const deletionInfo = await animalCollection.removeOne({ _id: ObjectId.createFromHexString(id) });//deleteOne?remove?delete? method i don't have here

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete animal with id of ${id}`;
    }
    return removed;
}

async function rename(id, newName) {
    if (!id)
        throw "You must provide an id to search for";
    if (typeof id !== 'string') {// you'll have to convert into ObjectID 
        throw "You must provide a string for your animal id";
    }

    if (!newName)
        throw "You must provide a newName for your animal";

    if (typeof newName !== 'string') {
        throw "You must provide a string for your animal newName";
    }

    const animalCollection = await animals();
    const updatedAnimal = {
        name: newName,
    };

    const updateInfo = await animalCollection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updatedAnimal });
    if (updateInfo.modifiedCount === 0) {
        throw `could not update animal with id:${id} successfully`;
    }

    return await this.get(id);
}

module.exports = {
    create, getAll, get, remove, rename
}