var http = require('http');
var mysql = require('mysql2');
var url = require('url');

// Create a MySQL database connection
const dbConnection = mysql.createConnection({
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

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Perform a database query
  dbConnection.query('SELECT * FROM temp', function (error, results, fields) {
    if (error) {
      console.error('Error querying the database: ' + error);
      return;
    }

    // Extract and format the SQL results as plain text
    var sqlResults = results.map(result => Object.values(result).join('\t')).join('\n');

    // HTML content that includes an image and SQL results in plain text
    var htmlResponse = `
      <html>
      <head>
        <title>Hello World with SQL Output</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        <img src="${sqlResults}" alt="Image">
      </body>
      </html>
    `;

    res.end(htmlResponse);
  });
});

server.listen(8080, function () {
  console.log('Server is listening on port 8080');
});
