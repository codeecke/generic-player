#!/bin/sh

rm ./.git/hooks/pre-commit
ln ./.githooks/pre-commit ./.git/hooks/pre-commit