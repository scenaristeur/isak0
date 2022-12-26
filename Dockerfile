# syntax=docker/dockerfile:1
FROM node:18.12.1 as nodejs

FROM jenkins/ssh-agent:latest-jdk11

# https://medium.com/geekculture/how-to-install-a-specific-node-js-version-in-an-alpine-docker-image-3edc1c2c64be
#COPY --from=nodejs /usr/local/bin/node /usr/local/bin/node
COPY --from=nodejs /usr/lib /usr/lib
COPY --from=nodejs /usr/local/share /usr/local/share
COPY --from=nodejs /usr/local/lib /usr/local/lib
COPY --from=nodejs /usr/local/include /usr/local/include
COPY --from=nodejs /usr/local/bin /usr/local/bin
#RUN apt-get update
#RUN apt-get install npm -y

WORKDIR /simulateur
#RUN env
#RUN uname -a

#RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

RUN chown jenkins:jenkins /simulateur
COPY simulateur .
COPY package*.json ./
RUN npm install
RUN node -v
RUN npm -v
RUN ln -s node_modules/mocha/bin/mocha.js mocha
RUN cd /simulateur && ls -a &&  ./mocha scenarios/basic.js
#CMD ["node", "test.js"]
