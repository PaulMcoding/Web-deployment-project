var express = require('express');
var session = require('express-session')
var app = express();
var { Pool } = require('pg');

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var bcrypt = require('bcrypt');
var saltRounds = 10;

app.use(session({
  secret: 'PaulLikesPorsches',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////// Pauls Connection
var pool = new Pool({
user: 'paul',
host: 'localhost',
database: 'postgres',
password: 'password',
port: 54321
});

 //  Williams Connection
  //  var pool = new Pool({
  //    user: 'BUILDER', // PostgreSQL database username
  //    host: 'localhost', // PostgreSQL database host
  //    database: 'postgres', // PostgreSQL database name
  //    password: 'cls2', // PostgreSQL database password
  //    port: 54321 // PostgreSQL database port
  //  });

//Web page routes
app.use(express.static(path.join(__dirname, 'Project Files')));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/Project Files/signin.html');
});
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/Project Files/signup.html');
});
app.get('/details', (req, res) => {
    res.sendFile(__dirname + '/Project Files/detailedcarview.html');
  });
  app.get('/favs', (req, res) => {
    res.sendFile(__dirname + '/Project Files/viewfavourites.html');
  });
app.get('/album', (req, res) => {
  res.redirect('/allcars.html'); 
});
 app.get('/mycars', (req, res) => {
    if (req.session.username) {
      res.sendFile(__dirname + '/Project Files/car.html');
    } else {
      res.redirect('/signin?signedin=view'); 
    }
    });

app.get('/readmessage', (req, res) => {
  if (req.session.username) {
    res.sendFile(__dirname + '/Project Files/readmessage.html');
  } else {
    res.redirect('/signin?signedin=view'); 
  }
  });

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await pool.query('SELECT * FROM webusers WHERE user_email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).send('eiu');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query('INSERT INTO webusers (user_email, user_pass) VALUES ($1, $2) RETURNING user_id', 
    [email, hashedPassword]);
    const uID = result.rows[0].user_id;
    req.session.username = email;
    req.session.userID = uID;

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

app.get('/getUserId', async (req, res) => {
  try {
    const userID = req.session.userID;

    console.log('User ID:', userID);
    res.json({ userID });
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/signin', async (req, res) => {
  var { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM webusers WHERE user_email = $1', [email]);

    if (result.rows.length === 1) {
      const hashedPassword = result.rows[0].user_pass;
      const uID = result.rows[0].user_id;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        req.session.username = email;
        req.session.userID = uID;
        const userID = req.session.userID;

    console.log('User ID:', userID);

        return res.redirect('/');
      } else {
        return res.status(401).send('Invalid password');
      }
    }
    else {
      return res.status(401).send('Invalid username');
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

//database manipulation routes

app.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      result = await pool.query('SELECT car.*, make.makename FROM car JOIN make ON car.makeid = make.makeid');
      console.log('All Cars Result:', result.rows);
    } else {
      result = await pool.query(
        'SELECT car.*, make.makename FROM car JOIN make ON car.makeid = make.makeid WHERE car.car_model ILIKE $1 OR make.makename ILIKE $1 OR car.car_year = $2',
        [`%${query}%`, query]
      );

      console.log('Query:', `SELECT car.*, make.makename FROM car JOIN make ON car.makeid = make.makeid WHERE car.car_model ILIKE '${query}' OR make.makename ILIKE '${query} OR car.car_year ILIKE ${query}`);
    }

    console.log('Result:', result.rows);

    res.redirect(`/allcars2.html?query=${encodeURIComponent(query)}`);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getdata', async (req, res) => {
  try {
    const client = await pool.connect();
    const searchQuery = req.query.query;
    let query;

    if (searchQuery) {
      query = {
        text: 'SELECT * FROM car JOIN make USING (makeid) WHERE car_model ILIKE $1 OR make.makename ILIKE $1 OR car_year = $2',
        values: [`%${searchQuery}%`, searchQuery],
      };
    } else {
      query = {
        text: 'SELECT * FROM car JOIN make USING (makeid)',
      };
    }

    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/getfavdata', async (req, res) => {
  try {
    const uid = req.session.userID;
    const client = await pool.connect();

      const query = {
        text: 'SELECT * FROM car JOIN make USING (makeid) join favourite using(car_id) where user_id = $1',
        values: [uid],
      };

    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/getusersdata', async (req, res) => {
  const id = req.session.userID;
  if(id == 1)
  {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM car join make using(makeid)');
      const results = { 'results': (result) ? result.rows : null };
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }
  else{
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM car join make using(makeid) where seller_id = $1', [id]);
      const results = { 'results': (result) ? result.rows : null };
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
}
});

//database manipulation routes
app.post('/getdetails', async (req, res) => {
  try {
    const carid = req.body.carID;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM car join make using(makeid) where car_id = $1', [carid]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//database manipulation routes
app.post('/getmessage', async (req, res) => {
  try {
    const carid = req.body.carID;
    const client = await pool.connect();
    const result = await client.query(`
    SELECT * FROM webseller
    JOIN webusers ON webseller.user_id = webusers.user_id
    WHERE webseller.car_id = $1
  `, [carid]);

    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/writeToFile', (req, res) => {
  const data = req.body;
  fs.writeFileSync('Car.json', JSON.stringify(data, null, 2));
  res.send('Data written to data.json');
});

app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const client = await pool.connect();
    await client.query('DELETE FROM car WHERE car_id = $1', [id]);
    const result = await client.query('SELECT * FROM car join make using(makeid)');
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
    const { make, model, price, year, miles, location, desc, image } = req.body;
    const client = await pool.connect();
    let makeId;

    const makeCheck = await client.query('Select * from make where makename = $1', [make])

    if (makeCheck.rows.length > 0) {
      makeId = makeCheck.rows[0].makeid;
    } else {
      const makeResult = await pool.query('INSERT INTO make(makename) VALUES ($1) RETURNING makeid', [make]);
      makeId = makeResult.rows[0].makeid;
    }

    const sellerid = req.session.userID;
  
    const result = await client.query('INSERT INTO car (makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING car_id',
      [makeId, model, price, year, miles, location, desc, image, sellerid]);

    const carId = result.rows[0].car_id;
    const queryResult = await client.query('SELECT * FROM car join make using(makeid) WHERE car_id = $1', [carId]);
    const newCar = (queryResult) ? queryResult.rows[0] : null;
    res.json({ message: "New Car Added", car: newCar });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

app.post('/update', async (req, res) => {
  try {
    res.header('Content-Type', 'application/json');
    const { id, makeID, make, model, price, year, miles, location, desc, image } = req.body;
    const client = await pool.connect();
    let gotMake;

    const ownersID = req.session.userID;
    
    if (ownersID !== 1) {
      // Check if the user is the owner of the car
      const ownershipCheck = await client.query('SELECT seller_id FROM car WHERE car_id = $1', [id]);

      if (ownershipCheck.rows.length === 0 || ownershipCheck.rows[0].seller_id !== ownersID) {
        res.status(403).json({ message: "Unauthorized: You do not own this car or the car does not exist." });
        return;
      }
    }

    const makeCheck = await client.query('SELECT * FROM make WHERE makeid = $1', [makeID]);

    if (makeCheck.rows.length > 0) {
      gotMake = makeCheck.rows[0].makeid;
    } else {
      const makeResult = await pool.query('INSERT INTO make(makename) VALUES ($1) RETURNING makeid', [make]);
      gotMake = makeResult.rows[0].makeid;
    }

    const updateResult = await client.query(
      'UPDATE car SET makeid = $1, car_model = $2, car_price = $3, car_year = $4, car_miles = $5, car_location = $6, car_desc = $7, car_image = $8 WHERE car_id = $9 RETURNING car_id',
      [gotMake, model, price, year, miles, location, desc, image, id]
    );

    if (updateResult.rows.length === 0) {
      res.status(404).send({ message: "No car found for the given car_id" });
      return;
    }

    const queryResult = await client.query('SELECT * FROM car JOIN make USING(makeid) WHERE car_id = $1', [id]);
    const updatedCar = (queryResult) ? queryResult.rows[0] : null;
    res.json({ message: "Updated Car", car: updatedCar });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating car" });
  }
});

app.post('/messageSeller', async (req, res) => {
  if (req.session.username)
  {
    try {
      res.header('Content-Type', 'application/json');
      const{carID, sellerID, message, carName} = req.body
      const userID = req.session.userID;

      console.log(userID, carID, sellerID, message, carName);
      const messageResult = 
      pool.query('INSERT INTO webseller(seller_id, car_id, user_id, seller_message) VALUES ($1, $2, $3, $4)', 
      [sellerID, carID, userID, message]);
      console.log("Sent Message to seller about car: " + carName);
      res.json({ message: "Sent Message to seller about car: " + carName });
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);}
    }
  else
    {
      res.status(401).send("Login");
    }
  })

  app.post('/favourite', async (req, res) => {
    try {
      res.header('Content-Type', 'application/json');
      const { carID } = req.body;
      if(req.session.userID)
      {
      const userID = req.session.userID;
  
      const messageResult = await pool.query('INSERT INTO favourite(user_id, car_id) VALUES ($1, $2)', [userID, carID]);
  
      if (messageResult) {
        res.status(200).send("yes");
      } else {
        res.status(500).send("Failed to add favourite");
      }
    }
    else{
      res.status(500).send("nope");
    }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  });
  
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });


/*
app.get('/loggedin')
if(req.session.userID)
{
  res.status(305);
}
else
{
  res.status(200);
}
*/

/*
if(response.status==305)
  show log out
else
  show log in
 */