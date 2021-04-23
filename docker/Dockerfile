# ----------- Base ----------- #
FROM bitnami/node:14 AS base

WORKDIR /go_barber_api

# ---------- Builder ---------- #
FROM base AS builder

COPY package.json babel.config.js ormconfig.json jest.config.js jest.setup.js .env ./
COPY ./src ./src
COPY ./tmp ./tmp

RUN npm install -g yarn && yarn
RUN yarn build

# --------- Release --------- #
FROM base AS release

RUN npm install -g pm2

COPY --from=builder /go_barber_api/node_modules ./node_modules
COPY --from=builder /go_barber_api/ormconfig.json ./ormconfig.json
COPY --from=builder /go_barber_api/.env ./.env
COPY --from=builder /go_barber_api/tmp ./tmp
COPY --from=builder /go_barber_api/dist ./dist

ENTRYPOINT [ "pm2-runtime", "start", "dist/shared/infra/http/server.js", "--name", "go_barber_api" ]


