const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); 
const routes = require('./routes');
const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app) // Agora tenho o servidor http fora do express

setupWebsocket(server)

mongoose.connect('mongodb+srv://miroswd:omnistack@cluster0-jnl6u.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors()) // Liberando acesso externo
app.use(express.json()) // Válido para todas as rotas da aplicação
app.use(routes);

server.listen(3333);