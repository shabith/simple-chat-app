var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname,'index.html'));
});

io.on('connection', function(socket){
	io.emit('chat message', '==== a user connected ====');

	socket.on('disconnect', function(){
		io.emit('chat message', '==== a user disconnected ====');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});