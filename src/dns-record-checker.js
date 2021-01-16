const Wreck = require('@hapi/wreck')

const request = require('./request')
const logger = require('./logger')
const config = require('../config')

const DOClient = Wreck.defaults({
  baseUrl: config.digitalOcean.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.digitalOcean.token}`
  },
  json: true
})

const ipCheckerClient = Wreck.defaults({
  baseUrl: config.ipCheckerService
})

function updateDnsRecord(domain, recordId, data) {
  return request(DOClient, 'PUT', `domains/${domain}/records/${recordId}`, {
    payload: { data }
  })
}

function createDnsRecord(domain, name, data) {
  return request(DOClient, 'POST', `domains/${domain}/records`, {
    payload: { name, data, type: 'A' }
  })
}

async function dnsRecordChecker(domain) {
  let ipResponse = config.fixedIp
  if (!ipResponse) {
    ipResponse = await request(ipCheckerClient, 'GET', 'myip')
  }
  const DOResponse = await request(DOClient, 'GET', `domains/${domain}/records`)
  const domainRecords = DOResponse.domain_records
  const addressRecord = domainRecords.find(record => {
    return record.name === config.record && record.type === 'A'
  })
  const myIp = ipResponse.toString('utf8')
  // No need for updates
  if (addressRecord && addressRecord.data === myIp) {
    return `Ip is still ${myIp}`
  }

  // Record does not exist yet!
  if (!addressRecord) {
    logger.trace(`Record does not exist yet. Creating it with ip ${myIp}`)
    return createDnsRecord(domain, config.record, myIp)
  }

  // Oops looks like our ip changed
  logger.trace(`Ip changed from ${myIp} to ${addressRecord.data}`)
  return updateDnsRecord(domain, addressRecord.id, myIp)
}

module.exports = dnsRecordChecker
