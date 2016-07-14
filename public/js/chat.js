//http://tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript/

$(window).ready(function(){
	var messages = [];
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var field = document.getElementById("field");
	var socket = io.connect('https://radiotube-ipat.c9users.io');
	var player;
	socket.emit('createroom', roomId);

	socket.on('message', function(data) {
		if(data.message) {
			var videoId = checkIfYoutube(data.message);
			if(videoId){
				player = new YT.Player('video-placeholder', {
			        width: 600,
			        height: 400,
			        videoId: videoId,
			        playerVars: {
			            color: 'white',
			            //playlist: 'taJ60kskkns,FG0fTKAqZ5g'
			        },
			        events: {
			            //onReady: initialize
			        }
			    });
			}
			// For debugging the sended messate
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
});