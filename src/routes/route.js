const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blogController')



router.post("/createNewBlog", BlogController.createNewBlog);

const authorModel= require("../models/authorModel")
const blogModel = require("../models/blogModel")
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.post("/authors", authorController.createAuthor )

module.exports = router;
