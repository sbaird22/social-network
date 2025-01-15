# social-network

## Description
This is a backend application for a social network API. Built with **Node.js**, **Express**, and **MongoDB**, it allows users to share their thoughts, react to friends' thoughts, and manage a friend list. It uses **Mongoose** for object data modeling and **JWT authentication** for secure user management.

---

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https
   ```
2. Navigate to the project directory:
   ```bash
   cd social-network-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following:
   ```plaintext
   MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
   PORT=3001
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

---

## Usage

### Starting the Server
Run the following command to start the server:
```bash
npm run dev
```
The server will start at `http://localhost:3001`, and the database will connect to `MongoDB`.

### Testing the API
Use **Insomnia** or **Postman** to test the following endpoints.

---

## API Endpoints

### Users

- **GET /api/users**: Retrieve all users.
- **GET /api/users/:userId**: Retrieve a single user by ID.
- **POST /api/users**: Create a new user.
  - **Request Body**:
    ```json
    {
      "username": "john_doe",
      "email": "john.doe@example.com"
    }
    ```
- **PUT /api/users/:userId**: Update a user's details.
- **DELETE /api/users/:userId**: Delete a user.

---

### Thoughts

- **GET /api/thoughts**: Retrieve all thoughts.
- **GET /api/thoughts/:thoughtId**: Retrieve a single thought by ID.
- **POST /api/thoughts**: Create a new thought.
  - **Request Body**:
    ```json
    {
      "thoughtText": "This is my first thought!",
      "username": "john_doe",
      "userId": "63d7b38f2b3e7a2c4e5d1a67"
    }
    ```
- **PUT /api/thoughts/:thoughtId**: Update a thought by ID.
- **DELETE /api/thoughts/:thoughtId**: Delete a thought.

---

### Reactions

- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
  - **Request Body**:
    ```json
    {
      "reactionBody": "This is a cool thought!",
      "username": "jane_doe"
    }
    ```
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought.

---

### Friends

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **TypeScript**
- **dotenv**

---

## Walkthrough Video
Watch the full walkthrough video [here].https://drive.google.com/file/d/1IWyCfB5U1K_wMj-1kwr9oY7snzRQPGUc/view

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
