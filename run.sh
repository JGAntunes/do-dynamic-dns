#!/bin/bash

set -ex

docker run  --rm --name="do-dynamic-dns" -e DOMAIN -e UPDATE_INTERVAL -e DO_TOKEN jgantunes/do-dynamic-dns

set +ex
