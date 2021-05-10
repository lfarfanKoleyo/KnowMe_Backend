/*let data = {
    usuarios: {},
    emprendimientos: {}
}

module.exports = data*/

const {MongoClient} = require('mongodb')

// Connection URL
const url = 'mongodb+srv://root:lfarfanprado99@cluster0.tyhyi.mongodb.net/KnowMe?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

const client = {
  connect: function(callback) {
    MongoClient.connect(url, options, callback)
  }
}

module.exports = client