const assert = require('assert')
const chai = require('chai')
const database = require('../config/database')
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)
chai.should()

describe('Emprendimientos', function() {
  it('should insert a new emprendimiento', function() {
    chai.request('localhost:3000/')
      .post('api/v1/emprendimiento/nuevo')
      .set('content-type', 'application/json')
      .send({
        id: 1,
        nombre: "Tienda de prueba",
        descripcion: "Esta es la tienda de prueba",
        telefono: "11111111",
        email: "prueba@correo.com",
        webPage: "www.tiendadeprueba.com",
        municipio: "Villa Prueba",
        departamento: "Prueba",
        pais: "Prueba",
        zona: "1",
        categorias: ["Tienda general"]
      })
      .end((err, res) => {
        res.should.have.status(201)
      });
  })

  it('should get a specific emprendimiento', function() {
    let emprendimiento = null
    //Obtiene el emprendimiento con el correo. Deberia obtener el que se ingreso antes
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'prueba@correo.com'
      }

      //Obtiene el emprendimiento con el correo. Deberia obtener el que se ingreso antes
      db.collection('Emprendimientos').findOne(query).then(result => {
        client.close()
        emprendimiento = result

        chai.request('localhost:3000/')
        .get('api/v1/emprendimiento/' + emprendimiento._id)
        .end((err, res) => {
          assert.equal(emprendimiento._id, res.body.emprendimiento._id)
        })
      })
    })
  })

  it('should update a specific user', function() {
    let emprendimiento = null
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'prueba@correo.com'
      }

      //Obtiene el emprendimiento con el correo. Deberia obtener el que se ingreso antes
      db.collection('Emprendimientos').findOne(query).then(result => {
        client.close()
        emprendimiento = result
        
        //Actualiza el emprendimiento con la ruta creada
        chai.request('localhost:3000/')
        .put('api/v1/emprendimiento/' + emprendimiento._id)
        .set('content-type', 'application/json')
        .send({
            id: 1,
            nombre: "Tienda de prueba editada",
            descripcion: "Esta es la tienda de prueba",
            telefono: "11111111",
            email: "prueba@correo.com",
            webPage: "www.tiendadeprueba.com",
            municipio: "Villa Prueba",
            departamento: "Prueba",
            pais: "Prueba",
            zona: "1",
            categorias: ["Tienda general"]
        })
        .end((err, res) => {
          res.body.emprendimiento.nombre.should.equal('Tienda de prueba editada')
        })
      })
    })
  })

  it('should delete a specific emprendimiento', function() {
    let emprendimiento = null
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'prueba@correo.com'
      }

      //Obtiene el emprendimiento con el correo. Deberia obtener el que se ingreso antes
      db.collection('Emprendimientos').findOne(query).then(result => {
        client.close()
        emprendimiento = result
        
        //Actualiza el emprendimiento con la ruta creada
        chai.request('localhost:3000/')
        .delete('api/v1/emprendimiento/' + emprendimiento._id)
        .end((err, res) => {
          assert.equal(res.status, 204)
        })
      })
    })
  })
})