const config = require('./config')
const dnsRecordChecker = require('./src/dns-record-checker')
const logger = require('./src/logger')

logger.info(`Starting DNS record checker with for ${config.domain}`)

async function main () {
  try {
    const result = await dnsRecordChecker(config.domain)
    logger.trace(result)
  } catch (err) {
    logger.error(err)
  }
}

main()
