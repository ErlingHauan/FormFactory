# Building the frontend
FROM node:lts-alpine AS build
WORKDIR /build
COPY . .
RUN corepack enable
RUN yarn
RUN yarn build


# Serving the frontend
FROM nginx:alpine
COPY --from=build build/frontend/dist/main-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
