var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql2');
var url = require('url');

// Create a MySQL database connection
var dbConnection = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'Builder', // Replace with your database username
  password: 'cls4', // Replace with your database password
  database: 'sys', // Replace with your database name
});

// Connect to the database
dbConnection.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Serve the HTML file from the same directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Project Files/index.html');
});

app.listen(8080);