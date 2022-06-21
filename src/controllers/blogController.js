const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");


const createNewBlog = async function(req,res){
try{

   let blog =  req.body

   let author_Id = blog.authorId
   let author = await authorModel.findById(author_Id)
   if(!author)
    return res.status(400).send({
      status: false,
      msg: "Author not found",
    });
    
   let blogCreated = await blogModel.create(blog)
   res.status(201).send ({
    status: true, 
    data: blogCreated 
    });
}catch(err){
    //for getting server error 
       res.status(500).send({status: false, msg:err.message})
}
}


module.exports.createNewBlog = createNewBlog