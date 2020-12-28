module.exports = {
  domain: process.env.DOMAIN || 'foo.bar',
  record: process.env.RECORD || 'example',
  ipCheckerService: 'https://diagnostic.opendns.com/',
  digitalOcean: {
    token: process.env.DO_TOKEN || 'YOUR_DO_BEARER_TOKEN',
    baseUrl: 'https://api.digitalocean.com/v2/'
  }
}
