#! /bin/bash

if [ -z "$1" ]
then
    echo "Please specify version"
    exit
fi

RELEASE_TYPE=$1
# Create a release
echo $RELEASE_TYPE

npm version $RELEASE_TYPE
PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
echo $PACKAGE_VERSION

git checkout -b release/$PACKAGE_VERSION

git push origin release/$PACKAGE_VERSION --tags
git push preprod release/$PACKAGE_VERSION --tags
git push prod release/$PACKAGE_VERSION --tags