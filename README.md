
docker-compose up -d

docker logs jenkins | less

on host

ssh-keygen -t rsa -f jenkins_agent


pour reconstruire l'image
`docker-compose up --build`



- https://www.youtube.com/watch?v=6KEERS6nZjM
- https://www.cloudbees.com/blog/how-to-install-and-run-jenkins-with-docker-compose
