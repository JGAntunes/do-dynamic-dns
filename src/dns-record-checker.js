const Wreck = require('wreck')
const parallel = require('run-parallel')

const request = require('./request')
const logger = require('./logger')
const config = require('../config')

const DOClient = Wreck.defaults({
  baseUrl: config.digitalOcean.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.digitalOcean.token}`
  },
  json: true
})

const ipCheckerClient = Wreck.defaults({
  baseUrl: config.ipCheckerService
})

function updateDnsRecord (domain, recordId, data, callback) {
  request(DOClient, 'PUT', `/domains/${domain}/records/${recordId}`, { payload: { data } }, callback)
}

function dnsRecordChecker (domain, callback) {
  parallel([
    request.bind(request, ipCheckerClient, 'GET', '/myip'),
    request.bind(request, DOClient, 'GET', `/domains/${domain}/records`)
  ], (err, [ipResponse, DOResponse]) => {
    if (err) return callback(err)
    const domainRecords = DOResponse.domain_records
    const addressRecord = domainRecords.find(record => record.type === 'A')
    const myIp = ipResponse.toString('utf8')
    // No need for updates
    if (addressRecord.data === myIp) {
      const msg = `Ip is still ${myIp}`
      return callback(null, msg)
    }
    // Oops looks like our ip changed
    logger.trace(`Ip changed from ${myIp} to ${addressRecord.data}`)
    return updateDnsRecord(domain, addressRecord.id, myIp, callback)
  })
}

module.exports = dnsRecordChecker
