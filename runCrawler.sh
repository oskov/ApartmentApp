#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"

docker-compose up -d

sleep 5

node ./localDeploy/runCrawler.js

docker-compose stop
