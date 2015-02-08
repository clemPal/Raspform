var http = require('http');
var express = require('express');
var bodyParser = require('body-parser'); //to load the parameter interpreter middleware
var session = require('express-session'); //to load the session middleware
var SessionSockets = require('session.socket.io'); //to load the socket session middleware
var cookieParser = require('cookie-parser')('ouistiti'); //to load the socket parameter interpreter middleware
var sessionstore = require('sessionstore');//to load the session store middleware.
var ent = require('ent');

var routes = require('./lib/router');
var socketFunc = require('./lib/socketFunc');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sessionStore = sessionstore.createSessionStore(); //to create a session store

var app = express();

/* Init of the socket-io with the session manager */
var server = http.createServer(app);
var io = require('socket.io')(server);
var SessionSockets = require('session.socket.io');
var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

var sess;
var msgGot;
var NewCoMsg;

/* Permit to read html file with ejs */
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public')) // to define the public directory as default

/* Creation and initialisation of the session */
.use(session({
	secret: 'ouistiti',
	resave: false,
 	saveUninitialized: true,
 	store: sessionStore
})) 
.use(cookieParser)
.use(function(req, res, next) {
	sess = req.session;
    if (typeof(sess.itemList) == 'undefined') {
        sess.itemList = [];
    }	   
    if (typeof(sess.msgList) == 'undefined') {
        sess.msgList = [];
    }
    if (typeof(sess.previousPage) == 'undefined') {
        sess.previousPage = '/';
    }
	next();
})
/* Instantiation of the server routes */
.get('/', function(req, res) {
	routes.home(req,res, sess);
})
.get('/login', function(req,res){
	routes.login(req,res, sess);
})
.post('/login/add', urlencodedParser, function(req,res){
	routes.loginAdd(req,res, sess);	
})
.get('/logout',function(req,res) {
	routes.logout(req,res, sess);
})
.get('/todo', function(req, res) {
	routes.todo(req,res, sess);
})
.post('/todo/add', urlencodedParser, function (req, res) {
 	routes.todoAdd(req,res, sess);
})
.get('/todo/del/:id', function(req, res) {
	routes.tododel(req,res, sess);
})
.get('/chat', function(req, res) {
	routes.chat(req,res, sess);
});

/* The socket connection with associated functions */
sessionSockets.on('connection', function (err, socket, session) {

	/* To save the connexion msg in the cookie session of every users*/
	NewCoMsg = '>> ' + session.username + ' is connected <<';
	console.log(NewCoMsg);
	socketFunc.sess_saving(io, socket, sessionSockets, NewCoMsg, session);

	/* To transmit the connexion msg */
	NewCoMsg_formatted = '<em>' + NewCoMsg + '</em>';
	socket.broadcast.emit('message', NewCoMsg_formatted);

	socket.on('message', function(message) {

		/* To save the msg in the cookie session of every users*/
		msgGot = '> ' + session.username +': ' + ent.encode(message);
		console.log(msgGot);
		socketFunc.sess_saving(io, socket, sessionSockets, msgGot, session);

		/* To transmit the msg */
		msgGot_formatted = '<strong>> ' + session.username +':</strong> ' + ent.encode(message);
		socket.broadcast.emit('message', msgGot_formatted);

	});

	socket.on('disconnect', function() {
		/* To save the disconnection msg in the cookie session of every users*/
		msgDisconection = '>> ' + session.username + ' is disconnected <<';
     	console.log('msgDisconection');
 		socketFunc.sess_saving(io, socket, sessionSockets, msgDisconection, session);

		/* To transmit the disconnection msg */
		msgDisconection_formatted = '<em>' + msgDisconection + '</em>';
		socket.broadcast.emit('message', msgDisconection_formatted);    	
    });
});

/* In case of not defined asked page */
app.use(function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(404).write('<p>page not found</p>');
	res.end('<p><a href="/">home</a> OR <a href="/logout">logout</a></p>');
});

server.listen('8080');