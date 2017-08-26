module.exports = {
  domain: process.env.DOMAIN || 'example.foo.bar',
  ipCheckerService: 'https://diagnostic.opendns.com',
  digitalOcean: {
    token: process.env.DO_TOKEN || 'YOUR_DO_BEARER_TOKEN',
    baseUrl: 'https://api.digitalocean.com/v2'
  }
}
