const assert = require('assert')
const chai = require('chai')
const database = require('../config/database')
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)
chai.should()

describe('Usuarios', function() {
  it('should not insert a new user because emails are not the same', function() {
    chai.request('localhost:3000/')
      .post('api/v1/usuario/nuevo')
      .set('content-type', 'application/json')
      .send({
        id: 1,
        email: "test@correo.com",
        reEmail: "test@correodiferente.com",
        nombre: "Usuario Test",
        apellido: "Usuario Test",
        telefono: "11111111",
        fechaNacimiento: "1999-05-19",
        username: "usuario_test",
        password: "12345",
        rePassword: "12345"
      })
      .end((err, res) => {
          assert.equal(res.status, 500)
      });
  })

  it('should not insert a new user because passwords are not the same', function() {
    chai.request('localhost:3000/')
      .post('api/v1/usuario/nuevo')
      .set('content-type', 'application/json')
      .send({
        id: 1,
        email: "test@correo.com",
        reEmail: "test@correo.com",
        nombre: "Usuario Test",
        apellido: "Usuario Test",
        telefono: "11111111",
        fechaNacimiento: "1999-05-19",
        username: "usuario_test",
        password: "12345",
        rePassword: "6789"
      })
      .end((err, res) => {
        assert.equal(res.status, 500)
      });
  })

  it('should insert a new user', function() {
    chai.request('localhost:3000/')
      .post('api/v1/usuario/nuevo')
      .set('content-type', 'application/json')
      .send({
        id: 1,
        email: "test@correo.com",
        reEmail: "test@correo.com",
        nombre: "Usuario Test",
        apellido: "Usuario Test",
        telefono: "11111111",
        fechaNacimiento: "1999-05-19",
        username: "usuario_test",
        password: "12345",
        rePassword: "12345"
      })
      .end((err, res) => {
        res.should.have.status(201)
      });
  })

  it('should get a specific user', function() {
    let usuario = null
    //Obtiene el usuario con el correo. Deberia obtener el que se ingreso antes
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'test@correo.com'
      }

      //Obtiene el usuario con el correo. Deberia obtener el que se ingreso antes
      db.collection('Usuarios').findOne(query).then(result => {
        client.close()
        usuario = result

        chai.request('localhost:3000/')
        .get('api/v1/usuario/' + usuario._id)
        .end((err, res) => {
          assert.equal(usuario._id, res.body.usuario._id)
        })
      })
    })
  })

  it('should update a specific user', function() {
    let usuario = null
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'test@correo.com'
      }

      //Obtiene el usuario con el correo. Deberia obtener el que se ingreso antes
      db.collection('Usuarios').findOne(query).then(result => {
        client.close()
        usuario = result
        
        //Actualiza el usuario con la ruta creada
        chai.request('localhost:3000/')
        .put('api/v1/usuario/' + usuario._id)
        .set('content-type', 'application/json')
        .send({
          id: 1,
          email: "test@correo.com",
          reEmail: "test@correo.com",
          nombre: "Usuario Test editado",
          apellido: "Usuario Test",
          telefono: "11111111",
          fechaNacimiento: "1999-05-19",
          username: "usuario_test",
          password: "12345",
          rePassword: "12345"
        })
        .end((err, res) => {
          res.body.usuario.nombre.should.equal('Usuario Test editado')
        })
      })
    })
  })

  it('should delete a specific user', function() {
    let usuario = null
    database.connect(function(err, client) {
      const db = client.db('KnowMe')
      const query = {
          email: 'test@correo.com'
      }

      //Obtiene el usuario con el correo. Deberia obtener el que se ingreso antes
      db.collection('Usuarios').findOne(query).then(result => {
        client.close()
        usuario = result
        
        //Actualiza el usuario con la ruta creada
        chai.request('localhost:3000/')
        .delete('api/v1/usuario/' + usuario._id)
        .end((err, res) => {
          assert.equal(res.status, 204)
        })
      })
    })
  })
})