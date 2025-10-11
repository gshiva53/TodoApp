FROM ubuntu/dotnet-aspnet:8.0-24.04_stable

ARG WORKDIR=./TodoApp/backend
ENV WORKDIR=./TodoApp/backend
# Dockerfile does not have access to absolute paths on the host
# Hence, host-path needs to be relative
COPY ./publish $WORKDIR 

WORKDIR $WORKDIR

EXPOSE 5000
# CMD ["$WORKDIR/TodoApp"]
# CMD $WORKDIR
ENTRYPOINT ["dotnet", "./TodoApp.dll"]

