const dbconnection = require("./connection");

const getCollection = (collection) => {
    let coll = undefined;

    return async () =>{
        if(!coll){
            const db = await dbconnection();
            coll = await db.collection(collection);
        }
        return coll;
    }
};

module.exports = { 
    animals: getCollection("animals"),
    posts: getCollection("posts"),
}