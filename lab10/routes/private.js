const express = require("express");
const router = express.Router();
// const app = express();

// This route will be simple, as well. This route will be protected 
// your own authentication middleware to only allow valid, logged in users to see this page.
//TODO:
router.get("/private", (req, res) =>{
// If the user is logged in, you will make a simple view that displays
//  all details except the password for the currently logged in user.

// Also, you will need to have a hyperlink at the bottom of the page to /logout.
});

module.exports = router;