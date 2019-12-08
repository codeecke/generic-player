#!/usr/bin/env bash

# build assets
rm -rf dist
if [ "$2" != "dev" ]
then
  yarn build:prod
fi

# deploying to cdn
if [ "$1" == "cdn" ]
then
  cdn_path="~/cdn/dist/generic-player"
  cdn_filename="1.1.0-preview.js"

  localfile="./dist/cdn.js"

  echo "Copying: $localfile -> openlib@codeecke.de:$cdn_path/$cdn_filename"

  if [ "$2" == "dev" ]
  then
    yarn build:dev
    scp "$localfile.map" "openlib@codeecke.de:$cdn_path/$cdn_filename.map"
  fi

  scp "$localfile" "openlib@codeecke.de:$cdn_path/$cdn_filename"
fi


# deploying to npmjs.org
if [ "$1" == "npm" ]
then
  echo "Deploying to npmjs.org"
fi;