const BlogModel = require("../models/blogModel");

const createNewBlog = async function(req,res){
try{

   let blog =  req.body
   //let author_Id = projectAuthor.authorId
//    if(!blog)
//     return res.status(400).send({
//       status: false,
//       msg: "error-response-structure",
//     });

   let blogCreated = await BlogModel.create(blog)
   res.status(201).send ({
    status: true, 
    msg: blogCreated 
    });
}catch(err){
    //for getting server error 
    console.log("This is error msg", err.message)
    res.status(500).send({msg:error,error:err.message})
}
}


module.exports.createNewBlog = createNewBlog