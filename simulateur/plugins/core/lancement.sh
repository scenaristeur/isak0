#!/bin/bash

REPORT=${WORKSPACE}/${BUILD_NUMBER}.json
echo ${REPORT}
cd /simulateur
 ./mocha scenarios/${SCENARIO}.js --reporter json --reporter-options output=${REPORT} --bail

# echo $?
if [ $? -eq 0 ]
then
  echo "The script ran ok"
  exit 0
else
  echo "The script failed" >&2
  exit 1
fi
