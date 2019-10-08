const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 8080;


const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(bodyParser.json());

app.use(morgan('short'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running..');
})

app.get('/', (res, req) => { res.send("Server is working...") })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.post('/profile/:id', profile.handleProfileUpdate(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
