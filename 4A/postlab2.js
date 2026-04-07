// index.html , profile.ejs for this
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// POST route to render dynamic EJS
app.post('/profile', (req, res) => {
    const { name, branch, year } = req.body;
    res.render('profile', { name, branch, year });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});