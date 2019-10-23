const express = require('express');
const router = express.Router();
const data = require('../data');
const animalData = data.animals
const postData = data.posts
// const likeData = data.likes

// {
//     "_id": "a4f8512b9a734baf863ff33ffbabab2d",
//     "title": "Don't ask me how the weather is up here", 
//     "content": "It's only like a few feet higher than you. The weather isn't different. Stop harassing me.",
//     "author": 
//     {
//         "_id": "507f1f77bcf86cd799439011", 
//         "name": "Mortimer"
//     }
// }
// show the _id and name of the author, as seen above.TODO:
router.get('/', async (req, res) => {
    try {
        const postList = await postData.getAll();
        res.json(postList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// {
//     "title": "", // String title
//     "author": "", // STRING OR OBJECT ID
//     "content": "" // String
// }
router.post('/', async (req, res) => {
    const newPostData = req.body;
    try {
        const { title, author, content } = newPostData;
        const newPost = await postData.addPost(title, author, content);
        res.status(200).json(newPost);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await postData.getPostById(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        res.status(404).json({ error: 'Post not found' });
    }
});

// {
//     "newTitle": "new title",
//     "newContent: "The new content of the post"
// }
router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    try {
        await postData.getPostById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }

    try {
        const updatedPost = await postData.updatePost(req.params.id, updatedData);
        res.json(updatedPost);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await postData.getPostById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    try {
        await postData.removePost(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;