var socket = io();

$('#username-form').submit(function() {
	socket.emit('user connected', $('#username').val());
	$('#username-form').hide();
	$('#username-form-overlay').hide();
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
	$('#messages').append($('<li class="system">').text(msg));
});

socket.on("update-users", function(people){
	$("#users").empty();
	$.each(people, function(clientid, name) {
		var li = "<li>"+name+"</li>";
		$('#users').append(li);
	});
});