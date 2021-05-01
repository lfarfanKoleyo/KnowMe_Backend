const express = require('express')
const router = express.Router()

router.post('/registro', function (req, res, next) {
    res.json({registro: 'completo'})
})

router.post('/login', function (req, res, next) {
    res.json({login: 'completo'})
})

module.exports = router