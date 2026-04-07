// form.html for this

import express from 'express';
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
console.log(filename , dirname)

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/' , (req , res) => {
    res.sendFile(path.join(dirname , 'public' , 'form.html'));
});

app.post('/submit' , (req , res) => {
    const {name , branch , year} = req.body;
    res.send(`<h2>Submitted Information</h2>
        <p>Student Name: ${name}</p>
        <p>Branch: ${branch}</p>
        <p>Year: ${year}</p>`);
});

app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`);
});