//requiring different packages
// express is a framework built on top of Node
const express = require('express')
//bodyParser allows us to pull data off the body on a post request
const bodyParser = require('body-parser')
// dotenv allows us to create a .env file at the root of our project and access data from it
// this is a good practice because it ensures you won't push up anything you need to be secure
// rmember to put .env in your .gitignore file
require('dotenv').config()
// massive is the data mapper we use to connect express to our postgres db
const massive = require('massive')
// invoking express and setting it to app allows us to utilize the methods from express like app.get or app.post
const app = express()

//using the bodyParser "middleware" (don't worry we will talk about middleware next week)
app.use(bodyParser.json())

//setting our connection to our postgres db
// we pass in our connection string from heroku that we are storing in our .env file
// remember, if you push something up to github like a connection string just treat it like you are posting your social on a billboard on every corner in the United States.
massive(process.env.CONNECTION_STRING).then((db) => {
	// once the connect is made (remember it is a promise, that is why we can use .then) we get a refernce to the db back
	// we are calling it db here but remember that params can be called anything
	// setting a property called 'db' on our app (the same app variable we created above) and assinging its value to the db refernce we get back
	app.set('db', db)
	// this is just setting some temporary data for us. This will not always be necessary
	db.seed_data()
})

// get all of our users
// we could easily put the callback function into a controller and reference that to keep our server clean
app.get(`/api/users`, (req, res) => {
	// check our app for the db we set and then run the getUsers sql command. Massive takes that command and turns it into a function for us so we an invoke it. Remember, it is a promsie so we can use .then()
	// we are using users in the function inside of .then because that is what we are getting back but we can call this whatever we want
	req.app
		.get('db')
		.getUsers()
		.then((users) => {
			res.status(200).send(users)
		})
})

app.get(`/api/user/:id`, (req, res) => {
	const { id } = req.params
	req.app
		.get('db')
		.getUserByID(id)
		.then((user) => {
			res.status(200).send(user)
		})
})

app.post(`/api/createUser`, (req, res) => {
	const { first_name, last_name, email } = req.body
	req.app
		.get('db')
		.createUser([first_name, last_name, email])
		.then(() => {
			res.status(200).json('User Added!')
		})
})

// we set our port in our .env file to keep it safe
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`the magic is happening on ${PORT}`))
