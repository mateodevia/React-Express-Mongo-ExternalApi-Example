This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Objective

This is a simple example of how to connect a react app with express.js. Express is used as a backend service that connects to a mongo db. This backend has a simple CRUD example.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


### `cd frontend`
### `npm run build`

Builds the app for production to the `frontend/build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>


The backend is already configured to serve this buil folder.
The repo already contains a build example that ir ready for deployment.

## Data base conection
This project is configured to connect to a mongo data base running on localhost. You must create your own database called `nombreDB` with a colection called `nombreCol`, or you can modify these names on `routes/crud.js` file.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository has the standard MIT license. You can find it [here.](https://github.com/mateodevia/React-Express-Mongo-ExternalApi-Example/blob/master/LICENSE)