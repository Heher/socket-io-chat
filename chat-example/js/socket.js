var socket = io();

$('#username-form').submit(function() {
	socket.emit('user connected', $('#username').val());
	$('#username-form').hide();
	return false;
});

$('#chat-form').submit(function(){
	socket.emit('sent', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat', function(user, msg){
	$('#messages').append($('<li>').text(user + ": " + msg));
});

socket.on("update", function(msg) {
	$('#messages').append($('<li>').text(msg));
});