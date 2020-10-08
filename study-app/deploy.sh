#!/usr/bin/env bash

echo "[$(date)] client deploy" >> /home/ubuntu/deploy.log

sudo systemctl reload apache2 
