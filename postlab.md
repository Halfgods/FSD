# Database Management Post-Lab

## 1. Modifying the API to check index usage using `.explain()` in Postman

To check index usage directly from Postman via an API endpoint, you can modify an existing `GET` endpoint (or create a new one) to append the `.explain("executionStats")` method to your Mongoose query. Instead of returning the actual document results, this will return the MongoDB execution statistics.

**Example implementation for an endpoint:**

```javascript
app.get('/users/explain/search', async (req, res) => {
  try {
    const { email } = req.query;
    // Use .explain("executionStats") instead of executing the query normally
    const stats = await User.find({ email }).explain("executionStats");
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

When you call this endpoint from Postman (e.g., `GET /users/explain/search?email=test@gmail.com`), the response will be a JSON object containing `executionStats`. You can look at the `totalDocsExamined` and the `winningPlan.stage` (which will be `IXSCAN` if an index was used, or `COLLSCAN` if no index was used).

---

## 2. Compound Index Usage

Given the compound index: `{ email: 1, age: -1 }`

MongoDB compound indexes support queries that match the index prefix, which means queries that check for the first field, or the first and second fields, but *not* queries that only check for the second field.

*   `find({ email: "test@gmail.com" })`
    *   **Uses Index?** Yes.
    *   **Why?** This query matches the prefix of the compound index (the `email` field is the first half of the index). MongoDB can efficiently use the index to locate all documents with this email.

*   `find({ age: 25 })`
    *   **Uses Index?** No.
    *   **Why?** This query does not include the prefix of the index (`email`). Because the index is primarily sorted by `email`, MongoDB cannot use this index to look up only by `age`. It will result in a full collection scan (`COLLSCAN`).

*   `find({ email: "test@gmail.com", age: 25 })`
    *   **Uses Index?** Yes.
    *   **Why?** This query utilizes both fields in the exact order specified by the compound index. This is the optimal scenario for this index.

---

## 3. Schema Validation vs. Duplicate Errors

Given schema: `email: { type: String, required: true, unique: true }`

1.  **Sending a POST request *without* email:**
    *   **What happens:** Mongoose's built-in validation will throw an error *before* the request even reaches the MongoDB database.
    *   **Error type:** A Mongoose `ValidationError`.
    *   **Message:** Typically something like `"User validation failed: email: Path \`email\` is required."`

2.  **Sending a POST request with a *duplicate* email:**
    *   **What happens:** The Mongoose validation step passes (because the email field is present and is a string). The data is sent to MongoDB. However, MongoDB will reject the document because it violates the unique index created on the `email` field.
    *   **Error type:** A MongoDB `MongoServerError` (specifically, duplicate key error with code `11000`).
    *   **Message:** Typically something like `"E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test@example.com" }"`

**Will both give the same error? Explain the difference:**

No, they do not give the same error. 
*   The **missing email** error is a **Validation Error** thrown at the application level by Mongoose because the `required: true` constraint wasn't met. 
*   The **duplicate email** error is a **Database Error** (code `11000`) thrown directly by MongoDB because the unique index constraint (`unique: true`) was violated at the storage level.
