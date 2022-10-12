# todo
- [ ] passer en es6

# composants
- portainer
`docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest`
- jenkins
- https://hub.docker.com/r/jenkins/jenkins
- latest war https://mirrors.jenkins.io/war-stable/latest/
`docker pull jenkins/jenkins:lts-jdk11 ``
- controler :
--> first `docker run --name jenkins_controller -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11`
--> detached `docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 --restart=on-failure jenkins/jenkins:lts-jdk11`

--> http://localhost:8080


- docker agents
- https://www.jenkins.io/doc/book/using/using-agents/
--> manually verification et java_home /opt/java/openjdk/bin/java
`docker run -d --rm --name=agent3 -p 22:22 \
-e "JENKINS_AGENT_SSH_PUBKEY=[your-public-key]" \
jenkins/ssh-agent:alpine`

`docker run -d --rm --name=agent3 -p 22:22 \
-v ~/dev/isakonium/simulateur:/produits/simulateur \
-e "JENKINS_AGENT_SSH_PUBKEY=ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCTti0O04ubN1uE9LAai2Y/l9S9YQ2x5OHKjkMPUXemX/7Ua05Mz4e4ofjYTF7NPGBMNt0gbAgvS...XiWurl6BtqdsTA45epDfDFVg+Wkdkyqa...49Dg3WbeO/QoWxh2R1OyQIrf1LgYKIPgO/ci5wTdjhVJ5...pOq3x+vH8zqvQv72kp/VqzNJvcDJK+SqcmRzMyl+ONcFZhCIIjK32qdNQBztHamBvnF4tvSmEeev+4DmcpaFDuH7bC88gp4cXbqLgNrFBVEYkBRogW+XUxWYNRxxSfudBDCPfLIRzW9ZrjZRoudXxzrvwkvFU3d833+bdki3oooudrhEcOBwweZ0itPwRh/X8Xu+KzJgZivWkNpPkNC09Z0caXXsyCxnm2...PPo/O+MOJlXqht4Z/rwqcsrcH21rT8= user@machine" \
jenkins/ssh-agent:alpine`


# install node
connect root
`docker exec -it agent3 bash
apk add nodejs
apk add npm`

# installation simulateur
`docker exec -it -u jenkins agent3 bash
cd /produits/simulateur/
npm init -y
npm install selenium-webdriver assert mocha --save
#  npm install --save chromedriver geckodriver @sitespeed.io/edgedriver # if necessaire
# https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/
# wget https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-linux64.tar.gz
# tar -xf geckodriver-v0.31.0-linux64.tar.gz
# echo 'export PATH=$PATH:/produits/simulateur/geckodriver' >> ~/.bash_profile
# source ~/.bash_profile
ln -s node_modules/mocha/bin/mocha.js mocha
./mocha scenarios/basic.js

`

- take a script https://github.com/SeleniumHQ/seleniumhq.github.io/tree/trunk/examples/javascript/test/getting_started

- build jenkins job

# timescaledb
- https://docs.timescale.com/install/latest/installation-docker/
`docker run -d --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb-ha:pg14-latest`
?? -v ne fonctionne pas ??
`docker run -d --name timescaledb -p 5432:5432 \
-v ~/dev/isakonium/timescaledb:/home/postgres/pgdata/data \
-e POSTGRES_PASSWORD=password timescale/timescaledb-ha:pg14-latest`

- install extension depuis l'hote
`psql -U postgres -h localhost`

```smag@smag-IdeaPad:~/dev/isakonium$ psql -U postgres -h localhost
Password for user postgres:
psql (14.5 (Ubuntu 14.5-0ubuntu0.22.04.1))
Type "help" for help.

postgres=# CREATE database example;
CREATE DATABASE
postgres=# \c example
You are now connected to database "example" as user "postgres".
example=# CREATE EXTENSION IF NOT EXISTS timescaledb;
NOTICE:  extension "timescaledb" already exists, skipping
CREATE EXTENSION
example=# psql -U postgres -h localhost -d example
example-# \dx
                                                    List of installed extensions
        Name         | Version |   Schema   |                                      Description                                      
---------------------+---------+------------+---------------------------------------------------------------------------------------
 plpgsql             | 1.0     | pg_catalog | PL/pgSQL procedural language
 timescaledb         | 2.8.0   | public     | Enables scalable inserts and complex queries for time-series data
 timescaledb_toolkit | 1.11.0  | public     | Library of analytical hyperfunctions, time-series pipelining, and other SQL utilities
(3 rows)

example-#



CREATE TABLE IF NOT EXISTS "executions"(
    time     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    scenario  TEXT,
    duree     NUMERIC,
    injecteur TEXT,
    status    INTEGER
);

SELECT create_hypertable('executions', 'time');


```



# grafana
- https://community.grafana.com/t/how-we-can-monitor-jenkins-stages-run-time-duration-using-prometheus-on-grafana/58490
- `docker run -d --name=grafana -p 3000:3000 grafana/grafana-enterprise`
- timescale & grafana
- https://grafana.com/docs/grafana/v9.0/datasources/add-a-data-source/
- https://grafana.com/docs/grafana/v9.0/datasources/postgres/#query-editor
- https://grafana.com/blog/2018/10/15/make-time-series-exploration-easier-with-the-postgresql/timescaledb-query-editor/


```
CREATE USER grafanareader WITH PASSWORD 'password';
GRANT USAGE ON SCHEMA schema TO grafanareader; // ne marche pas
GRANT SELECT ON executions TO grafanareader;
```
- statusmap plugin https://grafana.com/grafana/plugins/flant-statusmap-panel/

http://localhost:4444/status
http://localhost:4444




- selenium
`docker run --name selenium-ff -d -p 4444:4444 -p 7900:7900 -e SE_NODE_MAX_SESSIONS=4 -e SE_NODE_OVERRIDE_MAX_SESSIONS=true --shm-size="2g" selenium/standalone-firefox:4.5.0-20220929`

https://github.com/SeleniumHQ/docker-selenium/blob/trunk/NodeFirefox/Dockerfile







/////////////////////////////: OLD
- agents "From your Jenkins dashboard navigate to Manage Jenkins > Manage Plugins and select the Available tab. Locate this plugin by searching for ssh-slaves."
- https://github.com/jenkinsci/ssh-slaves-plugin/blob/main/doc/CONFIGURE.md
- "a base image for Docker, which includes JDK and the Jenkins agent executable (agent.jar)" https://hub.docker.com/r/jenkins/agent/
--> `docker run -i --rm --name agent1 -p 23:22 --init -v agent1-workdir:/home/jenkins/agent jenkins/agent java -jar /usr/share/jenkins/agent.jar -workDir /home/jenkins/agent`
--> `docker run -i --rm --name agent2 -p 24:22 --init -v agent2-workdir:/home/jenkins/agent jenkins/agent java -jar /usr/share/jenkins/agent.jar -workDir /home/jenkins/agent`
- "agents using TCP or WebSockets to establish inbound connection to the Jenkins master." https://hub.docker.com/r/jenkins/inbound-agent/
--> configure agent https://github.com/jenkinsci/ssh-slaves-plugin/blob/main/doc/CONFIGURE.md


configure from agent2
```

echo 1f712cbc06ef1ab8adf9a2dbcfe02290e7c405c35393e6ddb421f90b144eb24d > secret-file
java -jar agent.jar -jnlpUrl http://172.18.0.1:8080/computer/agent2/jenkins-agent.jnlp -secret @secret-file -workDir "/home/jenkins/agent"
```
