const express = require("express");
const router = express.Router();
const aboutData = {
    "name": "Jiaxian Xing",
    "cwid": "10439460",
    "biography": "Hello!!! I'm Jiaxian, be free to call me Jason.\n I'm currently a master student major in CS. I enjoy creating applications for various application.",
    "favoriteShows": ["Star Trek", "The Big bang theory", "black mirror"],
    "hobbies": ["Traveling", "TV shows", "Movies"]
};

router.get("/", (req,res) =>{
    try{
        res.json(aboutData);
    }catch(e){
        res.status(404).json({message:"not found aboutData!"});
    }
});

module.exports = router;