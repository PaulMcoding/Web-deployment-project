var express = require('express');
var app = express();
var http = require('http');
var { Pool } = require('pg');
var url = require('url');
var path = require('path');

var bcrypt = require('bcrypt');
var saltRounds = 10;
app.use(express.json());

//// Pauls Connection
var pool = new Pool({
  user: 'paul',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 54321
});

//// Williams Connection
//var pool = new Pool({
//  user: 'BUILDER', // PostgreSQL database username
//  host: 'localhost', // PostgreSQL database host
//  database: 'postgres', // PostgreSQL database name
//  password: 'cls2', // PostgreSQL database password
//  port: 54321 // PostgreSQL database port
//});

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

app.get('/car', (req, res) => {
  res.sendFile(__dirname + '/Project Files/car.html');
});

app.get('/getdata', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM car');
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const client = await pool.connect();
    await client.query('DELETE FROM car WHERE id = $1', [id]);
    const result = await client.query('SELECT * FROM car');
    const results = { 'results': (result) ? result.rows : null };
    res.send({ message: "Remaining results", results: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/add', async (req, res) => {
  try {
    const { make, model } = req.body;
    const client = await pool.connect();
    const result = await client.query('INSERT INTO car (make, model) VALUES ($1, $2) RETURNING id', [make, model]);
    //to change to a relational database design with make/model database can do "insert (or select) into make(make)
    //value (make) returning ID
    //then use that ID to insert into model with makeID
    const id = result.rows[0].id;
    const queryResult = await client.query('SELECT * FROM car WHERE id = $1', [id]);
    const results =(queryResult) ? queryResult.rows : null;
    res.send({ message: "New Car", results: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

app.post('/update', async (req, res) => {
  try {
    const { id, new_model } = req.body;
    const client = await pool.connect();
    const updateResult = await client.query('UPDATE car SET model = $1 WHERE id = $2 RETURNING id', [new_model, id]);

    if (updateResult.rows.length === 0) {
      res.status(404).send({ message: "No car found for the given id" });
      return;
    }

    const queryResult = await client.query('SELECT * FROM car WHERE id = $1', [id]);
    const results = (queryResult) ? queryResult.rows : null;
    res.send({ message: "Updated Car", results: results });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});


app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    client = await pool.connect();
    const result = await client.query('INSERT INTO webusers (email, u_pass) VALUES ($1, $2) RETURNING id', [email,
    hashedPassword]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
