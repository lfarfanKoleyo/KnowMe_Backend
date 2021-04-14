const { ObjectId } = require('bson')
const express = require('express')
const router = express.Router()
const database = require('../config/database')

router.post('/nuevo', function(req, res, next) {
    if (req.body.email !== req.body.reEmail)
        next('No coinciden los emails')

    if (req.body.password !== req.body.rePassword)
        next('No coinciden las contraseñas')

    let nuevoUsuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')

        db.collection('Usuarios').insertOne(nuevoUsuario)
        .then(result => {
            if (result.result.ok !== 1) {
                client.close()
                next('Error al insertar')
            }
            client.close()
            res.status(201).json({usuario: nuevoUsuario})
        })
    })
})

router.get('/:id', function(req, res, next) {
    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')
        const query = {
            _id: ObjectId(req.params.id)
        }

        db.collection('Usuarios').findOne(query).then(result => {
            if (!result) {
                client.close()
                res.status(500).json({message: 'No se encontro el usuario'})
            }
            console.log(result)
            client.close()
            res.status(201).json({usuario: result})
        })
    })
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