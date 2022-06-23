const jwt = require('jsonwebtoken')

const auth = async function(req, res, next) {
    const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ msg: "please provide token" })
    const validToken = jwt.verify(token, "VRCA")

    if (!validToken) {
        res.status(400).send({ status: false, msg: "user not found" })
    }
    next()

}

module.exports.auth = auth;