var redis = require('redis');
var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
	res.render("page");
});


app.get("/room/:roomId", function(req, res) {
	res.render("page", {roomId: req.params['roomId']});
});

var io = require('socket.io').listen(app.listen(process.env.PORT));
console.log("Listening on port " + process.env.PORT);

io.sockets.on('connection', function(socket) {
	var room;
	socket.emit('message', {message: 'welcome to the chat'});
	socket.on('createroom', function(curRoom) {
		room = curRoom;
		socket.join(room);
		console.log(room);
	});
	socket.on('send', function(data){
		console.log("send" + room);
		io.sockets.in(room).emit('message', data);
	});
});