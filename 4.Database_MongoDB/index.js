const animals = require("./data/animals");
const connection = require("./data/mongoConnection");
const mongoCollections = require("./data/mongoCollections");
const _animals = mongoCollections.animals;
const { ObjectId } = require('mongodb');




async function main() {
    try {
        // Create an animal named Sasha with the type of Dog
        // Log the newly created animal
        console.log(await animals.create("Sasha", "Dog"));
        // Create an animal named Lucy, with the type of Dog
        await animals.create("Lucy", "Dog");
        // Query all animals, and log them all
        console.log(await animals.getAll());
        // Create an animal named Duke, with a type of Walrus
        // Log the newly created Duke
        console.log(await animals.create("Duke", "Walrus"));
        // Rename Sasha to Sashita
        // Log the newly named Sashita
        const animalCollection = await _animals();
        var Sasha = await animalCollection.findOne({ name: "Sasha" });
        console.log(await animals.rename(ObjectId(Sasha._id).toString(), "Sashita"));
        // Remove Lucy
        var Lucy = await animalCollection.findOne({ name: "Lucy" });
        await animals.remove(ObjectId(Lucy._id).toString());
        // Query all animals, and log them all
        console.log(await animals.getAll());
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await animals.create("Sasha", "Dog"));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await animals.getAll());
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await animals.get("5d936d56424a7666a4a2628e"));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await animals.remove("5d936d56424a7666a4a2628d"));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await animals.rename("5d936d56424a7666a4a2628d", "Bubba"));
    } catch (e) {
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();

    console.log("Done!");
}

main().catch(e => {
    console.log(e);
});