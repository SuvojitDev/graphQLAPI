# 📁 GraphQL API — All in One Postman Guide

---
## 🔹 Tech Stack

- **Node.js**
- **Apollo Server**
- **GraphQL**
- **JWT Authentication**
- **Mongoose/Mongodb**

---
## 🔹 Environment Variables
Create a `.env` file in your root directory:
```json
SECRET_KEY=your_secret_key
DB_URI=mongodb+srv://
PORT=4000
```

---
## 🔹 Installation
```shell
git clone <your-repo-url>
cd your-repo
npm install
```

---
## 🔹 Run the Application
```shell
    npm start
```

---
## 🔹 Auth Notes
- `Signup` and `login` are `public`
- All other operations require Authorization:Bearer YOUR-JWT-TOKEN

---
## 🔹 API Operations
## 🔹 Signup (POST)
- **URL:** `http://localhost:4000/graphql`
- **Body (GraphQL):**
```json
{
  "query": "mutation ($username: String!, $email: String, $password: String!) { signup(username: $username, email: $email, password: $password) { message } }",
  "variables": { "username": "foo", "email": "foo@example.com", "password": "123123" }
}
```
---

## 🔹 Login (POST)

- **URL:** http://localhost:4000/graphql
- **Body (GraphQL):**
```json
{
  "query": "mutation ($username: String!, $password: String!) { login(username: $username, password: $password) { token message } }",
  "variables": { "username": "foo", "password": "123123" }
}
```

## 🔹 Add Book (POST)
- **URL:** http://localhost:4000/graphql
- **Headers:** Authorization: Bearer YOUR-JWT-TOKEN
- **Content-Type:** application/json
- **Body (GraphQL):**

```json
{
  "query": "mutation ($title: String!, $author: String!) { addBook(title: $title, author: $author) { id title author } }",
  "variables": { "title": "New Title", "author": "Author Name" }
}
```

## 🔹 Get All Books (POST)
- **URL:** http://localhost:4000/graphql
- **Headers:** Authorization: Bearer YOUR-JWT-TOKEN
- **Content-Type:** application/json
- **Body (GraphQL):**
```json
{
  "query": "query { books { id title author } }"
}
```

## 🔹 Get Book by ID (POST)
- **URL:** http://localhost:4000/graphql
- **Headers:** Authorization: Bearer YOUR-JWT-TOKEN
- **Content-Type:** application/json
- **Body (GraphQL):**
```json
{
  "query": "query ($id: ID!) { book(id: $id) { id title author } }",
  "variables": { "id": "<your-book-id>" }
}
```

## 🔹 Update Book (POST)
- **URL:** http://localhost:4000/graphql
- **Headers:** Authorization: Bearer YOUR-JWT-TOKEN
- **Content-Type:** application/json
- **Body (GraphQL):**
```json
{
  "query": "mutation ($id: ID!, $title: String!, $author: String!) { updateBook(id: $id, title: $title, author: $author) { id title author } }",
  "variables": { "id": "<your-book-id>", "title": "Updated Title", "author": "Updated Author" }
}
```

## 🔹 Delete Book (POST)
- **URL:** http://localhost:4000/graphql
- **Headers:** Authorization: Bearer YOUR-JWT-TOKEN
- **Content-Type:** application/json
- **Body (GraphQL):**
```json
{
  "query": "mutation ($id: ID!) { deleteBook(id: $id) { message } }",
  "variables": { "id": "<your-book-id>" }
}
```