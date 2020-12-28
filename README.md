# Digital Ocean Dynamic DNS
A small nodejs tool that dynamically updates a DNS record on Digital Ocean based on your public ip.

Useful for when you have services running behind a NAT with a dynamic public IP.

## Usage
Set your configuration using the specified env vars or using the `config.js` file:

```sh
DOMAIN='root.domain.i.want.to.check'
RECORD='record.to.insert'
DO_TOKEN='Your Digital Ocean personal access token'
```

### Using Docker

If you have `docker` and `bash` it's as easy as:
```sh
DO_TOKEN="123456789" DOMAIN="jgantunes.com" RECORD="test" RUN=1 ./build.sh
```

This will ensure an `A` record is created for `test` under your `jgantunes.com` domain resource.

If you only have `docker` just run the appropriate docker setup with the provided Dockerfile.

### Using Node

To run the project using Node just install the deps:

```sh
npm i
# or yarn
```

And run the project with the appropriate configuration:

```sh
DO_TOKEN="123456789" DOMAIN="jgantunes.com" RECORD="test" npm start
# or yarn start
```

## Contributing

This project uses [standard js](https://github.com/feross/standard).

## License

MIT
