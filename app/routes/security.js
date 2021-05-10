const express = require('express')
const router = express.Router()
const database = require('../config/database')
const jwt = require('../config/jwt')
const md5 = require('md5')

router.post('/login', function (req, res, next) {
    const email = req.body.email
    const password = md5(req.body.password)
    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')
        const query = {
            email: email
        }

        db.collection('Usuarios').findOne(query).then(result => {
            if (!result) {
                client.close()
                return res.json({message: 'Credenciales incorrectas'})
            }
            console.log(result)
            if(result.password !== password) {
                client.close()
                return res.json({message: 'Credenciales incorrectas'})
            }

            const token = jwt.generateToken(result.username)
            console.log(token)
            client.close()
            return res.status(200).json({usuario: result, token: token})
        })
    })
})

router.post('/pruebajwt', function(req, res, next) {
    return res.json({token: req.body.token})
})

module.exports = router