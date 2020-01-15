const {Router} = require("express")
const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")

const routes = Router();

// Devs
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)

// Search
routes.get('/search', SearchController.index)

module.exports = routes;
