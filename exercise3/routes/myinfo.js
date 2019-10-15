const express = require("express");
const router = express.Router();

const myInfo = { name: 'Jiaxian Xing', dateOfBirth: '06/20', hometown: 'Xian' }

router.get("/", async (req, res) => {
    res.json(myInfo)
}
);

module.exports = router;