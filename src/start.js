const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Set up a simple form for file uploads
app.get('/file', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/start', (req, res) => {
    res.send("welcome to the upload page");
  });

// Handle multiple file uploads
app.post('/upload', upload.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  // Add more fields as needed
]), (req, res) => {
  res.send('Files uploaded successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
