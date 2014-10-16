var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = io();8

io.on('connection', function(socket){
	socket.on('sent', function(msg){
		io.sockets.emit('chat', people[socket.id], msg);
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