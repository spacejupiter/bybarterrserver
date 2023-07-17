const controllers = require('../controllers')
const service = require('../service')

function startModule(app) {
  controllers(app, service)
}

module.exports = startModule
