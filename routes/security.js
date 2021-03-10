const express = require('express')
const router = express.Router()

router.get('/registro', function (req, res, next) {
    res.json({registro: 'completo'})
})

router.post('/registro', function (req, res, next) {
    res.json({registro: 'completo'})
})

router.post('/login', function (req, res, next) {
    res.json({login: 'completo'})
})

router.get('/login', function (req, res, next) {
    res.json({registro: 'completo'})
})

module.exports = router