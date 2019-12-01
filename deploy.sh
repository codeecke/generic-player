#!/usr/bin/env bash

# build assets
rm -rf dist
yarn build:prod

# deploying to cdn
if [ "$1" == "cdn" ]
then
  cdn_path="~/cdn/dist/generic-player"
  cdn_filename="1.1.0-preview.js"

  localfile="./dist/cdn.js"

  echo "Copying: $localfile -> openlib@codeecke.de:$cdn_path/$cdn_filename"

  scp "$localfile" "openlib@codeecke.de:$cdn_path/$cdn_filename"
fi


# deploying to npmjs.org
if [ "$1" == "npm" ]
then
  echo "Deploying to npmjs.org"
fi;