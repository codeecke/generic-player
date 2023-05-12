#!/bin/sh

port=5360

echo "copying files to node_modules"
echo "start the environment on port $port"

npx http-server test-env -p $port &
pidHttpServer=$!

echo "start unit-testing"
jest 

exitCode=$?
if [ $exitCode -eq 0 ]; then
    echo "start integration-testing"
    npx cypress run
    exitCode=$?
fi

kill $pidHttpServer
exit $exitCode