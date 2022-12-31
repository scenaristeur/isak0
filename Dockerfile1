# syntax=docker/dockerfile:1
FROM node:18.12.1 as nodejs

FROM jenkins/ssh-agent:latest-jdk11

# https://medium.com/geekculture/how-to-install-a-specific-node-js-version-in-an-alpine-docker-image-3edc1c2c64be
COPY --from=nodejs /usr/lib /usr/lib
COPY --from=nodejs /usr/local/share /usr/local/share
COPY --from=nodejs /usr/local/lib /usr/local/lib
COPY --from=nodejs /usr/local/include /usr/local/include
COPY --from=nodejs /usr/local/bin /usr/local/bin

WORKDIR /simulateur
RUN apt-get update
RUN apt-get install wget -y
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.32.0/geckodriver-v0.32.0-linux64.tar.gz
RUN tar -xf geckodriver-v0.32.0-linux64.tar.gz
RUN mv /simulateur/geckodriver /usr/local/bin/


RUN chown -R jenkins:jenkins /simulateur

COPY package*.json ./
RUN npm install
RUN node -v
RUN npm -v
RUN ln -s node_modules/mocha/bin/mocha.js mocha
COPY simulateur .
#RUN cd /simulateur && ls -a &&  ./mocha scenarios/basic.js
#CMD ["node", "test.js"]
