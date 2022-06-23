const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.post("/blogs", blogController.createNewBlog);
router.post("/authors", authorController.createAuthor )
router.get("/blogs", blogController.getBlogs )
router.put("/blogs/:blogId", blogController.updateBlog )
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogs", blogController.deleteBlogByParams)
router.post("/login", authorController.login)

module.exports = router;
