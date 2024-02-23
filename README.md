# Form Factory
The application is currently under development.
To run the app, clone the repo with `git clone https://github.com/ErlingHauan/FormFactory`, and `cd` into the directory.

## Run in development mode
Use the command `yarn` from the root directory to install necessary NPM packages. Then run `yarn start-main-app` to run the frontend app in development mode. Access the frontend on http://localhost:3050.

To run the backend, run `dotnet run --project backend/src/FormAPI.csproj` when you are in the root directory. The backend will run on HTTPS port 8081.

## Run in Docker
To run the build in containers, run `docker-compose up --build`. This will run the frontend on http://localhost:3030 and the backend on HTTP port 8080.