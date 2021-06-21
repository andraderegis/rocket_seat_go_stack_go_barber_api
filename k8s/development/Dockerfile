# ---------- Builder ---------- #
FROM node:14-buster AS builder

WORKDIR /go_barber_api

COPY . .

RUN yarn && yarn build

# --------- Release --------- #
FROM node:14-buster AS release

WORKDIR /go_barber_api

RUN apt-get update && apt-get install -y wget && apt-get install -y openssl

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g pm2

COPY --from=builder /go_barber_api/node_modules ./node_modules
COPY --from=builder /go_barber_api/tmp ./tmp
COPY --from=builder /go_barber_api/dist ./dist

COPY --from=builder /go_barber_api/ormconfig.js ./ormconfig.js
COPY --from=builder /go_barber_api/.env.example ./.env.example

COPY --from=builder /go_barber_api/docker/go-barber-entrypoint.sh ./docker/go-barber-entrypoint.sh

RUN ["chmod", "+x", "/go_barber_api/docker/go-barber-entrypoint.sh"]

ENTRYPOINT [ "sh", "/go_barber_api/docker/go-barber-entrypoint.sh" ]

