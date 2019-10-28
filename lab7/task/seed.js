// const dbConnection = require("../database/connection");
// const data = require("../data");
// const animals = data.animals;
// const posts = data.posts;

// async function main() {
//   const db = await dbConnection();
//   await db.dropDatabase();

//   const shibaniu = await animals.create("shibaniu", "dog");
//   const id = shibaniu._id;
//   const name = shibaniu.name;
//   /*
//       "_id": id,
//     "title": "Don't ask me how the weather is up here",
//     "content": "It's only like a few feet higher than you. The weather isn't different. Stop harassing me.",
//     "author":
//     {
//       "_id": "507f1f77bcf86cd799439011",
//       "name": "Mortimer"
//     }
//   */
//   await posts.create({
//     "title": "", // String title
//     "content": "", // String
//     "author": {id, name}, // STRING OR OBJECT ID
//   });

//   console.log("Done seeding database");

//   await db.serverConfig.close();
// }

// main();