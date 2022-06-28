const jwt = require('jsonwebtoken')

const auth = async function(req, res, next) {
    try {
        const token = req.headers['x-api-key']
        if (!token)     return res.status(401).send({status: false, msg: "Please provide token" })
        const validToken = jwt.verify(token, "VRCA")

        // Passing the decoded token inside req to acces it in controllers for authorisation.

        req.validToken = validToken
        next()
    } catch (error) {

        // Handling errors related to jwt token.

        if(error.message == "jwt malformed")    return res.status(401).send({status: false, msg: "Token is Incorrect" })
        if(error.message == "invalid token")    return res.status(401).send({status: false, msg: "Token is Incorrect" })
        return res.status(500).send ({status: false, msg: error.message });
    }
}

module.exports.auth = auth;