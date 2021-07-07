# Anonymous Survey Service
This APP is use to create and record anonymous surveys.
This APP saves the data in Local JSON file src/app/data/surveys.json to store the surveyDetails,
and stores the precalculated survey results in  src/app/data/results.json
which is getting used to return or record the survey details.


### Install Project Dependencies

To be able to run the application properly you need to execute the
following commands:

    $ npm i

### Run Console Commands

In order to run your application service
you can use any of this:

Run Unit Tests:
    $ npm run test:unit

To start service on your local machine you may use
    $ npm run start

To run lint fixing you may use
    $ npm run link:fix

## ENV variables needed to run this APP

- HOST=127.0.0.1
- PORT=8080 
- NODE_ENV=dev

## NOTE

This APP doesn't persist the data, once you restart the server data will be gone.

To get the contract of the sevice, Please visit:

http://http://localhost:8080/documentation

This will give you swagger documentation of the API's
