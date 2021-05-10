const jwt = require('json-web-token')

const validate = function(req, res, next) {
    const token = req.headers.authorization
    const data = jwt.decode('secret', token, function(err, data) {
        if (err) return null
        return data
    })

    if(!data) return res.json({
        errorAutorizacion: true,
        message: 'Inautorizado'
    })

    return next()
}

const generateToken = function(user) {
    const token = jwt.encode('secret', user, 'HS256', function(err, token) {
        if (err) return null
        return token
    })

    console.log(token)

    return token
}

module.exports = {validate, generateToken}