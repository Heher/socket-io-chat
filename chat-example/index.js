var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {}; 

app.get('/', function(req, res){
	res.sendFile('index.html', { root: __dirname });
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		socket.emit('chat message', msg);
	});
	socket.on('user connected', function(username){
		people[socket.id] = username;
		socket.emit("update", "You have connected to the server.");
		socket.broadcast.emit("update", username + " has joined the server.");
		// socket.sockets.emit("update-people", people);
	});
	socket.on('disconnect', function(username) {
		socket.broadcast.emit("update", people[socket.id] + " has left the server.");
		delete people[socket.id];
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});