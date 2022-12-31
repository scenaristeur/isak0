#!/bin/bash
REPORT=${WORKSPACE}/${BUILD_NUMBER}.json
echo ${REPORT}
cd /simulateur && ./plugins/timescale/index.js report=${REPORT}
#cd /simulateur && ./plugins/orbitdb/index.js report=${REPORT}
