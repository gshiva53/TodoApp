# TodoApp

A simple Todo application with a .NET backend and Solid JS frontend to learn both technologies.

### Building the .NET Backend Web API using the Dockerfile

Use this command to run the docker container.

```
git clone <TodoApp Github url>
cd ./TodoApp/backend
sudo docker build ./ -t todoapp-backend
sudo docker run -p 5000:5000 -d todoapp-backend
```

### Building the Solid JS Frontend using the Dockerfile

Use this command to run the docker container.

```
// Assuming git repo is already cloned
cd ./TodoApp/frontend
sudo docker build ./ -t todoapp-frontend
sudo docker run -p 3001:3000 -d todoapp-frontend
```

## Note

The Dockerfile images created using these dockerfiles are not optimised and may consume more resources than required. The dockerfiles can be optimised by:
-> Using multi-stage builds
-> Copying the output required for the next stage and removing the build tools
-> Using package manager (pnpm) caches for shorter build times if images need to be rebuild again.
-> Security considerations
