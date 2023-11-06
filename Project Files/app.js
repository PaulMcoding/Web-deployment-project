var express = require('express');
var app = express();

// Serve the HTML file from the same directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8080);