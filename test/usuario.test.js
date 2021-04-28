const assert = require('assert')
const chai = require('chai')
const database = require('../config/database')
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)
chai.should()

describe('Usuarios', function() {
  it('should not insert a new user because emails are not the same', function() {
    chai.request('http://localhost:3000/')
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
          res.should.have.status(500)
      });
  })

  it('should not insert a new user because passwords are not the same', function() {
    chai.request('http://localhost:3000/')
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
        res.should.have.status(500)
      });
  })

  it('should insert a new user', function() {
    chai.request('http://localhost:3000/')
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
        console.log(res)
        res.should.have.status(201)
      });
  })
})