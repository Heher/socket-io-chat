var socket = io();
$('#username-form').submit(function() {
	socket.emit('user connected', $('#username').val());
	$('#username-form').hide();
	return false;
});
$('#chat-form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});
socket.on("update", function(msg) {
	$('#messages').append($('<li>').text(msg));
});
socket.on('user co', function(username){
	$('#messages').append($('<li>').text(username + " Connected"));
});
socket.on('user disconnect', function(){
	$('#messages').append($('<li>').text("User Disconnected"));
});