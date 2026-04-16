# Postman API Testing Guide for User Management System

This guide outlines exactly what endpoints to use in Postman, HTTP methods to select, and the data format to send to fully test the MongoDB backend. 

Your server must be running! Start it via `node server.js` before using Postman. 
The base URL will be `http://localhost:3000`.

---

## 1. Create a New User (POST)
**Method:** `POST`  
**URL:** `http://localhost:3000/users`

**Body (raw -> JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 28,
  "Job": "Software Engineer"
}
```
**Expected Response:** `201 Created` with the user object (including `_id`). Note down this `_id` to use in UPDATE and DELETE endpoints.

---

## 2. Retrieve All Users (GET)
**Method:** `GET`  
**URL:** `http://localhost:3000/users`

**Expected Response:** `200 OK` with a JSON array of all users.

---

## 3. Search Users by Name (GET)
**Method:** `GET`  
**URL:** `http://localhost:3000/users/search?name=Jane`

**Query Params:** 
- Key: `name` | Value: `Jane`

**Expected Response:** `200 OK` matching users where the name includes "Jane" (case-insensitive).

---

## 4. Filter Users by Email and Age (GET)
**Method:** `GET`  
**URL:** `http://localhost:3000/users/filter?email=jane@example.com&age=28`

**Query Params:** 
- Key: `email` | Value: `jane@example.com`
- Key: `age` | Value: `28`

**Expected Response:** `200 OK` with users matching exact email and/or age utilizing the compound index.

---

## 5. Find Users by Hobby (GET)
**Method:** `GET`  
**URL:** `http://localhost:3000/users/hobbies?hobby=traveling`

**Query Params:**
- Key: `hobby` | Value: `traveling`

**Expected Response:** `200 OK` with users who have "traveling" tightly packed inside their hobbies array.

---

## 6. Text Search on Bio (GET)
**Method:** `GET`  
**URL:** `http://localhost:3000/users/textSearch?text=software`

**Query Params:**
- Key: `text` | Value: `software`

**Expected Response:** `200 OK` fetching the texts indexed directly matching any word present like "software" inside `bio`.

---

## 7. Update User by ID (PUT)
**Method:** `PUT`  
**URL:** `http://localhost:3000/users/<USER_ID_HERE>`
*(Replace `<USER_ID_HERE>` with the actual `_id` received from the creation step)*

**Body (raw -> JSON):**
```json
{
  "age": 29,
  "hobbies": ["reading", "traveling", "photography"]
}
```
**Expected Response:** `200 OK` projecting the successfully updated data.

---

## 8. Delete User by ID (DELETE)
**Method:** `DELETE`  
**URL:** `http://localhost:3000/users/<USER_ID_HERE>`
*(Replace `<USER_ID_HERE>` with the target user's `_id`)*

**Expected Response:** `200 OK` with message `{"message": "User deleted successfully"}`.
