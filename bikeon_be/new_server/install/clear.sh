# clear all db deps

sudo -u postgres dropdb bikeon
sudo -u postgres dropuser bikeon
sudo userdel bikeon
