
docker-compose up -d

docker logs jenkins | less

on host

ssh-keygen -t rsa -f jenkins_agent


pour reconstruire l'image
`docker-compose up --build`



- https://www.youtube.com/watch?v=6KEERS6nZjM
- https://www.cloudbees.com/blog/how-to-install-and-run-jenkins-with-docker-compose


jobs/basic/config.xml

```
<?xml version='1.1' encoding='UTF-8'?>
<project>
  <actions/>
  <description></description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <hudson.model.ParametersDefinitionProperty>
      <parameterDefinitions>
        <hudson.model.StringParameterDefinition>
          <name>SCENARIO</name>
          <defaultValue>basic</defaultValue>
          <trim>false</trim>
        </hudson.model.StringParameterDefinition>
      </parameterDefinitions>
    </hudson.model.ParametersDefinitionProperty>
  </properties>
  <scm class="hudson.scm.NullSCM"/>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers/>
  <concurrentBuild>false</concurrentBuild>
  <builders>
    <hudson.tasks.Shell>
      <command>/simulateur/plugins/core/lancement.sh</command>
      <configuredLocalRules/>
      <unstableReturn>1</unstableReturn>
    </hudson.tasks.Shell>
    <hudson.tasks.Shell>
      <command>/simulateur/plugins/core/fin.sh</command>
      <configuredLocalRules/>
    </hudson.tasks.Shell>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>
```

- grafana query

```
SELECT
  time AS "time",
  scenario AS metric,
  duree
FROM executions
WHERE
  $__timeFilter(time)
ORDER BY 1,2
```
