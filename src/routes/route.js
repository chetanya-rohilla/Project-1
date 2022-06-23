const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const {auth} = require("../middlewares/midware")

router.post("/blogs",auth, blogController.createNewBlog);
router.post("/authors", authorController.createAuthor )
router.get("/blogs", auth, blogController.getBlogs )
router.put("/blogs/:blogId",auth, blogController.updateBlog )
router.delete("/blogs/:blogId",auth,blogController.deleteBlog)
router.delete("/blogs", auth,blogController.deleteBlogByParams)
router.post("/login", authorController.login)

module.exports = router;

