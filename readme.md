### NodeJS + Firebase + FireStore

## Setup
- npm install
- npm run dev


#  API Documentation

GET - https://backend-express-firebase-ss1l.onrender.com/api/v1/tasks

POST - https://backend-express-firebase-ss1l.onrender.com/api/v1/tasks
```
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }
```

PUT - https://backend-express-firebase-ss1l.onrender.com/api/v1/:id

```
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }
```

DELETE - https://backend-express-firebase-ss1l.onrender.com/api/v1/:id

To run locally: http://localhost:3000/api/v1/tasks

#  Unit Testing
```
npm run coverage
```

#  E2E Testing
```
npm run e2e
```

NOTE: For the moment I had issues to mock the firestore database locally, therefore, the testing use the real database, the short solution was delete the register related to testing, sorry about that.

