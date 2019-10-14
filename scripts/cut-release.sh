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
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo $PACKAGE_VERSION
echo release/$PACKAGE_VERSION

git checkout -b release/$PACKAGE_VERSION

git push origin release/$PACKAGE_VERSION --tags
git push preprod release/$PACKAGE_VERSION --tags
git push prod release/$PACKAGE_VERSION --tags