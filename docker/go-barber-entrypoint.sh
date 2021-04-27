#!/bin/bash
./node_modules/.bin/typeorm migration:run
pm2-runtime start /go_barber_api/dist/shared/infra/http/server.js --name go_barber_api
