# used by manage.sh to create database deps

sudo useradd bikeon
sudo -u postgres createuser --createdb bikeon
sudo -u bikeon createdb bikeon
sudo -u bikeon psql --dbname=bikeon < install/schema.sql
