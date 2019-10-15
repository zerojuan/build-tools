#! /bin/bash

if [ -z "$1" ]
then
    echo "Please specify release branch"
    exit
fi

PROJECT_NAME=''

get_project_name () {
    URL=$(git remote get-url origin)
    basename=$(basename $URL)
    filename=${basename%.*}
    PROJECT_NAME=$filename
}

get_project_name

echo Found: $PROJECT_NAME

build-tools merge coveinsurance $PROJECT_NAME $1
