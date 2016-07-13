window.onload = function() {
	var messages = [];
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var field = document.getElementById("field");
	var socket = io.connect('http://localhost:3700');
	socket.emit('createroom', roomId);

	socket.on('message', function(data) {
		if(data.message) {
			messages.push(data.message);
			var html = '';
			for(var i = 0; i < messages.length; i++) {
				html += messages[i] + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem:", data);

		}
	});

	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text });
	}
}