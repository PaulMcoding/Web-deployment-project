const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');  // Add this line

// Create a MySQL database connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'Builder',
  password: 'cls4',
  database: 'sys',
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory to the correct path
app.set('views', path.join(__dirname));

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));

// Define your route
app.get('/', function (req, res) {
  var query = "SELECT * FROM temp";
  dbConnection.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      res.render('temp', { title: 'temp test', action: 'list', testData: data });
    }
  });
});

// Start the server
app.listen(8080, function () {
  console.log('Server is running on port 8080');
});
