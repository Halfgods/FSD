const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const User = require('./models/user');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Create user data (POST)
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(
      {
        message: "User created successfully",
        user: newUser
      }
    );

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search users by name (GET) - Need to come before /users/:id
app.get('/users/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'Name query parameter is required' });
    const users = await User.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter using email and age (GET)
app.get('/users/filter', async (req, res) => {
  try {
    const { email, age } = req.query;
    const filter = {};
    if (email) filter.email = email;
    if (age) filter.age = Number(age);

    // Using the compound index here implicitly
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find users based on hobbies (GET)
app.get('/users/hobbies', async (req, res) => {
  try {
    // hobby query param
    const { hobby } = req.query;
    if (!hobby) return res.status(400).json({ error: 'Hobby query parameter is required' });

    const users = await User.find({ hobbies: hobby });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Perform text search on bio (GET)
app.get('/users/textSearch', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Text query parameter is required' });

    // Uses text index on bio
    const users = await User.find({ $text: { $search: text } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all users (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by ID (PUT)
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user by name (DELETE)
app.delete('/users/:name', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ name: req.params.name });
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});