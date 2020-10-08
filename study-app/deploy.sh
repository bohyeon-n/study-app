#!/usr/bin/env bash

echo "[$(date)] client deploy" >> /home/ubuntu/deploy.log

sudo cp -rf /home/ubuntu/client/build/*  /home/ubuntu/html/build 

sudo systemctl reload apache2 
