#!/bin/sh
set -e

echo 'Waiting for MySQL to be ready...'
until nc -z qualipro 3306; do
  echo 'MySQL is unavailable - sleeping 2s'
  sleep 2
done

echo 'MySQL is up - running migrations'
npx sequelize-cli db:create --env development 2>/dev/null || echo 'Database already exists'
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

echo 'Starting application...'
exec "$@"