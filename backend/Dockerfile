FROM ubuntu/dotnet-aspnet:8.0-24.04_stable

# Dockerfile does not have access to absolute paths on the host
# Hence, host-path needs to be relative

WORKDIR /TodoApp/backend

COPY . .
# COPY ./publish $WORKDIR 

# RUN dotnet publish -o ./TodoApp/backend/publish	
CMD ["dotnet", "publish", "-o", "./publish"]

EXPOSE 5000
# CMD ["$WORKDIR/TodoApp"]
# CMD $WORKDIR
ENTRYPOINT ["dotnet", "./publish/TodoApp.dll"]

