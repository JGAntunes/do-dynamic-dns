const logger = require('./logger')

async function request (client, method, url, options = {}) {
  try {
    const { payload } = await client[method.toLowerCase()](url, options)
    return payload
  } catch (err) {
    const { data } = err
    if (!data.isResponseError) {
      logger.error(err)
      throw err
    }
    const msg = `Error response in ${method} ${url}: ${data.res.statusCode}`
    logger.error(msg, data.payload)
    throw err
  }
}

module.exports = request
