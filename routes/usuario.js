const express = require('express')
const router = express.Router()
const database = require('../config/database')

router.post('/nuevo', function(req, res, next) {
    if (req.body.email !== req.body.reEmail)
        next('No coinciden los emails')

    if (req.body.password !== req.body.rePassword)
        next('No coinciden las contraseñas')

    let usuarios = database.usuarios

    let nuevoUsuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    usuarios[req.body.id] = nuevoUsuario


    res.status(201).json({usuario: nuevoUsuario})
})

router.get('/:id', function(req, res, next) {
    const usuarioEncontrado = database.usuarios[req.params.id]

    if (!usuarioEncontrado) next('No se encontro el usuario')

    res.status(200).json({usuario: usuarioEncontrado})
})

router.put('/:id', function(req, res, next) {
    let usuarioEncontrado = database.usuarios[req.params.id]

    if (!usuarioEncontrado) next('No se encontro el usuario')

    usuarioEncontrado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    database.usuarios[req.params.id] = usuarioEncontrado

    res.status(204).json({usuario: database.usuarios[req.params.id]})
})

router.delete('/:id', function(req, res, next) {
    const usuarioEncontrado = database.usuarios[req.params.id]

    if (!usuarioEncontrado) next('No se encontro el usuario')

    delete database.usuarios[req.params.id]

    res.status(204).json({usario: database.usuarios[req.params.id]})
})

module.exports = router