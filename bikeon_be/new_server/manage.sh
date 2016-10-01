#!/bin/bash

if [ $# -lt 1 ]
then
    echo 'Usage: manage.sh <run/kill/install/clear>'
    exit 1
fi

if [ $1 == 'run' ]
then
    ./bikeon_be
fi

if [ $1 == 'kill' ]
then
    cat .bikeon_be.pid | xargs kill
fi

if [ $1 == 'install' ]
then
    # python related deps
    pip3 install virtualenv
    virtualenv -p python3.5 env
    source env/bin/activate
    pip install -r requirements.txt
    deactivate

    # create db schema
    ./install/create_db.sh
fi

if [ $1 == 'clear' ]
then
    echo "clear"
fi
