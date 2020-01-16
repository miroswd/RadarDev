const axios = require('axios')
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(req,res) {
    const devs  = await Dev.find() 
    return res.json(devs)
  },


  async store(req,res) {
    const {github_username, techs, latitude, longitude} = req.body


    // Validando se o dev já foi cadastrado

    let dev = await Dev.findOne({github_username})

    if (!dev) {
  
    const response = await axios.get(`https://api.github.com/users/${github_username}`)
  
    // Buscando os dados do usuário
  
    const {name = login, avatar_url, bio} = response.data
  
    // Convertendo a string em um array, buscando através da ,
      
    const techsArray = parseStringAsArray(techs)
      
    // Location
  
    const location = {
      type:'Point',
      coordinates: [longitude, latitude]
    }
  

    // Criando DEV
  
    dev = await Dev.create({
      github_username,
      name, 
      avatar_url,
      bio,
      techs:techsArray,
      location
    })
  
  }
  return res.json({dev})
  },

};