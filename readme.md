

Academic Year
2025-2026
Estimated Time
Experiment No. 5A – 02 Hours
Course & Semester
SE Computer Engg.
Subject Name
Full Stack Development
Module No.
05
Chapter Title
Mongodb
Experiment Type
Software/ Web Application Development
Subject Code
25VSE12CE03


Name of     Student
Thomas Justin Roy
Roll No.
10639
Date of Performance.:


Date of Submission.:


CO Mapping
CO4: Integrate Full stack Application Development with MongoDB


Objective of Experiment: To understand how to integrate MongoDB with a backend server
To learn how to perform database operations through APIs
To build a basic full-stack backend using MongoDB
Pre-Requisite:  Basic knowledge of MongoDB (covered in Part A)
Understanding of JavaScript and Node.js
Familiarity with REST APIs
Basic knowledge of Express.js framework
Tools Required: Node.js runtime environment
MongoDB (local installation or MongoDB Atlas)
Code editor (e.g., Visual Studio Code)
Postman / Thunder Client for API testing
Web browser (Chrome/Firefox)


Theory:
MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON). Unlike traditional relational databases, MongoDB does not rely on tables and rows, making it highly scalable and suitable for modern applications.
When integrated with a backend server, MongoDB acts as the data storage layer, while the backend (e.g., Node.js with Express) handles business logic, routing, and communication between the client and the database.
Mongoose is commonly used as an Object Data Modeling (ODM) library, which simplifies database interactions by providing schemas and models. It ensures data consistency and makes CRUD operations more structured.
This integration allows developers to:
Create APIs that interact with the database
Perform Create, Read, Update, Delete (CRUD) operations
Manage application data efficiently
Architecture Flow of MongoDB Integration
The flow of data in a full-stack backend application is as follows:
Client (Postman/Frontend)
 → sends HTTP Request
 → Express Server (Node.js)
 → Routes handle request
 → Controller processes logic
 → Mongoose Model interacts with database
 → MongoDB Database
 → Response sent back to client


1. Overview of Backend Integration
MongoDB is commonly used with backend frameworks such as Node.js (Express), Python (Django/Flask), or Java (Spring Boot). The backend acts as a bridge between the database and the client (frontend or API consumer).
Key Responsibilities of Backend:
Connecting to the MongoDB database
Handling HTTP requests (GET, POST, PUT, DELETE)
Performing CRUD operations
Sending responses to the client
2. Setting Up the Environment
Prerequisites:
Node.js installed
MongoDB installed locally or access to MongoDB Atlas
Code editor (VS Code recommended)
Install Required Packages:
Step 2.1: Initialize Node.js Project
npm init -y
This creates a package.json file for managing project dependencies.
Step 2.1: Install All Required Packages
npm install express mongoose cors dotenv

Express.js
 Used to create the backend server and handle API routes.
Mongoose
 Used to connect and interact with MongoDB using schemas and models.
cors
 Enables communication between frontend and backend (Cross-Origin Resource Sharing).
dotenv
 Used to store sensitive data like MongoDB connection string in a .env file.

Note-body-parser is not required because modern Express.js already provides
3.A MongoDB Atlas Connection Steps
3.1 Login to MongoDB Atlas
Open MongoDB Atlas
Login and select your project
3.2 Database User
Go to Database Access
Ensure username and password are created (keep your pw –Test1234)
3.3Network Access
Go to Network Access
Add IP Address:0.0.0.0/0
3.4 Select Cluster
Go to Database → Clusters
Select your cluster (e.g., Cluster0)
3.5 Get Connection String
Click Connect → Connect your application


Click on Drivers:



Copy the connection string:

Note- Replace the <db_password> with your pw i.e. “Test1234”.

3.6 Environment Configuration (.env)
3.6.1 Open the VS code, create a file named. env
To ensure security, the MongoDB connection string is stored in an environment file.

 .env file should look like this:


Note- Make sure the user name and pw is correct.
3.B Establishing MongoDB Connection
To connect the backend server with MongoDB, we use Mongoose
Create server.js in VS code:


 Program1


Run the .js file using command prompt:
Node server.js
Output:

Now, we have successfully connected to our Mongodb Atlas database.
4. a. Create a Model (User Schema)
Create a folder: models
Inside it, create file: User.js


Program2
Edit User.js:


Create server.js 

Run the server file:
Node server.js

Note- Output will be the same as Program1. 
After successfully running the server and establishing a connection with MongoDB Atlas, it is necessary to test the API endpoints. For this purpose, Postman is used as an API testing tool. Postman allows sending HTTP requests such as GET and POST to the backend server and helps in analyzing the responses.


4.b. Testing of API Endpoints using Postman
4.b.1 Testing POST Method
The POST method is used to insert data into the MongoDB database. Using Postman, a POST request is sent to the /addUser endpoint with user data in JSON format. The server processes the request and stores the data in the database.


Output:

After receiving the success response from the server, we return to MongoDB Atlas and check the database collections to confirm that the document has been successfully created and stored.

4.b.2 Verification of Data in MongoDB Atlas

Go to your MongoDB Atlas account. 
Navigate to your Cluster.  
Click on Browse Collections. 
 Select the database (e.g., myDatabase). 



Open the collection (e.g., users). 



Verify that the inserted document is present.

Note-Students are encouraged to perform the GET method using Postman to retrieve data from the database. Use the URL http://localhost:3000/users to send the request and observe the fetched user records.


5.Implementation of UPDATE and DELETE Methods

In this program, UPDATE and DELETE methods are implemented to modify and remove data from the MongoDB database. These operations are performed using REST API endpoints in the backend server and are tested using Postman.
Note: The User.js (create in Program2) schema remains the same as defined earlier, as it provides the structure for storing user data in the database


5. 1 Implementation of UPDATE Method

The UPDATE method is used to modify existing records in the database. A PUT request is sent to the /updateUser/:id endpoint. The server locates the document using its unique ID and updates the specified fields. The updated document is then returned as a response.
Add the following code in our previous server.js


Testing UPDATE using Postman





Output-


5. 2 Implementation of Delete Method

The DELETE method is used to remove existing data from the database.
It is a part of RESTful APIs and operates using a unique ID.
In this program, a DELETE request is sent to the server with the document ID.
The server uses Mongoose to find and delete the corresponding record.
After deletion, a success message is returned to the client.
This method helps in removing unwanted or outdated data from the database.
In the same Program3 add following code after the update code (server.js):


Testing using POSTMAN:

Change method to “delete”, keep the same object id from update example.







Output:

6. Validation & Schema Design in MongoDB

In MongoDB, data is stored as documents in collections, and while the database is schema-less, using a schema helps maintain data consistency and prevent invalid entries. A schema acts as a blueprint that defines the structure, types, and rules for each field, such as required fields, string length, numeric limits, and default values. Validation ensures that data meets these rules before being saved, for example, checking that a name is not empty, an email is in a valid format, or age is a positive number. Mongoose, a popular Node.js library, allows developers to define schemas and enforce validations easily. Key validations include required, unique, min/max, minlength/maxlength, match for patterns, and default values. Proper schema design and validation improve data reliability, query consistency, and maintainability, and form a foundation for building robust applications.

Program4
Create User.js 

Create server.js



Output:



Let’s test schema using postman:
Please, refer to the following document for the testing:
Testing using POSTMAN


7.Querying & Filtering Data in MongoDB


In MongoDB, querying allows you to retrieve specific documents from a collection based on conditions, rather than fetching all data. Queries can filter records using operators like $gt (greater than), $lt (less than), $eq (equal), and more. You can also select specific fields to return only the necessary data, improving performance. Sorting lets you order results by any field, ascending or descending. Pagination is used to limit results per page, which is important for large datasets. Mongoose provides easy methods like find(), findOne(), sort(), limit(), and skip() to perform these queries. Combined with validation and schema design, querying ensures that applications can access clean, structured, and relevant data efficiently. Filtering, sorting, and pagination are essential for building professional, responsive applications.

Program5:
Create user.js



Create server.js





Now run the server.js file using following command in command prompt:
node  server.js
Note- we need to delete database in mondoDB-atlas created using previous programs as we are using the same .env file

Let’s test this using POSTMAN:
Use postman for advance MONGODB operation 


8.Indexing in MongoDB (Performance Optimization)

Indexing in MongoDB is a technique used to improve the performance of data retrieval by creating a structured reference to documents in a collection. Instead of scanning every document (COLLSCAN), MongoDB uses indexes to quickly locate data through an index scan (IXSCAN). Internally, indexes are implemented using B-tree data structures, which store field values along with pointers to the actual documents. This allows faster searching, sorting, and filtering operations, especially in large datasets.
Indexes significantly reduce query execution time and enhance application performance. For example, an index on a field like name enables MongoDB to directly access matching records without checking all documents. However, indexes also have some drawbacks, such as additional storage requirements and slightly slower write operations because indexes must be updated whenever data changes.
MongoDB supports various types of indexes, including single-field, compound, multikey (for arrays), text (for full-text search), hashed (for equality queries), and TTL (for automatic document expiration). Each type is designed for specific use cases and query patterns.
 









Types of Indexes in MONGODB

Index type
Description
Example
Use Case
Single Field
Index on one field
{ name: 1 }
Search by one field
Compound
Index on multiple fields
{ email: 1, age: -1 }
Multi-condition queries
Mutlikey
Index for array fields
{ hobbies: 1 }
Search inside arrays
Text
Full-text search
{ bio: "text" }
Search words, sentences
Harshed
Hash of field value
{ userId: "hashed" }
Fast equality, sharding
TTL
Auto-delete documents
{ createdAt: 1 }
Expiring data (sessions, logs)













Program6
Create .env file

create User.js

Create server.js

create index-test.js


MongoDB Indexing:  Testing
The index-test.js file is used to test and verify the effectiveness of indexes in MongoDB. It allows us to insert sample data and run queries programmatically to analyze how efficiently the database retrieves information. By using methods like .explain("executionStats"), we can observe important metrics such as the number of documents examined, index keys scanned, and execution time. This helps us confirm whether MongoDB is using indexes (IXSCAN) instead of performing a full collection scan (COLLSCAN). Additionally, it provides a controlled environment to compare performance with and without indexes, making it easier to understand their impact on query optimization. Overall, index-test.js is useful for debugging, performance testing, and learning how indexing improves database efficiency.
Run the following command:
node index-tes.js
Output:

Note- Students are advised to perform API testing using Postman. For this purpose, ensure that the backend server is running by executing the server.js file. Once the server is started, API endpoints can be tested by sending HTTP requests through Postman to verify data operations and observe how indexing improves query performance.

Problem Statement:
Design and develop a backend application using MongoDB and Node.js to manage a User Management System. Students are required to create a MongoDB collection named users with the following fields:
name (String, required, minimum 3 characters)
email (String, required, unique, valid email format)
age (Number, minimum 0, maximum 120)
hobbies (Array of Strings)
bio (String, for text search)
userId (String, unique identifier for hashed index)
createdAt (Date, default current date for TTL index)
Students must define a schema using Mongoose with appropriate validations for each field.
Objectives:
To understand the integration of MongoDB with a Node.js backend
To design a User schema with proper validation using Mongoose
To implement CRUD operations using RESTful APIs
To perform querying, filtering, sorting, and pagination
To understand and implement different types of MongoDB indexes
To analyze query performance using .explain("executionStats")
To test API endpoints using Postman





Tasks to Perform:
Database Integration
Connect Node.js backend to MongoDB using Mongoose.
Store connection string securely using .env.
CRUD Operations
Create API to insert user data (POST)
Retrieve all users (GET)
Update user by ID (PUT)
Delete user by ID (DELETE)
Querying & Filtering
Search users by name
Filter using email and age
Find users based on hobbies
Perform text search on bio
Index Implementation
 Students must create and apply the following indexes:
Single field index on name
Compound index on email and age
Multikey index on hobbies
Text index on bio
Hashed index on userId
TTL index on createdAt
Index Testing
Create a script (index-test.js)
Insert sample data
Use .explain("executionStats") to analyze:
keys examined
documents examined
execution time
API Testing
Test all endpoints using Postman
Verify correct responses and database changes
Post-lab Questions:
1.How would you modify your API to check index usage using .explain() in Postman?
2.You created a compound index:
{ email: 1, age: -1 }
Which of the following queries will use this index and which will not? Explain why:
find({ email: "test@gmail.com" })
find({ age: 25 })
find({ email: "test@gmail.com", age: 25 })
3.If your schema has:
email: { type: String, required: true, unique: true }
What will happen if you send a POST request:
without email
with a duplicate email
Will both give the same error? Explain the difference.
