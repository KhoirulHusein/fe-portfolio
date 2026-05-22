#!/bin/sh
set -e

echo "Starting portfolio..."
echo "   Environment : $NODE_ENV"
echo "   Port        : ${PORT:-3000}"

exec node server.js
