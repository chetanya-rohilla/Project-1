const authorModel = require("../models/authorModel");

const typeChecking = function(data){
  if(typeof data !== 'string'){
      return false;
   }else if( data.trim().length == 0){
    return false;
    }else{
        return true;
    }
 }

const createAuthor = async function (req, res) {
    
    try {
        let data = req.body;
        
       let {fname , lname , title , email , password} = data;

       if(!fname) return res.status(400).send({status: false,msg: "First Name is required...!"});        
       if(!typeChecking(fname)) return res.status(400).send({status: false,msg: "Please enter the first name in right format...!"});
       
      if(!lname)    return res.status(400).send({status: false,msg: "Last name is required...!"});
       
       if(!typeChecking(lname))            return res.status(400).send({status: false,msg: "Please enter the last name in right format....!"});
        
        if(!title)
            return res.status(400).send({status: false,msg: "Title is required...!"});
       
         if(!typeChecking(title)){
            return res.status(400).send({status: false,msg: "Please enter the title in right format....!"});
         }
        if(!email){
            return res.status(400).send({status: false,msg: "Email is required...!"});
        }
        if(!typeChecking(email)){
            return res.status(400).send({status: false,msg: "Please enter the email in right format...!"});
        }
        if(!password){
            return res.status(400).send({status: false,msg: "Password is required...!"});
        }
        if(!typeChecking(password)){
            return res.status(400).send({status: false,msg: "Please enter the password in right format...!"});
        }

         let createData = await authorModel.create(data);
        res.status(201).send({status: true, Data: createData });
    }
     catch (err) {
        res.status(500).send({status: false, msg: "Error", error: err.message });
     }
 }



module.exports.createAuthor = createAuthor;
// module.exports.login = login;
module.exports.createAuthor1 = createAuthor;