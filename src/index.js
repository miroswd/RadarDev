const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://miroswd:omnistack@cluster0-jnl6u.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.use(express.json()) // Válido para todas as rotas da aplicação
app.use(routes);

app.listen(3333);