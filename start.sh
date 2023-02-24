#!/bin/sh
set -e
# shellcheck disable=SC2002
cat authorized_key.json | docker login --username json_key --password-stdin cr.yandex
docker-compose pull || true
docker-compose up -d
