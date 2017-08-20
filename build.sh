#!/bin/bash

set -ex

DOCKERFILE="Dockerfile"

if [ "$PI" != "" ]; then DOCKERFILE="Dockerfile.rpi"; fi

docker build --rm --tag do-dynamic-dns --file $DOCKERFILE .

if [ "$RUN" != "" ]; then
  docker run -e DOMAIN -e UPDATE_INTERVAL -e DO_TOKEN do-dynamic-dns
fi;

set +ex
