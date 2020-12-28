#!/bin/bash

set -ex

DOCKERFILE="Dockerfile"


docker build --rm --tag jgantunes/do-dynamic-dns --file $DOCKERFILE .

if [ "$PUSH" != "" ]; then
  docker push jgantunes/do-dynamic-dns
fi;

if [ "$RUN" != "" ]; then
  sh ./run.sh
fi;

set +ex
