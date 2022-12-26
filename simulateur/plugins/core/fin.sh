#!/bin/bash
REPORT=${WORKSPACE}/${BUILD_NUMBER}.json
echo ${REPORT}
cd /produits/simulateur && ./plugins/timescale/index.js report=${REPORT}
