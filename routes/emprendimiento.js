const express = require('express')
const router = express.Router()
const database = require('../config/database')

router.post('/nuevo', function (req, res, next) {
    let emprendimientos = database.emprendimientos

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
        categorias: [req.body.categorias]
    }

    emprendimientos[req.body.id] = nuevoEmprendimiento


    res.status(201).json({emprendimiento: emprendimientos[req.body.id]})
})

router.get('/:id', function (req, res, next) {
    const emprendimientoEncontrado = database.emprendimientos[req.params.id]

    if (!emprendimientoEncontrado) next('No se encontro el negocio')

    res.status(200).json({emprendimiento: emprendimientoEncontrado})
})

router.put('/:id', function (req, res, next) {
    let emprendimientoEncontrado = database.emprendimientos[req.params.id]

    if (!emprendimientoEncontrado) next('No se encontro el negocio')

    emprendimientoEncontrado = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        email: req.body.email,
        webPage: req.body.webPage,
        municipio: req.body.municipio,
        departamento: req.body.departamento,
        pais: req.body.pais,
        zona: req.body.zona,
        categorias: [req.body.categorias]
    }

    database.emprendimientos[req.body.id] = emprendimientoEncontrado


    res.status(204).json({emprendimiento: emprendimientoEncontrado})
})

router.delete('/:id', function (req, res, next) {
    const emprendimientoEncontrado = database.emprendimientos[req.params.id]

    if (!emprendimientoEncontrado) next('No se encontro el negocio')

    delete database.emprendimientos[req.params.id]

    res.status(204).json({usario: database.emprendimientos[req.params.id]})
})

module.exports = router