const Collections = require("../database/collections");
const posts = Collections.posts;
const animal = Collections.animals;
const animalData = require("./animals");
const ObjectID = require('mongodb').ObjectID;

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
async function getAll() {
    const postCollection = await posts();

    const allPosts = await postCollection.find({}).toArray();

    return allPosts;
}

/*
{
    "_id": "", //STRING OR OBJECT ID
    "title": "", // String title
    "author": "", // STRING OR OBJECT ID
    "content": "" // String
}
*/
async function addPost(title, author, content) {
    if (!title || typeof title !== 'string')
        throw "You must provide a title for your post";

    if (!author)
        throw "You must provide a title for your post";
    else if (!ObjectID.isValid(author)) {
        if (typeof author === 'string') {//author type is 'string' you'll have to convert into ObjectID 
            author = ObjectID(author);
        }
        else {
            throw `author:${author}, Must Be STRING OR OBJECT ID`;
        }
    }

    if (!content || typeof content !== 'string')
        throw "You must provide an content of post";

    const animalCollection = await animal();
    const animalGet = await animalCollection.findOne({ _id: ObjectID(author) })
    let newPost = {
        // _id: "", The **_id** field will be automatically generated by MongoDB
        "title": title,
        "author": {
            "_id": author,
            "name": animalGet.name,
        },
        "content": content,
    }

    const postCollection = await posts();

    const insertInfo = await postCollection.insertOne(newPost);
    if (insertInfo.insertedCount === 0)
        throw "Could not create animal";

    const newId = insertInfo.insertedId;
    // console.log(typeof newId);

    const post = await postCollection.findOne({ _id: ObjectID(newId) });

    //add the post in to animals
    const ainmalId = author;
    const postId = post._id;
    const postTittle = title;
    await animalData.updateAnimalPost(ainmalId, postId, postTittle);
    console.log(newPost);

    //return the newly created post
    return post;
}

async function getPostById(id) {
    if (!id)
        throw "You must provide a id for your post";
    else if (!ObjectID.isValid(id)) {
        if (typeof id === 'string') {//id type is 'string' you'll have to convert into ObjectID 
            id = ObjectID(id);
        }
        else {
            throw `id:${id}, Must Be STRING OR OBJECT ID`;
        }
    }

    const postCollection = await posts();
    const postGet = await postCollection.findOne({ _id: ObjectID(id) });
    if (postGet === null)
        throw "No animal with that id";

    return postGet;
}

async function updatePost(id, newPost) {
    if (!id)
        throw "You must provide a id for your post";
    else if (!ObjectID.isValid(id)) {
        if (typeof id === 'string') {//id type is 'string' you'll have to convert into ObjectID 
            id = ObjectID(id);
        }
        else {
            throw `id:${id}, Must Be STRING OR OBJECT ID`;
        }
    }

    if (!newPost)
        throw "You must provide a newPost for your animal";

    if (typeof newPost !== 'object') {
        throw "You must provide a object for your newPost";
    }
    // {
    //     "newTitle": "new title",
    //     "newContent: "The new content of the post"
    // }
    const postCollection = await posts();
    const postGet = await postCollection.findOne({ _id: ObjectID(id) });

    var updatedPost;
    const titleChage = false;
    if (!newPost.hasOwnProperty('newTitle') && !newPost.hasOwnProperty('newContent')) {//either
        throw `empty new info`;
    }
    else if (!newPost.hasOwnProperty('newTitle')) {//content only
        updatedAnimal = {
            "title": postGet.title,
            "content": newPost.newContent,
        }
    }
    else if (!newPost.hasOwnProperty('newContent')) {//tittle only
        updatedAnimal = {
            "title": newPost.newTitle,
            "content": postGet.content,
        }
        //title has change!
        titleChage = ture;
    }
    else {//both have
        updatedAnimal = {
            "title": newPost['newTitle'],
            "content": newPost['newContent'],
        }
    }

    const updateInfo = await postCollection.updateOne({ _id: ObjectID(id) }, { $set: updatedPost });
    // const updateInfo = await animalCollection.updateOne({ _id: ObjectID.createFromHexString(id) }, { $set: updatedAnimal });
    if (updateInfo.modifiedCount === 0) {
        throw `could not update animal with id:${id} successfully`;
    }

    //updateAll animal post title:
    if(titleChage){
        await animalData.updateAllTitle();
    }

    return await this.getPostById(id);
}

async function updatePostAnimal(postId, animalId, animalName) {
    // if (!animalId)
    //     throw "You must provide a animalId for your post";
    // else if (!ObjectID.isValid(animalId)) {
    //     if (typeof animalId === 'string') {//animalId type is 'string' you'll have to convert into ObjectID 
    //         animalId = ObjectID(animalId);
    //     }
    //     else {
    //         throw `id:${animalId}, Must Be STRING OR OBJECT ID`;
    //     }
    // }
    // const animalCollection = await animals();
    // const updateInfo = await animalCollection.updateOne({ _id: animalId },
    //     { $push: { posts: { postid: postId, tittle: postTittle } } }
    // );

    // if (!updateInfo.modifiedCount) {
    //     throw `could not update animal post with animalId:${animalId} successfully`;
    // }

    // return await this.getAnimalById(animalId); 
}

// {
//     "deleted": true,
//     "data": {
//         "_id": "a4f8512b9a734baf863ff33ffbabab2d",
//         "title": "Don't ask me how the weather is up here", 
//         "content": "It's only like a few feet higher than you. The weather isn't different. Stop harassing me.",
//         "author": 
//         {
//             "_id": "507f1f77bcf86cd799439011", 
//             "name": "Mortimer"
//         }
//     }
// }  
async function removePost(id) {
    if (!id)
        throw "You must provide a id for your post";
    else if (!ObjectID.isValid(id)) {
        if (typeof id === 'string') {//id type is 'string' you'll have to convert into ObjectID 
            id = ObjectID(id);
        }
        else {
            throw `id:${id}, Must Be STRING OR OBJECT ID`;
        }
    }

    // const animalCollection = await animals();
    const postCollection = await posts();

    const removed = await postCollection.findOne({ _id: ObjectID(id) });

    //first update all animal have this post
    await animalData.updateAllAnimalPost();

    // then delete post:
    const deletionInfo = await postCollection.removeOne({ _id: ObjectID(id) });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete animal with id of ${id}`;
    }

    const removeReturn = {
        "deleted": true,
        "data": removed,
    }
    return removeReturn;
}

async function updateAllName(){
    //TODO:
    const postCollection = await posts();

}

module.exports = {
    addPost, getAll, getPostById, removePost, updatePost,updateAllName,
}