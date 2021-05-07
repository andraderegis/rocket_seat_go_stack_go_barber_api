#!/bin/bash
dockerize -wait tcp://postgres:5432 -wait tcp://mongo:27017 -wait tcp://redis:6379 -timeout 20s

./node_modules/.bin/typeorm migration:run

pm2-runtime start /go_barber_api/dist/shared/infra/http/server.js --name go_barber_api
