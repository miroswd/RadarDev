const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(req,res){
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    const {latitude, longitude, techs} = req.query

    const techsArray = parseStringAsArray(techs)

    // Filtrando devs
    const devs = await Dev.find({
      techs: {
        $in: techsArray,//buscando se as techs do dev estão DENTRO DÊ techsArray
        // $in -> operador lógico do mongo
      },
      location: {
        $near: { // Buscando próximo
          $geometry: { // Buscando um ponto
            type:'Point',
            coordinates: [longitude,latitude],
          },
          $maxDistance: 10000, //10 km
        }
      }
    })

    return res.json({devs})
  }
}