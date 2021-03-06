#!/bin/bash

############Make enter the root folder of all script
folderOfCurrentScript="$(dirname "${BASH_SOURCE}")"
cd ${folderOfCurrentScript}
############

logfileName=`date +"%m-%d-%y"`
logfileName="logs/${logfileName}.log"

## nvm use 10
echo `date` | tee -a ${logfileName}
node index.js >> ${logfileName}

## Delete log files older than 30 days
find ./logs -name "*.log" -type f -mtime +30 -exec rm -f {} \;