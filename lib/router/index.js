/* functions used in the app's routes */

var home = function(req, res, sess) {
	res.setHeader('Content-Type', 'text/html');
	res.render('welcome.html'); 
	sess.previousPage = '/';	
}

var login = function(req, res, sess) {
	if (sess.username) {
		res.setHeader('Content-Type', 'text/html');
		res.write("<p>You are already connected ;-)</p>");
		res.end('<p><a href="/">home</a> OR <a href="/logout">logout</a></p>');
	}
	else {
		res.setHeader('Content-Type', 'text/html');
		res.render('registration.html');
	}	
}

var loginAdd = function(req, res, sess) {
	if (req.body.newItem != '') { 
		sess.username=req.body.userName;
		res.redirect(sess.previousPage);
 	}	
}

var logout = function(req, res, sess) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect('/');
		}
	});
}

var todo = function(req, res, sess) {
	sess.previousPage = '/todo';
	if (sess.username) {
		res.setHeader('Content-Type', 'text/html');
		res.render('todo.html', {itemList: sess.itemList});
	}
	else {
		res.setHeader('Content-Type', 'text/html');
		res.render('registration.html');
	}
}

var todoAdd = function(req, res, sess) {
 	if (sess.username) {
		if (req.body.newItem != '') {
	 		sess.itemList.push(req.body.newItem);
	 	}
	 		res.redirect('/todo');
	 }
	else {
		res.setHeader('Content-Type', 'text/html');
		res.render('registration.html');
	}
}

var tododel = function(req, res, sess) {
	if (sess.username) {
		if (req.params.id != '') {
			sess.itemList.splice(req.params.id, 1);
		}	
			res.redirect('/todo');
	}
	else {
		res.setHeader('Content-Type', 'text/html');
		res.render('registration.html');
	}
}

var chat = function(req, res, sess) {
	sess.previousPage = '/chat';
	if (sess.username) {
		res.setHeader('Content-Type', 'text/html');
		res.render('chat.html', {username: sess.username, msglist: sess.msgList, listsize: sess.msgList.length});
	}
	else {
		res.setHeader('Content-Type', 'text/html');
		res.render('registration.html');
	}
}

exports.home = home;
exports.login = login;
exports.loginAdd = loginAdd;
exports.logout = logout;
exports.todo = todo;
exports.todoAdd = todoAdd;
exports.tododel = tododel;
exports.chat = chat;
