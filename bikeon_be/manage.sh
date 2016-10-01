#!/bin/bash

if [ $# -lt 1 ]
then
    echo 'Usage: manage.sh <run/kill/install/clear>'
    exit 1
fi

if [ $1 == 'run' ]
then
    ./bikeon-be
fi

if [ $1 == 'kill' ]
then
    killall bikeon-be
fi

if [ $1 == 'install' ]
then
    # install npm packages
    sudo apt-get install nodejs
    sudo apt-get install npm
    sudo npm install -g n
    sudo n latest
    source ~/.bashrc
    node --version
    npm install
    node dbinstall.js
fi

if [ $1 == 'clear' ]
then
    rm bikeon.db
fi
