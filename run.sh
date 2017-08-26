#!/bin/bash

set -ex

docker run  --rm --name="do-dynamic-dns" -e DOMAIN -e UPDATE_INTERVAL -e DO_TOKEN do-dynamic-dns

set +ex
