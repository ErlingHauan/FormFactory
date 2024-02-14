# Building the frontend
FROM node:lts-alpine AS frontend
WORKDIR /build
COPY . .
RUN corepack enable
RUN yarn
RUN yarn build

# Building backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend
WORKDIR /src
COPY backend .
RUN dotnet restore
RUN dotnet build "src/FormAPI.csproj" -c Release -o /app/build
EXPOSE 80
EXPOSE 443

FROM build AS publish
RUN dotnet publish "src/FormAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FormAPI.dll"]

# Building nginx
FROM nginx:alpine
COPY --from=frontend build/frontend/dist/main-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
