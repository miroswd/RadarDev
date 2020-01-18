const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')
const connections = []; // Fake database


let io;
// Função exportada de outra maneira
exports.setupWebsocket = (server) => {
  io = socketio(server)

  io.on('connection', socket => {
    // Essa conexão está sendo chamada no loadDevs
    // console.log(socket.id)
    // console.log(socket.handshake.query) // Parâmetros enviados através do front

    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id:socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    })


  } ) // Toda vez que um usuário se conectar
}


exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item)) // Retorna true se pelo menos uma é true
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
}