const express = require('express');
const router = express.Router();
const data = require('../data');
const animalData = data.animals
// const postData = data.posts
// const likeData = data.likes

// {
//     "_id": "", //STRING OR OBJECT ID
//     "name": "",
//     "animalType": "",
//     "likes": [], // Array of strings or Object IDs
//     "posts": [] // Array of strings or Object IDs
// }

router.get('/', async (req, res) => {
    try {
        const animalList = await animalData.getAll();
        res.json(animalList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    const animalDataPost = req.body;
    // {
    //     "name": "Mortimer",
    //     "animalType": "Giraffe"
    // }
    try {
        const { name, animalType } = animalDataPost;
        if (!name || typeof name !== 'string')
            throw "You must provide a name for your animal";

        if (!animalType || typeof animalType !== 'string')
            throw "You must provide an animalType of animal";

        const newAnimalDataPost = await animalData.create(name, animalType);
        res.status(200).json(newAnimalDataPost);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const animal = await animalData.getAnimalById(req.params.id);
        res.status(200).json(animal);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

// router.get('/tag/:tag', async (req, res) => {
//     const postList = await postData.getPostsByTag(req.params.tag);
//     res.json(postList);
// });

router.put('/:id', async (req, res) => {
    const updatedData = req.body;

    try {
        await animalData.getAnimalById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }

    try {
        const updatedAnimal = await animalData.update(req.params.id, updatedData);
        res.json(updatedAnimal);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {

    try {
        await animalData.getAnimalById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }

    try {
        const AnimalDataDeleted = await animalData.remove(req.params.id);
        res.sendStatus(200).json(AnimalDataDeleted);;
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;