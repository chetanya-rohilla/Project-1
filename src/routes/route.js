const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blogController')



router.post("/createNewBlog", BlogController.createNewBlog);