# ---------- Builder ---------- #
FROM node:14-alpine AS builder

ENV YARN_CACHE_FOLDER yarn

WORKDIR /go_barber_api

COPY . .

RUN mkdir -p $YARN_CACHE_FOLDER
RUN yarn config set cache-folder $YARN_CACHE_FOLDER
RUN (yarn check --integrity && yarn check --verify-tree) || yarn install --frozen-lockfile

# RUN yarn && yarn build
RUN yarn build

# --------- Release --------- #
FROM node:14-alpine AS release

WORKDIR /go_barber_api

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

