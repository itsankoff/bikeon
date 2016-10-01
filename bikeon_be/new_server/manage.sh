#!/bin/bash

if [ $# -lt 1 ]
then
    echo 'Usage: manage.sh <run/kill/install/clear>'
    exit 1
fi

if [ $1 == 'run' ]
then
    ./bikeon_be.sh
fi

if [ $1 == 'kill' ]
then
    killall manage.sh
fi

if [ $1 == 'install' ]
then
    virtualenv -p python3.5 env
    source env/bin/activate
    pip install -r requirements.txt
    deactivate
fi

if [ $1 == 'clear' ]
then
    echo "clear"
fi
