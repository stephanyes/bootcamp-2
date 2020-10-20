## Plataforma5 Coding Bootcamp 2.0

Coding Challenge for Plataforma5 Bootcamp 2.0

## Available Scripts

In the project backend directory, you can run:
npm run start:dev - Starts Backend server
npm run migrate - Migrates table just make sure you have in postgres a database name airport_deposit
npm run seed - Seeds Database

### `npm start` in Front

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### HomePage

Simple Table that brings ALL passengers registered with all their details.
If you click in each passengers UUID_CODE it will take you to that passengers information and display (if there is) any package that they have
Or it will show if they already checked out or not.

You can also add a New Passenger as long as he is not already registered, if thats the case a message will be displayed. You may add bagage while entering new passengers.

You can add New Packages for REGISTERED passengers with a maximum of 3 (three) types of bags (At somepoint they can repeat bagage types).
