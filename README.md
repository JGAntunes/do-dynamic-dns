# Digital Ocean Dynamic DNS
A small nodejs tool that dynamically updates a DNS record on Digital Ocean based on your public ip.

Useful for when you have services running behind a NAT with a dynamic public IP.

## Usage
Set your configuration using the specified env vars or using the `config.js` file:

```sh
DOMAIN='domain.i.want.to.check'
DO_TOKEN='Your Digital Ocean personal access token'

# Optional
UPDATE_INTERVAL='The interval in milis between requests, defaults to 6000'
```

### Using Docker

If you have `docker` and `bash` it's as easy as:
```sh
DO_TOKEN="123456789" DOMAIN="test.jgantunes.com" RUN=1 ./build.sh
```

If you only have `docker` just run the appropriate docker setup with the provided Dockerfile.

### Using Node

To run the project using Node just install the deps:

```sh
npm i
# or yarn
```

And run the project with the appropriate configuration:

```sh
DO_TOKEN="123456789" DOMAIN="test.jgantunes.com" npm start
# or yarn start
```


## Contributing

This project uses [standard js](https://github.com/feross/standard).

## License

MIT
