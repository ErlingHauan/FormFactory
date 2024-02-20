# Building the backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish "src/FormAPI.csproj" -o /publish

# Serving the backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
COPY --from=build /publish .
COPY formfactory.pfx /https/
EXPOSE 8081
ENTRYPOINT ["dotnet", "FormAPI.dll"]