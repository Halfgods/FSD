import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Student Info Server');
});

app.get('/about', (req, res) => {
    res.send('Name: Justin Roy | Roll No: 10639 | Course: Computer Engineering');
});

app.get('/contact', (req, res) => {
    res.send('Email: justin@gmail.com');
});

app.post('/register', (req, res) => {
    res.status(201).send('Student Registered');
});

app.put('/update', (req, res) => {
    res.status(200).send('Student Updated');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});