const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");


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

        if (Object.keys(req.body).length == 0)   return res.status(400).send({status : false, msg : "No information passed"})
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

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return res.status(400).send({ status: false, msg: "Wrong Email format" })

        const allowed = ["Mr", "Miss", "Mrs"]
        if (!allowed.includes(title)) return res.status(400).send({ status: false, msg: "Invalid Title, Select one from Mr, Mrs or Miss" });

        let author = await authorModel.findOne({email : email})
        if(author)  return res.status(400).send({ status: false, msg: "Email id is already in use" });
        let createData = await authorModel.create(data);
        return res.status(201).send({ status: true, Data: createData });
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