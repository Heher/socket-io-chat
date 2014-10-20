var gulp = require('gulp');

var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var people = {};

gulp.task('express', function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(router);
	app.use(express.static(__dirname));

	router.get('/', function (req, res) {  
	  res.render('index');
	});

	server.listen(4000);
});

gulp.task('socket', function() {
	io.on('connection', function(socket){
		socket.on('sent', function(msg){
			io.sockets.emit('chat', people[socket.id], msg);
		});
		socket.on('user connected', function(username){
			people[socket.id] = username;
			socket.emit("update", "You have connected to the server.");
			socket.broadcast.emit("update", username + " has joined the server.");
			io.sockets.emit("update-users", people);
		});
		socket.on('disconnect', function(username) {
			socket.broadcast.emit("update", people[socket.id] + " has left the server.");
			delete people[socket.id];
			io.sockets.emit("update-users", people);
		});
	});
});

var sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename');

gulp.task('styles', function() {
	return gulp.src('sass/*.sass')
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(gulp.dest('css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.sass', ['styles']);
});

gulp.task('default', ['express', 'socket', 'watch'], function() {

});