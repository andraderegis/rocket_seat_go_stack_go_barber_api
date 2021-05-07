# ---------- Builder ---------- #
FROM node:14-alpine AS builder

WORKDIR /go_barber_api

COPY . .

RUN yarn && yarn build

# --------- Release --------- #
FROM node:14-alpine AS release

WORKDIR /go_barber_api

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g pm2

COPY --from=builder /go_barber_api/node_modules ./node_modules
COPY --from=builder /go_barber_api/tmp ./tmp
COPY --from=builder /go_barber_api/dist ./dist

COPY --from=builder /go_barber_api/ormconfig.js ./ormconfig.js
COPY --from=builder /go_barber_api/.env ./.env
COPY --from=builder /go_barber_api/.env.example ./.env.example

COPY --from=builder /go_barber_api/docker/deploy.sh ./docker/deploy.sh
COPY --from=builder /go_barber_api/docker/go-barber-entrypoint.sh ./docker/go-barber-entrypoint.sh
COPY --from=builder /go_barber_api/docker/postgresql ./docker/postgresql

RUN ["chmod", "+x", "/go_barber_api/docker/deploy.sh"]
RUN ["chmod", "+x", "/go_barber_api/docker/go-barber-entrypoint.sh"]

