const config = require('./config')
const dnsRecordChecker = require('./src/dns-record-checker')
const logger = require('./src/logger')

logger.info(`Starting DNS record checker with ${config.interval} ms interval`)

dnsRecordChecker(config.domain, (err, result) => {
  if (err) {
    logger.error(err)
  } else {
    logger.trace(result)
  }
})
