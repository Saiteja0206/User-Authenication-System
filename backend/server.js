const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('/register', (req, res) => {
  res.sendFile(path.join(frontendPath, 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

app.get('/request-reset', (req, res) => {
  res.sendFile(path.join(frontendPath, 'request-reset.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(frontendPath, 'reset-password.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/api/users', require('./routes/userRoutes'));

app.use((req, res) => {
  res.status(404).send('Page not found');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
