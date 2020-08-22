const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const redis = require('redis');

const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const annotate = require('./controllers/annotate');

const auth = require('./middleware/authorization');

const PORT = process.env.PORT || 8080;


const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});


// setup redis client
const redisClient = redis.createClient(process.env.REDIS_URI);


const app = express();

app.use(bodyParser.json());

app.use(morgan('short'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running..');
})

app.get('/', (res, req) => { res.send("Server is working...") })

app.post('/signin', signin.handleSigninAuthentication(db, bcrypt, redisClient, jwt))

app.post('/signout', auth.requireAuth(redisClient), signout.handleSignOut(redisClient))

app.post('/register', register.handleRegisterAuthentication(db, bcrypt, redisClient, jwt))

app.get('/profile/:id', auth.requireAuth(redisClient), profile.handleProfileGet(db))

app.post('/profile/:id', auth.requireAuth(redisClient), profile.handleProfileUpdate(db))

app.put('/image', auth.requireAuth(redisClient), image.handleImage(db))

app.post('/imageurl', auth.requireAuth(redisClient), (req, res) => { image.handleApiCall(req, res) })

app.get('/annotate/:id', auth.requireAuth(redisClient), annotate.handleAnnotatesGet(db))

app.post('/annotate/:id', auth.requireAuth(redisClient), annotate.handleRequestAnnotate(db))


// handleRequestAnnotate,
//   handleResolveAnnotate,
//   handleResponseAnnotate,
//   handleAnnotatesGet

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
