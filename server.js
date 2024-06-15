const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

// Serve static files from the 'yearbook' directory
app.use(express.static(path.join(__dirname, 'project')));

// Route handler for the root route ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project', 'yearbookv1.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const path = require('path');
// const app = express();

// // Serve static files from the "project" directory
// app.use(express.static('project'));

// // Serve the HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'project', 'student_intro.html'));
// });

// // Handle requests for the favicon
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'project', 'favicon.ico'));
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


