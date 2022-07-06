const jwt = require('jsonwebtoken')

const auth = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, msg: "Please provide token" })
        jwt.verify(token, "VRCA", (err, decode) => {
            if (err) return res.status(401).sendecoded({ status: false, msg: "Token is Incorrect" })
            req.validToken = decode
            next()
        })

        // Passing the decoded token inside req to acces it in controllers for authorisation.


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports.auth = auth;
