const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

//  validations for strings and objects ,checking for empty string by using trim

const typeChecking = function(data){
    if(typeof data !== 'string' && typeof data !== "object"){
        return false;
    } else if (typeof data == 'string' && data.trim().length == 0) {
        return false;
    } else {
        return true;
    }
}


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data;

        // Object.keys() will give an array of keys inside req.body. We will check if the length of this array is 0 ie nothing is passed in body.

        if (Object.keys(req.body).length == 0)   return res.status(400).send({status : false, msg : "No information passed"})

        // checking if the mandatory field are present or not 

        if (!fname) return res.status(400).send({ status: false, msg: "First Name is required...!" });
        if (!typeChecking(fname)) return res.status(400).send({ status: false, msg: "Please enter the first name in right format...!" });
        if (!lname) return res.status(400).send({ status: false, msg: "Last name is required...!" });
        if (!typeChecking(lname)) return res.status(400).send({ status: false, msg: "Please enter the last name in right format....!" });
        if (!title) return res.status(400).send({ status: false, msg: "Title is required...!" });
        if (!typeChecking(title)) return res.status(400).send({ status: false, msg: "Please enter the title in right format....!" });
        if (!email) return res.status(400).send({ status: false, msg: "Email is required...!" });
        if (!typeChecking(email)) return res.status(400).send({ status: false, msg: "Please enter the email in right format...!" });
        if (!password) return res.status(400).send({ status: false, msg: "Password is required...!" });
        if (!typeChecking(password)) return res.status(400).send({ status: false, msg: "Please enter the password in right format...!" });

       //  email format validation by using Regex

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return res.status(400).send({ status: false, msg: "Wrong Email format" })

        // Enum validation by using a array 

        const allowed = ["Mr", "Miss", "Mrs"]
        if (!allowed.includes(title)) return res.status(400).send({ status: false, msg: "Invalid Title, Select one from Mr, Mrs or Miss" });

        let author = await authorModel.findOne({email : email})
        if(author)  return res.status(400).send({ status: false, msg: "Email id is already in use" });
        let createData = await authorModel.create(data);
        return res.status(201).send({ status: true, data: createData });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

const login = async function (req, res) {
    try {
        let email = req.body.email;
        let pass = req.body.password;

        if (Object.keys(req.body).length == 0)   return res.status(400).send({status : false, msg : "No information passed"})
        if (!(email && pass)) return res.status(400).send({ status: false, msg: "Email-Id and Password must be provided...!" });
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return res.status(400).send({ status: false, msg: "Wrong Email format" })

        let author = await authorModel.findOne({ email: email, password: pass });
        if (!author) return res.status(401).send({ status: false, msg: "Email or Password is wrong" });

        // secret key is the initials of each group member.

        let token = jwt.sign(
            {
                authorId: author._id.toString()
            },
            "VRCA"
        );

        return res.status(200).send({ status: true, data: token });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

module.exports = {
    createAuthor,
    typeChecking,
    login
}
