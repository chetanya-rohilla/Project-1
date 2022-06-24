const jwt = require('jsonwebtoken')

const auth = async function(req, res, next) {
    try {
        const token = req.headers['x-api-key']
        if (!token)     return res.status(401).send({status: false, msg: "Please provide token" })
        const validToken = jwt.verify(token, "VRCA")

        req.validToken = validToken
        next()
    } catch (error) {
        if(error.message == "jwt malformed")    return res.status(401).send({status: false, msg: "Token is Incorrect" })
        if(error.message == "invalid token")    return res.status(401).send({status: false, msg: "Token is Incorrect" })
        return res.status(500).send ({status: false, msg: error.message });
    }
}

module.exports.auth = auth;