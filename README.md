# Worko Backend API
This is an API for a task provided by Worko. The task is to create a RESTful API that allows users to create, read, update, and delete users. 

## The API should be able to store the following information about a user:
- email
- name
- age
- city
- zip code

# How to run the API

1. Clone the repository using : 
```bash
git clone YOUR_REPO_LINK
```

2. Run `npm install` to install the dependencies.

3. Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT=YOUR_PORT_NUMBER
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_JWT_SECRET
```

4. Run `npm start` to start the server.

5. You can now access the API at `http://localhost:YOUR_PORT_NUMBER`.

# API Endpoints

## 1. Create a user 
- **URL:** `/worko/user`
- **Method:** `POST`
- **Request Body:**
```json
{
    "email": "YOUR_EMAIL",
    "name": "YOUR_NAME",
    "age": 0,
    "city": "YOUR_CITY",
    "zipCode": "12345"
}
```

## 2. Get all users
- **URL:** `/worko/user`
- **Method:** `GET`

## 3. Get a user by ID
- **URL:** `/worko/user/:id`
- **Method:** `GET`

## 4. Update a user by ID
- **URL:** `/worko/user/:id`
- **Method:** `PUT`
- **Request Body:**
```json
{
    "email": "YOUR_EMAIL",
    "name": "YOUR_NAME",
    "age": 0,
    "city": "YOUR_CITY",
    "zipCode": "12345"
}
```

## 5. Delete a user by ID
- **URL:** `/worko/user/:id`
- **Method:** `DELETE`

## 6. Login
- **URL:** `/worko/auth/login`
- **Method:** `POST`
- **Request Body:**
```json
{
    "email": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD"
}
```

## 7. Register
- **URL:** `/worko/auth/register`
- **Method:** `POST`
- **Request Body:**
```json
{
    "email": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD",
    "name": "YOUR_NAME",
    "age": 0,
    "city": "YOUR_CITY",
    "zipCode": "12345"
}
```

# Testing

To run the tests, run `npm test`. This will run the tests using Jest.

# Author

- [Rishabh Gupta]