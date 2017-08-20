#!/bin/bash

set -ex

docker build --rm --tag do-dynamic-dns .

if [ "$RUN" != "" ]; then
  docker run -e DOMAIN -e UPDATE_INTERVAL -e DO_TOKEN do-dynamic-dns
fi;

set +ex
