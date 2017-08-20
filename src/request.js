const logger = require('./logger')

function requestHandler (err, response, payload, callback) {
  if (err) {
    logger.error(err)
    return callback(err)
  }
  if (response.statusCode >= 400) {
    const msg = `Error response in ${response.url}: ${response.statusCode}`
    logger.error(msg, payload)
    return callback(new Error(msg))
  }
  return callback(null, payload)
}

function request (client, method, url, options, callback) {
  callback = callback || options
  options = typeof options === 'function' ? null : options
  client[method.toLowerCase()](url, options, (err, response, payload) => {
    return requestHandler(err, response, payload, callback)
  })
}

module.exports = request
