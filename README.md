# Book Manager Exercise

Technicals:
- AngularJS
- Jasmine

Prerequisites:

- NodeJS
- npm
- Mongo (https://docs.mongodb.com/manual/installation/)
- Bower:
    npm install -g bower
- Karma CLI:
    npm install -g karma-cli

To run application:

- Install dependencies:
    npm install

- Install bower libraries:
    bower install

- Have a local instance of mongo db running:
    mongod

- Run Server:
    node server/server

To run unit tests:
    npm run test

Opening the HTML report at target\test-results\coverage\report-lcov\lcov-report\index.html results in:
<img src="snapshoots\karma-coverage\.png">

References:
- https://scriptverse.academy/tutorials/jasmine-createspy-createspyobj.html
