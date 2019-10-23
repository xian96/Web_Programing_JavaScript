const Collections = require("../database/collections");
const animals = Collections.animals;
const posts = Collections.posts;
const ObjectId = require('mongodb').ObjectID;
/*
{
    "_id": "", //STRING OR OBJECT ID
    "name": "",
    "animalType": "",
    "likes": [], // Array of strings or Object IDs
    "posts": [] // Array of strings or Object IDs
}
*/
async function create(name, animalType) {
    if (!name || typeof name !== 'string')
        throw "You must provide a name for your animal";

    if (!animalType || typeof animalType !== 'string')
        throw "You must provide an animalType of animal";

    const animalCollection = await animals();

    let newAnimal = {
        // _id: "", The **_id** field will be automatically generated by MongoDB
        "name": name,
        "animalType": animalType,
        "likes": [],
        "posts": [],
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

    const allAnimals = await animalCollection.find({}).toArray();

    return allAnimals;
}
// {
//     "_id": "507f1f77bcf86cd799439011", 
//     "name": "Mortimer",
//     "animalType": "Giraffe",
//     "likes": [
//         {
//             "_id": "a4f8512b9a734baf863ff33ffbabab2d",
//             "title": "Don't ask me how the weather is up here"
//         }
//     ],
//     "posts": [
//     {
//             "_id": "a4f8512b9a734baf863ff33ffbabab2d",
//             "title": "Don't ask me how the weather is up here"
//         }
//     ]
// }
async function getAnimalById(id) {
    if (!id)
        throw "You must provide a id for your post";
    else if (!ObjectID.isValid(id)) {
        if (typeof id === 'string') {//id type is 'string' you'll have to convert into ObjectID 
            id = ObjectId(id);
        }
        else {
            throw `id:${id}, Must Be STRING OR OBJECT ID`;
        }
    }

    const animalCollection = await animals();
    const animalGet = await animalCollection.findOne({ _id: id });
    if (animalGet === null)
        throw "No animal with that id";

    return animalGet;
}

async function update(id, newInfo) {
    if (!id)
        throw "You must provide a id for your post";
    else if (!ObjectID.isValid(id)) {
        if (typeof id === 'string') {//id type is 'string' you'll have to convert into ObjectID 
            id = ObjectId(id);
        }
        else {
            throw `id:${id}, Must Be STRING OR OBJECT ID`;
        }
    }
    const animalCollection = await animals();
    const animal = await animalCollection.findOne({ _id: id });

    if (!newInfo)
        throw "You must provide a newName for your animal";

    if (typeof newInfo !== 'object') {
        throw `You must provide a object for your animal Info`;
    }
    // {
    // "newName": "Maximums",
    // "newType": "Noble Giraffe",
    // }
    // you may submit this request with either newName, newType, or both!
    const updatedAnimal;
    if (!newInfo.hasOwnProperty('newName') && !newInfo.hasOwnProperty('newType')) {//either
        throw `empty new info`;
    }
    else if (!newInfo.hasOwnProperty('newName')) {//type
        updatedAnimal = {
            "name": animal.name,
            "animalType": newInfo['newType'],
        }
    }
    else if (!newInfo.hasOwnProperty('newType')) {//name
        updatedAnimal = {
            "name": newInfo['newName'],
            "animalType": animal.animalType,
        }
    }
    else {//both
        updatedAnimal = {
            "name": newInfo['newName'],
            "animalType": newInfo['newType'],
        }
    }

    const updateInfo = await animalCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedAnimal });
    // const updateInfo = await animalCollection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updatedAnimal });
    if (updateInfo.modifiedCount === 0) {
        throw `could not update animal with id:${id} successfully`;
    }

    return await this.getAnimalById(id);
}

async function updateAnimalPost(animalId, postId, postTittle) {
    if (!animalId)
        throw "You must provide a animalId for your post";
    else if (!ObjectID.isValid(animalId)) {
        if (typeof animalId === 'string') {//animalId type is 'string' you'll have to convert into ObjectID 
            animalId = ObjectId(animalId);
        }
        else {
            throw `id:${animalId}, Must Be STRING OR OBJECT ID`;
        }
    }
    const animalCollection = await animals();
    const updateInfo = await animalCollection.updateOne({ _id: animalId },
        { $push: { posts: { postid: postId, tittle: postTittle } } }
    );

    if (!updateInfo.modifiedCount) {
        throw `could not update animal post with animalId:${animalId} successfully`;
    }

    return await this.getAnimalById(animalId);
}

async function remove(id) {
    if (!id) throw "You must provide an id to search for";
    if (typeof id !== 'string') {// you'll have to convert into ObjectID 
        throw `id:${id} type is Type:${typeof id}. Need string`;
    }

    const animalCollection = await animals();
    const postCollection = await posts();

    const removed = await animalCollection.findOne({ _id: ObjectId(id) });

    // first delete all posts written by this animal:
    const animalPostAll = removed["posts"];
    animalPostAll.forEach(function (post) {
        // const removedPost = 
        await postCollection.findOne({ _id: post["_id"] });//if post is added correctly this never throw.
        const postDeletionInfo = await postCollection.removeOne({ _id: post["_id"] });
        if (postDeletionInfo.deletedCount === 0) {//one of post from this animal failed.
            throw `one of post from animal Id:${id} failed. Could not delete animal post with post id of ${post["_id"]}`;
        }
    });

    // then delete animal:
    const deletionInfo = await animalCollection.removeOne({ _id: ObjectId(id) });
    // const removed = await animalCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    // const deletionInfo = await animalCollection.removeOne({ _id: ObjectId.createFromHexString(id) });//deleteOne?remove?delete? method i don't have here

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete animal with id of ${id}`;
    }
    // {
    //     "deleted": true,
    //     "data": {
    //         "_id": "507f1f77bcf86cd799439011", 
    //         "name": "Mortimer",
    //         "animalType": "Giraffe",
    //         "likes": [
    //             {
    //                 "_id": "a4f8512b9a734baf863ff33ffbabab2d",
    //                 "title": "Don't ask me how the weather is up here"
    //             }
    //         ],
    //         "posts": [
    //         {
    //                 "_id": "a4f8512b9a734baf863ff33ffbabab2d",
    //                 "title": "Don't ask me how the weather is up here"
    //             }
    //         ]
    //     }
    // }  
    const removeReturn = {
        "deleted": true,
        removed
    }
    return removeReturn;
}

module.exports = {
    create, getAll, getAnimalById, remove, update, updateAnimalPost,
}