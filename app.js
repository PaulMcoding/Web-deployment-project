var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql2');
var url = require('url');
var path = require('path');

//// Create a MySQL database connection
//var dbConnection = mysql.createConnection({
//  host: 'localhost', // Replace with your database host
//  user: 'public', // Replace with your database username
//  password: 'password', // Replace with your database password
//  database: 'sys', // Replace with your database name
//});
//
//// Connect to the database
//dbConnection.connect(function (err) {
//  if (err) {
//    console.error('Error connecting to the database: ' + err.stack);
//    return;
//  }
//  console.log('Connected to the database');
//});
//
//// Serve the HTML file from the same directory
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'Project Files')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Project Files/index.html');
});

app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/Project Files/checkout.html');
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/Project Files/signin.html');
});

app.get('/album', (req, res) => {
  res.sendFile(__dirname + '/Project Files/album.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/Project Files/signup.html');
});

app.listen(8080);