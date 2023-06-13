### NodeJS + Firebase + FireStore

## Setup
- npm install
- npm run dev


#  API Documentation

GET - https://backend-express-firebase-ss1l.onrender.com/api/v1/tasks

POST - https://backend-express-firebase-ss1l.onrender.com/api/v1/tasks
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }

PUT - https://backend-express-firebase-ss1l.onrender.com/api/v1/:id
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }

DELETE - https://backend-express-firebase-ss1l.onrender.com/api/v1/:id

#  Unit Testing
```
npm run coverage
```

#  E2E Testing
```
npm run e2e
```

