const jwt = require('json-web-token')

async function validate(req, _res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const data = jwt.decode('secret', token, function(err, data) {
        if (err) return null
        return data
    })

    if(!data) return res.status(403).json({
        code: 403,
        message: 'Inautorizado'
    })

    return next()
}

async function generateToken(user) {
    const token = jwt.encode('secret', user, 'HS256', function(err, token) {
        if (err) return null
        
        return token
    })
}