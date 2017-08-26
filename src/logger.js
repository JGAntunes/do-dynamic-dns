const bunyan = require('bunyan')

const { name } = require('../package')

module.exports = bunyan.createLogger({ name, level: 'trace' })
