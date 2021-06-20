const { ObjectId } = require('bson')
const express = require('express')
const router = express.Router()
const database = require('../config/database')

router.get('/', function(req, res, next) {
    console.log(req.query)
    let query = {}
    if (req.query.idUsuario) query.idUsuario = req.query.idUsuario
    if (req.query.pais) query.pais = {$regex : ".*" + req.query.pais + ".*"}
    if (req.query.departamento) query.departamento = {$regex : ".*" + req.query.departamento + ".*"}
    if (req.query.municipio) query.municipio = {$regex : ".*" + req.query.municipio + ".*"}
    if (req.query.zona) query.zona = {$regex : ".*" + req.query.zona + ".*"}
    if (req.query.categoria) query.categorias = {$regex : ".*" + req.query.categoria + ".*"}
    if (req.query.noIdUsuario) query.idUsuario = {$ne : req.query.noIdUsuario }

    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')

        db.collection('Emprendimientos').find(query).toArray((err, result) => {
            console.log(result)
            client.close()
            return res.status(201).json({emprendimientos: result})
        })
    })
})

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
        categorias: req.body.categorias,
        idUsuario: req.body.idUsuario
    }

    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')

        db.collection('Emprendimientos').insertOne(nuevoEmprendimiento)
        .then(result => {
            if (result.result.ok !== 1) {
                client.close()
                return res.status(500).json({message: 'Error al insertar'})
            }
            client.close()
            return res.status(201).json({emprendimiento: nuevoEmprendimiento})
        })
    })
})

router.get('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')
        const query = {
            _id: ObjectId(req.params.id)
        }

        db.collection('Emprendimientos').findOne(query).then(result => {
            if (!result) {
                client.close()
                return res.status(500).json({message: 'No se encontro el negocio'})
            }
            console.log(result)
            client.close()
            return res.status(201).json({emprendimiento: result})
        })
    })
})

router.put('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')

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
                return res.status(500).json({message: 'No se encontro el negocio'})
            }
            console.log(result)
            client.close()
            return res.status(202).json({emprendimiento: result.value})
        })
    })
})

router.delete('/:id', function (req, res, next) {
    database.connect(function(err, client) {
        if (err) return res.status(500).json({message: 'Error al conectarse a la base de datos'})

        const db = client.db('KnowMe')
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
                return res.json({message: 'Error'})
            }
            client.close()
            return res.status(204).json({correcto: true})
        })
    })
})

module.exports = router