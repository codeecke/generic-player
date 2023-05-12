#!/bin/sh

port=5360

echo "start unit-testing"
jest 

exitCode=$?
if [ $exitCode -eq 0 ]; then
    echo "setup test-environment"
    echo "start the environment on port $port"
    npx http-server test-env -p $port &
    pidHttpServer=$!

    echo "start integration-testing"
    npx cypress run
    exitCode=$?

    echo "test-environment is shuting down"
    kill $pidHttpServer
fi


exit $exitCode