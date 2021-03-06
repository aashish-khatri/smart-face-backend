const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());

app.use(cors());

var knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db =  knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
});



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is listening on port {$process.env.PORT} `);
})

app.get('/', (req, res) => {
	res.send('working'); 
})

app.post('/signin', (req, res) =>{signin.handleSignin(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


// API DESIGN

/*
/ --> res = this is working
/signin --> POST = success/failure
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
	

