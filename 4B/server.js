import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// In-memory "database" of students
let students = [];
let nextId = 1;

// GET /students → Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET /students/:id → Get a specific student
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});

// POST /students → Add a new student
app.post('/students', (req, res) => {
    const { name, branch, year } = req.body;

    if (!name || !branch || !year) {
        return res.status(400).json({ message: 'Name, Branch, and Year are required' });
    }

    const newStudent = { id: nextId++, name, branch, year };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PATCH /students/:id → Update student details
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, branch, year } = req.body;
    if (name) student.name = name;
    if (branch) student.branch = branch;
    if (year) student.year = year;

    res.json(student);
});

// DELETE /students/:id → Delete a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const deletedStudent = students.splice(index, 1);
    res.json({ message: 'Student deleted', student: deletedStudent[0] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Student API running on http://localhost:${PORT}`);
});