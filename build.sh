#!/bin/bash

set -ex

DOCKERFILE="Dockerfile"
RESTART="no"
DETACHED="false"

if [ "$PI" != "" ]; then DOCKERFILE="Dockerfile.rpi"; fi

if [ "$RESTART" != "" ]; then RESTART="always"; fi

if [ "$DETACHED" != "" ]; then DETACHED="true"; fi

docker build --rm --tag do-dynamic-dns --file $DOCKERFILE .

if [ "$RUN" != "" ]; then
  docker run -d=$DETACHED --restart=$RESTART -e DOMAIN -e UPDATE_INTERVAL -e DO_TOKEN do-dynamic-dns
fi;

set +ex
