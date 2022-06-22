const express = require('express');
const router = express.Router();
const authorModel= require("../models/authorModel")
const blogModel = require("../models/blogModel")
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.post("/blogs", blogController.createNewBlog);
router.post("/authors", authorController.createAuthor )
router.put("/blogs/:blogId", blogController.updateBlog )
router.delete("/blogs/:blogId",blogController.deleteblog);
module.exports = router;