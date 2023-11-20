const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'Builder',
  password: 'cls4',
  database: 'sys',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'temp2.html'));
});

// Endpoint to handle client-side database request
app.get('/getData', function (req, res) {
  var query = "SELECT * FROM temp";
  dbConnection.query(query, function (error, data) {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  });
});

app.listen(8080, function () {
  console.log('Server is running on port 8080');
});
