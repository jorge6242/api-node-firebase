### NodeJS + Firebase + FireStore

## Setup
- npm install
- npm run dev


#  API Documentation

GET - http://localhost:3000/api/v1/tasks

POST - http://localhost:3000/api/v1/tasks
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }

PUT - http://localhost:3000/api/v1/tasks/:id
  Body
    {
      "title":"title 1",
      "description":"description 1",
      "status":"pending"
    }

DELETE - http://localhost:3000/api/v1/tasks/:id

#  Unit Testing
```
npm run coverage
```

