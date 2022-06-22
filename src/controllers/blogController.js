const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { typeChecking } = require("../controllers/authorController");
const moment = require('moment');


const createNewBlog = async function(req,res){
    try{
        let blog =  req.body
        let author_Id = blog.authorId
        let author = await authorModel.findById(author_Id)

        if(!author)  return res.status(400).send({status: false,msg: "Author not found!",});
        
        let {title, body, category, tags, subcategory} = blog
    
        if(!title) return res.status(400).send({status: false, msg: "title required!"});
        if(!typeChecking(title))    return res.status(400).send({status: false,msg: "Please enter the title in right format...!"});
        if(!body) return res.status(400).send({status: false, msg: "body required!"});
        if(!typeChecking(body))    return res.status(400).send({status: false,msg: "Please enter the body in right format...!"});
        if(!category) return res.status(400).send({status: false, msg: "category required!"});
        if(!typeChecking(category))    return res.status(400).send({status: false,msg: "Please enter the category in right format...!"});
        if(!tags) return res.status(400).send({status:false, masg: "require tags!"});
        if(!typeChecking(tags))    return res.status(400).send({status: false,msg: "Please enter the tags in right format...!"});
        if(!subcategory) return res.status(400).send({status:false, masg: "require subcategory!"});      
            
        let blogCreated = await blogModel.create(blog)
        return res.status(201).send ({status: true, data: blogCreated });
    }catch(err){
        //for getting server error 
        return res.status(500).send({status: false, msg:err.message})
    }
}


const updateBlog = async function(req, res) {
    try {
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId)

        if(!blog)   return res.status(404).send({status : false, msg : "Blog Id is incorrect"})
        if(blog.isDeleted == true)  return res.status(404).send({status : false, msg : "Blog doesn't exist"})
        if(Object.keys(req.body).length == 0)   return res.status(400).send({status : false, msg : "Empty body for update"})
    
        for(const key in req.body){
            console.log(key);
            if(typeof (req.body[key]) == "object"){
                req.body[key].push(...blog[key]);
            }
        }

        let query = {...req.body, isPublished : true, publishedAt : moment().format('YYYY-MM-DDTss:mm:h')}
        const updatedBlog = await blogModel.findOneAndUpdate({_id : blogId}, query, {new : true})

        return res.status(200).send ({status: true, data: updatedBlog });
    } catch (error) {
        return res.status(500).send ({status: false, msg: error.message });
    }
}




// DELETE/blogs/:blogId

const deleteBlog = async function (req, res) {
      try {
        let blogId = req.params.blogId;
         let blog = await blogModel.findById(blogId);
  
           if (!blog) {
              return res.status(404).send({status: false,msg:"No such blog exists"});
          }
  
           if (blog.isDeleted == true) {
               return res.status(400).send({ status: false, msg: "Blog not found, may be deleted" })
          }
  
           let authId = blog.authorId;
           let id = req.authorId;
           if (id != authId) {
               return res.status(403).send({ status: false, msg: "Not authorized..!" });
          }
  
          let deletedtedUser = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true ,deletedAt: Date.now()} }, { new: true });
           res.status(200).send({status: true, msg: "done", data: deletedtedUser });
       }
      catch (err) {
           res.status(500).send({status: false, msg: "Error", error: err.message })
       }
   }

const deleteBlogByParams = async function(req,res){
    try{ 
        const queryParams = req.query
        if(!queryParams) return res.status(400).send({status: false, msg: "no query params recived"})
        
        const deletedBlog = await blogModel.updateMany({...queryParams, isDeleted : false}, {isDeleted : true}, {new : true})

        if(deletedBlog.modifiedCount == 0)   return res.status(404).send({status: false, msg: "Blog doesn't Exist"})

        return res.status(200).send({status: true, data: deletedBlog})
    }catch(err){
        return res.status(500).send({status: false, msg:err.message})
    }
}


module.exports = {
    createNewBlog,
    updateBlog,
    deleteBlog,
    deleteBlogByParams
}
