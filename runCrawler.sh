#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"

docker-compose up -d

sleep 5

node ./localDeploy/dist/runCrawler.js

docker stop postgres-apartment-app
