/*let data = {
    usuarios: {},
    emprendimientos: {}
}

module.exports = data*/

const {MongoClient} = require('mongodb')

// Connection URL
const url = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
const options = { useNewUrlParser: true, useUnifiedTopology: true }

const client = {
  connect: function(callback) {
    MongoClient.connect(url, options, callback)
  }
}

module.exports = client