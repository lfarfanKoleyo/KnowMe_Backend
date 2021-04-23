const { ObjectId } = require('bson')
const express = require('express')
const router = express.Router()
const database = require('../config/database')

router.post('/nuevo', function (req, res, next) {
    let nuevoEmprendimiento = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        email: req.body.email,
        webPage: req.body.webPage,
        municipio: req.body.municipio,
        departamento: req.body.departamento,
        pais: req.body.pais,
        zona: req.body.zona,
        categorias: req.body.categorias
    }

    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')

        db.collection('Emprendimientos').insertOne(nuevoEmprendimiento)
        .then(result => {
            if (result.result.ok !== 1) {
                client.close()
                next('Error al insertar')
            }
            client.close()
            res.status(201).json({emprendimiento: nuevoEmprendimiento})
        })
    })
})

router.get('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')
        const query = {
            _id: ObjectId(req.params.id)
        }

        db.collection('Emprendimientos').findOne(query).then(result => {
            if (!result) {
                client.close()
                res.status(500).json({message: 'No se encontro el negocio'})
            }
            console.log(result)
            client.close()
            res.status(201).json({emprendimiento: result})
        })
    })
})

router.put('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')

        db.collection('Emprendimientos').findOneAndUpdate(
            {
                _id: ObjectId(req.params.id)
            },
            {
                $set: {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    telefono: req.body.telefono,
                    email: req.body.email,
                    webPage: req.body.webPage,
                    municipio: req.body.municipio,
                    departamento: req.body.departamento,
                    pais: req.body.pais,
                    zona: req.body.zona,
                    categorias: req.body.categorias
                }
            },
            {
                returnOriginal: false
            }
        ).then(result => {
            if (!result.value) {
                client.close()
                res.status(500).json({message: 'No se encontro el negocio'})
            }
            console.log(result)
            client.close()
            res.status(202).json({emprendimiento: result.value})
        })
    })
})

router.delete('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) next('Error al conectarse a la base de datos')

        const db = client.db('test')
        const query = {
            _id: ObjectId(req.params.id)
        }

        db.collection('Emprendimientos').findOneAndDelete(
            {
                _id: ObjectId(req.params.id)
            }
        ).then(result => {
            console.log(result)
            if (!result.ok) {
                client.close()
                res.status(500).json({message: 'Error'})
            }
            client.close()
            res.status(204).json({emprendimiento: result})
        })
    })
})

module.exports = router