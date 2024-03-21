# Form Factory
The application is currently under development. \
To run the app, clone the repo with `git clone https://github.com/ErlingHauan/FormFactory`, and `cd` into the directory.

## Run in Docker
To run the build in containers, run `docker-compose up --build` and then `yarn db:seed` to populate the database (required).
If you are getting error regarding a missing Dotnet utility, try running `dotnet tool install --global dotnet-ef --version 8.*` before seeding.

Access the frontend on http://localhost:3030. \
The backend endpoints can be viewed at https://localhost:8081/swagger. \
A database GUI is available on http://localhost:5050/ (log in with "a@a.com" and password "123456").

## Run in development mode
If you want to run the frontend or the backend outside of Docker, please see the steps below. \
Note that the database is only available through Docker, meaning the `formfactory-db` container has to be running for everything to work.

1. Use the command `yarn` from the root directory to install necessary NPM packages. 
2. Run `yarn start-backend`.
3. Run `yarn start-frontend`.

Then access the app on http://localhost:3050.
To see the backend endpoints, go to http://localhost:8080/swagger.
