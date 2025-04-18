#!/bin/bash
# wait-for-it.sh

# wait for the database to be available
HOST=$1
PORT=$2
shift 2
until nc -z $HOST $PORT; do
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

echo "$HOST:$PORT is up - executing command"
exec "$@"
