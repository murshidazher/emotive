const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 8080;


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'murshid',
    password : '',
    database : 'emotive'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running..');
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
