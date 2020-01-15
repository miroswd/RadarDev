// Informações do dev

const mongoose = require('mongoose')

const PointSchema = require("./utils/PointSchema")

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url:String,
  techs:[String], // Armazena várias strings
  location:{
    // Latitude e longitude
    type: PointSchema,// Como é um arquivo grande, separar em outro arquivo
    index: '2dsphere' // eixo x e y
  },
})

module.exports = mongoose.model('Dev',DevSchema) // Nome da tabela e schema