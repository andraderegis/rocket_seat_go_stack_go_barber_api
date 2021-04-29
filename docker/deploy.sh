#!/bin/bash

docker-compose -f "docker/docker-compose.yml" down --remove-orphans
docker rmi -f $(docker images -f 'dangling=true' -q)
docker-compose -f "docker/docker-compose.yml" build --no-cache --force-rm
docker-compose -f "docker/docker-compose.yml" up -d
