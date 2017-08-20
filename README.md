# Digital Ocean Dynamic DNS
A small nodejs tool that dynamically updates a DNS record on Digital Ocean based on your public ip.

## Usage
Set your configuration using the specified env vars or using the `config.js` file:

```
DOMAIN='domain.i.want.to.check'
DO_TOKEN='Your Digital Ocean personal access token'

# Optional
UPDATE_INTERVAL='The interval in milis between requests, defaults to 6000'
```

### Using Docker

If you have `docker` and `bash` it's as easy as:
```
DO_TOKEN="123456789" DOMAIN="test.jgantunes.com" RUN=1 ./build.sh
```

If you only have `docker` just run the appropriate docker setup with the provided Dockerfile.

### Using Node

To run the project using Node just install the deps:

```
npm i
# or yarn
```

And run the project with the appropriate configuration:

```
DO_TOKEN="123456789" DOMAIN="test.jgantunes.com" npm start
# or yarn start
```
