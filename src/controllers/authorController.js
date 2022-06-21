const authorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {
    try {
        const createdAuthor = await authorModel.create(req.body)
        return res.status(201).send({status:true, data:createdAuthor })
    } catch (error) {
        return res.status(500).send({status:false, msg : error.message })
    }
}

module.exports.createAuthor = createAuthor