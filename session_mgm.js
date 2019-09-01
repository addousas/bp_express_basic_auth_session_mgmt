require('dotenv').config()

var secret_key = process.env.SECRET_KEY
var user_name = process.env.USER_NAME
var password = process.env.PASSWORD
var port = process.env.PORT


var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var basicAuth = require('express-basic-auth')


app.use(cookieParser())
app.use(cookieSession({secret: 'ASSIMADDOUS'}))


app.use(basicAuth({
    // users: {'admin 1' : 'password', 'admin 2' : 'password'  ...}
    users: { 'assim' : 'addous' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}))



app.use('/',express.static('./static'))

app.get('/test', function (req,res) {
	if (req.session.restricted) {
		res.send('You have been restricted: ' + req.session.count)
	} else {
		res.send('Hey Buddy')
	}
})

app.get('/restricted', function(req, res) {
	req.session.restricted = true
	if (!req.session.count) {
		req.session.count = 1
	} else {
		req.session.count +=1
	}
	res.redirect('/')
})


app.listen(8081, () => {
	console.log('[info] running on port ' + port)
	console.log('[info] user_name: ' + user_name)
	console.log('[info] password: ' + password )
})