# Form Factory
The application is currently under development. \
To run the app, clone the repo with `git clone https://github.com/ErlingHauan/FormFactory`, and `cd` into the directory.

## Run in Docker
To run the build in containers, run `yarn setup-docker`.

Access the frontend on http://localhost:3030. \
The backend endpoints can be viewed at https://localhost:8081. 

## Run in development mode
If you want to run the frontend or the backend outside of Docker, please see the steps below. \
Note that the database is only available through Docker, meaning the `formfactory-db` container has to be running for everything to work.

1. Use the command `yarn` in the root directory to install necessary NPM packages. 
2. Run `yarn setup-db`.
3. Run `yarn start-backend`.
4. In a new terminal, run `yarn start-frontend`.

Access the frontend on http://localhost:3050. \
The backend endpoints can be viewed at http://localhost:8080.

## Useful commands
* To lint the frontend code, run `yarn lint`.
* To format the code, run `yarn format` to format all code, or `yarn format-frontend` or `yarn format-backend`.
* To test the code, run `yarn test`, `yarn test-frontend` or `yarn test-backend`.
* To do all of the above, run `yarn preflight`, `yarn preflight-frontend`, or `yarn preflight-backend`.
* To remove the current database and rebuild it, run `reseed-db`.

## Troubleshooting
If you are getting an error regarding a missing Dotnet utility, try running `dotnet tool install --global dotnet-ef --version 8.*` and then `yarn db:seed`.
