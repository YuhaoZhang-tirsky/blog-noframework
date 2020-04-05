#!/bin/sh
cd #cd to logs
cp access.log $(date + %Y-%m-%d).access.log #copy access.log,name it to time.+access.log
echo "" > access.log #clear access.log