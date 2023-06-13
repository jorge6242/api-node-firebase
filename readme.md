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

# Run Locally

Api: http://localhost:3000/api/v1/tasks

Paste into .env file :

```
## API
PORT=3000

## FIREBASE

FIREBASE_API_KEY=AIzaSyDDxcPwZP5_sjlljBPrIqkOLHDnZs5VVQQ
FIREBASE_AUTH_DOMAIN=api-node-192e5.firebaseapp.com
FIREBASE_PROJECT_ID=api-node-192e5
FIREBASE_STORAGE_BUCKET=api-node-192e5.appspot.com
FIREBASE_MESSAGING_SENDER_ID=452721128830C
FIREBASE_APP_ID=1:452721128830:web:b9d2b5d5e845e3266e2f2f
FIREBASE_MEASUREMENT_ID=G-0MHJ435T9N
```

#  Unit Testing
```
npm run coverage
```

#  E2E Testing
```
npm run e2e
```

NOTE: For the moment I had issues to mock the firestore database locally, therefore, the testing use the real database, the short solution was delete the register related to testing, sorry about that.

